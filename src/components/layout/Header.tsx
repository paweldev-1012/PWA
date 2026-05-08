'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, MapPin, ChevronDown, Bell, Search } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { usePathname } from 'next/navigation'

export default function Header() {
  const { totalItems } = useCart()
  const pathname = usePathname()
  const [location] = useState('Warszawa, ul. Marszałkowska 1')

  const isRestaurantPage = pathname?.startsWith('/restaurant/')

  return (
    <header className="glass-dark sticky top-0 z-40 safe-top">
      <div className="max-w-lg mx-auto px-4 py-3">
        {/* Top row */}
        <div className="flex items-center justify-between gap-3">
          {/* Location */}
          <button className="flex items-center gap-1.5 min-w-0 group">
            <MapPin className="w-4 h-4 text-brand flex-shrink-0" />
            <div className="min-w-0 text-left">
              <p className="text-xs text-white/40 leading-none">Dostawa do</p>
              <div className="flex items-center gap-1">
                <p className="text-sm font-medium truncate max-w-[160px] text-white group-hover:text-brand transition-colors">
                  {location.split(',')[0]}
                </p>
                <ChevronDown className="w-3 h-3 text-white/40 flex-shrink-0" />
              </div>
            </div>
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-display font-black text-xl tracking-tight">
              Food<span className="text-gradient">Rush</span>
            </span>
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors">
              <Bell className="w-4 h-4 text-white/60" />
            </button>
            <Link
              href="/cart"
              className="relative w-9 h-9 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-white/60" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand rounded-full text-[10px] font-bold flex items-center justify-center pulse-brand">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search bar - only on home */}
        {!isRestaurantPage && (
          <Link
            href="/search"
            className="mt-3 flex items-center gap-2.5 px-3.5 py-2.5 glass rounded-xl w-full hover:bg-white/10 transition-colors"
          >
            <Search className="w-4 h-4 text-white/30" />
            <span className="text-sm text-white/30">Szukaj restauracji lub dania...</span>
          </Link>
        )}
      </div>
    </header>
  )
}
