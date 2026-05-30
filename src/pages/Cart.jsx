import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react'

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()

  if (items.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 text-center px-6">
      <h2 className="font-serif text-4xl font-light text-cream">Your cart is empty</h2>
      <p className="text-[0.8rem] text-cream-dim tracking-widest">Looks like you haven't added anything yet.</p>
      <Link to="/shop" className="bg-gold text-black text-[0.7rem] tracking-[0.2em] uppercase px-10 py-4 hover:bg-gold-light transition-all font-sans">
        Shop Collection
      </Link>
    </div>
  )

  const shipping = totalPrice >= 5000 ? 0 : 300

  return (
    <main className="min-h-screen pt-28 pb-20 px-16 max-md:px-4 max-w-[1300px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 pb-8 border-b border-[#c9a84c]/10 flex-wrap gap-4">
        <Link to="/shop" className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase text-cream-dim hover:text-gold transition-colors font-sans">
          <ArrowLeft size={15} /> Continue Shopping
        </Link>
        <h1 className="font-serif font-light text-cream" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>Your Cart</h1>
        <button
          onClick={clearCart}
          className="border border-[#c9a84c]/20 text-cream-dim text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 hover:border-red-400 hover:text-red-400 transition-all font-sans"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-[1fr_360px] gap-16 items-start max-lg:grid-cols-1">
        {/* Items */}
        <div className="flex flex-col gap-px">
          {items.map((item) => (
            <div key={`${item.id}-${item.color}`} className="grid grid-cols-[160px_1fr] gap-6 bg-card border border-[#c9a84c]/10 p-5 max-sm:grid-cols-[100px_1fr]">
              <div
                className="aspect-[4/3] flex items-center justify-center opacity-75"
                style={{ background: item.colors?.find(c => c.name === item.color)?.hex + '88' || '#3a1f0a88' }}
              >
                <span className="font-serif text-sm text-cream/40 text-center px-2">{item.name}</span>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <p className="font-serif text-xl text-cream mb-1">{item.name}</p>
                  <p className="text-[0.6rem] tracking-[0.2em] text-gold uppercase mb-1">{item.color}</p>
                  <p className="text-[0.65rem] text-cream-dim tracking-wide">{item.subtitle}</p>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-3 border border-[#c9a84c]/20 px-3 py-2">
                    <button onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)} className="text-cream-dim hover:text-gold transition-colors">
                      <Minus size={13} />
                    </button>
                    <span className="text-[0.9rem] text-cream w-5 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)} className="text-cream-dim hover:text-gold transition-colors">
                      <Plus size={13} />
                    </button>
                  </div>
                  <p className="font-serif text-xl text-cream flex-1">PKR {(item.price * item.quantity).toLocaleString()}</p>
                  <button onClick={() => removeItem(item.id, item.color)} className="text-cream-dim hover:text-red-400 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-surface border border-[#c9a84c]/10 p-7 sticky top-24">
          <h3 className="font-serif text-xl text-cream font-light mb-6 pb-5 border-b border-[#c9a84c]/10">Order Summary</h3>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-[0.75rem] text-cream-dim tracking-wide">
              <span>Subtotal</span>
              <span>PKR {totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[0.75rem] text-cream-dim tracking-wide">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `PKR ${shipping}`}</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-[#c9a84c]/10">
              <span className="text-[0.75rem] text-cream-dim tracking-wide">Total</span>
              <span className="font-serif text-2xl text-cream">PKR {(totalPrice + shipping).toLocaleString()}</span>
            </div>
          </div>

          {shipping > 0 && (
            <p className="text-[0.62rem] text-gold tracking-wide mb-4">
              Add PKR {(5000 - totalPrice).toLocaleString()} more for free shipping
            </p>
          )}

          <button className="w-full bg-gold text-black py-4 text-[0.75rem] tracking-[0.2em] uppercase hover:bg-gold-light transition-all font-sans">
            Proceed to Checkout
          </button>
          <p className="text-[0.6rem] text-cream-dim text-center mt-4 tracking-wide">🔒 Secure checkout · SSL encrypted</p>
        </div>
      </div>
    </main>
  )
}

export default Cart
