import { useEffect, useCallback, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { getMoodConfig } from '../utils/moodConfig';
import useEmotionDetection from '../hooks/useEmotionDetection';
import useMoodPlaylist from '../hooks/useMoodPlaylist';
import WebcamFeed from './WebcamFeed';
import EmotionDisplay from './EmotionDisplay';
import MusicPlayer from './MusicPlayer';
import PlaylistPanel from './PlaylistPanel';
import ParticlesBackground from './ParticlesBackground';
import MoodGallery from './MoodGallery';

function Dashboard() {
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [snapshots, setSnapshots] = useState([]);
  
  const {
    emotion,
    landmarks,
    isLoading: isModelLoading,
    error: modelError,
    videoRef,
    startDetection,
    stopDetection,
  } = useEmotionDetection();

  const {
    tracks,
    isLoading: isPlaylistLoading,
    activeMood,
    refreshPlaylist,
  } = useMoodPlaylist(emotion.emotion);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const config = getMoodConfig(activeMood);
  const currentTrack = tracks.length > 0 ? tracks[currentTrackIndex] : null;

  const handleVideoReady = useCallback(() => {
    if (!isModelLoading && isCameraEnabled) {
      startDetection();
    }
  }, [isModelLoading, isCameraEnabled, startDetection]);

  const toggleCamera = () => {
    setIsCameraEnabled((prev) => {
      const nextState = !prev;
      if (!nextState) stopDetection();
      else if (!isModelLoading && videoRef.current && videoRef.current.readyState >= 2) startDetection();
      return nextState;
    });
  };

  const takeSnapshot = () => {
    if (!videoRef.current || !isCameraEnabled) return;
    
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    
    const newSnap = {
      id: Date.now().toString(),
      image: dataUrl,
      mood: activeMood,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      rotation: Math.floor(Math.random() * 10) - 5
    };
    
    setSnapshots((prev) => [newSnap, ...prev]);
  };

  const deleteSnapshot = (id) => {
    setSnapshots((prev) => prev.filter(s => s.id !== id));
  };

  // Auto-skip broken YouTube videos
  const handleTrackError = useCallback(() => {
    console.warn('Video failed to load or embedding disabled. Skipping to next...');
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  }, [tracks.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener('loadeddata', handleVideoReady);
    return () => video.removeEventListener('loadeddata', handleVideoReady);
  }, [handleVideoReady, videoRef]);

  useEffect(() => {
    if (tracks.length > 0) setCurrentTrackIndex(0);
  }, [activeMood, tracks]);

  const handleTrackClick = useCallback((index) => {
    setCurrentTrackIndex(index);
  }, []);

  return (
    <div
      className="dashboard"
      style={{
        '--mood-color': config.color,
        '--mood-glow': config.glow,
        '--mood-gradient': config.gradient,
        overflowY: 'auto',
        height: '100vh',
      }}
    >
      <ParticlesBackground moodColor={config.color} particleType={config.particleType} />

      <header className="dashboard-header" style={{ position: 'relative', zIndex: 10 }}>
        <div className="dashboard-header-left">
          <span className="dashboard-logo" style={{ filter: `drop-shadow(0 0 10px ${config.color})` }}>🎵</span>
          <h1 className="dashboard-title">MoodTunes</h1>
        </div>

        <div className="dashboard-header-center">
          <div className="dashboard-mood-badge" style={{ background: config.gradient, boxShadow: `0 0 20px ${config.glow}` }}>
            <span>{config.emoji}</span>
            <span>{config.label}</span>
          </div>
        </div>
        
        <div className="dashboard-header-right" style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={takeSnapshot} 
            disabled={!isCameraEnabled}
            className="dashboard-logout-btn"
            style={{ 
              backgroundColor: isCameraEnabled ? config.color : 'rgba(255,255,255,0.1)',
              color: isCameraEnabled ? '#000' : '#888',
              fontWeight: 'bold',
              boxShadow: isCameraEnabled ? `0 0 15px ${config.glow}` : 'none'
            }}
          >
            📸 Snap
          </button>
          
          <button 
            onClick={toggleCamera} 
            className="dashboard-logout-btn"
            style={{ 
              backgroundColor: isCameraEnabled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(239, 68, 68, 0.2)',
              color: isCameraEnabled ? 'var(--text-primary)' : '#fca5a5'
            }}
          >
            {isCameraEnabled ? '🚫 Camera Off' : '📷 Camera On'}
          </button>
        </div>
      </header>

      <main className="dashboard-main" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', width: '100%' }} className="dashboard-grid-responsive">
          <div className="dashboard-left" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} glareEnable glareMaxOpacity={0.1} scale={1.02} transitionSpeed={2000}>
              <WebcamFeed
                videoRef={videoRef}
                landmarks={landmarks}
                moodColor={config.color}
                moodGlow={config.glow}
                isCameraEnabled={isCameraEnabled}
              />
            </Tilt>

            {modelError ? (
              <div className="dashboard-error-card">
                <p>⚠️ {modelError}</p>
              </div>
            ) : (
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable glareMaxOpacity={0.1}>
                <EmotionDisplay
                  emotion={emotion.emotion}
                  confidence={emotion.confidence}
                  scores={emotion.scores}
                  isLoading={isModelLoading}
                />
              </Tilt>
            )}
          </div>

          <div className="dashboard-right" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} glareEnable glareMaxOpacity={0.1}>
              <MusicPlayer
                currentTrack={currentTrack}
                moodColor={config.color}
                moodGradient={config.gradient}
                onTrackError={handleTrackError}
                onTrackEnd={handleTrackError} 
              />
            </Tilt>

            <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} glareEnable glareMaxOpacity={0.05}>
              <PlaylistPanel
                tracks={tracks}
                activeMood={activeMood}
                isLoading={isPlaylistLoading}
                currentTrackId={currentTrack?.id}
                onTrackClick={handleTrackClick}
                onRefresh={refreshPlaylist}
                moodColor={config.color}
              />
            </Tilt>
          </div>
        </div>

        <MoodGallery snapshots={snapshots} onDeleteSnapshot={deleteSnapshot} />

      </main>
    </div>
  );
}

export default Dashboard;
