import { useState, useEffect, useRef } from 'react';
import { musicTracks } from '../data/mockData';

export default function MusicPage() {
    const [playing, setPlaying] = useState(null);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(80);
    const [filter, setFilter] = useState('All');
    const [liked, setLiked] = useState({});
    const intervalRef = useRef(null);

    const genres = ['All', ...Array.from(new Set(musicTracks.map(t => t.genre)))];

    const filtered = filter === 'All' ? musicTracks : musicTracks.filter(t => t.genre === filter);

    const playTrack = (track) => {
        if (currentTrack?.id === track.id) {
            if (playing) { clearInterval(intervalRef.current); setPlaying(false); }
            else { startProgress(); setPlaying(true); }
            return;
        }
        setCurrentTrack(track);
        setProgress(0);
        setPlaying(true);
        startProgress();
    };

    const startProgress = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setProgress(p => { if (p >= 100) { clearInterval(intervalRef.current); setPlaying(false); return 0; } return p + 0.3; });
        }, 300);
    };

    useEffect(() => () => clearInterval(intervalRef.current), []);

    const toggleLike = (id, e) => { e.stopPropagation(); setLiked(prev => ({ ...prev, [id]: !prev[id] })); };

    const formatTime = (pct, dur) => {
        const [m, s] = dur.split(':').map(Number);
        const total = m * 60 + s;
        const elapsed = Math.floor((pct / 100) * total);
        return `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')}`;
    };

    return (
        <div style={{ paddingTop: 70, fontFamily: "'Poppins', sans-serif", minHeight: '100vh', background: '#f5fbfa' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(145deg,#0b1f3a,#1e3f6e)', padding: '60px 0 40px' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <span className="label-chip" style={{ background: 'rgba(38,184,160,0.2)', color: '#9de4d8' }}>Sound Therapy</span>
                    <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: 'white', marginBottom: 12, fontFamily: "'Poppins', sans-serif" }}>
                        Healing Through Music
                    </h1>
                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', maxWidth: 500, margin: '0 auto', fontFamily: "'Poppins', sans-serif" }}>
                        Music activates the same brain regions as physical touch. Let these therapeutic soundscapes ease your mind and restore your calm.
                    </p>
                </div>
            </div>

            <div className="container" style={{ padding: '40px 24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }} className="music-grid">

                    {/* Track list */}
                    <div>
                        {/* Filters */}
                        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
                            {genres.map(g => (
                                <button key={g} onClick={() => setFilter(g)} style={{
                                    padding: '8px 18px', borderRadius: 50, border: '1.5px solid',
                                    borderColor: filter === g ? '#26b8a0' : '#cce8e3',
                                    background: filter === g ? '#e6f8f5' : 'white',
                                    color: filter === g ? '#26b8a0' : '#2c4a5e',
                                    fontWeight: filter === g ? 700 : 400,
                                    fontSize: 13, cursor: 'pointer', transition: 'all 0.18s',
                                    fontFamily: "'Poppins', sans-serif",
                                }}>{g}</button>
                            ))}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {filtered.map((track, i) => {
                                const isActive = currentTrack?.id === track.id;
                                const isPlaying = isActive && playing;
                                return (
                                    <div
                                        key={track.id}
                                        onClick={() => playTrack(track)}
                                        className="card"
                                        style={{
                                            padding: '18px 22px',
                                            cursor: 'pointer',
                                            background: isActive ? '#f0faf8' : 'white',
                                            border: `1.5px solid ${isActive ? '#26b8a0' : '#cce8e3'}`,
                                            animation: `fadeUp 0.4s ${i * 0.06}s ease both`,
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                            {/* Play button */}
                                            <div style={{
                                                width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                                                background: isActive ? '#26b8a0' : track.color,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: isActive ? 18 : 24,
                                                transition: 'all 0.2s',
                                            }}>
                                                {isPlaying ? (
                                                    <span style={{ color: 'white', fontSize: 14, fontWeight: 700, letterSpacing: 1, fontFamily: "'Poppins', sans-serif" }}>❚❚</span>
                                                ) : isActive ? (
                                                    <span style={{ color: 'white', fontSize: 16, fontFamily: "'Poppins', sans-serif" }}>▶</span>
                                                ) : (
                                                    <span>{track.emoji}</span>
                                                )}
                                            </div>

                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                                                    <p style={{ fontSize: 15, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{track.title}</p>
                                                    <span style={{ fontSize: 12, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>{track.duration}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                    <p style={{ fontSize: 12, color: '#26b8a0', fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>{track.artist}</p>
                                                    <span style={{ background: '#e6f8f5', color: '#0a7060', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 50, fontFamily: "'Poppins', sans-serif" }}>{track.mood}</span>
                                                </div>
                                                {isActive && (
                                                    <div style={{ height: 3, background: '#cce8e3', borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
                                                        <div style={{ height: '100%', width: `${progress}%`, background: '#26b8a0', borderRadius: 2, transition: 'width 0.3s linear' }} />
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                onClick={e => toggleLike(track.id, e)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, flexShrink: 0 }}
                                            >{liked[track.id] ? '💚' : '🤍'}</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sticky player + info */}
                    <div style={{ position: 'sticky', top: 90 }}>
                        {/* Player */}
                        <div style={{
                            background: currentTrack
                                ? `linear-gradient(145deg,#0b1f3a,#1e3f6e)`
                                : 'white',
                            borderRadius: 24, padding: 28, marginBottom: 20,
                            boxShadow: '0 8px 32px rgba(11,31,58,0.12)',
                        }}>
                            {currentTrack ? (
                                <>
                                    <div style={{ textAlign: 'center', marginBottom: 24 }}>
                                        <div style={{
                                            width: 100, height: 100, borderRadius: '50%', margin: '0 auto 16px',
                                            background: currentTrack.color,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 44,
                                            boxShadow: '0 8px 28px rgba(38,184,160,0.3)',
                                            animation: playing ? 'spin 8s linear infinite' : 'none',
                                        }}>{currentTrack.emoji}</div>
                                        <p style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: 4, fontFamily: "'Poppins', sans-serif" }}>{currentTrack.title}</p>
                                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontFamily: "'Poppins', sans-serif" }}>{currentTrack.artist}</p>
                                    </div>

                                    {/* Progress */}
                                    <div style={{ marginBottom: 18 }}>
                                        <div
                                            style={{ height: 5, background: 'rgba(255,255,255,0.15)', borderRadius: 3, cursor: 'pointer', marginBottom: 8 }}
                                            onClick={e => { const rect = e.currentTarget.getBoundingClientRect(); setProgress(((e.clientX - rect.left) / rect.width) * 100); }}
                                        >
                                            <div style={{ height: '100%', width: `${progress}%`, background: '#26b8a0', borderRadius: 3, transition: 'width 0.3s linear' }} />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: "'Poppins', sans-serif" }}>{formatTime(progress, currentTrack.duration)}</span>
                                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: "'Poppins', sans-serif" }}>{currentTrack.duration}</span>
                                        </div>
                                    </div>

                                    {/* Controls */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 20 }}>
                                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'rgba(255,255,255,0.6)' }}>⏮</button>
                                        <button
                                            onClick={() => { if (playing) { clearInterval(intervalRef.current); setPlaying(false); } else { startProgress(); setPlaying(true); } }}
                                            style={{
                                                width: 52, height: 52, borderRadius: '50%',
                                                background: '#26b8a0', border: 'none', cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: 18, boxShadow: '0 4px 16px rgba(38,184,160,0.4)', color: 'white',
                                                fontFamily: "'Poppins', sans-serif",
                                            }}
                                        >{playing ? '❚❚' : '▶'}</button>
                                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'rgba(255,255,255,0.6)' }}>⏭</button>
                                    </div>

                                    {/* Volume */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>🔈</span>
                                        <input
                                            type="range" min="0" max="100" value={volume}
                                            onChange={e => setVolume(e.target.value)}
                                            style={{ flex: 1, accentColor: '#26b8a0' }}
                                        />
                                        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>🔊</span>
                                    </div>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '28px 0' }}>
                                    <div style={{ fontSize: 48, marginBottom: 12 }}>🎵</div>
                                    <p style={{ fontSize: 15, fontWeight: 600, color: '#0b1f3a', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>Select a track to begin</p>
                                    <p style={{ fontSize: 13, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>Music is medicine for the mind.</p>
                                </div>
                            )}
                        </div>

                        {/* Benefits card */}
                        <div style={{ background: '#e6f8f5', borderRadius: 20, padding: 24 }}>
                            <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0b1f3a', marginBottom: 14, fontFamily: "'Poppins', sans-serif" }}>Why Sound Therapy?</h4>
                            {[
                                'Reduces cortisol and stress hormones',
                                'Activates the brain\'s reward system',
                                'Improves sleep quality',
                                'Enhances focus and concentration',
                                'Eases anxiety and low mood',
                            ].map((b, i) => (
                                <p key={i} style={{ fontSize: 13, color: '#2c4a5e', marginBottom: 7, display: 'flex', gap: 7, fontFamily: "'Poppins', sans-serif" }}>
                                    <span style={{ color: '#26b8a0', flexShrink: 0 }}>✓</span> {b}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) { .music-grid { grid-template-columns: 1fr !important; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
}
