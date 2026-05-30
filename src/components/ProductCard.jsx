import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

// Cache generated images in memory so we don't re-fetch on re-render
const imageCache = {}

const generateProductImage = async (productName, category) => {
  if (imageCache[productName]) return imageCache[productName]

  const prompts = {
    'The Classic Bifold':    'A premium dark brown full-grain leather bifold wallet, closed, floating on a pure white background, professional studio product photography, soft shadows, luxury fashion editorial style, highly detailed leather texture, stitching visible',
    'The Slim Cardholder':   'A minimalist tan leather slim card holder wallet on a pure white background, professional studio product photography, soft shadows, luxury editorial, vegetable tanned leather texture clearly visible',
    'The Oxford Derby':      'A pair of classic dark brown oxford derby leather shoes, floating on white background, studio product photography, goodyear welted sole visible, luxury fashion editorial, highly polished leather',
    'The Heritage Belt':     'A premium cognac leather belt with solid brass buckle, coiled elegantly on a white background, studio product photography, luxury editorial, detailed leather grain texture',
    'The Trifold Wallet':    'A dark brown full-grain leather trifold wallet, slightly open showing card slots, white background, professional studio product photography, luxury fashion editorial, detailed stitching',
    'The Messenger Bag':     'A premium tan full-grain leather messenger bag with brass hardware, white background, professional studio product photography, luxury fashion editorial, detailed leather texture and stitching',
  }

  const prompt = prompts[productName] || `A premium leather ${category} product on white background, studio photography, luxury editorial`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `Generate a detailed image description as SVG data URL for: ${prompt}. 
          Respond with ONLY a valid data URL starting with "data:image/svg+xml;base64," that represents a beautiful product illustration. 
          Actually, instead respond with JSON: {"placeholder": true, "color": "#8b4a2a", "name": "${productName}"}`
        }]
      })
    })
    // Since we can't actually generate images via text API, we'll use smart placeholders
    imageCache[productName] = null
    return null
  } catch {
    return null
  }
}

// Smart product placeholder colors and icons based on product
const PRODUCT_VISUALS = {
  'The Classic Bifold':   { bg: 'linear-gradient(145deg, #5c3218 0%, #3a1f0a 60%, #2a1508 100%)', accent: '#c9a84c' },
  'The Slim Cardholder':  { bg: 'linear-gradient(145deg, #c4956a 0%, #8b5e3c 60%, #5a3518 100%)', accent: '#e8cc85' },
  'The Oxford Derby':     { bg: 'linear-gradient(145deg, #2a1f18 0%, #1a1208 60%, #0e0a05 100%)', accent: '#c9a84c' },
  'The Heritage Belt':    { bg: 'linear-gradient(145deg, #8b4a2a 0%, #5c2e18 60%, #3a1c0a 100%)', accent: '#e8cc85' },
  'The Trifold Wallet':   { bg: 'linear-gradient(145deg, #4a2c18 0%, #2e1a0a 60%, #1a0e05 100%)', accent: '#c9a84c' },
  'The Messenger Bag':    { bg: 'linear-gradient(145deg, #c4956a 0%, #8b5e3c 60%, #5a3518 100%)', accent: '#e8cc85' },
}

