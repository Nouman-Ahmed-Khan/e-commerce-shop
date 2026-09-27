import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProductsByCategory, categories } from '../data/products'
import ProductCard from '../components/ProductCard'

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
  const [products, setProducts] = useState([])

  useEffect(() => { setProducts(getProductsByCategory(activeCategory)) }, [activeCategory])
  useEffect(() => { setSearchParams({ category: activeCategory }) }, [activeCategory, setSearchParams])

  return (
    <main className="min-h-screen bg-page-bg transition-colors duration-300">

      {/* Page header */}
      <section className="pt-36 pb-16 px-10 text-center border-b border-gold/[0.12]
        bg-gradient-to-br from-page-bg to-page-gradient-end">
        <span className="font-sans text-[0.6rem] tracking-[0.38em] text-gold uppercase block mb-3">
          Vellum
        </span>
        <h1 className="font-serif font-light text-page-text mb-4"
          style={{ fontSize: 'clamp(2.8rem,5vw,4.5rem)' }}>
          The Collection
        </h1>
        <p className="font-sans text-[0.7rem] tracking-[0.28em] text-gold-dim uppercase">
          {products.length} items
        </p>
      </section>

      {/* Category filters */}
      <section className="px-10 py-10 bg-page-bg border-b border-gold/[0.12] transition-colors duration-300">
        <div className="max-w-[1300px] mx-auto flex gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-[0.62rem] tracking-[0.2em] uppercase px-7 py-[0.65rem]
                transition-all duration-300
                ${activeCategory === cat
                  ? 'bg-gold text-black border border-gold'
                  : 'bg-transparent text-page-text border border-gold/25 hover:border-gold hover:text-gold'}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16 px-10">
        <div className="max-w-[1300px] mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-[1.4rem] text-gold-dim mb-3">No products found</p>
              <p className="font-sans text-[0.72rem] text-gold-dim tracking-[0.1em]">
                Try selecting a different category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-md:grid-cols-1">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

    </main>
  )
}

export default Shop
