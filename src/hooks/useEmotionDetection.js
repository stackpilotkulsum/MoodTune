/**
 * useEmotionDetection — Custom hook for real-time emotion detection
 *
 * Initializes MediaPipe FaceLandmarker, processes webcam frames,
 * and classifies emotions from blendshape coefficients.
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { FilesetResolver, FaceLandmarker } from '@mediapipe/tasks-vision';
import { EmotionClassifier } from '../utils/emotionClassifier';

const DETECTION_INTERVAL_MS = 100; // ~10 FPS for detection

export function useEmotionDetection() {
  const [emotion, setEmotion] = useState({ emotion: 'calm', confidence: 0, scores: {} });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [landmarks, setLandmarks] = useState(null);

  const landmarkerRef = useRef(null);
  const classifierRef = useRef(new EmotionClassifier(5));
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const lastDetectionTime = useRef(0);
  const isRunningRef = useRef(false);

  // Initialize MediaPipe
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        setIsLoading(true);
        setError(null);

        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        );

        const landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numFaces: 1,
          outputFaceBlendshapes: true,
          outputFacialTransformationMatrixes: false,
        });

        if (!cancelled) {
          landmarkerRef.current = landmarker;
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('MediaPipe init error:', err);
          setError('Failed to load face detection model. Please check your connection.');
          setIsLoading(false);
        }
      }
    }

    init();

    return () => {
      cancelled = true;
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
        landmarkerRef.current = null;
      }
    };
  }, []);

  /**
   * Process a single video frame for face detection + emotion classification.
   */
  const processFrame = useCallback((timestamp) => {
    if (!isRunningRef.current) return;

    const video = videoRef.current;
    const landmarker = landmarkerRef.current;

    if (video && landmarker && video.readyState >= 2) {
      // Throttle detection
      if (timestamp - lastDetectionTime.current >= DETECTION_INTERVAL_MS) {
        lastDetectionTime.current = timestamp;

        try {
          const result = landmarker.detectForVideo(video, timestamp);

          if (result.faceLandmarks && result.faceLandmarks.length > 0) {
            setLandmarks(result.faceLandmarks[0]);

            if (result.faceBlendshapes && result.faceBlendshapes.length > 0) {
              const classified = classifierRef.current.classify(
                result.faceBlendshapes[0].categories
              );
              setEmotion(classified);
            }
          } else {
            setLandmarks(null);
          }
        } catch (err) {
          // Occasional frame errors are normal, don't crash
          console.warn('Frame processing error:', err.message);
        }
      }
    }

    animationRef.current = requestAnimationFrame(processFrame);
  }, []);

  /**
   * Start the detection loop.
   */
  const startDetection = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    animationRef.current = requestAnimationFrame(processFrame);
  }, [processFrame]);

  /**
   * Stop the detection loop.
   */
  const stopDetection = useCallback(() => {
    isRunningRef.current = false;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopDetection();
    };
  }, [stopDetection]);

  return {
    emotion,
    landmarks,
    isLoading,
    error,
    videoRef,
    canvasRef,
    startDetection,
    stopDetection,
  };
}

export default useEmotionDetection;
