/**
 * PlaylistPanel — Scrollable list of mood-matched YouTube tracks
 */
import { getMoodConfig } from '../utils/moodConfig';

function PlaylistPanel({
  tracks,
  activeMood,
  isLoading,
  currentTrackId,
  onTrackClick,
  onRefresh,
  moodColor,
}) {
  const config = getMoodConfig(activeMood);

  return (
    <div className="playlist-panel">
      <div className="playlist-header">
        <div className="playlist-header-left">
          <h3 className="playlist-title">
            <span className="playlist-mood-emoji">{config.emoji}</span>
            {config.label} Vibes
          </h3>
          <span className="playlist-count">
            {tracks.length} video{tracks.length !== 1 ? 's' : ''}
          </span>
        </div>
        <button
          className="playlist-refresh-btn"
          onClick={onRefresh}
          disabled={isLoading}
          aria-label="Refresh playlist"
          id="btn-refresh-playlist"
          style={{ color: moodColor }}
        >
          <span className={`refresh-icon ${isLoading ? 'refresh-icon--spinning' : ''}`}>
            ↻
          </span>
        </button>
      </div>

      <div className="playlist-tracks">
        {isLoading && tracks.length === 0 ? (
          <div className="playlist-loading">
            <div className="spinner" />
            <p>Finding tracks for your mood...</p>
          </div>
        ) : tracks.length === 0 ? (
          <div className="playlist-empty">
            <p>No tracks found. Try refreshing!</p>
          </div>
        ) : (
          tracks.map((track, index) => {
            const isActive = track.id === currentTrackId;
            // Get YouTube thumbnail
            const albumArt = `https://img.youtube.com/vi/${track.id}/mqdefault.jpg`;

            return (
              <button
                key={track.id || index}
                className={`playlist-track ${isActive ? 'playlist-track--active' : ''}`}
                onClick={() => onTrackClick(index)}
                style={isActive ? { '--mood-color': moodColor } : {}}
                id={`track-${index}`}
              >
                <span className="playlist-track-index">
                  {isActive ? (
                    <span className="playlist-eq">
                      <span className="eq-bar" style={{ background: moodColor }} />
                      <span className="eq-bar" style={{ background: moodColor }} />
                      <span className="eq-bar" style={{ background: moodColor }} />
                    </span>
                  ) : (
                    index + 1
                  )}
                </span>

                <img
                  src={albumArt}
                  alt=""
                  className="playlist-track-art"
                  loading="lazy"
                />

                <div className="playlist-track-info">
                  <span className="playlist-track-name">{track.title}</span>
                  <span className="playlist-track-artist">{track.artist}</span>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

export default PlaylistPanel;
