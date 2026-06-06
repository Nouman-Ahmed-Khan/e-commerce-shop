import { Link } from 'react-router-dom'
import { X, Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext'

const CartDrawer = () => {
  const { items, isOpen, closeDrawer, removeItem, updateQuantity, totalPrice, totalItems } = useCart()

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeDrawer}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          zIndex: 60, opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: '420px', maxWidth: '100vw',
          background: '#faf7f2', borderLeft: '1px solid rgba(201,168,76,0.15)',
          zIndex: 61, display: 'flex', flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '2rem 1.5rem', borderBottom: '1px solid rgba(201,168,76,0.15)',
        }}>
          <h3 style={{
            fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem',
            fontWeight: 300, color: '#1a1510',
          }}>
            Your Cart {totalItems > 0 && <span style={{ color: '#c9a84c', fontSize: '1rem' }}>({totalItems})</span>}
          </h3>
          <button onClick={closeDrawer} style={{
            background: 'none', border: 'none', color: '#8a6f30',
            cursor: 'pointer', transition: 'color 0.3s',
          }}
          onMouseEnter={e => e.target.style.color = '#c9a84c'}
          onMouseLeave={e => e.target.style.color = '#8a6f30'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '1.5rem',
          display: 'flex', flexDirection: 'column', gap: '1rem',
        }}>
          {items.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: '1rem' }}>
              <p style={{ fontSize: '0.8rem', color: '#8a6f30', letterSpacing: '0.1em' }}>Your cart is empty.</p>
              <button onClick={closeDrawer} style={{
                background: 'none', border: '1px solid rgba(201,168,76,0.25)',
                color: '#4a3f35', fontFamily: "'Josefin Sans',sans-serif",
                fontSize: '0.65rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', padding: '0.7rem 1.5rem',
                cursor: 'pointer', transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#c9a84c'
                e.currentTarget.style.borderColor = '#c9a84c'
                e.currentTarget.style.color = '#080606'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'none'
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'
                e.currentTarget.style.color = '#4a3f35'
              }}
              >Continue Shopping</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.color}`} style={{
                display: 'flex', gap: '1rem', background: '#f0ebe0',
                border: '1px solid rgba(201,168,76,0.15)', padding: '1rem',
                position: 'relative',
              }}>
                <div style={{
                  width: '70px', height: '70px', flexShrink: 0,
                  background: item.colors?.find(c => c.name === item.color)?.hex || '#3a1f0a',
                  borderRadius: '2px', opacity: 0.8,
                }}/>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: '#1a1510' }}>{item.name}</p>
                  <p style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#c9a84c', textTransform: 'uppercase' }}>{item.color}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', border: '1px solid rgba(201,168,76,0.2)', padding: '0.25rem 0.5rem' }}>
                      <button onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)} style={{
                        background: 'none', border: 'none', color: '#8a6f30', cursor: 'pointer', display: 'flex',
                      }}>
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.75rem', color: '#1a1510', minWidth: '16px', textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)} style={{
                        background: 'none', border: 'none', color: '#8a6f30', cursor: 'pointer', display: 'flex',
                      }}>
                        <Plus size={12} />
                      </button>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#1a1510' }}>PKR {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id, item.color)} style={{
                  position: 'absolute', top: '0.5rem', right: '0.5rem',
                  background: 'none', border: 'none', color: '#8a6f30',
                  cursor: 'pointer', display: 'flex', transition: 'color 0.3s',
                }}
                onMouseEnter={e => e.target.style.color = '#c0392b'}
                onMouseLeave={e => e.target.style.color = '#8a6f30'}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: '1.5rem', borderTop: '1px solid rgba(201,168,76,0.15)',
            display: 'flex', flexDirection: 'column', gap: '1rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a6f30' }}>Total</span>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.3rem', color: '#1a1510' }}>PKR {totalPrice.toLocaleString()}</span>
            </div>
            <Link
              to="/cart"
              onClick={closeDrawer}
              style={{
                background: '#1a1510', color: '#f5f0e8',
                textAlign: 'center', fontFamily: "'Josefin Sans',sans-serif",
                fontSize: '0.7rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', padding: '1rem 0',
                textDecoration: 'none', transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#c9a84c'
                e.currentTarget.style.color = '#080806'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#1a1510'
                e.currentTarget.style.color = '#f5f0e8'
              }}
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer
