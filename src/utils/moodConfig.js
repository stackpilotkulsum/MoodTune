/**
 * Mood Configuration — Maps emotion labels to YouTube tracks and UI theming.
 */

const moodConfig = {
  happy: {
    label: 'Happy',
    emoji: '😊',
    description: 'Feeling joyful and energetic!',
    color: '#fbbf24',       
    colorAlt: '#f59e0b',
    gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
    glow: 'rgba(251, 191, 36, 0.5)',
    particleType: 'sunbeams',
    tracks: [
      { id: 'ZbZSe6N_BXs', title: 'Happy', artist: 'Pharrell Williams' },
      { id: 'ru0K8uYEZWw', title: "CAN'T STOP THE FEELING!", artist: 'Justin Timberlake' },
      { id: 'nfWlot6h_JM', title: 'Shake It Off', artist: 'Taylor Swift' },
      { id: 'OPf0YbXqDm0', title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars' },
      { id: 'iPUmE-tne5U', title: 'Walking On Sunshine', artist: 'Katrina & The Waves' },
      { id: 'L8eRzOYhLuw', title: 'Levitating', artist: 'Dua Lipa' },
      { id: '2Vv-BfVoq4g', title: 'Perfect', artist: 'Ed Sheeran' },
      { id: '09R8_2nJtjg', title: 'Sugar', artist: 'Maroon 5' },
      { id: 'PT2_F-1esPk', title: 'Closer', artist: 'The Chainsmokers' },
      { id: 'vwZJ-N_n-04', title: 'Watermelon Sugar', artist: 'Harry Styles' }
    ]
  },

  sad: {
    label: 'Sad',
    emoji: '😢',
    description: 'Feeling melancholic...',
    color: '#60a5fa',       
    colorAlt: '#3b82f6',
    gradient: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)',
    glow: 'rgba(96, 165, 250, 0.5)',
    particleType: 'rain',
    tracks: [
      { id: 'hLQl3WQQoQ0', title: 'Someone Like You', artist: 'Adele' },
      { id: '4N3N1MlvVc4', title: 'Mad World', artist: 'Gary Jules' },
      { id: '0put0_a--Ng', title: 'Fix You', artist: 'Coldplay' },
      { id: 'Jq1t1XqAWeo', title: 'Let Her Go', artist: 'Passenger' },
      { id: 'rbRGUXE-AZE', title: 'Say Something', artist: 'A Great Big World' },
      { id: '7qH4qyi1-Ys', title: 'Stay With Me', artist: 'Sam Smith' },
      { id: 'vGZQjcX903U', title: 'All of Me', artist: 'John Legend' },
      { id: 'qN4ooNx77u0', title: 'idontwannabeyouanymore', artist: 'Billie Eilish' },
      { id: 'kJQP7kiw5Fk', title: 'Despacito', artist: 'Luis Fonsi' }, // People actually cry to this
      { id: 'lp-EO5I60KA', title: 'Thinking Out Loud', artist: 'Ed Sheeran' }
    ]
  },

  angry: {
    label: 'Angry',
    emoji: '😠',
    description: 'Feeling intense and fired up!',
    color: '#f87171',       
    colorAlt: '#ef4444',
    gradient: 'linear-gradient(135deg, #f87171 0%, #ef4444 50%, #dc2626 100%)',
    glow: 'rgba(248, 113, 113, 0.5)',
    particleType: 'fire',
    tracks: [
      { id: 'kXYiU_JCYtU', title: 'Numb', artist: 'Linkin Park' },
      { id: '1w7OgIMMRc4', title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses' },
      { id: 'v2AC41dglnM', title: 'Thunderstruck', artist: 'AC/DC' },
      { id: 'CSvFpBOe8eY', title: 'Chop Suey!', artist: 'System Of A Down' },
      { id: 'pAgnJENN494', title: 'Break Stuff', artist: 'Limp Bizkit' },
      { id: '1cQh1ccqu8M', title: 'Killing In The Name', artist: 'Rage Against The Machine' },
      { id: '8mGBaXPlri8', title: 'Smells Like Teen Spirit', artist: 'Nirvana' },
      { id: 'CD-E-LDc384', title: 'Enter Sandman', artist: 'Metallica' },
      { id: 'Soa3gO7tL-c', title: 'Boulevard of Broken Dreams', artist: 'Green Day' },
      { id: 'K0K170D4g68', title: 'Given Up', artist: 'Linkin Park' }
    ]
  },

  surprised: {
    label: 'Surprised',
    emoji: '😮',
    description: 'Wow, something unexpected!',
    color: '#c084fc',       
    colorAlt: '#a855f7',
    gradient: 'linear-gradient(135deg, #c084fc 0%, #a855f7 50%, #9333ea 100%)',
    glow: 'rgba(192, 132, 252, 0.5)',
    particleType: 'stars',
    tracks: [
      { id: 'YJVmu6yttsq', title: 'Bangarang', artist: 'Skrillex' },
      { id: 'n6P0SitRwy8', title: 'Sandstorm', artist: 'Darude' },
      { id: 'WSeNSzJ2-Jw', title: 'Scary Monsters and Nice Sprites', artist: 'Skrillex' },
      { id: '2cXDgFwE13g', title: 'Animals', artist: 'Martin Garrix' },
      { id: 'SYM-RJwSGQ8', title: 'Tsunami', artist: 'DVBBS & Borgeous' },
      { id: 'ALZHF5UqnU4', title: 'Titanium', artist: 'David Guetta' },
      { id: 'YykjpeuMNEk', title: 'Wake Me Up', artist: 'Avicii' },
      { id: 'QK8mJJJvaes', title: 'Thrift Shop', artist: 'Macklemore' },
      { id: 'hT_nvWreIhg', title: 'Counting Stars', artist: 'OneRepublic' },
      { id: '1y6smkh6c-0', title: 'Don\'t You Worry Child', artist: 'Swedish House Mafia' }
    ]
  },

  calm: {
    label: 'Calm',
    emoji: '😌',
    description: 'Peaceful and relaxed.',
    color: '#34d399',       
    colorAlt: '#10b981',
    gradient: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
    glow: 'rgba(52, 211, 153, 0.5)',
    particleType: 'bubbles',
    tracks: [
      { id: '1fueZCTYkpA', title: 'Chillhop Year in Review', artist: 'Chillhop' },
      { id: '8nXqcugV2Y4', title: 'Chill Vibes', artist: 'Ambient' },
      { id: 'lTRiuFIWV54', title: 'Relaxing Music', artist: 'Yellow Brick Cinema' },
      { id: 'n61ULEU7CO0', title: 'Lofi hip hop mix', artist: 'Lofi Girl' },
      { id: 'V1bFr2SWP1I', title: 'Weightless', artist: 'Marconi Union' },
      { id: 'vPhg6sc1Mk4', title: 'Sunset Lofi', artist: 'Lofi Records' },
      { id: 'Wv2x270228c', title: 'Study Beats', artist: 'Chill AF' },
      { id: 'a_Am4cHMBOM', title: 'Late Night Lofi', artist: 'Dreamy' },
      { id: '1ZYbU82GVz4', title: 'Bossa Nova Jazz', artist: 'Cafe Music' },
      { id: '7NOSDKb0HlU', title: 'Rain Sounds', artist: 'Nature' }
    ]
  },
};

export function getMoodConfig(mood) {
  return moodConfig[mood] || moodConfig.calm;
}

export function getAllMoods() {
  return Object.keys(moodConfig);
}

export default moodConfig;
