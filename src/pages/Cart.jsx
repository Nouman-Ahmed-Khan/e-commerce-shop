import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()

  const SHIPPING_THRESHOLD = 5000
  const SHIPPING_COST = items.reduce((sum, i) => sum + i.price * i.quantity, 0) >= SHIPPING_THRESHOLD ? 0 : 500
  const subtotal = totalPrice
  const total = subtotal + SHIPPING_COST

  return (
    <main style={{ minHeight: '100vh', background: '#faf7f2', paddingTop: '5rem' }}>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(160deg, #faf7f2 0%, #f0ebe0 100%)',
        padding: '3rem 4rem', borderBottom: '1px solid rgba(201,168,76,0.12)',
      }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif", fontSize: '3rem',
          fontWeight: 300, color: '#1a1510',
        }}>
          Your Cart
        </h1>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#8a6f30', textTransform: 'uppercase', marginTop: '0.5rem' }}>
          {items.length} item{items.length !== 1 ? 's' : ''}
        </p>
      </section>

      {items.length === 0 ? (
        <section style={{ padding: '6rem 4rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', color: '#8a6f30', marginBottom: '1.5rem' }}>Your cart is empty</p>
          <Link to="/shop" style={{
            display: 'inline-block',
            background: '#1a1510', color: '#f5f0e8',
            fontFamily: "'Josefin Sans',sans-serif",
            fontSize: '0.68rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', padding: '0.95rem 2.5rem',
            textDecoration: 'none', transition: 'all 0.3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#c9a84c'
            e.currentTarget.style.color = '#080606'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#1a1510'
            e.currentTarget.style.color = '#f5f0e8'
          }}
          >Continue Shopping</Link>
        </section>
      ) : (
        <section style={{
          padding: '4rem',
          display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem',
        }} className="max-lg:grid-cols-1">
          {/* Items */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {items.map((item) => (
                <div key={`${item.id}-${item.color}`} style={{
                  display: 'grid', gridTemplateColumns: '100px 1fr auto',
                  gap: '1.5rem', background: '#ffffff',
                  border: '1px solid rgba(201,168,76,0.12)', padding: '1.5rem',
                  borderRadius: '2px',
                }}>
                  {/* Image */}
                  <div style={{
                    width: '100px', height: '100px', flexShrink: 0,
                    background: item.colors?.find(c => c.name === item.color)?.hex || '#3a1f0a',
                    borderRadius: '2px',
                  }}/>

                  {/* Details */}
                  <div>
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem',
                      color: '#1a1510', marginBottom: '0.3rem',
                    }}>
                      {item.name}
                    </h3>
                    <p style={{
                      fontSize: '0.65rem', letterSpacing: '0.15em',
                      color: '#c9a84c', textTransform: 'uppercase', marginBottom: '0.8rem',
                    }}>
                      {item.color}
                    </p>
                    <p style={{
                      fontSize: '0.75rem', color: '#8a6f30', marginBottom: '1rem',
                    }}>
                      PKR {item.price.toLocaleString()} each
                    </p>

                    {/* Qty controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <button onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)} style={{
                        background: 'none', border: '1px solid rgba(201,168,76,0.2)',
                        color: '#8a6f30', cursor: 'pointer', padding: '0.3rem 0.5rem',
                        display: 'flex', alignItems: 'center',
                      }}>
                        <Minus size={14} />
                      </button>
                      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: '#1a1510', minWidth: '25px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)} style={{
                        background: 'none', border: '1px solid rgba(201,168,76,0.2)',
                        color: '#8a6f30', cursor: 'pointer', padding: '0.3rem 0.5rem',
                        display: 'flex', alignItems: 'center',
                      }}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Right: Price & Remove */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <p style={{
                      fontFamily: "'Cormorant Garamond',serif", fontSize: '1.3rem',
                      color: '#1a1510',
                    }}>
                      PKR {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button onClick={() => removeItem(item.id, item.color)} style={{
                      background: 'none', border: 'none', color: '#8a6f30',
                      cursor: 'pointer', display: 'flex', transition: 'color 0.3s',
                    }}
                    onMouseEnter={e => e.target.style.color = '#c0392b'}
                    onMouseLeave={e => e.target.style.color = '#8a6f30'}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div style={{
            position: 'sticky', top: '8rem', height: 'fit-content',
            background: '#ffffff', border: '1px solid rgba(201,168,76,0.15)',
            padding: '2rem', borderRadius: '2px',
          }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem',
              fontWeight: 300, color: '#1a1510', marginBottom: '1.8rem',
            }}>Order Summary</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#4a3f35' }}>
                <span>Subtotal</span>
                <span>PKR {subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#4a3f35' }}>
                <span>Shipping</span>
                <span style={{ color: SHIPPING_COST === 0 ? '#4caf50' : '#4a3f35' }}>
                  {SHIPPING_COST === 0 ? 'FREE' : `PKR ${SHIPPING_COST}`}
                </span>
              </div>
              {SHIPPING_COST > 0 && (
                <p style={{ fontSize: '0.6rem', color: '#8a6f30', letterSpacing: '0.1em' }}>
                  Free shipping on orders over PKR {SHIPPING_THRESHOLD.toLocaleString()}
                </p>
              )}
            </div>

            <div style={{
              borderTop: '1px solid rgba(201,168,76,0.15)', borderBottom: '1px solid rgba(201,168,76,0.15)',
              padding: '1.2rem 0', marginBottom: '1.8rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#1a1510', textTransform: 'uppercase' }}>Total</span>
                <span style={{
                  fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem',
                  color: '#1a1510',
                }}>PKR {total.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <button style={{
                background: '#1a1510', color: '#f5f0e8',
                fontFamily: "'Josefin Sans',sans-serif",
                fontSize: '0.7rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', padding: '1rem 0',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#c9a84c'
                e.currentTarget.style.color = '#080606'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#1a1510'
                e.currentTarget.style.color = '#f5f0e8'
              }}
              >Proceed to Checkout</button>
              <Link to="/shop" style={{
                background: 'none', color: '#1a1510',
                border: '1px solid rgba(201,168,76,0.25)',
                fontFamily: "'Josefin Sans',sans-serif",
                fontSize: '0.7rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', padding: '1rem 0',
                textDecoration: 'none', textAlign: 'center',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#c9a84c'
                e.currentTarget.style.color = '#c9a84c'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'
                e.currentTarget.style.color = '#1a1510'
              }}
              >Continue Shopping</Link>
              <button onClick={clearCart} style={{
                background: 'none', color: '#8a6f30',
                fontFamily: "'Josefin Sans',sans-serif",
                fontSize: '0.65rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', padding: '0.7rem 0',
                border: 'none', cursor: 'pointer', transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#c0392b'}
              onMouseLeave={e => e.currentTarget.style.color = '#8a6f30'}
              >Clear Cart</button>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

export default Cart
