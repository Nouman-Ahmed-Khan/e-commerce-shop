import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const VISUALS = {
  'The Classic Bifold':  'linear-gradient(145deg,#5c3218 0%,#3a1f0a 60%,#2a1508 100%)',
  'The Slim Cardholder': 'linear-gradient(145deg,#c4956a 0%,#8b5e3c 60%,#5a3518 100%)',
  'The Oxford Derby':    'linear-gradient(145deg,#2a1f18 0%,#1a1208 60%,#0e0a05 100%)',
  'The Heritage Belt':   'linear-gradient(145deg,#8b4a2a 0%,#5c2e18 60%,#3a1c0a 100%)',
  'The Trifold Wallet':  'linear-gradient(145deg,#4a2c18 0%,#2e1a0a 60%,#1a0e05 100%)',
  'The Messenger Bag':   'linear-gradient(145deg,#c4956a 0%,#8b5e3c 60%,#5a3518 100%)',
}

/* Simplified inline SVG illustrations — one per product type */
const Illustration = ({ name }) => {
  const isBifold  = name.includes('Bifold') || name.includes('Trifold')
  const isCard    = name.includes('Cardholder')
  const isShoe    = name.includes('Oxford') || name.includes('Derby')
  const isBelt    = name.includes('Belt')
  const isBag     = name.includes('Bag')

  if (isBifold) return (
    <svg viewBox="0 0 400 280" className="w-3/4 drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)]">
      <defs><radialGradient id={`bg${name[4]}`} cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#c4956a"/><stop offset="45%" stopColor="#7a4a28"/><stop offset="100%" stopColor="#2a1508"/>
      </radialGradient></defs>
      <rect x="20" y="40" width="360" height="200" rx="12" fill={`url(#bg${name[4]})`}/>
      <rect x="32" y="52" width="336" height="176" rx="7" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="1.2" strokeDasharray="5 4"/>
      <line x1="200" y1="40" x2="200" y2="240" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
      <rect x="35" y="65" width="148" height="90" rx="6" fill="rgba(0,0,0,0.28)"/>
      <rect x="218" y="65" width="148" height="90" rx="6" fill="rgba(0,0,0,0.22)"/>
      <rect x="186" y="125" width="28" height="20" rx="4" fill="#c9a84c" opacity="0.9"/>
      <text x="200" y="224" textAnchor="middle" fontFamily="serif" fontSize="9" fill="rgba(201,168,76,0.5)" letterSpacing="4">VELLUM</text>
    </svg>
  )

  if (isCard) return (
    <svg viewBox="0 0 300 220" className="w-[60%] drop-shadow-[0_16px_32px_rgba(0,0,0,0.45)]">
      <defs><radialGradient id="cgr" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#d4a97e"/><stop offset="50%" stopColor="#8b5e3c"/><stop offset="100%" stopColor="#3a1f08"/>
      </radialGradient></defs>
      <rect x="60" y="30" width="180" height="150" rx="10" fill="url(#cgr)"/>
      <rect x="70" y="40" width="160" height="130" rx="6" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1" strokeDasharray="4 4"/>
      <rect x="70" y="55" width="160" height="28" rx="4" fill="rgba(0,0,0,0.2)"/>
      <rect x="70" y="89" width="160" height="28" rx="4" fill="rgba(0,0,0,0.15)"/>
      <rect x="70" y="123" width="160" height="28" rx="4" fill="rgba(0,0,0,0.12)"/>
      <text x="150" y="170" textAnchor="middle" fontFamily="serif" fontSize="7" fill="rgba(201,168,76,0.5)" letterSpacing="3">VELLUM</text>
    </svg>
  )

  if (isShoe) return (
    <svg viewBox="0 0 400 280" className="w-[80%] drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)]">
      <defs><radialGradient id="sgr" cx="35%" cy="25%" r="75%">
        <stop offset="0%" stopColor="#5c3018"/><stop offset="50%" stopColor="#2a1508"/><stop offset="100%" stopColor="#0e0804"/>
      </radialGradient></defs>
      <path d="M30 190 Q60 110 140 95 L290 90 Q340 93 345 140 Q350 180 320 200 Q250 220 120 225 Q60 225 30 205Z" fill="url(#sgr)"/>
      <path d="M28 205 Q50 235 120 240 Q240 248 325 215 Q345 205 345 195 L345 205 Q330 228 240 238 Q120 248 45 225Z" fill="#1a0e06"/>
      <rect x="130" y="93" width="160" height="52" rx="4" fill="rgba(0,0,0,0.25)"/>
      <line x1="140" y1="106" x2="278" y2="106" stroke="rgba(201,168,76,0.35)" strokeWidth="1"/>
      <line x1="140" y1="118" x2="278" y2="118" stroke="rgba(201,168,76,0.28)" strokeWidth="1"/>
      <line x1="140" y1="130" x2="278" y2="130" stroke="rgba(201,168,76,0.22)" strokeWidth="1"/>
    </svg>
  )

  if (isBelt) return (
    <svg viewBox="0 0 420 200" className="w-[80%] drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]">
      <defs><radialGradient id="bgr" cx="50%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#b07840"/><stop offset="100%" stopColor="#3a1f08"/>
      </radialGradient></defs>
      <rect x="15" y="70" width="390" height="65" rx="8" fill="url(#bgr)"/>
      <rect x="168" y="60" width="84" height="85" rx="5" fill="#c9a84c" opacity="0.9"/>
      <rect x="176" y="68" width="68" height="69" rx="3" fill="#8a6f30"/>
      <circle cx="210" cy="102" r="16" fill="none" stroke="#c9a84c" strokeWidth="2.5"/>
      <circle cx="210" cy="102" r="6" fill="#c9a84c" opacity="0.7"/>
      <circle cx="80" cy="102" r="4.5" fill="rgba(0,0,0,0.5)"/>
      <circle cx="105" cy="102" r="4.5" fill="rgba(0,0,0,0.4)"/>
      <circle cx="130" cy="102" r="4.5" fill="rgba(0,0,0,0.35)"/>
    </svg>
  )

  if (isBag) return (
    <svg viewBox="0 0 380 320" className="w-3/4 drop-shadow-[0_16px_36px_rgba(0,0,0,0.5)]">
      <defs><radialGradient id="bagr" cx="35%" cy="25%" r="70%">
        <stop offset="0%" stopColor="#d4a97e"/><stop offset="50%" stopColor="#8b5e3c"/><stop offset="100%" stopColor="#3a1f08"/>
      </radialGradient></defs>
      <rect x="155" y="10" width="30" height="70" rx="6" fill="url(#bagr)" opacity="0.85"/>
      <rect x="30" y="75" width="320" height="220" rx="14" fill="url(#bagr)"/>
      <rect x="42" y="87" width="296" height="196" rx="9" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1.2" strokeDasharray="5 4"/>
      <rect x="55" y="110" width="270" height="120" rx="8" fill="rgba(0,0,0,0.18)"/>
      <rect x="170" y="102" width="40" height="24" rx="5" fill="#c9a84c" opacity="0.9"/>
      <text x="190" y="274" textAnchor="middle" fontFamily="serif" fontSize="9" fill="rgba(201,168,76,0.45)" letterSpacing="4">VELLUM</text>
    </svg>
  )

  return <div className="w-24 h-24 bg-gold/20 rounded-sm" />
}

