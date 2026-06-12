import { useState } from 'react';
import { getMoodConfig } from '../utils/moodConfig';

function MoodGallery({ snapshots, onDeleteSnapshot }) {
  if (!snapshots || snapshots.length === 0) return null;

  return (
    <div className="mood-gallery" style={{ marginTop: '24px' }}>
      <h3 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        📸 Mood History
      </h3>
      <div className="gallery-scroll" style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px' }}>
        {snapshots.map((snap) => {
          const config = getMoodConfig(snap.mood);
          return (
            <div 
              key={snap.id} 
              className="polaroid-card"
              style={{
                backgroundColor: 'white',
                padding: '10px 10px 30px 10px',
                borderRadius: '4px',
                boxShadow: `0 10px 20px rgba(0,0,0,0.3), 0 0 15px ${config.glow}`,
                flex: '0 0 auto',
                width: '180px',
                transform: `rotate(${snap.rotation}deg)`,
                position: 'relative',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
            >
              <button 
                onClick={() => onDeleteSnapshot(snap.id)}
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  zIndex: 10
                }}
              >
                ×
              </button>
              
              <div style={{
                width: '100%',
                height: '120px',
                backgroundColor: '#000',
                backgroundImage: `url(${snap.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '2px',
                border: '1px solid #ddd'
              }} />
              
              <div style={{
                color: '#333',
                fontFamily: '"Caveat", cursive, sans-serif',
                fontSize: '20px',
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: '12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span>{config.emoji}</span>
                <span>{config.label}</span>
              </div>
              
              <div style={{
                color: '#888',
                fontSize: '10px',
                textAlign: 'center',
                marginTop: '4px'
              }}>
                {snap.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MoodGallery;
