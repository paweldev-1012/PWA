export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  popular?: boolean
  spicy?: boolean
  vegetarian?: boolean
  calories?: number
}

export interface Restaurant {
  id: string
  name: string
  cuisine: string
  image: string
  coverImage: string
  rating: number
  reviewCount: number
  deliveryTime: string
  deliveryFee: number
  minOrder: number
  distance: string
  categories: string[]
  menu: MenuItem[]
  badge?: 'new' | 'popular' | 'featured'
  promoted?: boolean
  isOpen: boolean
  address: string
}

export interface CartItem {
  menuItem: MenuItem
  quantity: number
  restaurantId: string
  restaurantName: string
  specialInstructions?: string
}

export interface CartState {
  items: CartItem[]
  restaurantId: string | null
  restaurantName: string | null
}

export interface Order {
  id: string
  restaurantName: string
  items: CartItem[]
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered'
  createdAt: Date
  estimatedTime: string
}
