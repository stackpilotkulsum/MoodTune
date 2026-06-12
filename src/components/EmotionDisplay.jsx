/**
 * EmotionDisplay — Shows the detected emotion with animated indicators
 */
import { getMoodConfig } from '../utils/moodConfig';

function EmotionDisplay({ emotion, confidence, scores, isLoading }) {
  const config = getMoodConfig(emotion);

  if (isLoading) {
    return (
      <div className="emotion-display emotion-display--loading">
        <div className="spinner" />
        <p className="emotion-loading-text">Loading face detection model...</p>
      </div>
    );
  }

  return (
    <div className="emotion-display" style={{ '--mood-color': config.color }}>
      <div className="emotion-header">
        <span className="emotion-label">Detected Mood</span>
      </div>

      <div className="emotion-main">
        <div className="emotion-emoji-container">
          <div
            className="emotion-emoji-glow"
            style={{ background: config.glow }}
          />
          <span className="emotion-emoji">{config.emoji}</span>
        </div>

        <div className="emotion-info">
          <h3 className="emotion-name" style={{ color: config.color }}>
            {config.label}
          </h3>
          <p className="emotion-description">{config.description}</p>
        </div>
      </div>

      {/* Confidence bar */}
      <div className="emotion-confidence">
        <div className="emotion-confidence-header">
          <span>Confidence</span>
          <span className="emotion-confidence-value">{confidence}%</span>
        </div>
        <div className="emotion-confidence-bar">
          <div
            className="emotion-confidence-fill"
            style={{
              width: `${confidence}%`,
              background: config.gradient,
            }}
          />
        </div>
      </div>

      {/* Individual emotion scores */}
      <div className="emotion-scores">
        {Object.entries(scores).map(([key, value]) => {
          const c = getMoodConfig(key);
          const pct = Math.round(Math.min(value * 150, 100));
          return (
            <div className="emotion-score-item" key={key}>
              <span className="emotion-score-emoji">{c.emoji}</span>
              <div className="emotion-score-bar-wrap">
                <div
                  className="emotion-score-bar"
                  style={{
                    width: `${pct}%`,
                    background: c.color,
                  }}
                />
              </div>
              <span className="emotion-score-pct">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EmotionDisplay;
