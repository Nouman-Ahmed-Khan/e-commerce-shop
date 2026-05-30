import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedProducts } from '../data/products'
import ProductCard from '../components/ProductCard'

const MARQUEE = [
  'Full Grain Leather','Handstitched','Bespoke Orders',
  'Vegetable Tanned','Lifetime Warranty','Worldwide Shipping',
  'Full Grain Leather','Handstitched','Bespoke Orders',
  'Vegetable Tanned','Lifetime Warranty','Worldwide Shipping',
]

const STATS = [
  { num: '12+',  label: 'Years of craft'    },
  { num: '4K+',  label: 'Happy clients'     },
  { num: '100%', label: 'Handmade'          },
  { num: '60+',  label: 'Countries shipped' },
]

const TESTIMONIALS = [
  { text: "The bifold wallet I ordered has aged to the most beautiful deep mahogany. Three years later, it's the best purchase I've ever made.", author: 'Ahmed R.', location: 'Karachi, Pakistan' },
  { text: "Shipped to London in under a week. The quality rivals anything from the European fashion houses — and at a fraction of the price.", author: 'James T.', location: 'London, UK'          },
  { text: "Had my initials stamped in gold. The craftsmanship is extraordinary. I've been gifting VELLUM pieces to everyone I know.", author: 'Fatima K.', location: 'Dubai, UAE'            },
]

