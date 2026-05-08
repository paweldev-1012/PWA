'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, CheckCircle, Clock, Bike, Package, Star } from 'lucide-react'
import Link from 'next/link'
import BottomNav from '@/components/layout/BottomNav'

const mockOrders = [
  {
    id: 'ORD-2024-001',
    restaurantName: 'Burger Imperium',
    items: ['Classic Smash Burger x2', 'Frytki belgijskie x1'],
    total: 80.70,
    status: 'delivering',
    time: '20 min',
    date: 'Dziś, 18:35',
  },
  {
    id: 'ORD-2024-002',
    restaurantName: 'Sushi Sakura',
    items: ['Dragon Roll (8 szt.)', 'Ramen Tonkotsu'],
    total: 107.80,
    status: 'delivered',
    time: null,
    date: 'Wczoraj, 20:12',
  },
  {
    id: 'ORD-2024-003',
    restaurantName: 'Pizza Paradiso',
    items: ['Margherita Bufalina x2', 'Tiramisu'],
    total: 110.70,
    status: 'delivered',
    time: null,
    date: '3 maja, 19:48',
  },
]

const statusConfig = {
  pending: { icon: Clock, label: 'Oczekuje', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  confirmed: { icon: CheckCircle, label: 'Potwierdzone', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  preparing: { icon: Package, label: 'W przygotowaniu', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  delivering: { icon: Bike, label: 'W drodze', color: 'text-brand', bg: 'bg-brand/10' },
  delivered: { icon: CheckCircle, label: 'Dostarczone', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
}

function OrdersContent() {
  const searchParams = useSearchParams()
  const isNew = searchParams.get('new') === 'true'
  const [showSuccess, setShowSuccess] = useState(isNew)

  useEffect(() => {
    if (isNew) {
      const t = setTimeout(() => setShowSuccess(false), 5000)
      return () => clearTimeout(t)
    }
  }, [isNew])

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex items-center gap-3 py-4">
          <Link href="/" className="w-10 h-10 glass rounded-xl flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-display font-bold text-xl text-white">Moje zamówienia</h1>
        </div>

        {/* Success toast */}
        {showSuccess && (
          <div className="mb-4 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-3 animate-slide-up">
            <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-emerald-400 font-semibold">Zamówienie złożone! 🎉</p>
              <p className="text-emerald-400/70 text-sm">Szacowany czas dostawy: 25-35 min</p>
            </div>
          </div>
        )}

        {/* Active order tracker */}
        <div className="glass rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/40 text-xs">Aktywne zamówienie</p>
              <h3 className="font-display font-bold text-white">Burger Imperium</h3>
            </div>
            <span className="text-xs font-medium text-brand bg-brand/10 px-2.5 py-1 rounded-full">
              ~20 min
            </span>
          </div>

          {/* Progress steps */}
          <div className="flex items-center gap-0">
            {['Odebrano', 'Przygotowanie', 'W drodze', 'Dostarczone'].map((step, idx) => {
              const isActive = idx <= 2
              const isCurrent = idx === 2
              return (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      isCurrent ? 'bg-brand shadow-lg shadow-brand/50 scale-125' :
                      isActive ? 'bg-brand' : 'bg-white/20'
                    }`} />
                    <p className={`text-[9px] mt-1 whitespace-nowrap ${
                      isActive ? 'text-brand' : 'text-white/20'
                    } ${isCurrent ? 'font-bold' : ''}`}>
                      {step}
                    </p>
                  </div>
                  {idx < 3 && (
                    <div className={`h-0.5 flex-1 mx-1 ${isActive && idx < 2 ? 'bg-brand' : 'bg-white/10'}`} />
                  )}
                </div>
              )
            })}
          </div>

          <p className="text-white/30 text-xs mt-3 text-center">
            Kurier jest w drodze do Ciebie 🏍️
          </p>
        </div>

        {/* Orders list */}
        <div className="space-y-3">
          {mockOrders.map(order => {
            const status = statusConfig[order.status as keyof typeof statusConfig]
            const StatusIcon = status.icon

            return (
              <div key={order.id} className="glass rounded-2xl p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-white truncate">{order.restaurantName}</h3>
                    <p className="text-white/30 text-xs mt-0.5">{order.date}</p>
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${status.color} ${status.bg}`}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                </div>

                <div className="mt-2 space-y-0.5">
                  {order.items.map(item => (
                    <p key={item} className="text-white/40 text-xs">{item}</p>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                  <span className="font-display font-bold text-white">{order.total.toFixed(2)} zł</span>
                  <div className="flex gap-2">
                    {order.status === 'delivered' && (
                      <button className="flex items-center gap-1 text-amber-400 text-xs font-medium glass px-3 py-1.5 rounded-xl">
                        <Star className="w-3 h-3" />
                        Oceń
                      </button>
                    )}
                    <button className="text-brand text-xs font-medium glass px-3 py-1.5 rounded-xl">
                      Zamów ponownie
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="text-white/40">Ładowanie...</span></div>}>
      <OrdersContent />
    </Suspense>
  )
}
