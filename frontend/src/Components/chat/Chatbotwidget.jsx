import { useState, useRef, useEffect } from 'react';

const INITIAL_MESSAGES = [
    {
        from: 'bot',
        text: "Hello! I'm Sana, your wellness assistant 🌿 I'm here 24/7 to help you navigate the platform, find the right doctor, or just listen. How are you feeling today?",
    },
];

const QUICK_REPLIES = [
    "Find me a doctor",
    "I'm feeling anxious",
    "How does this work?",
    "I need someone to talk to",
    "Wellness tips",
];

const RESPONSES = {
    "find me a doctor": "I'd be happy to help you find the right professional! Visit the **Find a Doctor** section to search by speciality, language, and availability. Would you like me to suggest some based on how you're feeling?",
    "i'm feeling anxious": "I hear you, and I want you to know — what you're feeling is valid. Take a slow breath right now. 🌬️\n\nWould you like me to connect you with one of our anxiety specialists, or share a quick calming exercise?",
    "how does this work": "SanaMind makes professional healthcare simple:\n\n1. Browse and find your doctor\n2. Book a free 15-minute intro call\n3. Start secure video or chat sessions\n4. Access wellness tools anytime\n\nEverything is private and at your pace. What would you like to explore?",
    "i need someone to talk to": "You came to the right place, and I'm really glad you did. 💙\n\nOur doctors and counsellors are warm, non-judgmental professionals who listen deeply. Would you like to see who's available right now?",
    "wellness tips": "Here are three gentle things you can do in the next 5 minutes:\n\n🌊 **Breathe** – 4 counts in, 6 counts out\n💧 **Hydrate** – drink a glass of water\n🌱 **Step outside** – even one minute of fresh air shifts your mood\n\nWould you like personalised tips based on your wellness goals?",
};

function getBotResponse(input) {
    const lower = input.toLowerCase().trim();
    for (const key of Object.keys(RESPONSES)) {
        if (lower.includes(key.replace("i'm", "").trim()) || lower.includes(key)) {
            return RESPONSES[key];
        }
    }
    if (lower.includes('doctor') || lower.includes('specialist') || lower.includes('help')) {
        return "I can help you find the right professional! Head to **Find a Doctor** and use our filters — or tell me what you're going through and I'll suggest someone suited for you. 💙";
    }
    if (lower.includes('depress') || lower.includes('sad') || lower.includes('lonely')) {
        return "Thank you for sharing that with me. It takes courage. 💙\n\nYou don't have to carry this alone. Our specialists in mental health are compassionate and ready to listen. Would you like to see who's available today?";
    }
    if (lower.includes('music') || lower.includes('relax') || lower.includes('calm')) {
        return "Music is genuinely healing 🎵 Head to our **Calm Music** section for curated therapeutic tracks — from ocean waves to gentle ambient sounds. It can help right now, while you wait or rest.";
    }
    if (lower.includes('community') || lower.includes('others') || lower.includes('people')) {
        return "Our **Community** space is full of real people sharing real journeys. You can post anonymously, read inspiring stories, and know you're not alone. Want me to take you there?";
    }
    return "I'm here for you. 🌿 You can ask me to find a doctor, share wellness tips, explain how the platform works, or just listen. What do you need most right now?";
}

