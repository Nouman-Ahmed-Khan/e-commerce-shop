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

const WALLET_FRAMES = [
  { src: '/images/wallet-01-front-closed.png',       label: 'Closed · Front' },
  { src: '/images/wallet-02-opened-30deg.png',       label: 'Opening · 30°' },
  { src: '/images/wallet-03-opened-45deg.png',       label: 'Opening · 45°' },
  { src: '/images/wallet-04-opened-60deg.png',       label: 'Opening · 60°' },
  { src: '/images/wallet-05-opened-85deg.png',       label: 'Opening · 85°' },
  { src: '/images/wallet-06-opened-100deg.png',      label: 'Opening · 100°' },
  { src: '/images/wallet-07-opened-130deg.png',      label: 'Opening · 130°' },
  { src: '/images/wallet-08-opened-180deg.png',      label: 'Fully Open · Interior' },
  { src: '/images/wallet-09-closing-130deg.png',     label: 'Closing · 130°' },
  { src: '/images/wallet-10-closing-100deg.png',     label: 'Closing · 100°' },
  { src: '/images/wallet-11-closing-85deg.png',      label: 'Closing · 85°' },
  { src: '/images/wallet-12-closing-60deg.png',      label: 'Closing · 60°' },
  { src: '/images/wallet-13-closing-45deg.png',      label: 'Closing · 45°' },
  { src: '/images/wallet-14-closing-30deg.png',      label: 'Closing · 30°' },
  { src: '/images/wallet-15-back-closed.png',        label: 'Closed · Back' },
]

