import { Link } from 'react-router-dom'

const Footer = () => {
  const cols = [
    {
      title: 'Shop',
      links: [
        { label: 'Wallets',     to: '/shop?category=wallets' },
        { label: 'Shoes',       to: '/shop?category=shoes' },
        { label: 'Accessories', to: '/shop?category=accessories' },
        { label: 'Bags',        to: '/shop?category=bags' },
        { label: 'Gift Sets',   to: '/shop' },
      ],
    },
    {
      title: 'Service',
      links: [
        { label: 'Bespoke Orders',  to: '/shop' },
        { label: 'Monogramming',    to: '/shop' },
        { label: 'Repairs',         to: '/shop' },
        { label: 'Size Guide',      to: '/shop' },
        { label: 'Care Guide',      to: '/shop' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Our Story',  to: '/' },
        { label: 'Workshop',   to: '/' },
        { label: 'Contact',    to: '/' },
        { label: 'Press',      to: '/' },
      ],
    },
  ]

  return (
    <footer style={{ background: '#1a1510', borderTop: '1px solid rgba(201,168,76,0.12)', paddingTop: '5rem', paddingBottom: '2rem', paddingLeft: '4rem', paddingRight: '4rem' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.6rem', fontWeight: 300, letterSpacing: '0.38em',
              color: '#f5f0e8', textDecoration: 'none', display: 'block', marginBottom: '1rem',
            }}>
              VE<span style={{ color: '#c9a84c' }}>L</span>LUM
            </Link>
            <p style={{ fontSize: '0.72rem', lineHeight: 2, color: '#b8b0a0', letterSpacing: '0.05em' }}>
              Fine leather goods, crafted by hand in Pakistan. Shipped worldwide with care.
            </p>
          </div>

          {/* Columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '0.6rem', letterSpacing: '0.35em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 400 }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} style={{
                      fontSize: '0.72rem', color: '#b8b0a0', textDecoration: 'none',
                      letterSpacing: '0.05em', transition: 'color 0.3s',
                    }}
                    onMouseEnter={e => e.target.style.color = '#c9a84c'}
                    onMouseLeave={e => e.target.style.color = '#b8b0a0'}
                    >{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(201,168,76,0.12)', paddingTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.62rem', color: '#b8b0a0', letterSpacing: '0.08em' }}>
            © 2024 <span style={{ color: '#c9a84c' }}>VELLUM</span> — All rights reserved.
          </p>
          <p style={{ fontSize: '0.62rem', color: '#b8b0a0', letterSpacing: '0.08em' }}>
            Crafted with care · <span style={{ color: '#c9a84c' }}>Pakistan</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
