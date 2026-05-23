import  { useState } from 'react';
import { doctors, specialties } from '../data/mockData';

const STATUS_LABELS = {
  available: { label: 'Available', cls: 'status-available' },
  busy:      { label: 'Busy',      cls: 'status-busy' },
  'in-session': { label: 'In Session', cls: 'status-session' },
  offline:   { label: 'Offline',   cls: 'status-offline' },
};

function DoctorCard({ doc, onClick }) {
  const st = STATUS_LABELS[doc.status] || STATUS_LABELS.offline;
  return (
    <div
      className="card"
      style={{ padding: 28, cursor: 'pointer', animation: 'fadeUp 0.5s ease both' }}
      onClick={() => onClick(doc)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 18 }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: `linear-gradient(135deg,${doc.color},${doc.color}99)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 800, fontSize: 22, flexShrink: 0,
          fontFamily: "'Poppins', sans-serif",
        }}>{doc.initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{doc.name}</h3>
            <span className={`status-badge ${st.cls}`}><span className="status-dot" />{st.label}</span>
          </div>
          <p style={{ fontSize: 13, color: '#26b8a0', fontWeight: 600, marginTop: 2, fontFamily: "'Poppins', sans-serif" }}>{doc.specialty}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
            <span style={{ fontSize: 12, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>📍 {doc.location}</span>
            <span style={{ fontSize: 12, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>• {doc.experience}</span>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 13, color: '#2c4a5e', lineHeight: 1.65, marginBottom: 16, fontFamily: "'Poppins', sans-serif" }}>
        {doc.bio.slice(0, 110)}…
      </p>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
        {doc.tags.map(tag => (
          <span key={tag} style={{
            background: '#e6f8f5', color: '#0a7060', fontSize: 11, fontWeight: 600,
            padding: '3px 10px', borderRadius: 50, fontFamily: "'Poppins', sans-serif",
          }}>{tag}</span>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid #e8f5f2' }}>
        <div style={{ display: 'flex', align: 'center', gap: 6 }}>
          <span style={{ color: '#f5a623', fontSize: 14 }}>{'★'.repeat(Math.floor(doc.rating))}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{doc.rating}</span>
          <span style={{ fontSize: 12, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>({doc.reviews})</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#26b8a0', fontFamily: "'Poppins', sans-serif" }}>{doc.consultFee}</span>
          <button className="btn btn-primary btn-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Book</button>
        </div>
      </div>
    </div>
  );
}

export default function DoctorsPage({ navigate }) {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All Specialties');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  const filtered = doctors
    .filter(d => {
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
        || d.specialty.toLowerCase().includes(search.toLowerCase())
        || d.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchSpec = specialty === 'All Specialties' || d.category === specialty;
      const matchStatus = statusFilter === 'All' || d.status === statusFilter.toLowerCase().replace(' ', '-');
      return matchSearch && matchSpec && matchStatus;
    })
    .sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : a.consultFee.localeCompare(b.consultFee));

  return (
    <div style={{ paddingTop: 70, fontFamily: "'Poppins', sans-serif" }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(145deg,#0b1f3a,#1e3f6e)', padding: '60px 0 40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="label-chip" style={{ background: 'rgba(38,184,160,0.2)', color: '#9de4d8' }}>Our Professionals</span>
          <h1 style={{ fontSize: 'clamp(28px,4vw,46px)', fontWeight: 800, color: 'white', marginBottom: 14, fontFamily: "'Poppins', sans-serif" }}>
            Find Your Doctor
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', maxWidth: 500, margin: '0 auto 36px', fontFamily: "'Poppins', sans-serif" }}>
            Browse vetted, compassionate professionals ready to support your journey.
          </p>

          {/* Search bar */}
          <div style={{
            maxWidth: 560, margin: '0 auto',
            display: 'flex', background: 'white', borderRadius: 50,
            padding: '6px 6px 6px 20px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, speciality, or keyword..."
              style={{
                flex: 1, border: 'none', outline: 'none', fontSize: 14,
                color: '#0b1f3a', background: 'transparent',
                fontFamily: "'Poppins', sans-serif",
              }}
            />
            <button className="btn btn-primary btn-sm" style={{ borderRadius: 50, fontFamily: "'Poppins', sans-serif" }}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px' }}>
        {/* Filters row */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 32, alignItems: 'center' }}>
          <select
            value={specialty}
            onChange={e => setSpecialty(e.target.value)}
            style={{
              padding: '10px 18px', borderRadius: 50, border: '1.5px solid #cce8e3',
              fontSize: 13, color: '#0b1f3a', background: 'white', cursor: 'pointer',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {specialties.map(s => <option key={s} style={{ fontFamily: "'Poppins', sans-serif" }}>{s}</option>)}
          </select>

          {['All', 'Available', 'Busy', 'In Session', 'Offline'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              style={{
                padding: '9px 18px', borderRadius: 50, border: '1.5px solid',
                borderColor: statusFilter === s ? '#26b8a0' : '#cce8e3',
                background: statusFilter === s ? '#e6f8f5' : 'white',
                color: statusFilter === s ? '#26b8a0' : '#2c4a5e',
                fontSize: 13, fontWeight: statusFilter === s ? 600 : 400,
                cursor: 'pointer', transition: 'all 0.18s',
                fontFamily: "'Poppins', sans-serif",
              }}
            >{s}</button>
          ))}

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{ padding: '9px 14px', borderRadius: 50, border: '1.5px solid #cce8e3', fontSize: 13, color: '#0b1f3a', background: 'white', cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}
            >
              <option value="rating">Highest Rated</option>
              <option value="fee">Lowest Fee</option>
            </select>
          </div>
        </div>

        {/* Results info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <p style={{ fontSize: 14, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>
            Showing <strong style={{ color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{filtered.length}</strong> professionals
          </p>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="doc-grid">
            {filtered.map(d => (
              <DoctorCard key={d.id} doc={d} onClick={(doc) => navigate('doctor-profile', doc)} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <p style={{ fontSize: 48, marginBottom: 16 }}>🔍</p>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0b1f3a', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>No results found</h3>
            <p style={{ color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>Try adjusting your filters or search terms.</p>
            <button className="btn btn-ghost" style={{ marginTop: 20, fontFamily: "'Poppins', sans-serif" }} onClick={() => { setSearch(''); setSpecialty('All Specialties'); setStatusFilter('All'); }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) { .doc-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .doc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