export default function ChatbotWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const [minimised, setMinimised] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (open && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, open]);

    const send = (text) => {
        const msg = text || input.trim();
        if (!msg) return;
        setInput('');
        setMessages(prev => [...prev, { from: 'user', text: msg }]);
        setTyping(true);
        const BOT_DELAY = 1200;

        setTimeout(() => {
            setTyping(false);
            const response = getBotResponse(msg);
            setMessages(prev => [...prev, { from: 'bot', text: response }]);
        }, BOT_DELAY);
    };

    const handleKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
    };

    const renderText = (text) => {
        return text.split('\n').map((line, i) => {
            const parts = line.split(/\*\*(.*?)\*\*/g);
            return (
                <p key={i} style={{ marginBottom: i < text.split('\n').length - 1 ? 6 : 0, fontFamily: "'Poppins', sans-serif" }}>
                    {parts.map((p, j) => j % 2 === 1
                        ? <strong key={j} style={{ fontFamily: "'Poppins', sans-serif" }}>{p}</strong>
                        : p
                    )}
                </p>
            );
        });
    };

    return (
        <>
            {/* Floating button */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    style={{
                        position: 'fixed', bottom: 28, right: 28,
                        width: 60, height: 60, borderRadius: '50%',
                        background: 'linear-gradient(135deg,#26b8a0,#0b1f3a)',
                        border: 'none', cursor: 'pointer',
                        boxShadow: '0 6px 28px rgba(38,184,160,0.45)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 26, zIndex: 9999,
                        animation: 'botPulse 2.5s ease-in-out infinite',
                        fontFamily: "'Poppins', sans-serif",
                    }}
                    title="Chat with Sana"
                >
                    🌿
                </button>
            )}

            {/* Chat window */}
            {open && (
                <div style={{
                    position: 'fixed', bottom: 28, right: 28,
                    width: 360, zIndex: 9999,
                    borderRadius: 20,
                    boxShadow: '0 20px 60px rgba(11,31,58,0.22)',
                    background: 'white',
                    display: 'flex', flexDirection: 'column',
                    overflow: 'hidden',
                    animation: 'slideInBot 0.3s cubic-bezier(0.4,0,0.2,1)',
                    fontFamily: "'Poppins', sans-serif",
                }}>
                    {/* Header */}
                    <div style={{
                        background: 'linear-gradient(135deg,#0b1f3a 0%,#1e3f6e 100%)',
                        padding: '16px 20px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                                width: 42, height: 42, borderRadius: '50%',
                                background: 'linear-gradient(135deg,#26b8a0,#34d4ba)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 20, flexShrink: 0,
                            }}>🌿</div>
                            <div>
                                <p style={{ fontSize: 14, fontWeight: 700, color: 'white', fontFamily: "'Poppins', sans-serif" }}>Sana</p>
                                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'Poppins', sans-serif" }}>
                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#26b8a0', display: 'inline-block' }} />
                                    Wellness Assistant · Always here
                                </p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 6 }}>
                            <button
                                onClick={() => setMinimised(!minimised)}
                                style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', color: 'white', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >{minimised ? '▲' : '▼'}</button>
                            <button
                                onClick={() => setOpen(false)}
                                style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', color: 'white', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >✕</button>
                        </div>
                    </div>

                    {!minimised && (
                        <>
                            {/* Messages */}
                            <div style={{
                                height: 340, overflowY: 'auto', padding: '16px 16px 8px',
                                background: '#f7fbfa',
                                display: 'flex', flexDirection: 'column', gap: 10,
                            }}>
                                {messages.map((msg, i) => (
                                    <div key={i} style={{
                                        display: 'flex',
                                        justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                                        animation: 'fadeUp 0.3s ease both',
                                    }}>
                                        {msg.from === 'bot' && (
                                            <div style={{
                                                width: 28, height: 28, borderRadius: '50%',
                                                background: 'linear-gradient(135deg,#26b8a0,#34d4ba)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: 13, flexShrink: 0, marginRight: 8, marginTop: 4,
                                            }}>🌿</div>
                                        )}
                                        <div style={{
                                            maxWidth: '78%',
                                            padding: '10px 14px',
                                            borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                            background: msg.from === 'user'
                                                ? 'linear-gradient(135deg,#26b8a0,#0b1f3a)'
                                                : 'white',
                                            color: msg.from === 'user' ? 'white' : '#0b1f3a',
                                            fontSize: 13,
                                            lineHeight: 1.55,
                                            boxShadow: '0 2px 8px rgba(11,31,58,0.08)',
                                            fontFamily: "'Poppins', sans-serif",
                                        }}>
                                            {renderText(msg.text)}
                                        </div>
                                    </div>
                                ))}
                                {typing && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#26b8a0,#34d4ba)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>🌿</div>
                                        <div style={{ background: 'white', borderRadius: '16px 16px 16px 4px', padding: '10px 16px', boxShadow: '0 2px 8px rgba(11,31,58,0.08)' }}>
                                            <div style={{ display: 'flex', gap: 4 }}>
                                                {[0, 1, 2].map(i => (
                                                    <span key={i} style={{
                                                        width: 6, height: 6, borderRadius: '50%',
                                                        background: '#26b8a0', display: 'inline-block',
                                                        animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                                                    }} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={bottomRef} />
                            </div>

                            {/* Quick replies */}
                            <div style={{ padding: '8px 12px', background: '#f7fbfa', display: 'flex', gap: 6, flexWrap: 'wrap', borderTop: '1px solid #e6f8f5' }}>
                                {QUICK_REPLIES.map(qr => (
                                    <button key={qr} onClick={() => send(qr)} style={{
                                        padding: '5px 12px', borderRadius: 50,
                                        background: 'white', border: '1px solid #cce8e3',
                                        color: '#2c4a5e', fontSize: 11, fontWeight: 500,
                                        cursor: 'pointer', transition: 'all 0.18s',
                                        fontFamily: "'Poppins', sans-serif",
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.background = '#e6f8f5'; e.currentTarget.style.borderColor = '#26b8a0'; e.currentTarget.style.color = '#26b8a0'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#cce8e3'; e.currentTarget.style.color = '#2c4a5e'; }}
                                    >{qr}</button>
                                ))}
                            </div>

                            {/* Input */}
                            <div style={{
                                padding: '12px 16px',
                                background: 'white',
                                borderTop: '1px solid #e8f5f2',
                                display: 'flex', gap: 8, alignItems: 'center',
                            }}>
                                <input
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={handleKey}
                                    placeholder="Type a message..."
                                    style={{
                                        flex: 1, padding: '10px 14px',
                                        border: '1.5px solid #cce8e3', borderRadius: 50,
                                        fontSize: 13, color: '#0b1f3a',
                                        background: '#f7fbfa',
                                        fontFamily: "'Poppins', sans-serif",
                                        transition: 'border-color 0.2s',
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#26b8a0'}
                                    onBlur={e => e.target.style.borderColor = '#cce8e3'}
                                />
                                <button
                                    onClick={() => send()}
                                    style={{
                                        width: 38, height: 38, borderRadius: '50%',
                                        background: input.trim() ? '#26b8a0' : '#e6f8f5',
                                        border: 'none', cursor: input.trim() ? 'pointer' : 'default',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 16, transition: 'all 0.2s',
                                        fontFamily: "'Poppins', sans-serif",
                                    }}
                                >➤</button>
                            </div>
                        </>
                    )}
                </div>
            )}

            <style>{`
        @keyframes botPulse {
          0%,100% { box-shadow: 0 6px 28px rgba(38,184,160,0.45); }
          50% { box-shadow: 0 6px 36px rgba(38,184,160,0.7); transform: scale(1.04); }
        }
        @keyframes slideInBot {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
        </>
    );
}
