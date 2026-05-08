'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { CartItem, CartState, MenuItem } from '@/types'

type CartAction =
  | { type: 'ADD_ITEM'; payload: { menuItem: MenuItem; restaurantId: string; restaurantName: string } }
  | { type: 'REMOVE_ITEM'; payload: { menuItemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { menuItemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }

const initialState: CartState = {
  items: [],
  restaurantId: null,
  restaurantName: null,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { menuItem, restaurantId, restaurantName } = action.payload

      // If adding from different restaurant, clear cart
      if (state.restaurantId && state.restaurantId !== restaurantId) {
        return {
          restaurantId,
          restaurantName,
          items: [{ menuItem, quantity: 1, restaurantId, restaurantName }],
        }
      }

      const existingItem = state.items.find(i => i.menuItem.id === menuItem.id)
      if (existingItem) {
        return {
          ...state,
          restaurantId,
          restaurantName,
          items: state.items.map(i =>
            i.menuItem.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }

      return {
        restaurantId,
        restaurantName,
        items: [...state.items, { menuItem, quantity: 1, restaurantId, restaurantName }],
      }
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(i => i.menuItem.id !== action.payload.menuItemId)
      return {
        ...state,
        items: newItems,
        restaurantId: newItems.length === 0 ? null : state.restaurantId,
        restaurantName: newItems.length === 0 ? null : state.restaurantName,
      }
    }
    case 'UPDATE_QUANTITY': {
      const { menuItemId, quantity } = action.payload
      if (quantity <= 0) {
        const newItems = state.items.filter(i => i.menuItem.id !== menuItemId)
        return {
          ...state,
          items: newItems,
          restaurantId: newItems.length === 0 ? null : state.restaurantId,
          restaurantName: newItems.length === 0 ? null : state.restaurantName,
        }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.menuItem.id === menuItemId ? { ...i, quantity } : i
        ),
      }
    }
    case 'CLEAR_CART':
      return initialState
    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addItem: (menuItem: MenuItem, restaurantId: string, restaurantName: string) => void
  removeItem: (menuItemId: string) => void
  updateQuantity: (menuItemId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  getItemQuantity: (menuItemId: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = (menuItem: MenuItem, restaurantId: string, restaurantName: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { menuItem, restaurantId, restaurantName } })
  }

  const removeItem = (menuItemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { menuItemId } })
  }

  const updateQuantity = (menuItemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { menuItemId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = state.items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0)

  const getItemQuantity = (menuItemId: string) => {
    return state.items.find(i => i.menuItem.id === menuItemId)?.quantity || 0
  }

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, getItemQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
