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
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-400
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 w-[420px] max-sm:w-full bg-deep border-l border-[#c9a84c]/10 z-[61]
        flex flex-col transition-transform duration-400 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-7 border-b border-[#c9a84c]/10">
          <h3 className="font-serif text-2xl font-light text-cream">
            Your Cart {totalItems > 0 && <span className="text-gold text-lg">({totalItems})</span>}
          </h3>
          <button onClick={closeDrawer} className="text-cream-dim hover:text-gold transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4 scrollbar-thin">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-6">
              <p className="text-[0.8rem] text-cream-dim tracking-widest">Your cart is empty.</p>
              <button
                onClick={closeDrawer}
                className="border border-[#c9a84c]/20 text-cream-dim text-[0.65rem] tracking-[0.2em] uppercase px-6 py-3 transition-all hover:border-gold hover:text-gold"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.color}`} className="flex gap-3 bg-surface border border-[#c9a84c]/10 p-3 relative">
                {/* Color swatch as image placeholder */}
                <div
                  className="w-[70px] h-[70px] flex-shrink-0 opacity-80 rounded-sm"
                  style={{ background: item.colors?.find(c => c.name === item.color)?.hex || '#3a1f0a' }}
                />
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <p className="font-serif text-[1rem] text-cream leading-tight">{item.name}</p>
                  <p className="text-[0.6rem] tracking-[0.15em] text-gold uppercase">{item.color}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 border border-[#c9a84c]/20 px-2 py-1">
                      <button onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)} className="text-cream-dim hover:text-gold transition-colors">
                        <Minus size={11} />
                      </button>
                      <span className="text-[0.75rem] text-cream w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)} className="text-cream-dim hover:text-gold transition-colors">
                        <Plus size={11} />
                      </button>
                    </div>
                    <p className="text-[0.75rem] text-cream">PKR {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id, item.color)}
                  className="absolute top-2 right-2 text-cream-dim hover:text-red-400 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#c9a84c]/10 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-[0.65rem] tracking-[0.2em] uppercase text-cream-dim">Total</span>
              <span className="font-serif text-xl text-cream">PKR {totalPrice.toLocaleString()}</span>
            </div>
            <Link
              to="/cart"
              onClick={closeDrawer}
              className="bg-gold text-black text-center text-[0.7rem] tracking-[0.2em] uppercase py-4 transition-all hover:bg-gold-light font-sans"
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
