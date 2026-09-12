import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedProducts } from '../data/products'
import ProductCard from '../components/ProductCard'

/* ── Static data ── */
const MARQUEE_ITEMS = [
  'Full Grain Leather','Handstitched','Bespoke Orders','Vegetable Tanned',
  'Lifetime Warranty','Worldwide Shipping','Full Grain Leather','Handstitched',
  'Bespoke Orders','Vegetable Tanned','Lifetime Warranty','Worldwide Shipping',
]

const STATS = [
  { num: '12+',  label: 'Years of craft'    },
  { num: '4K+',  label: 'Happy clients'     },
  { num: '100%', label: 'Handmade'          },
  { num: '60+',  label: 'Countries shipped' },
]

const TESTIMONIALS = [
  {
    text: "The bifold wallet I ordered has aged to the most beautiful deep mahogany. Three years later, it's the best purchase I've ever made.",
    author: 'Ahmed R.', location: 'Karachi, Pakistan',
  },
  {
    text: "Shipped to London in under a week. The quality rivals anything from the European fashion houses — and at a fraction of the price.",
    author: 'James T.', location: 'London, UK',
  },
  {
    text: "Had my initials stamped in gold. The craftsmanship is extraordinary. I've been gifting VELLUM pieces to everyone I know.",
    author: 'Fatima K.', location: 'Dubai, UAE',
  },
]

/* ── 15 wallet frames ── */
const FRAMES = [
  { src: '/images/wallet-01-front-closed.png',   label: 'Closed · Hand-stitched cowhide' },
  { src: '/images/wallet-02-opened-30deg.png',   label: 'Opening · Vegetable tanned leather' },
  { src: '/images/wallet-03-opened-45deg.png',   label: 'Opening · Vegetable tanned leather' },
  { src: '/images/wallet-04-opened-60deg.png',   label: 'Opening · Vegetable tanned leather' },
  { src: '/images/wallet-05-opened-85deg.png',   label: 'Opening · Vegetable tanned leather' },
  { src: '/images/wallet-06-opened-100deg.png',  label: 'Opening · Vegetable tanned leather' },
  { src: '/images/wallet-07-opened-130deg.png',  label: 'Opening · Vegetable tanned leather' },
  { src: '/images/wallet-08-opened-180deg.png',  label: 'Open · 8 card slots inside' },
  { src: '/images/wallet-09-closing-130deg.png', label: 'Open · 8 card slots inside' },
  { src: '/images/wallet-10-closing-100deg.png', label: 'Closing · Premium leather' },
  { src: '/images/wallet-11-closing-85deg.png',  label: 'Closing · Premium leather' },
  { src: '/images/wallet-12-closing-60deg.png',  label: 'Closing · Premium leather' },
  { src: '/images/wallet-13-closing-45deg.png',  label: 'Closing · Premium leather' },
  { src: '/images/wallet-14-closing-30deg.png',  label: 'Closing · Premium leather' },
  { src: '/images/wallet-15-back-closed.png',    label: 'Closed · Back side' },
]

