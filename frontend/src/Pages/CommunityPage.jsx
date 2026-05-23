import { useState } from 'react';
import { communityPosts } from '../data/mockData';

const CATS = ['All', 'Inspiration', 'Support', 'Wellness', 'Discussion'];

export default function CommunityPage() {
    const [posts, setPosts] = useState(communityPosts);
    const [activeCategory, setActiveCategory] = useState('All');
    const [composing, setComposing] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '', anonymous: false, category: 'Wellness' });
    const [liked, setLiked] = useState({});
    const [expandedComments, setExpandedComments] = useState({});

    const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);

    const toggleLike = (id) => {
        setLiked(prev => ({ ...prev, [id]: !prev[id] }));
        setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: liked[id] ? p.likes - 1 : p.likes + 1 } : p));
    };

    const submitPost = () => {
        if (!newPost.title.trim() || !newPost.content.trim()) return;
        const post = {
            id: Date.now(),
            author: newPost.anonymous ? 'Anonymous' : 'You',
            anonymous: newPost.anonymous,
            initials: newPost.anonymous ? '?' : 'YO',
            color: '#26b8a0',
            category: newPost.category,
            title: newPost.title,
            content: newPost.content,
            likes: 0, comments: 0,
            time: 'Just now',
            tags: [],
        };
        setPosts(prev => [post, ...prev]);
        setNewPost({ title: '', content: '', anonymous: false, category: 'Wellness' });
        setComposing(false);
    };

    return (
        <div style={{ paddingTop: 70, fontFamily: "'Poppins', sans-serif" }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(145deg,#0b1f3a,#1e3f6e)', padding: '60px 0 40px' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <span className="label-chip" style={{ background: 'rgba(38,184,160,0.2)', color: '#9de4d8' }}>Community</span>
                    <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: 'white', marginBottom: 12, fontFamily: "'Poppins', sans-serif" }}>
                        You Are Heard Here
                    </h1>
                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', maxWidth: 480, margin: '0 auto 28px', fontFamily: "'Poppins', sans-serif" }}>
                        A safe, supportive space to share, listen, and grow — together.
                    </p>
                    <button className="btn btn-primary" onClick={() => setComposing(true)} style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Share Your Story
                    </button>
                </div>
            </div>

            <div className="container" style={{ padding: '40px 24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32 }} className="comm-grid">

                    {/* Main feed */}
                    <div>
                        {/* Category filter */}
                        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
                            {CATS.map(cat => (
                                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                                    padding: '8px 20px', borderRadius: 50, border: '1.5px solid',
                                    borderColor: activeCategory === cat ? '#26b8a0' : '#cce8e3',
                                    background: activeCategory === cat ? '#e6f8f5' : 'white',
                                    color: activeCategory === cat ? '#26b8a0' : '#2c4a5e',
                                    fontWeight: activeCategory === cat ? 700 : 400,
                                    fontSize: 13, cursor: 'pointer', transition: 'all 0.18s',
                                    fontFamily: "'Poppins', sans-serif",
                                }}>{cat}</button>
                            ))}
                        </div>

                        {/* Compose box */}
                        {composing && (
                            <div className="card" style={{ padding: 28, marginBottom: 24 }}>
                                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0b1f3a', marginBottom: 18, fontFamily: "'Poppins', sans-serif" }}>
                                    Share with the Community
                                </h3>
                                <input
                                    value={newPost.title}
                                    onChange={e => setNewPost(p => ({ ...p, title: e.target.value }))}
                                    placeholder="Give your post a title..."
                                    className="form-input"
                                    style={{ marginBottom: 12, fontFamily: "'Poppins', sans-serif" }}
                                />
                                <textarea
                                    value={newPost.content}
                                    onChange={e => setNewPost(p => ({ ...p, content: e.target.value }))}
                                    placeholder="Share your thoughts, experience, or question..."
                                    rows={4}
                                    style={{
                                        width: '100%', padding: '13px 18px',
                                        border: '1.5px solid #cce8e3', borderRadius: 12,
                                        fontSize: 14, color: '#0b1f3a', resize: 'vertical',
                                        marginBottom: 12, fontFamily: "'Poppins', sans-serif",
                                    }}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', fontSize: 13, color: '#2c4a5e', fontFamily: "'Poppins', sans-serif" }}>
                                            <input type="checkbox" checked={newPost.anonymous} onChange={e => setNewPost(p => ({ ...p, anonymous: e.target.checked }))} />
                                            Post anonymously
                                        </label>
                                        <select value={newPost.category} onChange={e => setNewPost(p => ({ ...p, category: e.target.value }))} style={{
                                            padding: '7px 14px', borderRadius: 50, border: '1.5px solid #cce8e3',
                                            fontSize: 13, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif",
                                        }}>
                                            {CATS.filter(c => c !== 'All').map(c => <option key={c} style={{ fontFamily: "'Poppins', sans-serif" }}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <button className="btn btn-outline btn-sm" onClick={() => setComposing(false)} style={{ fontFamily: "'Poppins', sans-serif" }}>Cancel</button>
                                        <button className="btn btn-primary btn-sm" onClick={submitPost} style={{ fontFamily: "'Poppins', sans-serif" }}>Post</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Posts */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {filtered.map((post, i) => (
                                <div key={post.id} className="card" style={{ padding: 28, animation: `fadeUp 0.4s ${i * 0.08}s ease both` }}>
                                    {/* Post header */}
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
                                        <div style={{
                                            width: 42, height: 42, borderRadius: '50%', background: post.anonymous ? '#e8f5f2' : `linear-gradient(135deg,${post.color},${post.color}99)`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: post.anonymous ? '#26b8a0' : 'white', fontWeight: 700, fontSize: 15, flexShrink: 0,
                                            fontFamily: "'Poppins', sans-serif",
                                        }}>{post.initials}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                                <span style={{ fontWeight: 700, fontSize: 14, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{post.author}</span>
                                                {post.anonymous && <span style={{ background: '#e8f5f2', color: '#26b8a0', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 50, fontFamily: "'Poppins', sans-serif" }}>Anonymous</span>}
                                                <span style={{ background: '#e8eeff', color: '#3040b0', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 50, fontFamily: "'Poppins', sans-serif" }}>{post.category}</span>
                                            </div>
                                            <p style={{ fontSize: 12, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>{post.time}</p>
                                        </div>
                                    </div>

                                    <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0b1f3a', marginBottom: 10, fontFamily: "'Poppins', sans-serif" }}>{post.title}</h3>
                                    <p style={{ fontSize: 14, color: '#2c4a5e', lineHeight: 1.75, marginBottom: 16, fontFamily: "'Poppins', sans-serif" }}>{post.content}</p>

                                    {post.tags.length > 0 && (
                                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                                            {post.tags.map(tag => (
                                                <span key={tag} style={{ background: '#f0f7f6', color: '#2c4a5e', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 50, fontFamily: "'Poppins', sans-serif" }}>#{tag}</span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div style={{ display: 'flex', gap: 16, paddingTop: 14, borderTop: '1px solid #f0f7f6' }}>
                                        <button onClick={() => toggleLike(post.id)} style={{
                                            display: 'flex', alignItems: 'center', gap: 5,
                                            background: 'none', border: 'none', cursor: 'pointer',
                                            fontSize: 13, color: liked[post.id] ? '#26b8a0' : '#7a96b4',
                                            fontWeight: liked[post.id] ? 700 : 400,
                                            transition: 'all 0.18s', fontFamily: "'Poppins', sans-serif",
                                        }}>
                                            {liked[post.id] ? '💚' : '🤍'} {post.likes} Supports
                                        </button>
                                        <button
                                            onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                                            style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}
                                        >
                                            💬 {post.comments} Replies
                                        </button>
                                        <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>
                                            🔗 Share
                                        </button>
                                    </div>

                                    {expandedComments[post.id] && (
                                        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f0f7f6' }}>
                                            <input placeholder="Write a supportive reply..." className="form-input" style={{ fontFamily: "'Poppins', sans-serif" }} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div>
                        {/* Community stats */}
                        <div className="card" style={{ padding: 24, marginBottom: 20 }}>
                            <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0b1f3a', marginBottom: 16, fontFamily: "'Poppins', sans-serif" }}>Community</h4>
                            {[
                                { label: 'Members', val: '12,480' },
                                { label: 'Posts this week', val: '348' },
                                { label: 'Professionals', val: '600+' },
                                { label: 'Countries', val: '54' },
                            ].map(item => (
                                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #f0f7f6' }}>
                                    <span style={{ fontSize: 13, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>{item.label}</span>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{item.val}</span>
                                </div>
                            ))}
                        </div>

                        {/* Guidelines */}
                        <div style={{ background: '#e6f8f5', borderRadius: 16, padding: 20 }}>
                            <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0b1f3a', marginBottom: 12, fontFamily: "'Poppins', sans-serif" }}>Community Guidelines</h4>
                            {[
                                'Be kind and compassionate',
                                'Respect everyone\'s journey',
                                'No medical advice giving',
                                'Support, don\'t diagnose',
                                'Anonymous posts are welcome',
                            ].map((g, i) => (
                                <p key={i} style={{ fontSize: 13, color: '#2c4a5e', marginBottom: 6, display: 'flex', gap: 6, fontFamily: "'Poppins', sans-serif" }}>
                                    <span style={{ color: '#26b8a0', flexShrink: 0 }}>✓</span> {g}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`@media (max-width: 900px) { .comm-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
    );
}
