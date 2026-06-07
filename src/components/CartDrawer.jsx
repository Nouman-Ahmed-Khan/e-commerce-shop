import { Link } from 'react-router-dom'
import { X, Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext'

const CartDrawer = () => {
  const { items, isOpen, closeDrawer, removeItem, updateQuantity, totalPrice, totalItems } = useCart()

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 bg-black/50 z-[200] transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[400px] max-w-[95vw] bg-ivory z-[201]
          flex flex-col border-l border-gold/15
          transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-6 border-b border-gold/15 shrink-0">
          <h3 className="font-serif font-light text-[1.4rem] text-black">
            Your Cart
            {totalItems > 0 && (
              <span className="text-gold font-sans text-sm ml-2">({totalItems})</span>
            )}
          </h3>
          <button
            onClick={closeDrawer}
            className="flex items-center justify-center w-8 h-8 text-gold-dim
              bg-transparent border-none transition-colors duration-300 hover:text-gold"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-7 py-5 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
              <p className="text-[0.78rem] text-gold-dim tracking-[0.1em]">Your cart is empty.</p>
              <button
                onClick={closeDrawer}
                className="border border-gold/30 text-black font-sans text-[0.62rem] tracking-[0.18em]
                  uppercase px-6 py-3 bg-transparent transition-all duration-300
                  hover:bg-gold hover:border-gold hover:text-black"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.color}`}
                className="relative flex gap-4 bg-[#f5f0e8] border border-gold/10 p-4"
              >
                {/* Colour swatch */}
                <div
                  className="w-[64px] h-[64px] shrink-0 rounded-sm"
                  style={{ background: item.colors?.find(c => c.name === item.color)?.hex || '#3a1f0a' }}
                />

                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <p className="font-serif text-[1rem] text-black truncate">{item.name}</p>
                  <p className="text-[0.58rem] tracking-[0.15em] text-gold uppercase">{item.color}</p>

                  <div className="flex items-center justify-between mt-auto pt-2">
                    {/* Qty */}
                    <div className="flex items-center gap-2 border border-gold/20 px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                        className="text-gold-dim bg-transparent border-none flex items-center
                          hover:text-gold transition-colors"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="text-[0.72rem] text-black min-w-[16px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                        className="text-gold-dim bg-transparent border-none flex items-center
                          hover:text-gold transition-colors"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                    <p className="text-[0.78rem] text-black font-light">
                      PKR {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id, item.color)}
                  className="absolute top-3 right-3 text-gold-dim bg-transparent border-none
                    flex items-center transition-colors duration-300 hover:text-red-500"
                >
                  <Trash2 size={13} strokeWidth={1.5} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-7 py-6 border-t border-gold/15 shrink-0 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="font-sans text-[0.62rem] tracking-[0.2em] uppercase text-gold-dim">
                Total
              </span>
              <span className="font-serif text-[1.25rem] text-black">
                PKR {totalPrice.toLocaleString()}
              </span>
            </div>
            <Link
              to="/cart"
              onClick={closeDrawer}
              className="block text-center bg-black text-cream font-sans text-[0.68rem]
                tracking-[0.2em] uppercase py-4 transition-all duration-300
                hover:bg-gold hover:text-black"
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
