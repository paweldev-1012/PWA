'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, ClipboardList, User, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import clsx from 'clsx'

const navItems = [
  { href: '/', icon: Home, label: 'Główna' },
  { href: '/search', icon: Search, label: 'Szukaj' },
  { href: '/orders', icon: ClipboardList, label: 'Zamówienia' },
  { href: '/profile', icon: User, label: 'Profil' },
]

export default function BottomNav() {
  const pathname = usePathname()
  const { totalItems } = useCart()

  return (
    <nav className="glass-dark fixed bottom-0 left-0 right-0 z-40 safe-bottom">
      <div className="max-w-lg mx-auto px-2 py-2 flex items-center justify-around">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href

          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all',
                isActive ? 'text-brand' : 'text-white/40 hover:text-white/60'
              )}
            >
              <div className={clsx('relative', isActive && 'scale-110 transition-transform')}>
                <Icon className={clsx('w-5 h-5', isActive && 'stroke-[2.5px]')} />
              </div>
              <span className={clsx('text-[10px] font-medium', isActive && 'font-semibold')}>
                {label}
              </span>
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 bg-brand rounded-full" />
              )}
            </Link>
          )
        })}

        {/* Cart FAB */}
        <Link
          href="/cart"
          className={clsx(
            'relative flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all',
            pathname === '/cart' ? 'text-brand' : 'text-white/40 hover:text-white/60'
          )}
        >
          <div className="relative">
            <ShoppingBag className={clsx('w-5 h-5', pathname === '/cart' && 'stroke-[2.5px]')} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brand rounded-full text-[9px] font-bold flex items-center justify-center text-white">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </div>
          <span className={clsx('text-[10px] font-medium', pathname === '/cart' && 'font-semibold')}>
            Koszyk
          </span>
        </Link>
      </div>
    </nav>
  )
}
