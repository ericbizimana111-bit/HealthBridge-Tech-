
import  { useState, useMemo } from 'react';
import { doctors, specialties } from '../data/mockData';
import { useDebounce } from '../hooks/useDebounce';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import StarRating from '../components/ui/StarRating';


const STATUS_VARIANT = {
  available: 'available',
  busy: 'busy',
  'in-session': 'session',
  offline: 'offline',
};
const STATUS_LABEL = {
  available: 'Available',
  busy: 'Busy',
  'in-session': 'In Session',
  offline: 'Offline',
};

  return (
    <div
      className="card"
      onClick={() => onView(doc)}
      style={{ padding: 28, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 0 }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
        <Avatar initials={doc.initials} size={60} color={doc.color} status={doc.status} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, marginBottom: 3 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins',sans-serif" }}>{doc.name}</h3>
            <Badge variant={STATUS_VARIANT[doc.status]} dot size="sm">{STATUS_LABEL[doc.status]}</Badge>
          </div>
          <p style={{ fontSize: 13, color: '#26b8a0', fontWeight: 600, marginBottom: 4, fontFamily: "'Poppins',sans-serif" }}>{doc.specialty}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: '#7a96b4', fontFamily: "'Poppins',sans-serif" }}>📍 {doc.location}</span>
            <span style={{ fontSize: 12, color: '#7a96b4', fontFamily: "'Poppins',sans-serif" }}>⏱ {doc.experience}</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p style={{ fontSize: 13, color: '#2c4a5e', lineHeight: 1.65, marginBottom: 14, fontFamily: "'Poppins',sans-serif" }}>
        {doc.bio.slice(0, 108)}…
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
        {doc.tags.map(t => <Badge key={t} variant="teal" size="sm">{t}</Badge>)}
      </div>

      {/* Footer row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid #e8f5f2', marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <StarRating value={doc.rating} showValue total={doc.reviews} size={14} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#26b8a0', fontFamily: "'Poppins',sans-serif" }}>{doc.consultFee}</span>
          <button
            className="btn btn-primary btn-sm"
            onClick={e => { e.stopPropagation(); onView(doc); }}
            style={{ fontFamily: "'Poppins',sans-serif" }}
          >Book</button>
        </div>
      </div>
    </div>
  );
}

export default function DoctorsPage({ navigate }) {
  const [searchRaw, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All Specialties');
  const [statusFilter, setStatus] = useState('All');
  const [sortBy, setSort] = useState('rating');

  const search = useDebounce(searchRaw, 300);

  const filtered = useMemo(() => {
    return doctors
      .filter(d => {
        const q = search.toLowerCase();
        const matchQ = !q
          || d.name.toLowerCase().includes(q)
          || d.specialty.toLowerCase().includes(q)
          || d.tags.some(t => t.toLowerCase().includes(q));
        const matchS = specialty === 'All Specialties' || d.category === specialty;
        const matchSt = statusFilter === 'All' || d.status === statusFilter.toLowerCase().replace(' ', '-');
        return matchQ && matchS && matchSt;
      })
      .sort((a, b) =>
        sortBy === 'rating' ? b.rating - a.rating :
          sortBy === 'fee' ? parseFloat(a.consultFee.replace('$', '')) - parseFloat(b.consultFee.replace('$', '')) :
            a.name.localeCompare(b.name)
      );
  }, [search, specialty, statusFilter, sortBy]);

  return (
    <div style={{ paddingTop: 70, fontFamily: "'Poppins',sans-serif" }}>

      {/* ── Hero / search header ── */}
      <div style={{ background: 'linear-gradient(145deg,#0b1f3a,#1e3f6e)', padding: '64px 0 48px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="label-chip" style={{ background: 'rgba(38,184,160,0.2)', color: '#9de4d8' }}>Our Professionals</span>
          <h1 style={{ fontSize: 'clamp(28px,4vw,46px)', fontWeight: 800, color: 'white', marginBottom: 12, fontFamily: "'Poppins',sans-serif" }}>
            Find Your Doctor
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', maxWidth: 480, margin: '0 auto 36px', fontFamily: "'Poppins',sans-serif" }}>
            Browse vetted, compassionate professionals ready to support your journey — wherever you are in the world.
          </p>

          {/* Search bar */}
          <div style={{ maxWidth: 580, margin: '0 auto', display: 'flex', background: 'white', borderRadius: 50, padding: '6px 6px 6px 22px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <span style={{ fontSize: 16, display: 'flex', alignItems: 'center', marginRight: 8, color: '#7a96b4' }}>🔍</span>
            <input
              value={searchRaw}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, speciality, or condition…"
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#0b1f3a', background: 'transparent', fontFamily: "'Poppins',sans-serif" }}
            />
            <button className="btn btn-primary btn-sm" style={{ borderRadius: 50, fontFamily: "'Poppins',sans-serif" }}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '36px 24px' }}>

        {/* ── Filters row ── */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28, alignItems: 'center' }}>
          {/* Specialty */}
          <select
            value={specialty}
            onChange={e => setSpecialty(e.target.value)}
            style={{ padding: '9px 16px', borderRadius: 50, border: '1.5px solid #cce8e3', fontSize: 13, color: '#0b1f3a', background: 'white', cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}
          >
            {specialties.map(s => <option key={s} style={{ fontFamily: "'Poppins',sans-serif" }}>{s}</option>)}
          </select>

          {/* Status filter pills */}
          {['All', 'Available', 'Busy', 'In Session', 'Offline'].map(s => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              style={{
                padding: '8px 16px', borderRadius: 50,
                border: `1.5px solid ${statusFilter === s ? '#26b8a0' : '#cce8e3'}`,
                background: statusFilter === s ? '#e6f8f5' : 'white',
                color: statusFilter === s ? '#26b8a0' : '#2c4a5e',
                fontWeight: statusFilter === s ? 700 : 400,
                fontSize: 13, cursor: 'pointer', transition: 'all 0.18s',
                fontFamily: "'Poppins',sans-serif",
              }}
            >{s}</button>
          ))}

          {/* Sort */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#7a96b4', fontFamily: "'Poppins',sans-serif" }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSort(e.target.value)}
              style={{ padding: '8px 14px', borderRadius: 50, border: '1.5px solid #cce8e3', fontSize: 13, color: '#0b1f3a', background: 'white', cursor: 'pointer', fontFamily: "'Poppins',sans-serif" }}
            >
              <option value="rating">Highest Rated</option>
              <option value="fee">Lowest Fee</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        {/* ── Results count ── */}
        <p style={{ fontSize: 14, color: '#7a96b4', marginBottom: 24, fontFamily: "'Poppins',sans-serif" }}>
          Showing <strong style={{ color: '#0b1f3a', fontFamily: "'Poppins',sans-serif" }}>{filtered.length}</strong> professional{filtered.length !== 1 ? 's' : ''}
          {search && <span style={{ fontFamily: "'Poppins',sans-serif" }}> for "<strong>{search}</strong>"</span>}
        </p>

        {/* ── Doctor grid ── */}
        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="doc-grid">
            {filtered.map(d => (
              <DoctorCard key={d.id} doc={d} onView={doc => navigate('doctor-profile', doc)} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <p style={{ fontSize: 48, marginBottom: 16 }}>🔍</p>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0b1f3a', marginBottom: 8, fontFamily: "'Poppins',sans-serif" }}>No results found</h3>
            <p style={{ color: '#7a96b4', marginBottom: 20, fontFamily: "'Poppins',sans-serif" }}>Try adjusting your search or filters.</p>
            <button className="btn btn-ghost" onClick={() => { setSearch(''); setSpecialty('All Specialties'); setStatus('All'); }} style={{ fontFamily: "'Poppins',sans-serif" }}>
              Clear All Filters
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

