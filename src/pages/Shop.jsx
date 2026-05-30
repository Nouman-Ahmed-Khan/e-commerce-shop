import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'all')
  }, [searchParams])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [activeCategory])

  const filtered = activeCategory === 'all' ? products : products.filter((p) => p.category === activeCategory)

  const handleCategory = (cat) => {
    setActiveCategory(cat)
    cat === 'all' ? setSearchParams({}) : setSearchParams({ category: cat })
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="relative min-h-[40vh] flex items-end px-16 pb-16 max-md:px-6 max-md:pt-32 overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 80% at 30% 60%, rgba(139,74,42,0.15) 0%, transparent 70%), #0e0d0a' }}
        />
        <div className="relative z-10">
          <span className="text-[0.6rem] tracking-[0.35em] text-gold uppercase block mb-3">Our Collection</span>
          <h1 className="font-serif font-light text-cream leading-none mb-3" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}>
            The Shop
          </h1>
          <p className="text-[0.75rem] text-cream-dim tracking-widest">Every piece, handcrafted for the discerning.</p>
        </div>
      </div>

      {/* Filters + Grid */}
      <div className="px-16 py-12 max-md:px-4">
        {/* Filter buttons */}
        <div className="flex gap-2 flex-wrap pb-8 border-b border-[#c9a84c]/10 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`text-[0.65rem] tracking-[0.2em] uppercase px-5 py-2.5 border transition-all duration-300 font-sans
                ${activeCategory === cat
                  ? 'bg-gold border-gold text-black'
                  : 'border-transparent text-cream-dim hover:text-cream hover:border-[#c9a84c]/20'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-[0.65rem] tracking-[0.2em] text-cream-dim uppercase mb-8">
          {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
        </p>

        <div className="grid grid-cols-3 gap-px max-lg:grid-cols-2 max-md:grid-cols-1">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Shop
