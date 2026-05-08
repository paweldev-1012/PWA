'use client'

import { useState, useMemo } from 'react'
import { Zap, TrendingUp, Clock } from 'lucide-react'
import Header from '@/components/layout/Header'
import BottomNav from '@/components/layout/BottomNav'
import RestaurantCard from '@/components/home/RestaurantCard'
import CategoryFilter from '@/components/home/CategoryFilter'
import { restaurants } from '@/data/restaurants'

const categoryMap: Record<string, string[]> = {
  burgers: ['Burger Imperium'],
  pizza: ['Pizza Paradiso'],
  sushi: ['Sushi Sakura'],
  asian: ['Sushi Sakura', 'Thai Street Kitchen'],
  kebab: ['Kebab Sultan'],
  vege: ['Vege Paradise'],
}

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredRestaurants = useMemo(() => {
    if (selectedCategory === 'all') return restaurants
    const names = categoryMap[selectedCategory] || []
    return restaurants.filter(r => names.includes(r.name))
  }, [selectedCategory])

  const featuredRestaurants = restaurants.filter(r => r.promoted || r.badge === 'featured')
  const fastDelivery = restaurants.filter(r => parseInt(r.deliveryTime) <= 25)

  return (
    <div className="min-h-screen pb-24">
      <Header />

      <main className="max-w-lg mx-auto px-4">

        {/* Hero Banner */}
        <div className="mt-4 relative rounded-2xl overflow-hidden bg-gradient-to-br from-brand to-orange-500 p-5">
          <div className="relative z-10">
            <p className="text-white/80 text-sm font-medium">🔥 Oferta dnia</p>
            <h2 className="font-display font-black text-2xl text-white mt-1 leading-tight">
              Darmowa dostawa<br />przez cały weekend!
            </h2>
            <button className="mt-3 bg-white text-brand font-bold text-sm px-4 py-2 rounded-xl hover:bg-white/90 active:scale-95 transition-all">
              Zamów teraz
            </button>
          </div>
          {/* Decorative circles */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -right-2 -bottom-6 w-20 h-20 bg-white/10 rounded-full" />
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { icon: Zap, label: 'Superszybko', value: '< 25 min', color: 'text-yellow-400' },
            { icon: TrendingUp, label: 'Popularne', value: '50+ miejsc', color: 'text-brand' },
            { icon: Clock, label: 'Otwarte teraz', value: '24/7', color: 'text-emerald-400' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="glass rounded-xl p-3 text-center">
              <Icon className={`w-5 h-5 ${color} mx-auto mb-1`} />
              <p className="text-white font-semibold text-sm">{value}</p>
              <p className="text-white/40 text-[10px]">{label}</p>
            </div>
          ))}
        </div>

        {/* Featured restaurants */}
        <section className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-bold text-white">⭐ Polecane</h2>
            <button className="text-brand text-sm font-medium">Zobacz wszystkie</button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {featuredRestaurants.map(r => (
              <RestaurantCard key={r.id} restaurant={r} variant="featured" />
            ))}
          </div>
        </section>

        {/* Fast delivery */}
        {fastDelivery.length > 0 && (
          <section className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold text-white">⚡ Ekspresowa dostawa</h2>
              <span className="text-white/40 text-xs">{'< 25 min'}</span>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {fastDelivery.map(r => (
                <RestaurantCard key={r.id} restaurant={r} variant="featured" />
              ))}
            </div>
          </section>
        )}

        {/* All restaurants */}
        <section className="mt-6">
          <h2 className="font-display font-bold text-white mb-3">🍽️ Wszystkie restauracje</h2>

          {/* Category filter */}
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

          <div className="flex flex-col gap-3 mt-4">
            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-12 text-white/40">
                <p className="text-4xl mb-3">🍽️</p>
                <p className="font-medium">Brak restauracji w tej kategorii</p>
              </div>
            ) : (
              filteredRestaurants.map(r => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))
            )}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
