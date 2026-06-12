/**
 * MusicPlayer — Now-playing card with YouTube Embed
 */
import YouTube from 'react-youtube';

function MusicPlayer({
  currentTrack,
  moodColor,
  moodGradient,
  onTrackError,
  onTrackEnd
}) {
  if (!currentTrack) {
    return (
      <div className="player-card" style={{ '--mood-color': moodColor }}>
        <h2 className="section-title">NOW PLAYING</h2>
        <div className="player-empty" style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '8px', padding: '40px', textAlign: 'center', marginTop: '16px' }}>
          <p>No track selected.</p>
        </div>
      </div>
    );
  }

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
    },
  };

  return (
    <div className="player-card" style={{ '--mood-color': moodColor }}>
      <h2 className="section-title">NOW PLAYING</h2>

      <div className="player-art-wrapper" style={{ marginTop: '16px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000', position: 'relative', paddingTop: '56.25%' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <YouTube 
            videoId={currentTrack.id} 
            opts={opts} 
            onError={onTrackError}
            onEnd={onTrackEnd}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      <div className="player-info" style={{ textAlign: 'center', marginTop: '20px' }}>
        <h3 className="player-track-name" style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{currentTrack.title}</h3>
        <p className="player-artist-name" style={{ color: '#aaa', margin: 0, fontSize: '14px' }}>{currentTrack.artist}</p>
      </div>
    </div>
  );
}

export default MusicPlayer;
