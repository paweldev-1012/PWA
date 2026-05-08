'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Tag, ChevronRight } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import BottomNav from '@/components/layout/BottomNav'

export default function CartPage() {
  const router = useRouter()
  const { state, updateQuantity, removeItem, clearCart, totalPrice } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [isOrdering, setIsOrdering] = useState(false)

  const deliveryFee = totalPrice > 0 ? 3.99 : 0
  const discount = promoApplied ? totalPrice * 0.1 : 0
  const finalTotal = totalPrice + deliveryFee - discount

  const handleOrder = async () => {
    setIsOrdering(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    clearCart()
    router.push('/orders?new=true')
  }

  const handlePromo = () => {
    if (promoCode.toLowerCase() === 'foodrush') {
      setPromoApplied(true)
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen pb-24 flex flex-col">
        <div className="max-w-lg mx-auto px-4 w-full">
          <div className="flex items-center gap-3 py-4">
            <button onClick={() => router.back()} className="w-10 h-10 glass rounded-xl flex items-center justify-center">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-display font-bold text-xl text-white">Koszyk</h1>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4 gap-4">
          <div className="w-24 h-24 glass rounded-3xl flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-white/20" />
          </div>
          <div className="text-center">
            <h2 className="font-display font-bold text-xl text-white">Koszyk jest pusty</h2>
            <p className="text-white/40 text-sm mt-1">Dodaj coś smacznego!</p>
          </div>
          <Link
            href="/"
            className="brand-gradient px-6 py-3 rounded-2xl text-white font-semibold"
          >
            Przeglądaj restauracje
          </Link>
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-36">
      <div className="max-w-lg mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-3 py-4">
          <button onClick={() => router.back()} className="w-10 h-10 glass rounded-xl flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-display font-bold text-xl text-white">Koszyk</h1>
            <p className="text-white/40 text-xs">{state.restaurantName}</p>
          </div>
        </div>

        {/* Items */}
        <div className="glass rounded-2xl overflow-hidden">
          {state.items.map((item, idx) => (
            <div
              key={item.menuItem.id}
              className={`flex items-center gap-3 p-4 ${idx !== state.items.length - 1 ? 'border-b border-white/5' : ''}`}
            >
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={item.menuItem.image}
                  alt={item.menuItem.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white text-sm truncate">{item.menuItem.name}</h4>
                <p className="text-brand font-bold text-sm mt-0.5">
                  {(item.menuItem.price * item.quantity).toFixed(2)} zł
                </p>
                <p className="text-white/30 text-xs">{item.menuItem.price.toFixed(2)} zł / szt.</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => removeItem(item.menuItem.id)}
                  className="text-white/20 hover:text-brand transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                    className="w-7 h-7 glass rounded-full flex items-center justify-center hover:bg-white/10"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-bold text-white w-4 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                    className="w-7 h-7 bg-brand rounded-full flex items-center justify-center hover:bg-brand/80"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo code */}
        <div className="mt-4 glass rounded-2xl p-4">
          <div className="flex gap-2">
            <div className="flex items-center gap-2 flex-1 bg-white/5 rounded-xl px-3 py-2">
              <Tag className="w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Kod promocyjny"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                className="bg-transparent text-white text-sm flex-1 outline-none placeholder:text-white/20"
                disabled={promoApplied}
              />
            </div>
            <button
              onClick={handlePromo}
              disabled={promoApplied || !promoCode}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                promoApplied
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-brand text-white hover:bg-brand/80 disabled:opacity-40'
              }`}
            >
              {promoApplied ? 'Dodano ✓' : 'Zastosuj'}
            </button>
          </div>
          {promoApplied && (
            <p className="text-emerald-400 text-xs mt-2">🎉 Kod &quot;FOODRUSH&quot; – 10% rabatu!</p>
          )}
          {!promoApplied && (
            <p className="text-white/20 text-xs mt-2">Spróbuj: FOODRUSH</p>
          )}
        </div>

        {/* Delivery address */}
        <div className="mt-4 glass rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/40 text-xs">Adres dostawy</p>
              <p className="text-white text-sm font-medium mt-0.5">ul. Marszałkowska 1, Warszawa</p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/30" />
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 glass rounded-2xl p-4 space-y-3">
          <h3 className="font-display font-bold text-white">Podsumowanie</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Wartość zamówienia</span>
              <span className="text-white">{totalPrice.toFixed(2)} zł</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Dostawa</span>
              <span className="text-white">{deliveryFee.toFixed(2)} zł</span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-sm">
                <span className="text-emerald-400">Rabat (10%)</span>
                <span className="text-emerald-400">-{discount.toFixed(2)} zł</span>
              </div>
            )}
            <div className="border-t border-white/10 pt-2 flex justify-between">
              <span className="font-display font-bold text-white">Razem</span>
              <span className="font-display font-bold text-brand text-lg">{finalTotal.toFixed(2)} zł</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order button */}
      <div className="fixed bottom-20 left-0 right-0 px-4 z-30">
        <div className="max-w-lg mx-auto">
          <button
            onClick={handleOrder}
            disabled={isOrdering}
            className="w-full brand-gradient py-4 rounded-2xl text-white font-bold text-lg shadow-xl shadow-brand/30 hover:shadow-brand/50 active:scale-[0.98] transition-all disabled:opacity-70"
          >
            {isOrdering ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Składam zamówienie...
              </span>
            ) : (
              `Zamów za ${finalTotal.toFixed(2)} zł`
            )}
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
