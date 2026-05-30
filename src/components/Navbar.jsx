import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

const navLinks = [
  { label: 'Home',        to: '/' },
  { label: 'Wallets',     to: '/shop?category=wallets' },
  { label: 'Shoes',       to: '/shop?category=shoes' },
  { label: 'Accessories', to: '/shop?category=accessories' },
  { label: 'Bags',        to: '/shop?category=bags' },
]

const Navbar = () => {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [isLight,   setIsLight]   = useState(true)
  const { totalItems, toggleDrawer } = useCart()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      // Hero section is light (~100vh), switch to dark text after
      setIsLight(window.scrollY < window.innerHeight * 0.7)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On non-home pages always dark bg
  const isHome = location.pathname === '/'
  useEffect(() => {
    if (!isHome) setIsLight(false)
    else setIsLight(window.scrollY < window.innerHeight * 0.7)
  }, [location, isHome])

  useEffect(() => setMenuOpen(false), [location])

  const textColor   = (!isHome || scrolled || !isLight) ? '#1a1510' : '#1a1510'
  const logoColor   = '#1a1510'
  const bgStyle     = scrolled
    ? 'rgba(250,247,242,0.97)'
    : isHome && isLight
      ? 'transparent'
      : 'rgba(250,247,242,0.97)'
  const borderStyle = scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none'

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: scrolled ? '0.8rem 3.5rem' : '1.3rem 3.5rem',
        background: bgStyle,
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: borderStyle,
        transition: 'all 0.4s ease',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.7rem', fontWeight: 300,
          letterSpacing: '0.38em', color: logoColor,
          textDecoration: 'none',
        }}>
          VE<span style={{ color: '#c9a84c' }}>L</span>LUM
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }}
          className="max-md:hidden">
          {navLinks.map((l) => {
            const active = location.pathname === l.to || (l.to !== '/' && location.pathname + location.search === l.to)
            return (
              <li key={l.label}>
                <Link to={l.to} style={{
                  color: active ? '#c9a84c' : textColor,
                  fontSize: '0.63rem', letterSpacing: '0.22em',
                  textTransform: 'uppercase', textDecoration: 'none',
                  fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300,
                  paddingBottom: '3px',
                  borderBottom: active ? '1px solid #c9a84c' : '1px solid transparent',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#c9a84c'; e.currentTarget.style.borderBottomColor = '#c9a84c' }}
                onMouseLeave={e => { e.currentTarget.style.color = active ? '#c9a84c' : textColor; e.currentTarget.style.borderBottomColor = active ? '#c9a84c' : 'transparent' }}
                >{l.label}</Link>
              </li>
            )
          })}
        </ul>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <button onClick={toggleDrawer} aria-label="Cart" style={{
            position: 'relative', background: 'none', cursor: 'pointer',
            border: '1px solid rgba(201,168,76,0.3)',
            color: textColor, padding: '0.42rem 0.65rem',
            display: 'flex', alignItems: 'center',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.color = textColor }}
          >
            <ShoppingBag size={17} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute', top: '-7px', right: '-7px',
                background: '#c9a84c', color: '#080806',
                fontSize: '0.5rem', width: '16px', height: '16px',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{totalItems}</span>
            )}
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"
            className="md:hidden"
            style={{
              background: 'none', border: '1px solid rgba(201,168,76,0.3)',
              color: textColor, padding: '0.42rem',
              display: 'flex', cursor: 'pointer', transition: 'all 0.3s',
            }}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99,
        background: '#faf7f2',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '2rem',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'opacity 0.35s ease',
      }}>
        {navLinks.map((l) => (
          <Link key={l.label} to={l.to} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2.5rem', fontWeight: 300,
            color: '#1a1510', letterSpacing: '0.08em',
            textDecoration: 'none', transition: 'color 0.3s',
          }}
          onMouseEnter={e => e.target.style.color = '#c9a84c'}
          onMouseLeave={e => e.target.style.color = '#1a1510'}
          >{l.label}</Link>
        ))}
      </div>
    </>
  )
}

export default Navbar
