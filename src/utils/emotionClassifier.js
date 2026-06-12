/**
 * Emotion Classifier — Maps MediaPipe blendshape coefficients to emotion labels.
 *
 * Highly tuned heuristic rules for recognizing all 5 expressions easily.
 */

const EMOTIONS = {
  HAPPY: 'happy',
  SAD: 'sad',
  ANGRY: 'angry',
  SURPRISED: 'surprised',
  CALM: 'calm',
};

function getScore(blendshapes, name) {
  const shape = blendshapes.find((b) => b.categoryName === name);
  return shape ? shape.score : 0;
}

function computeRawScores(blendshapes) {
  const s = (name) => getScore(blendshapes, name);

  // Happy: Just smiling is enough
  const smileAvg = (s('mouthSmileLeft') + s('mouthSmileRight')) / 2;
  const cheekAvg = (s('cheekSquintLeft') + s('cheekSquintRight')) / 2;
  const happy = smileAvg * 0.85 + cheekAvg * 0.15;

  // Sad: Frowning or pulling inner brows up
  const frownAvg = (s('mouthFrownLeft') + s('mouthFrownRight')) / 2;
  const browInnerUp = s('browInnerUp');
  const sad = frownAvg * 0.6 + browInnerUp * 0.4;

  // Angry: Lowering eyebrows is the primary indicator. Sneer is a bonus.
  const browDownAvg = (s('browDownLeft') + s('browDownRight')) / 2;
  const sneerAvg = (s('noseSneerLeft') + s('noseSneerRight')) / 2;
  const angry = browDownAvg * 0.75 + sneerAvg * 0.25;

  // Surprised: Opening jaw or widening eyes
  const eyeWideAvg = (s('eyeWideLeft') + s('eyeWideRight')) / 2;
  const jawOpen = s('jawOpen');
  const browOuterAvg = (s('browOuterUpLeft') + s('browOuterUpRight')) / 2;
  const surprised = Math.max(jawOpen * 0.7, eyeWideAvg * 0.6 + browOuterAvg * 0.4);

  return { happy, sad, angry, surprised };
}

export class EmotionClassifier {
  constructor(bufferSize = 3) { // Lowered buffer size to 3 for snappier response
    this.bufferSize = bufferSize;
    this.buffer = [];
  }

  classify(blendshapes) {
    if (!blendshapes || blendshapes.length === 0) {
      return { emotion: EMOTIONS.CALM, confidence: 0, scores: {} };
    }

    const raw = computeRawScores(blendshapes);

    this.buffer.push(raw);
    if (this.buffer.length > this.bufferSize) {
      this.buffer.shift();
    }

    const smoothed = { happy: 0, sad: 0, angry: 0, surprised: 0 };
    for (const frame of this.buffer) {
      smoothed.happy += frame.happy;
      smoothed.sad += frame.sad;
      smoothed.angry += frame.angry;
      smoothed.surprised += frame.surprised;
    }
    const n = this.buffer.length;
    smoothed.happy /= n;
    smoothed.sad /= n;
    smoothed.angry /= n;
    smoothed.surprised /= n;

    // VERY low threshold so it picks up subtle expressions easily
    const MIN_THRESHOLD = 0.05; 
    let bestEmotion = EMOTIONS.CALM;
    let bestScore = MIN_THRESHOLD;

    for (const [emotion, score] of Object.entries(smoothed)) {
      if (score > bestScore) {
        bestScore = score;
        bestEmotion = emotion;
      }
    }

    // Boost confidence visual
    const confidence = Math.min(Math.round(bestScore * 300), 100);

    return {
      emotion: bestEmotion,
      confidence,
      scores: smoothed,
    };
  }

  reset() {
    this.buffer = [];
  }
}

export { EMOTIONS };
export default EmotionClassifier;
