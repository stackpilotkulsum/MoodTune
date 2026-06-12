/**
 * MusicPlayer — Now-playing card with YouTube Embed
 */

function MusicPlayer({
  currentTrack,
  moodColor,
  moodGradient,
}) {
  if (!currentTrack) {
    return (
      <div className="player-card" style={{ '--mood-color': moodColor }}>
        <div className="player-label">Now Playing</div>
        <div className="player-empty">
          <div className="player-empty-icon">📺</div>
          <p>No track playing</p>
          <p className="player-empty-hint">
            Your mood will automatically queue tracks
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="player-card" style={{ '--mood-color': moodColor, padding: '16px' }}>
      <div className="player-label" style={{ marginBottom: '12px' }}>Now Playing</div>

      {/* YouTube Embed Player */}
      <div className="player-embed-container" style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000', aspectRatio: '16/9' }}>
        <iframe
          src={`https://www.youtube.com/embed/${currentTrack.id}?autoplay=1`}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={currentTrack.title}
          style={{ display: 'block', width: '100%', height: '100%' }}
        ></iframe>
      </div>
      
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
         <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{currentTrack.title}</h3>
         <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{currentTrack.artist}</p>
      </div>
    </div>
  );
}

export default MusicPlayer;