const WalletScrollSection = () => {
  const sectionRef = useRef(null)
  const wrapRef = useRef(null)
  const labelRef = useRef(null)
  const imageRefs = useRef([])

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateAnimation()
          ticking = false
        })
        ticking = true
      }
    }

    const updateAnimation = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const totalH = sectionRef.current.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(1, scrolled / totalH)

      // Map progress directly to the correct array index
      const totalFrames = WALLET_FRAMES.length
      const targetFrame = Math.min(
        Math.floor(progress * totalFrames),
        totalFrames - 1
      )

      // Direct DOM manipulation bypasses React re-render cycles for perfect 60fps+
      imageRefs.current.forEach((img, idx) => {
        if (img) {
          img.style.opacity = idx === targetFrame ? '1' : '0'
        }
      })

      if (labelRef.current && WALLET_FRAMES[targetFrame]) {
        labelRef.current.textContent = WALLET_FRAMES[targetFrame].label
      }

      // Smooth subtle lift and scale layer using transform3d for GPU layer optimization
      if (wrapRef.current) {
        const lift = Math.sin(progress * Math.PI) * -20
        const scale = 0.92 + progress * 0.12
        wrapRef.current.style.transform = `translate3d(-50%, calc(-50% + ${lift}px), 0) scale(${scale})`
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateAnimation() 

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} style={{ height: '300vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        background: '#0e0d0a', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(139,74,42,0.15) 0%, rgba(201,168,76,0.03) 40%, transparent 70%)',
          zIndex: 1
        }}/>

        <div style={{
          position: 'absolute', left: '4rem', top: '50%', transform: 'translateY(-50%)',
          maxWidth: '320px', zIndex: 2,
        }} className="max-md:hidden">
          <span style={{ fontSize: '0.58rem', letterSpacing: '0.38em', color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: '1.2rem' }}>
            Signature Piece
          </span>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.8rem', fontWeight: 300, color: '#f5f0e8', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            The Bifold<br />Masterpiece
          </h3>
          <p style={{ fontSize: '0.8rem', lineHeight: 2, color: '#b8b0a0', marginBottom: '1.5rem' }}>
            Full-grain vegetable tanned leather, hand-stitched with waxed linen thread. Built to age beautifully.
          </p>
          {['Full-grain cowhide','8 card slots','Wax thread stitching','6 colour options'].map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ color: '#c9a84c', fontSize: '0.6rem' }}>—</span>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.12em', color: '#b8b0a0', textTransform: 'uppercase' }}>{f}</span>
            </div>
          ))}
        </div>

        {/* PERSISTENT FRAME STACK LAYER */}
        <div ref={wrapRef} style={{
          position: 'absolute', 
          left: '50%', 
          top: '50%',
          width: '480px', 
          maxWidth: '85vw',
          aspectRatio: '1', 
          zIndex: 3,
          transform: 'translate3d(-50%, -50%, 0) scale(0.92)',
          willChange: 'transform',
          background: 'transparent'
        }}>
          {WALLET_FRAMES.map((frame, idx) => (
            <img
              key={idx}
              ref={el => imageRefs.current[idx] = el}
              src={frame.src}
              alt={frame.label}
              style={{
                position: 'absolute', 
                inset: 0, 
                width: '100%', 
                height: '100%',
                objectFit: 'contain', 
                objectPosition: 'center',
                filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.85))',
                opacity: idx === 0 ? 1 : 0,
                transition: 'opacity 0.04s ease-out', 
                pointerEvents: 'none',
                backgroundColor: 'transparent'
              }}
            />
          ))}
        </div>

        <div style={{
          position: 'absolute', right: '4rem', top: '50%', transform: 'translateY(-50%)',
          maxWidth: '320px', textAlign: 'right', zIndex: 2,
        }} className="max-md:hidden">
          <span style={{ fontSize: '0.58rem', letterSpacing: '0.38em', color: '#c9a84c', textTransform: 'uppercase', display: 'block', marginBottom: '1.2rem' }}>
            Inside View
          </span>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.8rem', fontWeight: 300, color: '#f5f0e8', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Thoughtful<br />Interior
          </h3>
          <p style={{ fontSize: '0.8rem', lineHeight: 2, color: '#b8b0a0' }}>
            Three card slots each side, a full-length bill compartment, and a hidden coin pocket. Organised luxury.
          </p>
        </div>

        <div style={{ position: 'absolute', bottom: '5rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 2 }}>
          <p ref={labelRef} style={{
            fontSize: '0.65rem', letterSpacing: '0.28em',
            color: '#b8b0a0', textTransform: 'uppercase',
            marginBottom: '1.8rem', minHeight: '1.5rem',
          }}>Closed · Front</p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: '#8a6f30', textTransform: 'uppercase' }}>Scroll</span>
            <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #c9a84c, transparent)' }} className="anim-scroll-line"/>
          </div>
        </div>

      </div>
    </section>
  )
}

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
      <section style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #faf7f2 0%, #f0ebe0 50%, #e8e0d0 100%)',
        display: 'flex', alignItems: 'center',
        padding: '8rem 5rem 5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.018,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}/>
        <div style={{
          position: 'absolute', left: '4rem', top: 0, bottom: 0, width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)',
        }}/>
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
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px' }}>
          <p className="anim-fade-up anim-d1" style={{
            fontSize: '0.62rem', letterSpacing: '0.45em',
            color: '#c9a84c', textTransform: 'uppercase', marginBottom: '1.8rem',
            fontFamily: "'Josefin Sans',sans-serif",
          }}>Handcrafted in Pakistan · Est. 2024</p>
          <h1 className="anim-fade-up anim-d2" style={{
            fontFamily: "'Cormorant Garamond',serif", fontWeight: 300,
            fontSize: 'clamp(3.8rem, 7vw, 8rem)',
            lineHeight: '0.92', color: '#1a1510',
            marginBottom: '1.8rem',
          }}>
            The Art of<br />
            <em style={{ fontStyle: 'italic', color: '#8b4a2a' }}>Fine Leather</em>
          </h1>
          <div className="anim-fade-up anim-d3" style={{
            width: '60px', height: '1px', background: '#c9a84c', marginBottom: '1.8rem',
          }}/>
          <p className="anim-fade-up anim-d3" style={{
            fontSize: '0.8rem', lineHeight: 2, letterSpacing: '0.06em',
            color: '#4a3f35', maxWidth: '480px', marginBottom: '2.5rem',
          }}>
            Every wallet, belt, and shoe that leaves our workshop carries with it the weight of generations — cut by hand, stitched slowly, finished with care.
          </p>
          <div className="anim-fade-up anim-d4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/shop" style={{
              background: '#1a1510', color: '#f5f0e8',
              fontFamily: "'Josefin Sans',sans-serif",
              fontSize: '0.68rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', padding: '1rem 2.8rem',
              textDecoration: 'none', transition: 'all 0.3s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c9a84c'; e.currentTarget.style.color = '#080606' }}
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
          <div className="anim-fade-in" style={{
            marginTop: '4.5rem', display: 'flex', alignItems: 'center', gap: '1.2rem',
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

      <WalletScrollSection />

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
                src="/images/wallet-08-opened-180deg.png"
                alt="Open leather wallet"
                style={{ width: '85%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.25))' }}
              />
            </div>
          </div>
        </div>
      </section>

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
            display: 'inline-block', background: '#c9a84c', color: '#080606',
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
              background: '#c9a84c', border: '1px solid #c9a84c', color: '#080606',
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