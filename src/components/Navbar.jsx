import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X, Sun, Moon } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'

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
  const { totalItems, toggleDrawer } = useCart()
  const { isDark, toggleTheme }      = useTheme()
  const location = useLocation()
  const isHome   = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  const solidNav = scrolled || !isHome

  // Navbar bg: transparent on home hero, solid on scroll / other pages
  // Dark mode: always solid dark surface
  const navBg = isDark
    ? 'bg-surface/[0.97] backdrop-blur-md border-b border-gold-dim/20'
    : solidNav
      ? 'bg-ivory/[0.97] backdrop-blur-md shadow-[0_1px_0_rgba(201,168,76,0.12)]'
      : 'bg-transparent'

  const textCol   = isDark ? 'text-cream'   : 'text-black'
  const mobileMenuBg = isDark ? 'bg-deep'   : 'bg-ivory'

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between
        transition-all duration-500 ${navBg} ${scrolled ? 'px-10 py-3' : 'px-10 py-5'}`}
      >
        {/* Logo */}
        <Link to="/" className={`font-serif font-light text-[1.65rem] tracking-[0.35em] ${textCol}`}>
          VE<span className="text-gold">L</span>LUM
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-10 list-none m-0 p-0">
          {navLinks.map((l) => {
            const active = location.pathname === l.to ||
              (l.to !== '/' && (location.pathname + location.search).startsWith(l.to))
            return (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className={`font-sans font-light text-[0.62rem] tracking-[0.22em] uppercase
                    border-b pb-[2px] transition-colors duration-300
                    ${active
                      ? 'text-gold border-gold'
                      : `${textCol} border-transparent hover:text-gold hover:border-gold`}`}
                >
                  {l.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`flex items-center justify-center w-10 h-10 border
              bg-transparent transition-all duration-300
              ${isDark
                ? 'border-gold-dim/40 text-cream-dim hover:border-gold hover:text-gold'
                : 'border-gold/30 text-black hover:border-gold hover:text-gold'}`}
          >
            {isDark
              ? <Sun  size={15} strokeWidth={1.5} />
              : <Moon size={15} strokeWidth={1.5} />}
          </button>

          {/* Cart */}
          <button
            onClick={toggleDrawer}
            aria-label="Cart"
            className={`relative flex items-center justify-center w-10 h-10 border
              bg-transparent transition-all duration-300
              ${isDark
                ? 'border-gold-dim/40 text-cream-dim hover:border-gold hover:text-gold'
                : 'border-gold/30 text-black hover:border-gold hover:text-gold'}`}
          >
            <ShoppingBag size={17} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-black text-[0.48rem]
                w-4 h-4 rounded-full flex items-center justify-center font-sans font-medium">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className={`flex md:hidden items-center justify-center w-10 h-10 border
              bg-transparent transition-all duration-300
              ${isDark
                ? 'border-gold-dim/40 text-cream-dim hover:border-gold hover:text-gold'
                : 'border-gold/30 text-black hover:border-gold hover:text-gold'}`}
          >
            {menuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-[99] ${mobileMenuBg} flex flex-col items-center justify-center gap-10
        transition-opacity duration-300
        ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {navLinks.map((l) => (
          <Link
            key={l.label}
            to={l.to}
            className={`font-serif font-light text-[2.2rem] tracking-[0.06em]
              transition-colors duration-300 hover:text-gold
              ${isDark ? 'text-cream' : 'text-black'}`}
          >
            {l.label}
          </Link>
        ))}

        {/* Theme toggle inside mobile menu too */}
        <button
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className={`flex items-center gap-3 font-sans text-[0.65rem] tracking-[0.2em] uppercase
            mt-4 border border-gold/30 px-6 py-3 bg-transparent transition-colors duration-300
            hover:text-gold hover:border-gold
            ${isDark ? 'text-cream-dim' : 'text-black'}`}
        >
          {isDark ? <Sun size={13} strokeWidth={1.5} /> : <Moon size={13} strokeWidth={1.5} />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </>
  )
}

export default Navbar
