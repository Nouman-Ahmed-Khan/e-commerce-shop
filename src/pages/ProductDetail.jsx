import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { getProductBySlug } from '../data/products'
import { useCart } from '../context/CartContext'

const ProductDetail = () => {
  const { slug }   = useParams()
  const product    = getProductBySlug(slug)
  const navigate   = useNavigate()
  const { addItem, openDrawer } = useCart()

  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '')
  const [quantity,      setQuantity]      = useState(1)
  const [added,         setAdded]         = useState(false)

  if (!product) return (
    <main className="min-h-screen bg-ivory flex items-center justify-center">
      <div className="text-center">
        <p className="font-serif text-[1.2rem] text-gold-dim mb-4">Product not found</p>
        <Link to="/shop" className="font-sans text-[0.72rem] tracking-[0.2em] uppercase text-gold">
          Back to shop
        </Link>
      </div>
    </main>
  )

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addItem(product, selectedColor)
    openDrawer()
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const selectedHex = product.colors.find(c => c.name === selectedColor)?.hex || '#3a1f0a'

  return (
    <main className="min-h-screen bg-ivory pt-20">

      {/* Breadcrumb */}
      <div className="px-10 py-7 border-b border-gold/[0.12]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-sans text-[0.62rem] tracking-[0.15em]
            uppercase text-gold-dim bg-transparent border-none
            transition-colors duration-300 hover:text-gold"
        >
          <ArrowLeft size={13} strokeWidth={1.5} /> Back
        </button>
      </div>

      {/* Main content */}
      <section className="max-w-[1280px] mx-auto px-10 py-14
        grid grid-cols-[1.1fr_1fr] gap-16 max-lg:grid-cols-1">

        {/* Left: product image */}
        <div className="sticky top-28 h-fit">
          <div
            className="aspect-square rounded-sm flex items-center justify-center
              border border-gold/15 overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${selectedHex}33, ${selectedHex}88)` }}
          >
            <img
              src={product.images?.[0] || '/images/wallet-closed.png'}
              alt={product.name}
              className="w-4/5 h-4/5 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              onError={e => { e.target.style.display = 'none' }}
            />
          </div>
        </div>

        {/* Right: details */}
        <div className="flex flex-col gap-8">

          {/* Name & subtitle */}
          <div>
            <span className="font-sans text-[0.58rem] tracking-[0.35em] text-gold uppercase block mb-3">
              {product.category}
            </span>
            <h1 className="font-serif font-light text-black leading-none mb-3"
              style={{ fontSize: 'clamp(2.4rem,4vw,3.2rem)' }}>
              {product.name}
            </h1>
            <p className="font-sans text-[0.68rem] tracking-[0.2em] text-gold uppercase mb-5">
              {product.subtitle}
            </p>
            <p className="text-[0.85rem] leading-[1.9] text-[#4a3f35] tracking-[0.03em]">
              {product.description}
            </p>
          </div>

          {/* Price */}
          <div className="pb-8 border-b border-gold/15">
            <p className="font-serif font-light text-[2rem] text-black mb-1">
              PKR {product.price.toLocaleString()}
            </p>
            <p className={`font-sans text-[0.62rem] tracking-[0.12em] ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
              {product.inStock ? '● In Stock' : '● Out of Stock'}
            </p>
          </div>

          {/* Colour picker */}
          <div>
            <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-black mb-4">
              Colour: <span className="text-gold">{selectedColor}</span>
            </p>
            <div className="flex gap-3 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  title={color.name}
                  className="w-12 h-12 rounded-sm transition-all duration-200
                    flex items-center justify-center hover:scale-105"
                  style={{
                    background: color.hex,
                    border: selectedColor === color.name
                      ? '2px solid #c9a84c'
                      : '2px solid rgba(201,168,76,0.2)',
                  }}
                >
                  {selectedColor === color.name && (
                    <Check size={18} color="#c9a84c" strokeWidth={2.5} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-black mb-3">
              Quantity
            </p>
            <div className="flex items-center gap-5 w-fit border border-gold/20 px-5 py-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-gold-dim bg-transparent border-none text-lg leading-none
                  hover:text-gold transition-colors"
              >−</button>
              <span className="font-serif text-[1.15rem] text-black min-w-[28px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-gold-dim bg-transparent border-none text-lg leading-none
                  hover:text-gold transition-colors"
              >+</button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`w-full font-sans text-[0.72rem] tracking-[0.2em] uppercase py-5
              border-none transition-all duration-300
              ${added
                ? 'bg-green-600 text-white'
                : product.inStock
                  ? 'bg-black text-cream hover:bg-gold hover:text-black'
                  : 'bg-black/30 text-cream/50 cursor-not-allowed'}`}
          >
            {added ? '✓ Added to Cart' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>

          {/* Details list */}
          <div className="border-t border-gold/15 pt-8">
            <h3 className="font-serif font-light text-[1.25rem] text-black mb-5">
              Product Details
            </h3>
            <ul className="flex flex-col gap-3 list-none p-0">
              {product.details.map((d, i) => (
                <li key={i} className="relative pl-5 text-[0.75rem] leading-relaxed
                  text-[#4a3f35] tracking-[0.04em]">
                  <span className="absolute left-0 text-gold">•</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Shipping notice */}
          <div className="bg-[#f5f0e8] border border-gold/15 p-6 rounded-sm">
            <p className="font-sans text-[0.62rem] tracking-[0.2em] uppercase text-gold-dim mb-2">
              Shipping & Returns
            </p>
            <p className="text-[0.75rem] leading-[1.8] text-[#4a3f35] tracking-[0.03em]">
              Free shipping on orders over PKR 5,000. Returns accepted within 14 days.
              All items handcrafted to order.
            </p>
          </div>

        </div>
      </section>
    </main>
  )
}

export default ProductDetail
