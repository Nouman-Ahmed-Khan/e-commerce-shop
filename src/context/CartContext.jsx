import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (i) => i.id === action.payload.id && i.color === action.payload.color
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id && i.color === action.payload.color
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.id === action.payload.id && i.color === action.payload.color)
        ),
      }
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) => !(i.id === action.payload.id && i.color === action.payload.color)
          ),
        }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id && i.color === action.payload.color
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'TOGGLE_DRAWER':
      return { ...state, isOpen: !state.isOpen }
    case 'OPEN_DRAWER':
      return { ...state, isOpen: true }
    case 'CLOSE_DRAWER':
      return { ...state, isOpen: false }
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false }, (init) => {
    try {
      const saved = localStorage.getItem('vellum-cart')
      return saved ? { ...init, items: JSON.parse(saved) } : init
    } catch {
      return init
    }
  })

  useEffect(() => {
    localStorage.setItem('vellum-cart', JSON.stringify(state.items))
  }, [state.items])

  const addItem = (product, color) => dispatch({ type: 'ADD_ITEM', payload: { ...product, color } })
  const removeItem = (id, color) => dispatch({ type: 'REMOVE_ITEM', payload: { id, color } })
  const updateQuantity = (id, color, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, color, quantity } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })
  const toggleDrawer = () => dispatch({ type: 'TOGGLE_DRAWER' })
  const openDrawer = () => dispatch({ type: 'OPEN_DRAWER' })
  const closeDrawer = () => dispatch({ type: 'CLOSE_DRAWER' })

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleDrawer,
        openDrawer,
        closeDrawer,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
