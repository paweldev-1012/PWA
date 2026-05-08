'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Star, Clock, Bike, MapPin, Heart, Share2, ChevronRight } from 'lucide-react'
import { restaurants } from '@/data/restaurants'
import MenuItemCard from '@/components/restaurant/MenuItemCard'
import BottomNav from '@/components/layout/BottomNav'
import { useCart } from '@/lib/cart-context'
import Link from 'next/link'

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const restaurant = restaurants.find(r => r.id === id)
  const { totalItems, totalPrice } = useCart()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [liked, setLiked] = useState(false)

  if (!restaurant) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white/40">
        <div className="text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p>Restauracja nie znaleziona</p>
        </div>
      </div>
    )
  }

  const menuCategories = restaurant.categories
  const currentCategory = activeCategory || menuCategories[0]
  const filteredMenu = restaurant.menu.filter(item => item.category === currentCategory)

  return (
    <div className="min-h-screen pb-36">
      {/* Hero image */}
      <div className="relative h-56 w-full">
        <Image
          src={restaurant.coverImage}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/10 to-transparent" />

        {/* Top controls */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 safe-top">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 glass-dark rounded-xl flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setLiked(!liked)}
              className="w-10 h-10 glass-dark rounded-xl flex items-center justify-center"
            >
              <Heart className={`w-5 h-5 ${liked ? 'text-brand fill-brand' : 'text-white'}`} />
            </button>
            <button className="w-10 h-10 glass-dark rounded-xl flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Status badge */}
        {!restaurant.isOpen && (
          <div className="absolute bottom-4 right-4 bg-dark/80 text-white/60 text-xs font-medium px-3 py-1.5 rounded-full">
            Zamknięte
          </div>
        )}
      </div>

      <div className="max-w-lg mx-auto px-4">
        {/* Restaurant info */}
        <div className="mt-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="font-display font-black text-2xl text-white leading-tight">
                {restaurant.name}
              </h1>
              <p className="text-white/40 text-sm mt-1">{restaurant.cuisine}</p>
            </div>
            <div className="flex flex-col items-end flex-shrink-0">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-white">{restaurant.rating}</span>
              </div>
              <span className="text-white/30 text-xs">{restaurant.reviewCount} opinii</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 mt-3 py-3 border-y border-white/5">
            <div className="flex items-center gap-1.5 text-white/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/60">
              <Bike className="w-4 h-4" />
              <span className="text-sm">
                {restaurant.deliveryFee === 0 ? 'Darmowa dostawa' : `${restaurant.deliveryFee.toFixed(2)} zł dostawa`}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-white/60">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{restaurant.distance}</span>
            </div>
          </div>

          {/* Min order info */}
          <div className="flex items-center justify-between py-2">
            <span className="text-white/40 text-sm">Min. zamówienie: {restaurant.minOrder} zł</span>
            <button className="flex items-center gap-1 text-brand text-sm font-medium">
              <MapPin className="w-3.5 h-3.5" />
              Mapa
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-4 pb-1">
          {menuCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                currentCategory === cat
                  ? 'bg-brand text-white'
                  : 'glass text-white/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu items */}
        <div className="mt-4 glass rounded-2xl px-4">
          {filteredMenu.length === 0 ? (
            <div className="py-8 text-center text-white/40">
              <p>Brak pozycji w tej kategorii</p>
            </div>
          ) : (
            filteredMenu.map(item => (
              <MenuItemCard
                key={item.id}
                item={item}
                restaurantId={restaurant.id}
                restaurantName={restaurant.name}
              />
            ))
          )}
        </div>
      </div>

      {/* Cart bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-4 z-30">
          <div className="max-w-lg mx-auto">
            <Link
              href="/cart"
              className="flex items-center justify-between w-full brand-gradient px-5 py-4 rounded-2xl shadow-xl shadow-brand/30"
            >
              <div className="flex items-center gap-2">
                <span className="bg-white/20 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
                <span className="text-white font-semibold">Zobacz koszyk</span>
              </div>
              <span className="text-white font-bold">{totalPrice.toFixed(2)} zł</span>
            </Link>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
