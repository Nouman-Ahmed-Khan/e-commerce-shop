import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { getProductBySlug } from '../data/products'
import { useCart } from '../context/CartContext'

const ProductDetail = () => {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const navigate = useNavigate()
  const { addItem, openDrawer } = useCart()
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <main style={{ minHeight: '100vh', background: '#faf7f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', color: '#8a6f30', marginBottom: '1rem' }}>Product not found</p>
          <Link to="/shop" style={{
            color: '#c9a84c', textDecoration: 'none', fontSize: '0.75rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>Back to shop</Link>
        </div>
      </main>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedColor)
    }
    openDrawer()
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main style={{ minHeight: '100vh', background: '#faf7f2', paddingTop: '5rem' }}>
      {/* Breadcrumb */}
      <div style={{ padding: '2rem 4rem', borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
        <button onClick={() => navigate(-1)} style={{
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#8a6f30', fontFamily: "'Josefin Sans',sans-serif",
          fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          transition: 'color 0.3s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
        onMouseLeave={e => e.currentTarget.style.color = '#8a6f30'}
        >
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      {/* Content */}
      <section style={{
        maxWidth: '1300px', margin: '0 auto', padding: '4rem',
        display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem',
      }} className="max-lg:grid-cols-1">
        {/* Left: Image */}
        <div style={{
          position: 'sticky', top: '8rem', height: 'fit-content',
          background: 'linear-gradient(145deg, #e8e0d0 0%, #d4c8b8 100%)',
          borderRadius: '2px', padding: '2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(201,168,76,0.15)',
          minHeight: '500px',
        }}>
          <div style={{
            width: '100%', aspectRatio: '1',
            background: product.colors.find(c => c.name === selectedColor)?.hex || '#3a1f0a',
            borderRadius: '2px', position: 'relative',
          }}>
            <img
              src={product.images[0] || '/images/wallet-closed.png'}
              alt={product.name}
              style={{
                width: '100%', height: '100%', objectFit: 'contain',
                padding: '1rem',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.25))',
              }}
              onError={e => {
                e.target.style.display = 'none'
              }}
            />
          </div>
        </div>

        {/* Right: Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <span style={{
              fontSize: '0.6rem', letterSpacing: '0.35em', color: '#c9a84c',
              textTransform: 'uppercase', display: 'block', marginBottom: '0.8rem',
            }}>
              {product.category.toUpperCase()}
            </span>
            <h1 style={{
              fontFamily: "'Cormorant Garamond',serif", fontSize: '3rem',
              fontWeight: 300, color: '#1a1510', lineHeight: 1, marginBottom: '0.8rem',
            }}>
              {product.name}
            </h1>
            <p style={{
              fontSize: '0.75rem', letterSpacing: '0.2em',
              color: '#c9a84c', textTransform: 'uppercase', marginBottom: '1.2rem',
            }}>
              {product.subtitle}
            </p>
            <p style={{
              fontSize: '0.95rem', lineHeight: 2, color: '#4a3f35',
              letterSpacing: '0.04em',
            }}>
              {product.description}
            </p>
          </div>

          {/* Price */}
          <div style={{ borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: '1.5rem' }}>
            <p style={{
              fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem',
              color: '#1a1510', marginBottom: '0.5rem',
            }}>
              PKR {product.price.toLocaleString()}
            </p>
            <p style={{ fontSize: '0.65rem', color: '#8a6f30', letterSpacing: '0.1em' }}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>

          {/* Color picker */}
          <div>
            <label style={{
              fontSize: '0.7rem', letterSpacing: '0.2em',
              color: '#1a1510', textTransform: 'uppercase', display: 'block',
              marginBottom: '1rem',
            }}>
              Choose Colour: <span style={{ color: '#c9a84c' }}>{selectedColor}</span>
            </label>
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  title={color.name}
                  style={{
                    width: '50px', height: '50px', borderRadius: '2px',
                    background: color.hex, border: selectedColor === color.name ? '2px solid #c9a84c' : '2px solid rgba(201,168,76,0.2)',
                    cursor: 'pointer', transition: 'all 0.3s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {selectedColor === color.name && (
                    <Check size={20} color="#c9a84c" strokeWidth={3} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label style={{
              fontSize: '0.7rem', letterSpacing: '0.2em',
              color: '#1a1510', textTransform: 'uppercase', display: 'block',
              marginBottom: '0.8rem',
            }}>Quantity</label>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              width: 'fit-content', border: '1px solid rgba(201,168,76,0.2)',
              padding: '0.5rem 1rem',
            }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{
                background: 'none', border: 'none', color: '#8a6f30',
                cursor: 'pointer', fontSize: '1rem', padding: '0',
              }}>−</button>
              <span style={{
                fontFamily: "'Cormorant Garamond',serif", fontSize: '1.2rem',
                color: '#1a1510', minWidth: '30px', textAlign: 'center',
              }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{
                background: 'none', border: 'none', color: '#8a6f30',
                cursor: 'pointer', fontSize: '1rem', padding: '0',
              }}>+</button>
            </div>
          </div>

          {/* Add to Cart */}
          <button onClick={handleAddToCart} style={{
            background: added ? '#4caf50' : '#1a1510',
            color: added ? '#ffffff' : '#f5f0e8',
            fontFamily: "'Josefin Sans',sans-serif",
            fontSize: '0.75rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', padding: '1.2rem 0',
            border: 'none', cursor: 'pointer', transition: 'all 0.3s',
            fontWeight: 500,
          }}
          onMouseEnter={e => {
            if (!added) {
              e.currentTarget.style.background = '#c9a84c'
              e.currentTarget.style.color = '#080606'
            }
          }}
          onMouseLeave={e => {
            if (!added) {
              e.currentTarget.style.background = '#1a1510'
              e.currentTarget.style.color = '#f5f0e8'
            }
          }}
          >
            {added ? '✓ Added to Cart' : 'Add to Cart'}
          </button>

          {/* Details */}
          <div style={{
            borderTop: '1px solid rgba(201,168,76,0.15)',
            paddingTop: '2rem',
          }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond',serif", fontSize: '1.3rem',
              fontWeight: 300, color: '#1a1510', marginBottom: '1rem',
            }}>Product Details</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {product.details.map((detail, i) => (
                <li key={i} style={{
                  fontSize: '0.75rem', lineHeight: 1.8,
                  color: '#4a3f35', letterSpacing: '0.04em',
                  paddingLeft: '1.2rem', position: 'relative',
                }}>
                  <span style={{ position: 'absolute', left: 0, color: '#c9a84c' }}>•</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          {/* Shipping */}
          <div style={{
            background: '#f0ebe0', border: '1px solid rgba(201,168,76,0.15)',
            padding: '1.5rem', borderRadius: '2px',
          }}>
            <p style={{
              fontSize: '0.7rem', letterSpacing: '0.2em',
              color: '#8a6f30', textTransform: 'uppercase', marginBottom: '0.6rem',
            }}>Shipping & Returns</p>
            <p style={{
              fontSize: '0.75rem', lineHeight: 1.8,
              color: '#4a3f35', letterSpacing: '0.04em',
            }}>Free shipping on orders over PKR 5,000. Returns accepted within 14 days. All items handcrafted to order.</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProductDetail
