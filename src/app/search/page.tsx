'use client'

import { useState, useMemo } from 'react'
import { ArrowLeft, Search, X } from 'lucide-react'
import Link from 'next/link'
import { restaurants } from '@/data/restaurants'
import RestaurantCard from '@/components/home/RestaurantCard'
import BottomNav from '@/components/layout/BottomNav'

const recentSearches = ['burger', 'sushi', 'pizza', 'pad thai']
const popularSearches = ['🍔 Burgery', '🍕 Pizza', '🍱 Sushi', '🌯 Kebab', '🥗 Vege', '🍜 Ramen']

export default function SearchPage() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return restaurants.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.menu.some(m => m.name.toLowerCase().includes(q))
    )
  }, [query])

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-lg mx-auto px-4">
        {/* Header with search */}
        <div className="flex items-center gap-3 py-4">
          <Link href="/" className="w-10 h-10 glass rounded-xl flex items-center justify-center flex-shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1 flex items-center gap-2 glass rounded-xl px-3 py-2.5">
            <Search className="w-4 h-4 text-white/30 flex-shrink-0" />
            <input
              type="text"
              placeholder="Szukaj restauracji lub dania..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/25"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-white/30 hover:text-white/60">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Search results */}
        {query ? (
          <div>
            <p className="text-white/40 text-sm mb-3">
              {results.length === 0
                ? 'Brak wyników'
                : `${results.length} wynik${results.length > 1 ? 'ów' : ''} dla "${query}"`
              }
            </p>
            {results.length > 0 ? (
              <div className="flex flex-col gap-3">
                {results.map(r => (
                  <RestaurantCard key={r.id} restaurant={r} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-5xl mb-4">🔍</p>
                <p className="text-white/40">Spróbuj innego hasła</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Recent searches */}
            <div>
              <h3 className="font-display font-bold text-white mb-3">Ostatnie wyszukiwania</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map(s => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="flex items-center gap-2 glass px-3 py-2 rounded-xl text-sm text-white/60 hover:text-white transition-colors"
                  >
                    <Search className="w-3 h-3" />
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular categories */}
            <div>
              <h3 className="font-display font-bold text-white mb-3">Popularne kategorie</h3>
              <div className="grid grid-cols-3 gap-2">
                {popularSearches.map(s => (
                  <button
                    key={s}
                    onClick={() => setQuery(s.split(' ')[1]?.toLowerCase() || s)}
                    className="glass rounded-xl py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all font-medium"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* All restaurants */}
            <div>
              <h3 className="font-display font-bold text-white mb-3">Wszystkie restauracje</h3>
              <div className="flex flex-col gap-3">
                {restaurants.map(r => (
                  <RestaurantCard key={r.id} restaurant={r} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
