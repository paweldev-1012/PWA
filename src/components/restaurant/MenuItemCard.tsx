'use client'

import Image from 'next/image'
import { Plus, Minus, Leaf, Flame } from 'lucide-react'
import { MenuItem } from '@/types'
import { useCart } from '@/lib/cart-context'
import clsx from 'clsx'

interface MenuItemCardProps {
  item: MenuItem
  restaurantId: string
  restaurantName: string
}

export default function MenuItemCard({ item, restaurantId, restaurantName }: MenuItemCardProps) {
  const { addItem, updateQuantity, getItemQuantity } = useCart()
  const quantity = getItemQuantity(item.id)

  return (
    <div className="flex gap-3 py-3 border-b border-white/5 last:border-0">
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          {item.popular && (
            <span className="text-[9px] font-bold bg-brand/20 text-brand px-1.5 py-0.5 rounded-full uppercase">
              Polecane
            </span>
          )}
          {item.vegetarian && <Leaf className="w-3 h-3 text-emerald-400" />}
          {item.spicy && <Flame className="w-3 h-3 text-orange-400" />}
        </div>

        <h4 className="font-display font-semibold text-white text-sm leading-snug">
          {item.name}
        </h4>
        <p className="text-white/40 text-xs mt-1 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="font-display font-bold text-white">
              {item.price.toFixed(2)}
            </span>
            <span className="text-white/40 text-xs ml-0.5">zł</span>
            {item.calories && (
              <span className="text-white/25 text-xs ml-2">{item.calories} kcal</span>
            )}
          </div>

          {/* Quantity control */}
          {quantity === 0 ? (
            <button
              onClick={() => addItem(item, restaurantId, restaurantName)}
              className="w-8 h-8 bg-brand rounded-full flex items-center justify-center hover:bg-brand/80 active:scale-95 transition-all shadow-lg shadow-brand/30"
            >
              <Plus className="w-4 h-4 text-white" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, quantity - 1)}
                className="w-7 h-7 glass rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all"
              >
                <Minus className="w-3 h-3 text-white" />
              </button>
              <span className="font-display font-bold text-brand w-4 text-center text-sm">
                {quantity}
              </span>
              <button
                onClick={() => addItem(item, restaurantId, restaurantName)}
                className="w-7 h-7 bg-brand rounded-full flex items-center justify-center hover:bg-brand/80 active:scale-95 transition-all"
              >
                <Plus className="w-3 h-3 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>
    </div>
  )
}
