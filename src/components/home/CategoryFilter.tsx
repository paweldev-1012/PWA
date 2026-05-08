'use client'

import { categories } from '@/data/restaurants'
import clsx from 'clsx'

interface CategoryFilterProps {
  selected: string
  onSelect: (id: string) => void
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={clsx(
            'flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0',
            selected === cat.id
              ? 'bg-brand text-white shadow-lg shadow-brand/30'
              : 'glass text-white/50 hover:text-white hover:bg-white/10'
          )}
        >
          <span>{cat.emoji}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  )
}
