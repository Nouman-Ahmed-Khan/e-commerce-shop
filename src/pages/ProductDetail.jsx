import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getProductBySlug } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductIllustration from '../components/ProductIllustration'

/* ─── Single image with error fallback ───────────────────────────────── */
const SafeImage = ({ src, alt, name, className }) => {
  const [failed, setFailed] = useState(false)
  if (failed) return <ProductIllustration name={name} />
  return (
    <img
      src={src}
      alt={alt}
      key={src}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}

/* ─── Thumbnail with independent error state ─────────────────────────── */
const Thumbnail = ({ src, alt, isActive, onClick }) => {
  const [failed, setFailed] = useState(false)
  if (failed) return null   // hide broken thumbnails silently
  return (
    <button
      onClick={onClick}
      aria-label={alt}
      aria-pressed={isActive}
      className={`w-16 h-16 shrink-0 rounded-sm overflow-hidden border-2 transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1
        ${isActive
          ? 'border-gold opacity-100'
          : 'border-gold/20 opacity-60 hover:opacity-100 hover:border-gold/50'}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain bg-[#1a1510]"
        onError={() => setFailed(true)}
      />
    </button>
  )
}

/* ─── Gallery panel ──────────────────────────────────────────────────── */
const ProductGallery = ({ product }) => {
  const images = product.images ?? []
  // selectedIdx is keyed to slug so it resets on product navigation
  const [selectedIdx, setSelectedIdx] = useState(0)

  // Clamp in case images array shrinks between renders
  const idx = Math.min(selectedIdx, Math.max(0, images.length - 1))
  const src = images[idx]

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div
        className="aspect-square rounded-sm flex items-center justify-center
          border border-gold/15 overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, rgba(139,74,42,0.18), rgba(201,168,76,0.10))' }}
      >
        {src ? (
          <SafeImage
            key={`${product.slug}-${idx}`}
            src={src}
            alt={`${product.name} — image ${idx + 1}`}
            name={product.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <ProductIllustration name={product.name} />
        )}

        {/* VELLUM watermark */}
        <span
          className="absolute top-4 right-4 z-[3] font-serif font-light
            text-[0.6rem] tracking-[0.32em] select-none pointer-events-none"
          style={{ color: 'rgba(201,168,76,0.5)' }}
        >
          VELLUM
        </span>
      </div>

      {/* Thumbnails — only when more than one image */}
      {images.length > 1 && (
        <div
          className="flex gap-3 flex-wrap"
          role="group"
          aria-label="Product image thumbnails"
        >
          {images.map((imgSrc, i) => (
            <Thumbnail
              key={imgSrc}
              src={imgSrc}
              alt={`${product.name} — view ${i + 1}`}
              isActive={i === idx}
              onClick={() => setSelectedIdx(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────── */
const ProductDetail = () => {
  const { slug }  = useParams()
  const product   = getProductBySlug(slug)
  const navigate  = useNavigate()
  const { addItem, openDrawer } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [added,    setAdded]    = useState(false)

  if (!product) return (
    <main className="min-h-screen bg-page-bg flex items-center justify-center">
      <div className="text-center">
        <p className="font-serif text-[1.2rem] text-gold-dim mb-4">Product not found</p>
        <Link to="/shop" className="font-sans text-[0.72rem] tracking-[0.2em] uppercase text-gold">
          Back to shop
        </Link>
      </div>
    </main>
  )

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addItem(product, '')
    openDrawer()
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main className="min-h-screen bg-page-bg pt-20 transition-colors duration-300">

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

        {/* Left: gallery — key on slug so selectedIdx resets on product change */}
        <div className="max-lg:static lg:sticky lg:top-28 lg:h-fit">
          <ProductGallery key={product.slug} product={product} />
        </div>

        {/* Right: details */}
        <div className="flex flex-col gap-8">

          <div>
            <span className="font-sans text-[0.58rem] tracking-[0.35em] text-gold uppercase block mb-3">
              {product.category}
            </span>
            <h1 className="font-serif font-light text-page-text leading-none mb-3"
              style={{ fontSize: 'clamp(2.4rem,4vw,3.2rem)' }}>
              {product.name}
            </h1>
            <p className="font-sans text-[0.68rem] tracking-[0.2em] text-gold uppercase mb-5">
              {product.subtitle}
            </p>
            <p className="text-[0.85rem] leading-[1.9] text-body-text tracking-[0.03em]">
              {product.description}
            </p>
          </div>

          {/* Price */}
          <div className="pb-8 border-b border-gold/15">
            <p className="font-serif font-light text-[2rem] text-page-text mb-1">
              PKR {product.price.toLocaleString()}
            </p>
            <p className={`font-sans text-[0.62rem] tracking-[0.12em] ${product.inStock ? 'text-green-500' : 'text-red-400'}`}>
              {product.inStock ? '● In Stock' : '● Out of Stock'}
            </p>
          </div>

          {/* Quantity */}
          <div>
            <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-page-text mb-3">
              Quantity
            </p>
            <div className="flex items-center gap-5 w-fit border border-gold/20 px-5 py-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-gold-dim bg-transparent border-none text-lg leading-none
                  hover:text-gold transition-colors"
              >−</button>
              <span className="font-serif text-[1.15rem] text-page-text min-w-[28px] text-center">
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
            <h3 className="font-serif font-light text-[1.25rem] text-page-text mb-5">
              Product Details
            </h3>
            <ul className="flex flex-col gap-3 list-none p-0">
              {product.details.map((d, i) => (
                <li key={i} className="relative pl-5 text-[0.75rem] leading-relaxed
                  text-body-text tracking-[0.04em]">
                  <span className="absolute left-0 text-gold">•</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Shipping notice */}
          <div className="bg-panel-bg border border-gold/15 p-6 rounded-sm transition-colors duration-300">
            <p className="font-sans text-[0.62rem] tracking-[0.2em] uppercase text-gold-dim mb-2">
              Shipping & Returns
            </p>
            <p className="text-[0.75rem] leading-[1.8] text-body-text tracking-[0.03em]">
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