/* ─────────────────────────────────────────
   SCROLL-DRIVEN WALLET ANIMATION
   Uses 3 full images — no cropping:
     wallet-closed.png  → closed wallet
     wallet-2.png       → mid-open / tilted
     wallet-open.png    → fully open interior
   Phases driven by scroll progress 0→1
───────────────────────────────────────────── */
const WalletScrollSection = () => {
  const sectionRef = useRef(null)
  const imgClosedRef = useRef(null)
  const imgMidRef    = useRef(null)
  const imgOpenRef   = useRef(null)
  const cardRef      = useRef(null)
  const wrapRef      = useRef(null)
  const labelRef     = useRef(null)
  const ctaRef       = useRef(null)
  const glowRef      = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return
      const rect     = sectionRef.current.getBoundingClientRect()
      const totalH   = sectionRef.current.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const p        = Math.min(1, scrolled / totalH)

      /*
        Phase 1 (0.00 – 0.30): closed wallet fully visible, gentle float up
        Phase 2 (0.30 – 0.55): crossfade closed → mid, card tilts right (opening)
        Phase 3 (0.55 – 0.80): crossfade mid → open, card returns flat
        Phase 4 (0.80 – 1.00): fully open, CTA fades in
      */

      // ── Opacity of each image ──
      let oClosed, oMid, oOpen

      if (p < 0.30) {
        oClosed = 1; oMid = 0; oOpen = 0
      } else if (p < 0.55) {
        const t = (p - 0.30) / 0.25
        oClosed = 1 - t; oMid = t; oOpen = 0
      } else if (p < 0.80) {
        const t = (p - 0.55) / 0.25
        oClosed = 0; oMid = 1 - t; oOpen = t
      } else {
        oClosed = 0; oMid = 0; oOpen = 1
      }

      if (imgClosedRef.current) imgClosedRef.current.style.opacity = String(oClosed)
      if (imgMidRef.current)    imgMidRef.current.style.opacity    = String(oMid)
      if (imgOpenRef.current)   imgOpenRef.current.style.opacity   = String(oOpen)

      // ── 3D tilt: rotate around Y axis during opening phase ──
      // peaks at ~25° when mid-way through opening, returns to 0 when open
      let tiltAngle = 0
      if (p >= 0.30 && p < 0.80) {
        const t = (p - 0.30) / 0.50            // 0→1 over opening window
        tiltAngle = Math.sin(t * Math.PI) * 22  // bell curve, peak 22°
      }

      // ── gentle float (lift) ──
      const lift  = Math.sin(p * Math.PI) * -16
      const scale = 0.88 + p * 0.16

      if (wrapRef.current) {
        wrapRef.current.style.transform = `translateY(${lift}px) scale(${scale}) rotateY(${tiltAngle}deg)`
      }

      // ── glow ──
      if (glowRef.current) {
        const openAmt = p < 0.55 ? 0 : Math.min(1, (p - 0.55) / 0.25)
        glowRef.current.style.opacity = String(0.25 + openAmt * 0.75)
      }

      // ── label ──
      const labels = [
        'Closed · Hand-stitched cowhide',
        'Opening · Vegetable tanned leather',
        'Open · 8 card slots inside',
      ]
      const idx = p < 0.40 ? 0 : p < 0.72 ? 1 : 2
      if (labelRef.current) labelRef.current.textContent = labels[idx]

      // ── CTA ──
      if (ctaRef.current) {
        ctaRef.current.style.opacity = p > 0.84 ? String((p - 0.84) / 0.16) : '0'
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const imgStyle = (initial) => ({
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%', height: '100%',
    objectFit: 'contain',
    opacity: initial,
    userSelect: 'none', pointerEvents: 'none',
    transition: 'opacity 0.12s ease',
  })

  return (
    <section ref={sectionRef} style={{ height: '300vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        background: '#0e0d0a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>

        {/* Background glow */}
        <div ref={glowRef} style={{
          position: 'absolute', inset: 0, opacity: 0.25,
          background: 'radial-gradient(ellipse 60% 55% at 50% 52%, rgba(139,74,42,0.32) 0%, rgba(201,168,76,0.07) 45%, transparent 70%)',
          transition: 'opacity 0.12s linear',
          pointerEvents: 'none',
        }}/>

        {/* Left text panel */}
        <div style={{
          position: 'absolute', left: '5rem', top: '50%', transform: 'translateY(-50%)',
          maxWidth: '240px', zIndex: 2,
        }} className="max-md:hidden">
          <span style={{ fontSize: '0.58rem', letterSpacing: '0.38em', color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
            Signature Piece
          </span>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 300, color: '#f5f0e8', lineHeight: 1.2, marginBottom: '1rem' }}>
            The Bifold<br />Masterpiece
          </h3>
          <p style={{ fontSize: '0.72rem', lineHeight: 1.9, color: '#b8b0a0', marginBottom: '1.2rem' }}>
            Full-grain vegetable tanned leather, hand-stitched with waxed linen thread. Built to age beautifully.
          </p>
          {['Full-grain cowhide','8 card slots','Wax thread stitching','6 colour options'].map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.45rem' }}>
              <span style={{ color: '#c9a84c', fontSize: '0.6rem' }}>—</span>
              <span style={{ fontSize: '0.62rem', letterSpacing: '0.12em', color: '#b8b0a0', textTransform: 'uppercase' }}>{f}</span>
            </div>
          ))}
        </div>

        {/* ── WALLET IMAGE STACK ── */}
        <div
          ref={wrapRef}
          style={{
            position: 'relative',
            width: 'min(460px, 72vw)',
            height: 'min(460px, 72vw)',
            zIndex: 3,
            perspective: '1200px',
            filter: 'drop-shadow(0 35px 70px rgba(0,0,0,0.9))',
            transition: 'transform 0.06s linear',
          }}
        >
          <img ref={imgClosedRef} src="/images/wallet-closed.png" alt="Wallet closed" style={imgStyle(1)} />
          <img ref={imgMidRef}    src="/images/wallet-2.png"      alt="Wallet opening" style={imgStyle(0)} />
          <img ref={imgOpenRef}   src="/images/wallet-open.png"   alt="Wallet open"   style={imgStyle(0)} />
        </div>
        {/* ── END WALLET ── */}

        {/* Right text panel */}
        <div style={{
          position: 'absolute', right: '5rem', top: '50%', transform: 'translateY(-50%)',
          maxWidth: '240px', textAlign: 'right', zIndex: 2,
        }} className="max-md:hidden">
          <span style={{ fontSize: '0.58rem', letterSpacing: '0.38em', color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
            Inside View
          </span>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 300, color: '#f5f0e8', lineHeight: 1.2, marginBottom: '1rem' }}>
            Thoughtful<br />Interior
          </h3>
          <p style={{ fontSize: '0.72rem', lineHeight: 1.9, color: '#b8b0a0' }}>
            Three card slots each side, a full-length bill compartment, and a hidden coin pocket. Organised luxury.
          </p>
        </div>

        {/* State label + scroll indicator */}
        <div style={{ position: 'absolute', bottom: '5rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 2 }}>
          <p ref={labelRef} style={{
            fontSize: '0.62rem', letterSpacing: '0.28em',
            color: '#b8b0a0', textTransform: 'uppercase',
            marginBottom: '1.5rem', whiteSpace: 'nowrap',
          }}>Closed · Hand-stitched cowhide</p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: '#8a6f30', textTransform: 'uppercase' }}>Scroll</span>
            <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #c9a84c, transparent)' }} className="anim-scroll-line"/>
          </div>
        </div>

        {/* CTA fades in when fully open */}
        <div ref={ctaRef} style={{
          position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: '1rem', opacity: 0,
          transition: 'opacity 0.5s ease', zIndex: 4,
        }}>
          <Link to="/product/classic-bifold" style={{
            background: '#c9a84c', color: '#080806',
            fontFamily: "'Josefin Sans',sans-serif",
            fontSize: '0.65rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', padding: '0.8rem 2rem',
            textDecoration: 'none',
          }}>Shop This Wallet</Link>
          <Link to="/shop?category=wallets" style={{
            background: 'none', color: '#f5f0e8',
            border: '1px solid rgba(201,168,76,0.3)',
            fontFamily: "'Josefin Sans',sans-serif",
            fontSize: '0.65rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', padding: '0.8rem 2rem',
            textDecoration: 'none',
          }}>All Wallets</Link>
        </div>

      </div>
    </section>
  )
}


/* ─────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
const Home = () => {
  const featured = getFeaturedProducts()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main>

      {/* ══════════ HERO — LIGHT ══════════ */}
      <section style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #faf7f2 0%, #f0ebe0 50%, #e8e0d0 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '8rem 3rem 5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle grain */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.018,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}/>

        {/* Gold accent line left */}
        <div style={{
          position: 'absolute', left: '4rem', top: 0, bottom: 0, width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)',
        }}/>

        {/* Decorative circle */}
        <div style={{
          position: 'absolute', right: '-10rem', top: '-10rem',
          width: '600px', height: '600px', borderRadius: '50%',
          border: '1px solid rgba(201,168,76,0.08)',
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', right: '-6rem', top: '-6rem',
          width: '400px', height: '400px', borderRadius: '50%',
          border: '1px solid rgba(201,168,76,0.06)',
          pointerEvents: 'none',
        }}/>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', textAlign: 'center', margin: '0 auto' }}>
          <p className="anim-fade-up anim-d1" style={{
            fontSize: '0.62rem', letterSpacing: '0.45em',
            color: '#c9a84c', textTransform: 'uppercase', marginBottom: '1.8rem',
            fontFamily: "'Josefin Sans',sans-serif",
          }}>
            Handcrafted in Pakistan · Est. 2024
          </p>

          <h1 className="anim-fade-up anim-d2" style={{
            fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
            fontSize: 'clamp(2.8rem, 5.5vw, 6.5rem)',
            lineHeight: '1', color: '#1a1510',
            marginBottom: '1.8rem',
            whiteSpace: 'nowrap',
          }}>
            The Art of Fine Leather
          </h1>

          {/* Gold divider */}
          <div className="anim-fade-up anim-d3" style={{
            width: '60px', height: '1px', background: '#c9a84c', marginBottom: '1.8rem', margin: '0 auto 1.8rem',
          }}/>

          <p className="anim-fade-up anim-d3" style={{
            fontSize: '0.8rem', lineHeight: 2, letterSpacing: '0.06em',
            color: '#4a3f35', maxWidth: '480px', marginBottom: '2.5rem',
            margin: '0 auto 2.5rem',
          }}>
            Every wallet, belt, and shoe that leaves our workshop carries with it the weight of generations — cut by hand, stitched slowly, finished with care.
          </p>

          <div className="anim-fade-up anim-d4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/shop" style={{
              background: '#1a1510', color: '#f5f0e8',
              fontFamily: "'Josefin Sans',sans-serif",
              fontSize: '0.68rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', padding: '1rem 2.8rem',
              textDecoration: 'none', transition: 'all 0.3s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c9a84c'; e.currentTarget.style.color = '#080806' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#1a1510'; e.currentTarget.style.color = '#f5f0e8' }}
            >Explore Collection</Link>

            <a href="#craft" style={{
              background: 'none', color: '#1a1510',
              border: '1px solid rgba(26,21,16,0.3)',
              fontFamily: "'Josefin Sans',sans-serif",
              fontSize: '0.68rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', padding: '1rem 2.8rem',
              textDecoration: 'none', transition: 'all 0.3s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,21,16,0.3)'; e.currentTarget.style.color = '#1a1510' }}
            >Our Craft</a>
          </div>

          {/* Scroll hint */}
          <div className="anim-fade-in" style={{
            marginTop: '4.5rem', display: 'flex', alignItems: 'center', gap: '1.2rem', justifyContent: 'center',
          }}>
            <div style={{
              width: '1px', height: '50px',
              background: 'linear-gradient(to bottom, #c9a84c, transparent)',
            }} className="anim-scroll-line"/>
            <span style={{
              fontSize: '0.58rem', letterSpacing: '0.3em',
              color: '#8a6f30', textTransform: 'uppercase',
            }}>Scroll to see the wallet</span>
          </div>
        </div>

        {/* Right: subtle editorial text */}
        <div className="max-md:hidden" style={{
          position: 'absolute', right: '5rem', bottom: '4rem',
          textAlign: 'right',
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic',
            fontSize: '1.1rem', color: 'rgba(139,74,42,0.4)', lineHeight: 1.8,
          }}>
            "Leather is not just a material.<br />It is a commitment to quality."
          </p>
        </div>
      </section>


      {/* ══════════ MARQUEE ══════════ */}
      <div style={{
        borderTop: '1px solid rgba(201,168,76,0.15)',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
        padding: '0.85rem 0', overflow: 'hidden',
        background: '#1a1510',
      }}>
        <div className="anim-marquee" style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap' }}>
          {MARQUEE.map((item, i) => (
            <span key={i} style={{
              fontSize: '0.6rem', letterSpacing: '0.32em',
              color: '#8a6f30', textTransform: 'uppercase',
              flexShrink: 0, paddingRight: '3rem', position: 'relative',
            }}>
              {item}
              <span style={{ position: 'absolute', right: '0.8rem', color: '#c9a84c', fontSize: '0.45rem' }}>✦</span>
            </span>
          ))}
        </div>
      </div>


      {/* ══════════ WALLET SCROLL SECTION ══════════ */}
      <WalletScrollSection />


      {/* ══════════ ABOUT / CRAFT — LIGHT ══════════ */}
      <section id="craft" style={{
        padding: '9rem 5rem', background: '#faf7f2',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: '-2rem', top: '50%', transform: 'translateY(-50%)',
          fontFamily: "'Cormorant Garamond',serif", fontSize: '18rem', fontWeight: 300,
          color: 'rgba(201,168,76,0.04)', pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
        }}>V</div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '7rem', alignItems: 'center',
          maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1,
        }} className="max-md:grid-cols-1 max-md:gap-10">
          <div className="reveal">
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.35em', color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
              Our Philosophy
            </span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
              fontSize: 'clamp(2.5rem,4vw,4.5rem)', color: '#1a1510',
              lineHeight: 1.1, marginBottom: '1.5rem',
            }}>
              Every Stitch<br />Tells a <em style={{ fontStyle: 'italic', color: '#8b4a2a' }}>Story</em>
            </h2>
            <p style={{ fontSize: '0.8rem', lineHeight: 2.1, color: '#4a3f35', marginBottom: '1.2rem', letterSpacing: '0.04em' }}>
              We believe that leather goods should outlive trends. Each piece is a meditation on patience — cut from hides selected for character, stitched by hand with waxed thread, finished with attention that mass production can never replicate.
            </p>
            <p style={{ fontSize: '0.8rem', lineHeight: 2.1, color: '#4a3f35', letterSpacing: '0.04em' }}>
              From Lahore to the world stage, VELLUM carries forward a heritage of Pakistani leather craftsmanship into a new era of luxury.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2.5rem' }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ borderTop: '1px solid rgba(201,168,76,0.25)', paddingTop: '1rem' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.5rem', color: '#c9a84c', fontWeight: 300, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#8a6f30', textTransform: 'uppercase', marginTop: '0.4rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: '100%', maxWidth: '440px', aspectRatio: '1',
              background: 'linear-gradient(145deg, #e8e0d0 0%, #d4c8b8 100%)',
              borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(201,168,76,0.15)',
              position: 'relative', overflow: 'hidden',
            }}>
              <img
                src="/images/wallet-open.png"
                alt="Open leather wallet"
                style={{ width: '85%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.25))' }}
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              {/* Fallback SVG */}
              <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 400 300" style={{ width: '85%' }}>
                  <defs>
                    <radialGradient id="aG" cx="40%" cy="35%" r="68%">
                      <stop offset="0%"   stopColor="#c4956a"/>
                      <stop offset="50%"  stopColor="#7a4a28"/>
                      <stop offset="100%" stopColor="#2a1508"/>
                    </radialGradient>
                  </defs>
                  <rect x="10" y="30" width="380" height="240" rx="14" fill="url(#aG)" opacity="0.9"/>
                  <rect x="22" y="42" width="356" height="216" rx="9" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="1.2" strokeDasharray="5 4"/>
                  <line x1="200" y1="30" x2="200" y2="270" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5"/>
                  <rect x="28" y="60" width="155" height="185" rx="5" fill="rgba(0,0,0,0.12)"/>
                  <rect x="38" y="72" width="135" height="48" rx="4" fill="rgba(0,0,0,0.2)"/>
                  <rect x="38" y="126" width="135" height="48" rx="4" fill="rgba(0,0,0,0.17)"/>
                  <rect x="38" y="180" width="135" height="48" rx="4" fill="rgba(0,0,0,0.14)"/>
                  <rect x="218" y="60" width="155" height="185" rx="5" fill="rgba(0,0,0,0.1)"/>
                  <text x="200" y="286" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="9" fill="rgba(201,168,76,0.45)" letterSpacing="4">VELLUM</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════ FEATURED PRODUCTS — DARK ══════════ */}
      <section style={{ padding: '8rem 0', background: '#0e0d0a' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 3.5rem' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.38em', color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: '0.8rem' }}>
              The Collection
            </span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
              fontSize: 'clamp(2rem,4vw,3.5rem)', color: '#f5f0e8',
            }}>Crafted for the Discerning</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}
            className="max-lg:grid-cols-2 max-md:grid-cols-1">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link to="/shop" className="reveal" style={{
              display: 'inline-block',
              border: '1px solid rgba(201,168,76,0.25)', color: '#f5f0e8',
              fontFamily: "'Josefin Sans',sans-serif",
              fontSize: '0.68rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', padding: '0.95rem 3rem',
              textDecoration: 'none', transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'; e.currentTarget.style.color = '#f5f0e8' }}
            >View Full Collection</Link>
          </div>
        </div>
      </section>


      {/* ══════════ BESPOKE CTA — DARK ══════════ */}
      <section style={{
        padding: '10rem 4rem', textAlign: 'center',
        background: '#080806', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(139,74,42,0.1) 0%, transparent 70%)',
        }}/>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="reveal" style={{ width: '55px', height: '1px', background: '#c9a84c', margin: '0 auto 2.5rem' }}/>
          <h2 className="reveal" style={{
            fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
            fontSize: 'clamp(3rem,7vw,7rem)', color: '#f5f0e8',
            lineHeight: 1, marginBottom: '1.5rem',
          }}>
            Make It <em style={{ fontStyle: 'italic', color: '#d4a97e' }}>Yours</em>
          </h2>
          <p className="reveal" style={{
            fontSize: '0.8rem', lineHeight: 2.2, color: '#b8b0a0',
            maxWidth: '580px', margin: '0 auto 3rem', letterSpacing: '0.05em',
          }}>
            Every piece can be customised. Choose your leather, colour, stitching, and monogram. We'll craft it to order within 10–14 days.
          </p>
          <Link to="/shop" className="reveal" style={{
            display: 'inline-block', background: '#c9a84c', color: '#080806',
            fontFamily: "'Josefin Sans',sans-serif",
            fontSize: '0.68rem', letterSpacing: '0.22em',
            textTransform: 'uppercase', padding: '1rem 3rem',
            textDecoration: 'none', transition: 'all 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#e8cc85'}
          onMouseLeave={e => e.currentTarget.style.background = '#c9a84c'}
          >Start Bespoke Order</Link>
        </div>
      </section>


      {/* ══════════ TESTIMONIALS — LIGHT ══════════ */}
      <section style={{ padding: '8rem 0', background: '#faf7f2' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 3.5rem' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.38em', color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: '0.8rem' }}>
              Client Words
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: '2.8rem', color: '#1a1510' }}>
              What They Say
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '3rem' }}
            className="max-md:grid-cols-1">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="reveal" style={{ position: 'relative', paddingTop: '2rem' }}>
                <span style={{
                  position: 'absolute', top: '-1.5rem', left: '-0.5rem',
                  fontFamily: "'Cormorant Garamond',serif", fontSize: '6rem',
                  color: '#c9a84c', opacity: 0.15, lineHeight: 1,
                }}>"</span>
                <p style={{
                  fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic',
                  fontSize: '1.05rem', lineHeight: 1.9, color: '#4a3f35', marginBottom: '1.5rem',
                }}>{t.text}</p>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase' }}>{t.author}</p>
                <p style={{ fontSize: '0.6rem', color: '#8a6f30', marginTop: '0.3rem' }}>{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════ NEWSLETTER — DARK ══════════ */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center', background: '#0e0d0a' }}>
        <div className="reveal">
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.38em', color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
            Stay in the Loop
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(2rem,3.5vw,3.5rem)', color: '#f5f0e8', marginBottom: '1rem' }}>
            Join the Inner Circle
          </h2>
          <p style={{ fontSize: '0.75rem', color: '#b8b0a0', letterSpacing: '0.1em', marginBottom: '2.5rem' }}>
            New drops, bespoke availability, and the occasional story from the workshop.
          </p>
          <form style={{ display: 'flex', maxWidth: '460px', margin: '0 auto' }} onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Your email address" style={{
              flex: 1, background: '#141310',
              border: '1px solid rgba(201,168,76,0.2)', borderRight: 'none',
              color: '#f5f0e8', padding: '0.95rem 1.5rem',
              fontFamily: "'Josefin Sans',sans-serif",
              fontSize: '0.75rem', letterSpacing: '0.08em', outline: 'none',
            }}/>
            <button type="submit" style={{
              background: '#c9a84c', border: '1px solid #c9a84c', color: '#080806',
              padding: '0.95rem 2rem',
              fontFamily: "'Josefin Sans',sans-serif",
              fontSize: '0.65rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#e8cc85'}
            onMouseLeave={e => e.currentTarget.style.background = '#c9a84c'}
            >Subscribe</button>
          </form>
        </div>
      </section>

    </main>
  )
}

export default Home
