import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()

  const SHIPPING_THRESHOLD = 5000
  const shipping = totalPrice >= SHIPPING_THRESHOLD ? 0 : 500
  const total    = totalPrice + shipping

  return (
    <main className="min-h-screen bg-ivory pt-20">

      {/* Header */}
      <section className="bg-gradient-to-br from-ivory to-[#f0ebe0] px-10 pt-14 pb-12 border-b border-gold/[0.12]">
        <h1 className="font-serif font-light text-[2.8rem] text-black">Your Cart</h1>
        <p className="font-sans text-[0.68rem] tracking-[0.2em] text-gold-dim uppercase mt-2">
          {items.length} item{items.length !== 1 ? 's' : ''}
        </p>
      </section>

      {items.length === 0 ? (
        <section className="px-10 py-24 text-center">
          <p className="font-serif text-[1.3rem] text-gold-dim mb-8">Your cart is empty</p>
          <Link
            to="/shop"
            className="inline-block bg-black text-cream font-sans text-[0.65rem]
              tracking-[0.2em] uppercase px-10 py-4
              transition-all duration-300 hover:bg-gold hover:text-black"
          >
            Continue Shopping
          </Link>
        </section>
      ) : (
        <section className="px-10 py-14 max-w-[1300px] mx-auto">
          <div className="grid grid-cols-[1fr_380px] gap-12 max-lg:grid-cols-1">

            {/* Cart items */}
            <div className="flex flex-col gap-5">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.color}`}
                  className="relative grid grid-cols-[90px_1fr] gap-6 bg-white
                    border border-gold/[0.12] p-6"
                >
                  {/* Swatch */}
                  <div
                    className="w-[90px] h-[90px] rounded-sm shrink-0"
                    style={{ background: item.colors?.find(c => c.name === item.color)?.hex || '#3a1f0a' }}
                  />

                  {/* Details */}
                  <div className="flex flex-col">
                    <h3 className="font-serif font-light text-[1.05rem] text-black mb-1">{item.name}</h3>
                    <p className="font-sans text-[0.58rem] tracking-[0.15em] text-gold uppercase mb-1">{item.color}</p>
                    <p className="font-sans text-[0.7rem] text-gold-dim mb-4">
                      PKR {item.price.toLocaleString()} each
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      {/* Qty control */}
                      <div className="flex items-center gap-3 border border-gold/20 px-3 py-[6px]">
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                          className="text-gold-dim bg-transparent border-none flex items-center
                            hover:text-gold transition-colors"
                        >
                          <Minus size={13} strokeWidth={1.5} />
                        </button>
                        <span className="font-serif text-[1rem] text-black min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                          className="text-gold-dim bg-transparent border-none flex items-center
                            hover:text-gold transition-colors"
                        >
                          <Plus size={13} strokeWidth={1.5} />
                        </button>
                      </div>

                      <p className="font-serif text-[1.2rem] text-black">
                        PKR {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Remove btn */}
                  <button
                    onClick={() => removeItem(item.id, item.color)}
                    className="absolute top-4 right-4 text-gold-dim bg-transparent border-none
                      flex items-center transition-colors duration-300 hover:text-red-500"
                  >
                    <Trash2 size={15} strokeWidth={1.5} />
                  </button>
                </div>
              ))}

              {/* Clear cart */}
              <div className="flex justify-end">
                <button
                  onClick={clearCart}
                  className="font-sans text-[0.6rem] tracking-[0.15em] uppercase text-gold-dim
                    bg-transparent border-none transition-colors duration-300 hover:text-red-500"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order summary */}
            <div className="sticky top-28 h-fit bg-white border border-gold/15 p-8">
              <h3 className="font-serif font-light text-[1.4rem] text-black mb-8">Order Summary</h3>

              <div className="flex flex-col gap-4 pb-6 border-b border-gold/15 mb-6">
                <div className="flex justify-between text-[0.75rem] text-black">
                  <span>Subtotal</span>
                  <span>PKR {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[0.75rem] text-black">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {shipping === 0 ? 'FREE' : `PKR ${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[0.6rem] text-gold-dim tracking-[0.08em]">
                    Free shipping on orders over PKR {SHIPPING_THRESHOLD.toLocaleString()}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="font-sans text-[0.68rem] tracking-[0.2em] uppercase text-black">Total</span>
                <span className="font-serif text-[1.7rem] text-black">PKR {total.toLocaleString()}</span>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  className="w-full bg-black text-cream font-sans text-[0.68rem] tracking-[0.2em]
                    uppercase py-4 border-none transition-all duration-300
                    hover:bg-gold hover:text-black"
                >
                  Proceed to Checkout
                </button>
                <Link
                  to="/shop"
                  className="block text-center border border-gold/25 text-black font-sans
                    text-[0.68rem] tracking-[0.2em] uppercase py-4 bg-transparent
                    transition-all duration-300 hover:border-gold hover:text-gold"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

          </div>
        </section>
      )}
    </main>
  )
}

export default Cart
