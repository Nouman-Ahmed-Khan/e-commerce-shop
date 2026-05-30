import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductBySlug } from '../data/products'
import { useCart } from '../context/CartContext'
import { ArrowLeft, Check } from 'lucide-react'

const ProductDetail = () => {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const { addItem, openDrawer } = useCart()
  const [selectedColor, setSelectedColor] = useState(null)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (product) setSelectedColor(product.colors[0].name)
    window.scrollTo(0, 0)
  }, [product])

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6">
      <h2 className="font-serif text-3xl text-cream font-light">Product not found</h2>
      <Link to="/shop" className="border border-[#c9a84c]/20 text-cream text-[0.7rem] tracking-[0.2em] uppercase px-8 py-3 hover:border-gold hover:text-gold transition-all font-sans">
        Back to Shop
      </Link>
    </div>
  )

  const activeColor = product.colors.find(c => c.name === selectedColor) || product.colors[0]

  const handleAdd = () => {
    addItem(product, selectedColor)
    openDrawer()
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main className="min-h-screen pt-28 pb-20 px-16 max-md:px-6">
      {/* Back */}
      <Link to="/shop" className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase text-cream-dim hover:text-gold transition-colors mb-12 font-sans">
        <ArrowLeft size={15} /> Back to Shop
      </Link>

      <div className="grid grid-cols-2 gap-24 max-w-[1200px] mx-auto max-md:grid-cols-1 max-md:gap-12">
        {/* IMAGE */}
        <div className="flex flex-col gap-4">
          <div
            className="aspect-[4/3] flex flex-col items-center justify-center gap-2 opacity-80 transition-all duration-400"
            style={{ background: activeColor.hex + '88' }}
          >
            <span className="font-serif text-2xl text-cream/60 tracking-widest">{product.name}</span>
            <span className="text-[0.6rem] tracking-[0.25em] text-cream/40 uppercase">{selectedColor}</span>
          </div>
          {/* Color swatches as mini thumbnails */}
          <div className="flex gap-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                title={c.name}
                className={`w-10 h-10 transition-all duration-300 ${selectedColor === c.name ? 'ring-2 ring-gold ring-offset-2 ring-offset-black' : ''}`}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="flex flex-col pt-2">
          {product.tag && (
            <span className="inline-block bg-gold text-black text-[0.55rem] tracking-[0.15em] uppercase px-3 py-1 mb-4 w-fit font-sans">
              {product.tag}
            </span>
          )}

          <h1 className="font-serif font-light text-cream leading-tight mb-2" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)' }}>
            {product.name}
          </h1>
          <p className="text-[0.65rem] tracking-[0.2em] text-gold uppercase mb-6">{product.subtitle}</p>
          <p className="font-serif text-3xl text-cream font-light mb-6">PKR {product.price.toLocaleString()}</p>

          <div className="h-px bg-[#c9a84c]/10 mb-6" />

          <p className="text-[0.8rem] leading-8 text-cream-dim tracking-wide mb-8">{product.description}</p>

          {/* Color picker */}
          <div className="mb-8">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-cream-dim mb-3 font-sans">
              Colour: <span className="text-cream">{selectedColor}</span>
            </p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                  className={`w-8 h-8 flex items-center justify-center transition-all duration-300
                    ${selectedColor === c.name ? 'ring-2 ring-gold ring-offset-2 ring-offset-black scale-110' : ''}`}
                  style={{ background: c.hex }}
                >
                  {selectedColor === c.name && <Check size={10} color="#fff" />}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`w-full py-4 text-[0.75rem] tracking-[0.2em] uppercase transition-all duration-300 mb-6 font-sans
              ${added ? 'bg-emerald-800 text-white' : 'bg-gold text-black hover:bg-gold-light'}`}
          >
            {added ? '✓ Added to Cart' : 'Add to Cart'}
          </button>

          <div className="h-px bg-[#c9a84c]/10 mb-6" />

          {/* Details */}
          <div className="mb-8">
            <p className="text-[0.65rem] tracking-[0.25em] uppercase text-gold mb-4 font-sans">Details</p>
            <ul className="space-y-2">
              {product.details.map((d, i) => (
                <li key={i} className="flex gap-3 text-[0.75rem] text-cream-dim leading-relaxed tracking-wide">
                  <span className="text-gold shrink-0">—</span>{d}
                </li>
              ))}
            </ul>
          </div>

          {/* Shipping */}
          <div className="border border-[#c9a84c]/10 bg-surface p-5 space-y-2">
            {['🚚 Free shipping on orders over PKR 5,000', '🔄 30-day returns', '✦ Lifetime craftsmanship guarantee'].map((s, i) => (
              <p key={i} className="text-[0.68rem] text-cream-dim tracking-wide">{s}</p>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetail
