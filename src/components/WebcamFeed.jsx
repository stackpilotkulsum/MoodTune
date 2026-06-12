/**
 * WebcamFeed — Live camera feed with optional face mesh overlay
 */
import { useEffect, useRef, useState } from 'react';

function WebcamFeed({ videoRef, landmarks, moodColor, moodGlow, isCameraEnabled }) {
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  // Start/Stop webcam based on isCameraEnabled
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user',
          },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          setCameraActive(true);
          setCameraError(null);
        }
      } catch (err) {
        console.error('Camera error:', err);
        setCameraError(
          err.name === 'NotAllowedError'
            ? 'Camera access denied. Please allow camera permissions.'
            : 'Could not access camera. Please check your device.'
        );
      }
    }

    function stopCamera() {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
    }

    if (isCameraEnabled) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isCameraEnabled, videoRef]);

  // Draw face mesh overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video || !isCameraEnabled) return;

    const ctx = canvas.getContext('2d');

    function drawLandmarks() {
      if (!isCameraEnabled) return; // double check

      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (landmarks && landmarks.length > 0) {
        // Draw landmark dots
        ctx.fillStyle = moodColor || '#c084fc';
        ctx.globalAlpha = 0.6;

        for (const point of landmarks) {
          const x = point.x * canvas.width;
          const y = point.y * canvas.height;
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw face oval connections (simplified)
        const faceOval = [
          10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288,
          397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136,
          172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109, 10,
        ];

        ctx.strokeStyle = moodColor || '#c084fc';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();

        for (let i = 0; i < faceOval.length; i++) {
          const idx = faceOval[i];
          if (idx < landmarks.length) {
            const x = landmarks[idx].x * canvas.width;
            const y = landmarks[idx].y * canvas.height;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      requestAnimationFrame(drawLandmarks);
    }

    const frame = requestAnimationFrame(drawLandmarks);
    return () => cancelAnimationFrame(frame);
  }, [landmarks, moodColor, isCameraEnabled, videoRef]);

  return (
    <div className="webcam-container" style={{ '--mood-glow': moodGlow || 'rgba(192,132,252,0.4)' }}>
      <div className="webcam-ring" style={{ borderColor: moodColor || '#c084fc' }}>
        <div className="webcam-inner">
          {cameraError ? (
            <div className="webcam-error">
              <span className="webcam-error-icon">⚠️</span>
              <p>{cameraError}</p>
            </div>
          ) : !isCameraEnabled ? (
            <div className="webcam-loading" style={{ flexDirection: 'column' }}>
              <span style={{ fontSize: '24px', marginBottom: '8px' }}>📷</span>
              <p>Camera is turned off</p>
            </div>
          ) : !cameraActive ? (
            <div className="webcam-loading">
              <div className="spinner" />
              <p>Starting camera...</p>
            </div>
          ) : null}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="webcam-video"
            style={{ display: cameraActive && !cameraError && isCameraEnabled ? 'block' : 'none' }}
          />
          <canvas ref={canvasRef} className="webcam-canvas" style={{ display: isCameraEnabled ? 'block' : 'none' }} />
        </div>
      </div>

      {/* Scanning line effect */}
      {cameraActive && isCameraEnabled && <div className="webcam-scan-line" style={{ background: moodColor }} />}
    </div>
  );
}

export default WebcamFeed;
