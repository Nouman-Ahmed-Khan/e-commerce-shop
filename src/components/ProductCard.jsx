import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ProductIllustration from './ProductIllustration'

const VISUALS = {
  'The Classic Bifold':  'linear-gradient(145deg,#5c3218 0%,#3a1f0a 60%,#2a1508 100%)',
  'The Slim Cardholder': 'linear-gradient(145deg,#c4956a 0%,#8b5e3c 60%,#5a3518 100%)',
  'The Heritage Belt':   'linear-gradient(145deg,#8b4a2a 0%,#5c2e18 60%,#3a1c0a 100%)',
  'The Trifold Wallet':  'linear-gradient(145deg,#4a2c18 0%,#2e1a0a 60%,#1a0e05 100%)',
  'The Messenger Bag':   'linear-gradient(145deg,#c4956a 0%,#8b5e3c 60%,#5a3518 100%)',
}

/* Card-level image with fallback to illustration */
const CardImage = ({ product, bg }) => {
  const [failed, setFailed] = useState(false)
  const src = product.images?.[0]

  return (
    <div
      className="aspect-[4/3] flex items-center justify-center relative overflow-hidden"
      style={{ background: src && !failed ? '#1a1510' : bg }}
    >
      {/* Radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_40%_35%,rgba(255,255,255,0.05)_0%,transparent_70%)]" />

      {/* Product visual — object-contain keeps full shoe visible */}
      {src && !failed ? (
        <img
          src={src}
          alt={product.name}
          className="relative z-[1] w-full h-full object-contain p-3"
          onError={() => setFailed(true)}
        />
      ) : (
        <ProductIllustration name={product.name} />
      )}

      {/* VELLUM watermark — top-right of image area */}
      <span
        className="absolute top-3 right-3 z-[3] font-serif font-light
          text-[0.52rem] tracking-[0.28em] select-none pointer-events-none"
        style={{ color: 'rgba(201,168,76,0.55)' }}
      >
        VELLUM
      </span>
    </div>
  )
}

const ProductCard = ({ product, index = 0 }) => {
  const { addItem, openDrawer } = useCart()
  const bg = VISUALS[product.name] || 'linear-gradient(145deg,#3a2a1a,#1a0e05)'

  const handleAdd = (e) => {
    e.preventDefault()
    addItem(product, '')
    openDrawer()
  }

  return (
    <Link
      to={`/product/${product.slug}`}
      className="reveal relative block bg-panel-bg border border-gold/[0.12] overflow-hidden
        transition-all duration-400 shadow-[0_2px_20px_rgba(0,0,0,0.05)]
        hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      {/* Tag badge */}
      {product.tag && (
        <span className="absolute top-4 left-4 z-[4] bg-gold text-black font-sans
          text-[0.5rem] tracking-[0.14em] uppercase px-3 py-1">
          {product.tag}
        </span>
      )}

      <CardImage key={product.images?.[0] ?? product.slug} product={product} bg={bg} />

      {/* Info */}
      <div className="px-6 pt-5 pb-6 border-t border-gold/10">
        <p className="font-serif font-light text-[1.25rem] text-page-text mb-[2px]">{product.name}</p>
        <p className="font-sans text-[0.56rem] tracking-[0.2em] text-gold uppercase mb-4">{product.subtitle}</p>

        <div className="flex items-center justify-between">
          <p className="font-serif text-[1.15rem] text-page-text">PKR {product.price.toLocaleString()}</p>
          <button
            onClick={handleAdd}
            className="border border-gold/30 text-page-text font-sans text-[0.56rem]
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
