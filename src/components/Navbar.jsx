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
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems, toggleDrawer } = useCart()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  const solidNav = scrolled || !isHome

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-500
          ${solidNav ? 'bg-ivory/[0.97] backdrop-blur-md shadow-[0_1px_0_rgba(201,168,76,0.12)]' : 'bg-transparent'}
          ${scrolled ? 'px-10 py-3' : 'px-10 py-5'}`}
      >
        {/* Logo */}
        <Link to="/" className="font-serif font-light text-[1.65rem] tracking-[0.35em] text-black">
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
                      : 'text-black border-transparent hover:text-gold hover:border-gold'}`}
                >
                  {l.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Cart button */}
          <button
            onClick={toggleDrawer}
            aria-label="Cart"
            className="relative flex items-center justify-center w-10 h-10 border border-gold/30
              text-black bg-transparent transition-all duration-300 hover:border-gold hover:text-gold"
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
            className="flex md:hidden items-center justify-center w-10 h-10 border border-gold/30
              text-black bg-transparent transition-all duration-300 hover:border-gold hover:text-gold"
          >
            {menuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[99] bg-ivory flex flex-col items-center justify-center gap-10
          transition-opacity duration-300
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {navLinks.map((l) => (
          <Link
            key={l.label}
            to={l.to}
            className="font-serif font-light text-[2.2rem] tracking-[0.06em] text-black
              transition-colors duration-300 hover:text-gold"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </>
  )
}

export default Navbar
