'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, Bike, Flame } from 'lucide-react'
import { Restaurant } from '@/types'
import clsx from 'clsx'

interface RestaurantCardProps {
  restaurant: Restaurant
  variant?: 'default' | 'featured'
}

export default function RestaurantCard({ restaurant, variant = 'default' }: RestaurantCardProps) {
  const badgeColors = {
    new: 'bg-emerald-500',
    popular: 'bg-amber-500',
    featured: 'bg-brand',
  }

  if (variant === 'featured') {
    return (
      <Link href={`/restaurant/${restaurant.id}`} className="block flex-shrink-0 w-72">
        <div className="relative rounded-2xl overflow-hidden bg-dark-100 card-hover">
          {/* Cover image */}
          <div className="relative h-40 w-full">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              className="object-cover"
              sizes="288px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />

            {/* Badge */}
            {restaurant.badge && (
              <span className={clsx('absolute top-2 left-2 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full text-white', badgeColors[restaurant.badge])}>
                {restaurant.badge === 'new' ? 'Nowe' : restaurant.badge === 'popular' ? 'Popularne' : 'Polecane'}
              </span>
            )}

            {/* Closed overlay */}
            {!restaurant.isOpen && (
              <div className="absolute inset-0 bg-dark/70 flex items-center justify-center">
                <span className="bg-dark/80 text-white/60 text-xs font-medium px-3 py-1.5 rounded-full">
                  Zamknięte
                </span>
              </div>
            )}

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="font-display font-bold text-white text-base leading-tight">
                {restaurant.name}
              </h3>
              <p className="text-white/60 text-xs mt-0.5">{restaurant.cuisine}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between px-3 py-2.5 bg-dark-100">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-sm font-semibold text-white">{restaurant.rating}</span>
              <span className="text-white/30 text-xs">({restaurant.reviewCount})</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/50">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span className="text-xs">{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bike className="w-3 h-3" />
                <span className="text-xs">
                  {restaurant.deliveryFee === 0 ? 'Gratis' : `${restaurant.deliveryFee.toFixed(2)} zł`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/restaurant/${restaurant.id}`} className="block">
      <div className="flex gap-3 p-3 glass rounded-2xl card-hover">
        {/* Image */}
        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover"
            sizes="80px"
          />
          {!restaurant.isOpen && (
            <div className="absolute inset-0 bg-dark/60 flex items-center justify-center">
              <span className="text-white/70 text-[9px] font-medium text-center leading-tight px-1">Zamknięte</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-display font-bold text-white text-sm truncate">{restaurant.name}</h3>
              <p className="text-white/40 text-xs mt-0.5 truncate">{restaurant.cuisine}</p>
            </div>
            {restaurant.badge && (
              <span className={clsx('text-[9px] font-bold uppercase px-2 py-0.5 rounded-full text-white flex-shrink-0', badgeColors[restaurant.badge])}>
                {restaurant.badge === 'new' ? 'Nowe' : restaurant.badge === 'popular' ? 'Pop.' : 'Top'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold text-white">{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-0.5 text-white/40">
              <Clock className="w-3 h-3" />
              <span className="text-xs">{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-0.5 text-white/40">
              <Bike className="w-3 h-3" />
              <span className="text-xs">
                {restaurant.deliveryFee === 0 ? 'Gratis' : `${restaurant.deliveryFee.toFixed(2)} zł`}
              </span>
            </div>
            {restaurant.promoted && (
              <div className="flex items-center gap-0.5 text-brand">
                <Flame className="w-3 h-3" />
                <span className="text-xs font-medium">Hot</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
