import { useState, useRef, useEffect } from 'react';
import { doctors } from '../data/mockData';

const INITIAL = {
    1: [
        { from: 'doctor', text: "Good afternoon! How have you been feeling since our last session?", time: "2:05 PM" },
        { from: 'user', text: "A little better, thank you. I practiced the breathing exercise you suggested.", time: "2:07 PM" },
        { from: 'doctor', text: "That's wonderful to hear! Consistency is key. How many times did you practice it this week?", time: "2:08 PM" },
    ],
    2: [
        { from: 'doctor', text: "Hello! Please feel free to share what's been on your mind.", time: "10:00 AM" },
    ],
};

export default function ChatPage() {
    const [activeChat, setActiveChat] = useState(1);
    const [messages, setMessages] = useState(INITIAL);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const bottomRef = useRef(null);

    const conversations = doctors.slice(0, 4).map(d => ({
        id: d.id,
        name: d.name,
        specialty: d.specialty,
        initials: d.initials,
        color: d.color,
        status: d.status,
        lastMsg: (messages[d.id] || [])[((messages[d.id] || []).length - 1)]?.text?.slice(0, 40) + '...' || 'Start a conversation',
    }));

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, activeChat]);

    const send = () => {
        if (!input.trim()) return;
        const msg = { from: 'user', text: input.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages(prev => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), msg] }));
        setInput('');
        setTyping(true);
        setTimeout(() => {
            setTyping(false);
            const replies = [
                "Thank you for sharing that. Let's explore this further together.",
                "I understand. That sounds like a challenging situation.",
                "You're making great progress. How does that make you feel?",
                "Let's take a moment to breathe through this.",
            ];
            const reply = { from: 'doctor', text: replies[Math.floor(Math.random() * replies.length)], time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
            setMessages(prev => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), reply] }));
        }, 1200);
    };

    const active = conversations.find(c => c.id === activeChat);
    const currentMessages = messages[activeChat] || [];

    return (
        <div style={{ paddingTop: 70, height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Poppins', sans-serif" }}>
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

                {/* Sidebar */}
                <div style={{
                    width: 300, borderRight: '1px solid #cce8e3',
                    background: 'white', display: 'flex', flexDirection: 'column', flexShrink: 0,
                }}>
                    <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid #e8f5f2' }}>
                        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0b1f3a', marginBottom: 12, fontFamily: "'Poppins', sans-serif" }}>Messages</h2>
                        <input
                            placeholder="Search conversations..."
                            style={{
                                width: '100%', padding: '9px 14px',
                                border: '1.5px solid #cce8e3', borderRadius: 50,
                                fontSize: 13, color: '#0b1f3a',
                                background: '#f5fbfa',
                                fontFamily: "'Poppins', sans-serif",
                            }}
                        />
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {conversations.map(c => (
                            <div
                                key={c.id}
                                onClick={() => setActiveChat(c.id)}
                                style={{
                                    padding: '14px 16px', cursor: 'pointer',
                                    background: activeChat === c.id ? '#f0faf8' : 'white',
                                    borderLeft: `3px solid ${activeChat === c.id ? '#26b8a0' : 'transparent'}`,
                                    transition: 'all 0.18s', display: 'flex', gap: 12, alignItems: 'flex-start',
                                }}
                                onMouseEnter={e => { if (activeChat !== c.id) e.currentTarget.style.background = '#f7fbfa'; }}
                                onMouseLeave={e => { if (activeChat !== c.id) e.currentTarget.style.background = 'white'; }}
                            >
                                <div style={{ position: 'relative', flexShrink: 0 }}>
                                    <div style={{
                                        width: 44, height: 44, borderRadius: '50%',
                                        background: `linear-gradient(135deg,${c.color},${c.color}99)`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'white', fontWeight: 700, fontSize: 15,
                                        fontFamily: "'Poppins', sans-serif",
                                    }}>{c.initials}</div>
                                    {c.status === 'available' && (
                                        <span style={{ position: 'absolute', bottom: 0, right: 0, width: 11, height: 11, borderRadius: '50%', background: '#26b8a0', border: '2px solid white' }} />
                                    )}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</p>
                                    <p style={{ fontSize: 12, color: '#7a96b4', fontFamily: "'Poppins', sans-serif", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.lastMsg}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f7fbfa', overflow: 'hidden' }}>
                    {/* Chat header */}
                    {active && (
                        <div style={{
                            padding: '14px 24px', background: 'white',
                            borderBottom: '1px solid #cce8e3',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    width: 42, height: 42, borderRadius: '50%',
                                    background: `linear-gradient(135deg,${active.color},${active.color}99)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'white', fontWeight: 700, fontSize: 16, fontFamily: "'Poppins', sans-serif",
                                }}>{active.initials}</div>
                                <div>
                                    <p style={{ fontWeight: 700, color: '#0b1f3a', fontSize: 15, fontFamily: "'Poppins', sans-serif" }}>{active.name}</p>
                                    <p style={{ fontSize: 12, color: '#26b8a0', display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'Poppins', sans-serif" }}>
                                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#26b8a0', display: 'inline-block' }} />
                                        {active.status === 'available' ? 'Online now' : active.status}
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {['📞', '📹', 'ℹ️'].map((icon, i) => (
                                    <button key={i} style={{
                                        width: 38, height: 38, borderRadius: '50%',
                                        background: '#f0f7f6', border: '1px solid #cce8e3',
                                        fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transition: 'all 0.2s',
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.background = '#e6f8f5'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = '#f0f7f6'; }}
                                    >{icon}</button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Messages */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {currentMessages.map((msg, i) => (
                            <div key={i} style={{
                                display: 'flex',
                                justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                                animation: 'fadeUp 0.3s ease both',
                            }}>
                                {msg.from === 'doctor' && (
                                    <div style={{
                                        width: 32, height: 32, borderRadius: '50%', marginRight: 8,
                                        background: active ? `linear-gradient(135deg,${active.color},${active.color}99)` : '#26b8a0',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'white', fontWeight: 700, fontSize: 11, flexShrink: 0, alignSelf: 'flex-end',
                                        fontFamily: "'Poppins', sans-serif",
                                    }}>{active?.initials}</div>
                                )}
                                <div style={{ maxWidth: '60%' }}>
                                    <div style={{
                                        padding: '12px 16px',
                                        borderRadius: msg.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                        background: msg.from === 'user' ? 'linear-gradient(135deg,#26b8a0,#0b1f3a)' : 'white',
                                        color: msg.from === 'user' ? 'white' : '#0b1f3a',
                                        fontSize: 14, lineHeight: 1.55,
                                        boxShadow: '0 2px 10px rgba(11,31,58,0.07)',
                                        fontFamily: "'Poppins', sans-serif",
                                    }}>{msg.text}</div>
                                    <p style={{ fontSize: 11, color: '#aac2d0', marginTop: 4, textAlign: msg.from === 'user' ? 'right' : 'left', fontFamily: "'Poppins', sans-serif" }}>{msg.time}</p>
                                </div>
                            </div>
                        ))}
                        {typing && (
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: active ? `linear-gradient(135deg,${active.color},${active.color}99)` : '#26b8a0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>{active?.initials}</div>
                                <div style={{ background: 'white', borderRadius: '18px 18px 18px 4px', padding: '12px 16px', boxShadow: '0 2px 10px rgba(11,31,58,0.07)' }}>
                                    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                                        {[0, 1, 2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#26b8a0', display: 'inline-block', animation: `pulse 1.2s ${i * 0.2}s ease-in-out infinite` }} />)}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input area */}
                    <div style={{
                        padding: '16px 24px', background: 'white',
                        borderTop: '1px solid #cce8e3',
                        display: 'flex', gap: 10, alignItems: 'flex-end',
                    }}>
                        <button style={{ width: 36, height: 36, borderRadius: '50%', background: '#f0f7f6', border: '1px solid #cce8e3', fontSize: 16, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📎</button>
                        <div style={{ flex: 1, background: '#f5fbfa', border: '1.5px solid #cce8e3', borderRadius: 20, padding: '10px 18px', transition: 'border-color 0.2s' }}
                            onFocusCapture={e => e.currentTarget.style.borderColor = '#26b8a0'}
                            onBlurCapture={e => e.currentTarget.style.borderColor = '#cce8e3'}
                        >
                            <textarea
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                                placeholder="Type a message..."
                                rows={1}
                                style={{
                                    width: '100%', border: 'none', background: 'transparent',
                                    fontSize: 14, color: '#0b1f3a', resize: 'none',
                                    fontFamily: "'Poppins', sans-serif", lineHeight: 1.5,
                                }}
                            />
                        </div>
                        <button
                            onClick={send}
                            style={{
                                width: 42, height: 42, borderRadius: '50%',
                                background: input.trim() ? 'linear-gradient(135deg,#26b8a0,#0b1f3a)' : '#e6f8f5',
                                border: 'none', cursor: input.trim() ? 'pointer' : 'default',
                                fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0, transition: 'all 0.2s',
                            }}
                        >➤</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