/* ── Wallet scroll animation ── */
const WalletScrollSection = () => {
  const sectionRef = useRef(null)
  const wrapRef    = useRef(null)
  const imgRef     = useRef(null)
  const labelRef   = useRef(null)

  // Preload all frames on mount
  useEffect(() => {
    FRAMES.forEach(f => { const i = new Image(); i.src = f.src })
  }, [])

  useEffect(() => {
    let raf = null

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        if (!sectionRef.current || !imgRef.current) return

        const rect   = sectionRef.current.getBoundingClientRect()
        const totalH = sectionRef.current.offsetHeight - window.innerHeight
        const p      = Math.min(1, Math.max(0, -rect.top / totalH))

        // Map progress → frame index
        const frameIndex = Math.min(FRAMES.length - 1, Math.floor(p * FRAMES.length))
        const frame = FRAMES[frameIndex]

        // Swap src only when frame changes (avoids flicker)
        const newSrc = new URL(frame.src, window.location.origin).href
        if (imgRef.current.src !== newSrc) {
          imgRef.current.src = frame.src
        }

        // Label
        if (labelRef.current) labelRef.current.textContent = frame.label

        // Subtle lift + scale
        const lift  = Math.sin(p * Math.PI) * -22
        const scale = 0.9 + p * 0.14
        if (wrapRef.current) {
          wrapRef.current.style.transform = `translateY(${lift.toFixed(1)}px) scale(${scale.toFixed(3)})`
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  return (
    <section ref={sectionRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen bg-deep overflow-hidden flex items-center justify-center">

        {/* Ambient glow */}
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 52%, rgba(139,74,42,0.2) 0%, rgba(201,168,76,0.04) 45%, transparent 70%)' }}
        />

        {/* Left panel */}
        <div className="absolute left-14 top-1/2 -translate-y-1/2 max-w-[280px] z-[2] max-lg:hidden">
          <span className="font-sans text-[0.56rem] tracking-[0.38em] text-gold uppercase block mb-5">
            Signature Piece
          </span>
          <h3 className="font-serif font-light text-[2.6rem] text-cream leading-[1.15] mb-5">
            The Bifold<br />Masterpiece
          </h3>
          <p className="font-sans text-[0.75rem] leading-loose text-cream-dim mb-5">
            Full-grain vegetable tanned leather, hand-stitched with waxed linen thread.
            Built to age beautifully.
          </p>
          {['Full-grain cowhide','8 card slots','Wax thread stitching','6 colour options'].map((f) => (
            <div key={f} className="flex items-center gap-3 mb-2">
              <span className="text-gold text-[0.55rem]">—</span>
              <span className="font-sans text-[0.65rem] tracking-[0.1em] text-cream-dim uppercase">{f}</span>
            </div>
          ))}
        </div>

        {/* Wallet — single <img>, src swapped per frame */}
        <div
          ref={wrapRef}
          className="relative z-[3] will-change-transform"
          style={{
            width: 'min(440px, 70vw)',
            height: 'min(440px, 70vw)',
            transition: 'transform 0.05s linear',
          }}
        >
          <img
            ref={imgRef}
            src={FRAMES[0].src}
            alt="Bifold wallet"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
            style={{ filter: 'drop-shadow(0 28px 56px rgba(0,0,0,0.85))' }}
          />
        </div>

        {/* Right panel */}
        <div className="absolute right-14 top-1/2 -translate-y-1/2 max-w-[280px] text-right z-[2] max-lg:hidden">
          <span className="font-sans text-[0.56rem] tracking-[0.38em] text-gold uppercase block mb-5">
            Inside View
          </span>
          <h3 className="font-serif font-light text-[2.6rem] text-cream leading-[1.15] mb-5">
            Thoughtful<br />Interior
          </h3>
          <p className="font-sans text-[0.75rem] leading-loose text-cream-dim">
            Three card slots each side, a full-length bill compartment,
            and a hidden coin pocket. Organised luxury.
          </p>
        </div>

        {/* Label + scroll indicator */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-center z-[2]">
          <p ref={labelRef}
            className="font-sans text-[0.6rem] tracking-[0.28em] text-cream-dim uppercase mb-6 whitespace-nowrap">
            Closed · Hand-stitched cowhide
          </p>
          <div className="flex flex-col items-center gap-1">
            <span className="font-sans text-[0.52rem] tracking-[0.3em] text-gold-dim uppercase">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent anim-scroll-line" />
          </div>
        </div>

      </div>
    </section>
  )
}

/* ── Home page ── */
const Home = () => {
  const featured = getFeaturedProducts()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main>

      {/* ── Hero ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden px-10 pt-32 pb-20"
        style={{ background: 'linear-gradient(145deg,#faf7f2 0%,#f0ebe0 55%,#e8e0d0 100%)' }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent" />
        <div className="absolute -right-48 -top-48 w-[650px] h-[650px] rounded-full border border-gold/[0.07] pointer-events-none" />
        <div className="absolute -right-28 -top-28 w-[420px] h-[420px] rounded-full border border-gold/[0.05] pointer-events-none" />

        <div className="relative z-10 max-w-[680px]">
          <p className="anim-fade-up anim-d1 font-sans text-[0.6rem] tracking-[0.45em] text-gold uppercase mb-8">
            Handcrafted in Pakistan · Est. 2024
          </p>

          <h1
            className="anim-fade-up anim-d2 font-serif font-light text-black leading-[0.9] mb-8"
            style={{ fontSize: 'clamp(3.5rem,6.5vw,7.5rem)' }}
          >
            The Art of<br />
            <em className="italic text-cognac">Fine Leather</em>
          </h1>

          <div className="anim-fade-up anim-d3 w-14 h-px bg-gold mb-8" />

          <p className="anim-fade-up anim-d3 font-sans text-[0.8rem] leading-loose tracking-[0.05em] text-[#4a3f35] max-w-[460px] mb-10">
            Every wallet, belt, and shoe that leaves our workshop carries with it
            the weight of generations — cut by hand, stitched slowly, finished with care.
          </p>

          <div className="anim-fade-up anim-d4 flex items-center gap-4 flex-wrap">
            <Link
              to="/shop"
              className="inline-block bg-black text-cream font-sans text-[0.65rem]
                tracking-[0.22em] uppercase px-10 py-[1.1rem]
                transition-all duration-300 hover:bg-gold hover:text-black"
            >
              Explore Collection
            </Link>
            <a
              href="#craft"
              className="inline-block border border-black/25 text-black font-sans text-[0.65rem]
                tracking-[0.22em] uppercase px-10 py-[1.1rem]
                transition-all duration-300 hover:border-gold hover:text-gold"
            >
              Our Craft
            </a>
          </div>

          <div className="anim-fade-in flex items-center gap-4 mt-16">
            <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent anim-scroll-line" />
            <span className="font-sans text-[0.55rem] tracking-[0.3em] text-gold-dim uppercase">
              Scroll to see the wallet
            </span>
          </div>
        </div>

        <div className="absolute right-12 bottom-14 text-right max-lg:hidden">
          <p className="font-serif italic text-[1rem] leading-[1.9]" style={{ color: 'rgba(139,74,42,0.35)' }}>
            "Leather is not just a material.<br />It is a commitment to quality."
          </p>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="overflow-hidden border-y border-gold/15 py-3" style={{ background: '#1a1510' }}>
        <div className="anim-marquee flex gap-0 whitespace-nowrap">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="font-sans text-[0.58rem] tracking-[0.3em] text-gold-dim uppercase shrink-0 relative px-10">
              {item}
              <span className="absolute right-[0.5rem] top-1/2 -translate-y-1/2 text-gold text-[0.4rem]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Wallet animation section ── */}
      <WalletScrollSection />

      {/* ── Our Craft ── */}
      <section id="craft" className="relative overflow-hidden bg-ivory">

        {/* TOP HALF — text + stats, full width */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-10 pt-32 pb-20">
          {/* Decorative V */}
          <div
            className="absolute right-0 top-0 font-serif font-light leading-none select-none pointer-events-none"
            style={{ fontSize: '20rem', color: 'rgba(201,168,76,0.04)', lineHeight: 1 }}
          >V</div>

          <div className="grid grid-cols-2 gap-24 items-start max-md:grid-cols-1 max-md:gap-12">
            <div className="reveal">
              <span className="font-sans text-[0.58rem] tracking-[0.35em] text-gold uppercase block mb-5">
                Our Philosophy
              </span>
              <h2
                className="font-serif font-light text-black leading-[1.1] mb-7"
                style={{ fontSize: 'clamp(2.4rem,3.8vw,4rem)' }}
              >
                Every Stitch<br />Tells a <em className="italic text-cognac">Story</em>
              </h2>
              <p className="font-sans text-[0.78rem] leading-[2.1] text-[#4a3f35] mb-5 tracking-[0.03em]">
                We believe that leather goods should outlive trends. Each piece is a meditation on
                patience — cut from hides selected for character, stitched by hand with waxed thread,
                finished with attention that mass production can never replicate.
              </p>
              <p className="font-sans text-[0.78rem] leading-[2.1] text-[#4a3f35] tracking-[0.03em]">
                From Lahore to the world stage, VELLUM carries forward a heritage of Pakistani
                leather craftsmanship into a new era of luxury.
              </p>
            </div>

            {/* Stats — right column, aligned top */}
            <div className="reveal grid grid-cols-2 gap-x-10 gap-y-10 pt-4">
              {STATS.map((s) => (
                <div key={s.label} className="border-t border-gold/25 pt-5">
                  <div className="font-serif text-[2.8rem] text-gold font-light leading-none">{s.num}</div>
                  <div className="font-sans text-[0.58rem] tracking-[0.2em] text-gold-dim uppercase mt-2">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM HALF — full-bleed cinematic image */}
        <div className="reveal relative w-full overflow-hidden" style={{ height: '520px' }}>
          {/* Image fills full width */}
          <img
            src="/images/craftsman.png"
            alt="Master leather craftsman at work"
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: '50% 30%' }}
          />

          {/* Dark gradient overlay top + bottom for blending */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, #faf7f2 0%, transparent 18%, transparent 72%, rgba(14,13,10,0.55) 100%)' }}
          />

          {/* Gold side accent line */}
          <div className="absolute left-10 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/10 to-transparent" />

          {/* Floating quote over image */}
          <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between max-md:flex-col max-md:gap-4">
            <p className="font-serif italic text-cream/90 max-w-[460px]"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.3rem)', lineHeight: 1.8, textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
              "Every tool mark, every stitch — a signature the machine can never forge."
            </p>
            <span className="font-sans text-[0.58rem] tracking-[0.3em] text-gold uppercase shrink-0">
              Est. Lahore, 2012
            </span>
          </div>
        </div>

      </section>

      {/* ── Featured products ── */}
      <section className="py-28 px-10 bg-deep">
        <div className="max-w-[1300px] mx-auto">
          <div className="reveal text-center mb-16">
            <span className="font-sans text-[0.58rem] tracking-[0.38em] text-gold uppercase block mb-3">
              The Collection
            </span>
            <h2 className="font-serif font-light text-cream" style={{ fontSize: 'clamp(2rem,3.5vw,3.2rem)' }}>
              Crafted for the Discerning
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <div className="text-center mt-14">
            <Link
              to="/shop"
              className="reveal inline-block border border-gold/30 text-cream font-sans
                text-[0.65rem] tracking-[0.22em] uppercase px-12 py-4
                transition-all duration-300 hover:border-gold hover:text-gold"
            >
              View Full Collection
            </Link>
          </div>
        </div>
      </section>

      {/* ── Bespoke CTA ── */}
      <section className="relative overflow-hidden py-36 px-10 text-center bg-black">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(139,74,42,0.1) 0%, transparent 70%)' }}
        />
        <div className="relative z-10">
          <div className="reveal w-14 h-px bg-gold mx-auto mb-10" />
          <h2
            className="reveal font-serif font-light text-cream leading-none mb-7"
            style={{ fontSize: 'clamp(2.8rem,6vw,6.5rem)' }}
          >
            Make It <em className="italic text-tan-light">Yours</em>
          </h2>
          <p className="reveal font-sans text-[0.78rem] leading-[2.2] text-cream-dim max-w-[520px] mx-auto mb-12 tracking-[0.04em]">
            Every piece can be customised. Choose your leather, colour, stitching, and monogram.
            We'll craft it to order within 10–14 days.
          </p>
          <Link
            to="/shop"
            className="reveal inline-block bg-gold text-black font-sans text-[0.65rem]
              tracking-[0.22em] uppercase px-12 py-4
              transition-all duration-300 hover:bg-gold-light"
          >
            Start Bespoke Order
          </Link>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-28 px-10 bg-ivory">
        <div className="max-w-[1180px] mx-auto">
          <div className="reveal text-center mb-16">
            <span className="font-sans text-[0.58rem] tracking-[0.38em] text-gold uppercase block mb-3">
              Client Words
            </span>
            <h2 className="font-serif font-light text-[2.6rem] text-black">What They Say</h2>
          </div>
          <div className="grid grid-cols-3 gap-12 max-md:grid-cols-1 max-md:gap-10">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="reveal relative pt-8">
                <span
                  className="absolute -top-4 -left-1 font-serif leading-none select-none"
                  style={{ fontSize: '5.5rem', color: 'rgba(201,168,76,0.13)' }}
                >"</span>
                <p className="font-serif italic text-[1.02rem] leading-[1.9] text-[#4a3f35] mb-6">{t.text}</p>
                <p className="font-sans text-[0.58rem] tracking-[0.2em] text-gold uppercase">{t.author}</p>
                <p className="font-sans text-[0.58rem] text-gold-dim mt-1">{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-28 px-10 text-center bg-deep">
        <div className="reveal max-w-[500px] mx-auto">
          <span className="font-sans text-[0.58rem] tracking-[0.38em] text-gold uppercase block mb-4">
            Stay in the Loop
          </span>
          <h2
            className="font-serif font-light text-cream mb-4"
            style={{ fontSize: 'clamp(1.8rem,3vw,3rem)' }}
          >
            Join the Inner Circle
          </h2>
          <p className="font-sans text-[0.72rem] text-cream-dim tracking-[0.08em] mb-10">
            New drops, bespoke availability, and the occasional story from the workshop.
          </p>
          <form className="flex" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-surface border border-gold/20 border-r-0 text-cream
                px-6 py-[1rem] font-sans text-[0.72rem] tracking-[0.06em]
                outline-none placeholder:text-cream-dim/50"
            />
            <button
              type="submit"
              className="bg-gold border border-gold text-black px-8 font-sans
                text-[0.62rem] tracking-[0.2em] uppercase
                transition-all duration-300 hover:bg-gold-light"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </main>
  )
}

export default Home
