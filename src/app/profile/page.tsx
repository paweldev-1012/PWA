'use client'

import { ChevronRight, User, MapPin, CreditCard, Bell, Shield, HelpCircle, LogOut, Star, Package } from 'lucide-react'
import BottomNav from '@/components/layout/BottomNav'

const menuItems = [
  { icon: MapPin, label: 'Adresy dostawy', desc: '2 zapisane adresy' },
  { icon: CreditCard, label: 'Metody płatności', desc: 'Karta VISA **** 1234' },
  { icon: Bell, label: 'Powiadomienia', desc: 'Włączone' },
  { icon: Shield, label: 'Bezpieczeństwo', desc: 'Zarządzaj kontem' },
  { icon: HelpCircle, label: 'Pomoc i wsparcie', desc: 'FAQ, kontakt' },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-lg mx-auto px-4">
        <h1 className="font-display font-bold text-xl text-white py-4">Mój profil</h1>

        {/* User card */}
        <div className="glass rounded-2xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 brand-gradient rounded-2xl flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="font-display font-bold text-xl text-white">Jan Kowalski</h2>
            <p className="text-white/40 text-sm">jan.kowalski@email.com</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-amber-400 text-sm font-semibold">4.9</span>
              <span className="text-white/30 text-xs">• Stały klient</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: 'Zamówień', value: '47' },
            { label: 'Zaoszczędzono', value: '84 zł' },
            { label: 'Punkty', value: '1,240' },
          ].map(stat => (
            <div key={stat.label} className="glass rounded-xl p-3 text-center">
              <p className="font-display font-bold text-white text-lg">{stat.value}</p>
              <p className="text-white/40 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Loyalty card */}
        <div className="mt-4 brand-gradient rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white/80 text-xs">Program lojalnościowy</p>
              <p className="font-display font-bold text-white text-lg">FoodRush Gold</p>
            </div>
            <Package className="w-8 h-8 text-white/50" />
          </div>
          <div className="bg-white/20 rounded-full h-2 mb-1">
            <div className="bg-white h-2 rounded-full" style={{ width: '72%' }} />
          </div>
          <div className="flex justify-between text-xs text-white/70">
            <span>1,240 pkt</span>
            <span>Do Platinum: 260 pkt</span>
          </div>
        </div>

        {/* Menu */}
        <div className="mt-4 glass rounded-2xl overflow-hidden">
          {menuItems.map(({ icon: Icon, label, desc }, idx) => (
            <button
              key={label}
              className={`w-full flex items-center gap-3 p-4 hover:bg-white/5 transition-colors ${
                idx !== menuItems.length - 1 ? 'border-b border-white/5' : ''
              }`}
            >
              <div className="w-9 h-9 glass rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-white/60" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-white text-sm font-medium">{label}</p>
                <p className="text-white/30 text-xs">{desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button className="w-full mt-4 glass rounded-2xl p-4 flex items-center justify-center gap-2 text-brand hover:bg-brand/10 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Wyloguj się</span>
        </button>

        <p className="text-center text-white/20 text-xs mt-4 mb-2">FoodRush v1.0.0 • PWA</p>
      </div>

      <BottomNav />
    </div>
  )
}
