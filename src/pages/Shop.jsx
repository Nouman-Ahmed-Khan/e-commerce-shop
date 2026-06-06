import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProductsByCategory, categories } from '../data/products'
import ProductCard from '../components/ProductCard'

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(getProductsByCategory(activeCategory))
  }, [activeCategory])

  useEffect(() => {
    setSearchParams({ category: activeCategory })
  }, [activeCategory, setSearchParams])

  return (
    <main style={{ minHeight: '100vh', background: '#faf7f2' }}>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(160deg, #faf7f2 0%, #f0ebe0 100%)',
        padding: '8rem 4rem 4rem',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(3rem,6vw,5rem)',
          fontWeight: 300, color: '#1a1510', marginBottom: '1rem',
        }}>
          The Collection
        </h1>
        <p style={{
          fontSize: '0.75rem', letterSpacing: '0.3em',
          color: '#8a6f30', textTransform: 'uppercase',
        }}>
          {products.length} items
        </p>
      </section>

      {/* Filters */}
      <section style={{
        padding: '3rem 4rem', background: '#faf7f2',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
      }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? '#1a1510' : 'none',
                  color: activeCategory === cat ? '#f5f0e8' : '#1a1510',
                  border: activeCategory === cat ? 'none' : '1px solid rgba(201,168,76,0.25)',
                  fontFamily: "'Josefin Sans',sans-serif",
                  fontSize: '0.65rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase', padding: '0.7rem 1.8rem',
                  cursor: 'pointer', transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  if (activeCategory !== cat) {
                    e.target.style.borderColor = '#c9a84c'
                    e.target.style.color = '#c9a84c'
                  }
                }}
                onMouseLeave={e => {
                  if (activeCategory !== cat) {
                    e.target.style.borderColor = 'rgba(201,168,76,0.25)'
                    e.target.style.color = '#1a1510'
                  }
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{ padding: '4rem 0' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 4rem' }}>
          {products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
              <p style={{
                fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem',
                color: '#8a6f30', marginBottom: '1rem',
              }}>No products found</p>
              <p style={{ fontSize: '0.75rem', color: '#8a6f30', letterSpacing: '0.1em' }}>
                Try selecting a different category
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
              gap: '1.5rem',
            }} className="max-lg:grid-cols-2 max-md:grid-cols-1">
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