// Beautiful SVG product illustrations
const ProductIllustration = ({ name }) => {
  const v = PRODUCT_VISUALS[name] || { bg: 'linear-gradient(145deg, #5c3218, #2a1508)', accent: '#c9a84c' }

  if (name === 'The Classic Bifold' || name === 'The Trifold Wallet') {
    return (
      <svg viewBox="0 0 400 280" style={{ width: '75%', height: '75%', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}>
        <defs>
          <radialGradient id={`wg_${name.replace(/\s/g,'')}`} cx="35%" cy="30%" r="70%">
            <stop offset="0%"   stopColor="#c4956a"/>
            <stop offset="40%"  stopColor="#7a4a28"/>
            <stop offset="100%" stopColor="#2a1508"/>
          </radialGradient>
          <radialGradient id={`wgi_${name.replace(/\s/g,'')}`} cx="60%" cy="40%" r="65%">
            <stop offset="0%"   stopColor="#a07050"/>
            <stop offset="100%" stopColor="#3a1f08"/>
          </radialGradient>
        </defs>
        {/* Wallet body */}
        <rect x="20" y="40" width="360" height="200" rx="12" fill={`url(#wg_${name.replace(/\s/g,'')})`}/>
        {/* Stitching */}
        <rect x="32" y="52" width="336" height="176" rx="7" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="1.2" strokeDasharray="5 4"/>
        {/* Fold line */}
        <line x1="200" y1="40" x2="200" y2="240" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
        {/* Left card slot */}
        <rect x="35" y="65" width="148" height="90" rx="6" fill="rgba(0,0,0,0.28)"/>
        <rect x="44" y="74" width="130" height="3" rx="1.5" fill="rgba(201,168,76,0.25)"/>
        <rect x="44" y="82" width="95"  height="2" rx="1"   fill="rgba(255,255,255,0.07)"/>
        {/* Right card slot */}
        <rect x="218" y="65" width="148" height="90" rx="6" fill="rgba(0,0,0,0.22)"/>
        <rect x="228" y="74" width="130" height="3" rx="1.5" fill="rgba(201,168,76,0.2)"/>
        {/* Clasp */}
        <rect x="186" y="125" width="28" height="20" rx="4" fill="#c9a84c" opacity="0.9"/>
        <circle cx="200" cy="135" r="5.5" fill="#8a6f30"/>
        <circle cx="200" cy="135" r="2.5" fill="rgba(201,168,76,0.5)"/>
        {/* Brand */}
        <text x="200" y="224" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="9" fill="rgba(201,168,76,0.5)" letterSpacing="4">VELLUM</text>
        {/* Top highlight */}
        <rect x="20" y="40" width="360" height="5" rx="2" fill="rgba(255,255,255,0.09)"/>
        {/* Shadow */}
        <ellipse cx="200" cy="258" rx="150" ry="10" fill="rgba(0,0,0,0.25)"/>
      </svg>
    )
  }

  if (name === 'The Slim Cardholder') {
    return (
      <svg viewBox="0 0 300 220" style={{ width: '65%', height: '65%', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.35))' }}>
        <defs>
          <radialGradient id="chGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%"   stopColor="#d4a97e"/>
            <stop offset="50%"  stopColor="#8b5e3c"/>
            <stop offset="100%" stopColor="#3a1f08"/>
          </radialGradient>
        </defs>
        <rect x="60" y="30" width="180" height="150" rx="10" fill="url(#chGrad)"/>
        <rect x="70" y="40" width="160" height="130" rx="6" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1" strokeDasharray="4 4"/>
        {/* Card slots */}
        <rect x="70" y="55"  width="160" height="30" rx="4" fill="rgba(0,0,0,0.2)"/>
        <rect x="70" y="90"  width="160" height="30" rx="4" fill="rgba(0,0,0,0.15)"/>
        <rect x="70" y="125" width="160" height="30" rx="4" fill="rgba(0,0,0,0.12)"/>
        <text x="150" y="170" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="7" fill="rgba(201,168,76,0.5)" letterSpacing="3">VELLUM</text>
        <rect x="60" y="30" width="180" height="4" rx="2" fill="rgba(255,255,255,0.1)"/>
        <ellipse cx="150" cy="192" rx="90" ry="7" fill="rgba(0,0,0,0.2)"/>
      </svg>
    )
  }

  if (name === 'The Oxford Derby') {
    return (
      <svg viewBox="0 0 400 280" style={{ width: '80%', height: '80%', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}>
        <defs>
          <radialGradient id="shoeGrad" cx="35%" cy="25%" r="75%">
            <stop offset="0%"   stopColor="#5c3018"/>
            <stop offset="50%"  stopColor="#2a1508"/>
            <stop offset="100%" stopColor="#0e0804"/>
          </radialGradient>
        </defs>
        {/* Shoe upper */}
        <path d="M30 190 Q60 110 140 95 L290 90 Q340 93 345 140 Q350 180 320 200 Q250 220 120 225 Q60 225 30 205 Z" fill="url(#shoeGrad)"/>
        {/* Shine */}
        <path d="M50 175 Q80 130 130 118 L220 115" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" strokeLinecap="round"/>
        {/* Sole */}
        <path d="M28 205 Q50 235 120 240 Q240 248 325 215 Q345 205 345 195 L345 205 Q330 228 240 238 Q120 248 45 225 Z" fill="#1a0e06"/>
        {/* Welt line */}
        <path d="M32 204 Q55 218 120 224 Q240 234 324 204" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5"/>
        {/* Lace area */}
        <rect x="130" y="93" width="160" height="52" rx="4" fill="rgba(0,0,0,0.25)"/>
        <line x1="140" y1="106" x2="278" y2="106" stroke="rgba(201,168,76,0.35)" strokeWidth="1"/>
        <line x1="140" y1="118" x2="278" y2="118" stroke="rgba(201,168,76,0.28)" strokeWidth="1"/>
        <line x1="140" y1="130" x2="278" y2="130" stroke="rgba(201,168,76,0.22)" strokeWidth="1"/>
        {/* Brand */}
        <text x="100" y="208" fontFamily="'Josefin Sans',sans-serif" fontSize="6" fill="rgba(201,168,76,0.4)" letterSpacing="2">VELLUM</text>
        <ellipse cx="188" cy="255" rx="140" ry="10" fill="rgba(0,0,0,0.2)"/>
      </svg>
    )
  }

  if (name === 'The Heritage Belt') {
    return (
      <svg viewBox="0 0 420 200" style={{ width: '80%', height: '80%', filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.35))' }}>
        <defs>
          <radialGradient id="beltGrad" cx="50%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#b07840"/>
            <stop offset="100%" stopColor="#3a1f08"/>
          </radialGradient>
        </defs>
        <rect x="15" y="70" width="390" height="65" rx="8" fill="url(#beltGrad)"/>
        <rect x="25" y="80" width="370" height="45" rx="4" fill="none" stroke="rgba(201,168,76,0.25)" strokeWidth="1" strokeDasharray="4 4"/>
        {/* Buckle */}
        <rect x="168" y="60" width="84" height="85" rx="5" fill="#c9a84c" opacity="0.9"/>
        <rect x="176" y="68" width="68" height="69" rx="3" fill="#8a6f30"/>
        <circle cx="210" cy="102" r="16" fill="none" stroke="#c9a84c" strokeWidth="2.5"/>
        <circle cx="210" cy="102" r="6" fill="#c9a84c" opacity="0.7"/>
        {/* Belt holes */}
        <circle cx="80"  cy="102" r="4.5" fill="rgba(0,0,0,0.5)"/>
        <circle cx="105" cy="102" r="4.5" fill="rgba(0,0,0,0.4)"/>
        <circle cx="130" cy="102" r="4.5" fill="rgba(0,0,0,0.35)"/>
        {/* Stitching */}
        <line x1="15"  y1="82"  x2="165" y2="82"  stroke="rgba(201,168,76,0.3)" strokeWidth="0.8" strokeDasharray="3 3"/>
        <line x1="255" y1="82"  x2="405" y2="82"  stroke="rgba(201,168,76,0.3)" strokeWidth="0.8" strokeDasharray="3 3"/>
        <line x1="15"  y1="122" x2="165" y2="122" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8" strokeDasharray="3 3"/>
        <line x1="255" y1="122" x2="405" y2="122" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8" strokeDasharray="3 3"/>
        <ellipse cx="210" cy="148" rx="160" ry="8" fill="rgba(0,0,0,0.2)"/>
      </svg>
    )
  }

  if (name === 'The Messenger Bag') {
    return (
      <svg viewBox="0 0 380 320" style={{ width: '75%', height: '75%', filter: 'drop-shadow(0 20px 45px rgba(0,0,0,0.4))' }}>
        <defs>
          <radialGradient id="bagGrad" cx="35%" cy="25%" r="70%">
            <stop offset="0%"   stopColor="#d4a97e"/>
            <stop offset="50%"  stopColor="#8b5e3c"/>
            <stop offset="100%" stopColor="#3a1f08"/>
          </radialGradient>
        </defs>
        {/* Strap */}
        <rect x="155" y="10" width="30" height="70" rx="6" fill="url(#bagGrad)" opacity="0.85"/>
        {/* Bag body */}
        <rect x="30" y="75" width="320" height="220" rx="14" fill="url(#bagGrad)"/>
        <rect x="42" y="87" width="296" height="196" rx="9" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1.2" strokeDasharray="5 4"/>
        {/* Front pocket */}
        <rect x="55" y="110" width="270" height="120" rx="8" fill="rgba(0,0,0,0.18)"/>
        {/* Buckle on pocket */}
        <rect x="170" y="102" width="40" height="24" rx="5" fill="#c9a84c" opacity="0.9"/>
        <rect x="178" y="108" width="24" height="12" rx="2" fill="#8a6f30"/>
        {/* Brand */}
        <text x="190" y="274" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="9" fill="rgba(201,168,76,0.45)" letterSpacing="4">VELLUM</text>
        {/* Brass D-rings */}
        <circle cx="50"  cy="85" r="8" fill="none" stroke="#c9a84c" strokeWidth="2.5" opacity="0.8"/>
        <circle cx="330" cy="85" r="8" fill="none" stroke="#c9a84c" strokeWidth="2.5" opacity="0.8"/>
        <rect x="30" y="75" width="320" height="5" rx="2" fill="rgba(255,255,255,0.08)"/>
        <ellipse cx="190" cy="305" rx="140" ry="10" fill="rgba(0,0,0,0.25)"/>
      </svg>
    )
  }

  // Default fallback
  return (
    <svg viewBox="0 0 300 220" style={{ width: '65%', height: '65%' }}>
      <rect x="30" y="30" width="240" height="160" rx="10" fill="rgba(139,74,42,0.4)"/>
      <text x="150" y="120" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="14" fill="rgba(201,168,76,0.5)">{name}</text>
    </svg>
  )
}

const ProductCard = ({ product, index = 0 }) => {
  const { addItem, openDrawer } = useCart()
  const visual = PRODUCT_VISUALS[product.name] || { bg: 'linear-gradient(145deg,#5c3218,#2a1508)', accent: '#c9a84c' }

  const handleAdd = (e) => {
    e.preventDefault()
    addItem(product, product.colors[0].name)
    openDrawer()
  }

  return (
    <Link
      to={`/product/${product.slug}`}
      className="reveal"
      style={{
        display: 'block', textDecoration: 'none', color: 'inherit',
        background: '#ffffff',
        border: '1px solid rgba(201,168,76,0.12)',
        borderRadius: '2px',
        overflow: 'hidden',
        transition: 'all 0.4s ease',
        transitionDelay: `${index * 0.08}s`,
        boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
        position: 'relative',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.14)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)' }}
    >
      {product.tag && (
        <span style={{
          position: 'absolute', top: '1rem', left: '1rem', zIndex: 2,
          background: '#c9a84c', color: '#080806',
          fontFamily: "'Josefin Sans',sans-serif",
          fontSize: '0.52rem', letterSpacing: '0.15em',
          textTransform: 'uppercase', padding: '0.28rem 0.65rem',
        }}>{product.tag}</span>
      )}

      {/* Product image area */}
      <div style={{
        background: visual.bg,
        aspectRatio: '4/3',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle texture */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 60% at 40% 35%, rgba(255,255,255,0.06) 0%, transparent 70%)',
        }}/>
        <ProductIllustration name={product.name} />
      </div>

      {/* Info */}
      <div style={{
        padding: '1.4rem 1.5rem 1.5rem',
        borderTop: '1px solid rgba(201,168,76,0.1)',
        background: '#ffffff',
      }}>
        {/* Color dots */}
        <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.9rem' }}>
          {product.colors.slice(0, 5).map((c) => (
            <span key={c.name} title={c.name} style={{
              width: '10px', height: '10px', borderRadius: '50%',
              background: c.hex, border: '1px solid rgba(0,0,0,0.1)',
              display: 'inline-block',
            }}/>
          ))}
          {product.colors.length > 5 && (
            <span style={{ fontSize: '0.55rem', color: '#8a6f30', alignSelf: 'center', marginLeft: '2px' }}>
              +{product.colors.length - 5}
            </span>
          )}
        </div>

        <div style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: '1.3rem', fontWeight: 300,
          color: '#1a1510', marginBottom: '0.25rem',
        }}>{product.name}</div>

        <div style={{
          fontSize: '0.58rem', letterSpacing: '0.2em',
          color: '#c9a84c', textTransform: 'uppercase',
          marginBottom: '1.1rem',
        }}>{product.subtitle}</div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: '1.2rem', color: '#1a1510',
          }}>PKR {product.price.toLocaleString()}</div>

          <button onClick={handleAdd} style={{
            background: 'none',
            border: '1px solid rgba(201,168,76,0.3)',
            color: '#4a3f35',
            fontFamily: "'Josefin Sans',sans-serif",
            fontSize: '0.58rem', letterSpacing: '0.15em',
            textTransform: 'uppercase', padding: '0.4rem 1rem',
            cursor: 'pointer', transition: 'all 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#c9a84c'; e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#080806' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.color = '#4a3f35' }}
          >Add to Cart</button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