const ProductCard = ({ product, index = 0 }) => {
  const { addItem, openDrawer } = useCart()
  const bg = VISUALS[product.name] || 'linear-gradient(145deg,#5c3218,#2a1508)'

  const handleAdd = (e) => {
    e.preventDefault()
    addItem(product, product.colors[0].name)
    openDrawer()
  }

  return (
    <Link
      to={`/product/${product.slug}`}
      className="reveal relative block bg-white border border-gold/[0.12] overflow-hidden
        transition-all duration-400 shadow-[0_2px_20px_rgba(0,0,0,0.05)]
        hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      {/* Tag badge */}
      {product.tag && (
        <span className="absolute top-4 left-4 z-[2] bg-gold text-black font-sans
          text-[0.5rem] tracking-[0.14em] uppercase px-3 py-1">
          {product.tag}
        </span>
      )}

      {/* Image / illustration area */}
      <div
        className="aspect-[4/3] flex items-center justify-center relative overflow-hidden"
        style={{ background: bg }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_40%_35%,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
        <Illustration name={product.name} />
      </div>

      {/* Info */}
      <div className="px-6 pt-5 pb-6 border-t border-gold/10">

        {/* Colour swatches */}
        <div className="flex items-center gap-[5px] mb-3">
          {product.colors.slice(0, 5).map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="inline-block w-[10px] h-[10px] rounded-full border border-black/10"
              style={{ background: c.hex }}
            />
          ))}
          {product.colors.length > 5 && (
            <span className="text-[0.52rem] text-gold-dim ml-1">+{product.colors.length - 5}</span>
          )}
        </div>

        <p className="font-serif font-light text-[1.25rem] text-black mb-[2px]">{product.name}</p>
        <p className="font-sans text-[0.56rem] tracking-[0.2em] text-gold uppercase mb-4">{product.subtitle}</p>

        <div className="flex items-center justify-between">
          <p className="font-serif text-[1.15rem] text-black">PKR {product.price.toLocaleString()}</p>
          <button
            onClick={handleAdd}
            className="border border-gold/30 text-black font-sans text-[0.56rem]
              tracking-[0.14em] uppercase px-4 py-2 bg-transparent
              transition-all duration-300 hover:bg-gold hover:border-gold hover:text-black"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
