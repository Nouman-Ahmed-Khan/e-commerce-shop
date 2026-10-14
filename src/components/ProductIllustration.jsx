/* ProductIllustration — reusable SVG illustration per product type.
   Extracted from ProductCard.jsx. Accepts a `name` prop identical
   to the product name string. Do not modify SVG artwork here. */

import { useId } from 'react'

const ProductIllustration = ({ name }) => {
  const uid = useId()

  const isBifold = name.includes('Bifold') || name.includes('Trifold')
  const isCard   = name.includes('Cardholder')
  const isShoe   = name.includes('Oxford') || name.includes('Derby')
  const isBelt   = name.includes('Belt')
  const isBag    = name.includes('Bag')

  if (isBifold) {
    const id = `${uid}-bf`
    return (
      <svg viewBox="0 0 400 280" className="w-3/4 drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)]">
        <defs><radialGradient id={id} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#c4956a"/><stop offset="45%" stopColor="#7a4a28"/><stop offset="100%" stopColor="#2a1508"/>
        </radialGradient></defs>
        <rect x="20" y="40" width="360" height="200" rx="12" fill={`url(#${id})`}/>
        <rect x="32" y="52" width="336" height="176" rx="7" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="1.2" strokeDasharray="5 4"/>
        <line x1="200" y1="40" x2="200" y2="240" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
        <rect x="35" y="65" width="148" height="90" rx="6" fill="rgba(0,0,0,0.28)"/>
        <rect x="218" y="65" width="148" height="90" rx="6" fill="rgba(0,0,0,0.22)"/>
        <rect x="186" y="125" width="28" height="20" rx="4" fill="#c9a84c" opacity="0.9"/>
        <text x="200" y="224" textAnchor="middle" fontFamily="serif" fontSize="9" fill="rgba(201,168,76,0.5)" letterSpacing="4">VELLUM</text>
      </svg>
    )
  }

  if (isCard) {
    const id = `${uid}-cg`
    return (
      <svg viewBox="0 0 300 220" className="w-[60%] drop-shadow-[0_16px_32px_rgba(0,0,0,0.45)]">
        <defs><radialGradient id={id} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#d4a97e"/><stop offset="50%" stopColor="#8b5e3c"/><stop offset="100%" stopColor="#3a1f08"/>
        </radialGradient></defs>
        <rect x="60" y="30" width="180" height="150" rx="10" fill={`url(#${id})`}/>
        <rect x="70" y="40" width="160" height="130" rx="6" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1" strokeDasharray="4 4"/>
        <rect x="70" y="55" width="160" height="28" rx="4" fill="rgba(0,0,0,0.2)"/>
        <rect x="70" y="89" width="160" height="28" rx="4" fill="rgba(0,0,0,0.15)"/>
        <rect x="70" y="123" width="160" height="28" rx="4" fill="rgba(0,0,0,0.12)"/>
        <text x="150" y="170" textAnchor="middle" fontFamily="serif" fontSize="7" fill="rgba(201,168,76,0.5)" letterSpacing="3">VELLUM</text>
      </svg>
    )
  }

  if (isShoe) {
    const id = `${uid}-sg`
    return (
      <svg viewBox="0 0 400 280" className="w-[80%] drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)]">
        <defs><radialGradient id={id} cx="35%" cy="25%" r="75%">
          <stop offset="0%" stopColor="#5c3018"/><stop offset="50%" stopColor="#2a1508"/><stop offset="100%" stopColor="#0e0804"/>
        </radialGradient></defs>
        <path d="M30 190 Q60 110 140 95 L290 90 Q340 93 345 140 Q350 180 320 200 Q250 220 120 225 Q60 225 30 205Z" fill={`url(#${id})`}/>
        <path d="M28 205 Q50 235 120 240 Q240 248 325 215 Q345 205 345 195 L345 205 Q330 228 240 238 Q120 248 45 225Z" fill="#1a0e06"/>
        <rect x="130" y="93" width="160" height="52" rx="4" fill="rgba(0,0,0,0.25)"/>
        <line x1="140" y1="106" x2="278" y2="106" stroke="rgba(201,168,76,0.35)" strokeWidth="1"/>
        <line x1="140" y1="118" x2="278" y2="118" stroke="rgba(201,168,76,0.28)" strokeWidth="1"/>
        <line x1="140" y1="130" x2="278" y2="130" stroke="rgba(201,168,76,0.22)" strokeWidth="1"/>
      </svg>
    )
  }

  if (isBelt) {
    const id = `${uid}-bg`
    return (
      <svg viewBox="0 0 420 200" className="w-[80%] drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]">
        <defs><radialGradient id={id} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#b07840"/><stop offset="100%" stopColor="#3a1f08"/>
        </radialGradient></defs>
        <rect x="15" y="70" width="390" height="65" rx="8" fill={`url(#${id})`}/>
        <rect x="168" y="60" width="84" height="85" rx="5" fill="#c9a84c" opacity="0.9"/>
        <rect x="176" y="68" width="68" height="69" rx="3" fill="#8a6f30"/>
        <circle cx="210" cy="102" r="16" fill="none" stroke="#c9a84c" strokeWidth="2.5"/>
        <circle cx="210" cy="102" r="6" fill="#c9a84c" opacity="0.7"/>
        <circle cx="80" cy="102" r="4.5" fill="rgba(0,0,0,0.5)"/>
        <circle cx="105" cy="102" r="4.5" fill="rgba(0,0,0,0.4)"/>
        <circle cx="130" cy="102" r="4.5" fill="rgba(0,0,0,0.35)"/>
      </svg>
    )
  }

  if (isBag) {
    const id = `${uid}-bag`
    return (
      <svg viewBox="0 0 380 320" className="w-3/4 drop-shadow-[0_16px_36px_rgba(0,0,0,0.5)]">
        <defs><radialGradient id={id} cx="35%" cy="25%" r="70%">
          <stop offset="0%" stopColor="#d4a97e"/><stop offset="50%" stopColor="#8b5e3c"/><stop offset="100%" stopColor="#3a1f08"/>
        </radialGradient></defs>
        <rect x="155" y="10" width="30" height="70" rx="6" fill={`url(#${id})`} opacity="0.85"/>
        <rect x="30" y="75" width="320" height="220" rx="14" fill={`url(#${id})`}/>
        <rect x="42" y="87" width="296" height="196" rx="9" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1.2" strokeDasharray="5 4"/>
        <rect x="55" y="110" width="270" height="120" rx="8" fill="rgba(0,0,0,0.18)"/>
        <rect x="170" y="102" width="40" height="24" rx="5" fill="#c9a84c" opacity="0.9"/>
        <text x="190" y="274" textAnchor="middle" fontFamily="serif" fontSize="9" fill="rgba(201,168,76,0.45)" letterSpacing="4">VELLUM</text>
      </svg>
    )
  }

  return <div className="w-24 h-24 bg-gold/20 rounded-sm" />
}

export default ProductIllustration
