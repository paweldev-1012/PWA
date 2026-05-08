# 🍔 FoodRush – Klon Uber Eats jako Next.js PWA

Nowoczesna aplikacja do zamawiania jedzenia zbudowana w Next.js 14 z pełnym wsparciem PWA.

## 🚀 Funkcje

- **PWA** – instalacja na urządzeniu mobilnym, tryb offline, service worker
- **Strona główna** – lista restauracji, polecane, szybka dostawa, filtrowanie kategorii
- **Strona restauracji** – menu z kategoriami, zdjęcia, informacje
- **Koszyk** – dodawanie/usuwanie produktów, kody promocyjne, podsumowanie
- **Zamówienia** – śledzenie w czasie rzeczywistym, historia
- **Wyszukiwarka** – filtrowanie restauracji i dań
- **Profil** – program lojalnościowy, ustawienia
- **Ciemny motyw** z marką FoodRush (czerwony accent)
- **Animacje i microinterakcje**

## 🛠 Uruchomienie

```bash
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000)

## 📱 Instalacja jako PWA

1. Otwórz aplikację w Chrome/Safari na telefonie
2. Kliknij „Dodaj do ekranu głównego"
3. Gotowe! Aplikacja działa jak natywna

## 🏗 Struktura projektu

```
src/
├── app/                 # Next.js App Router
│   ├── page.tsx        # Strona główna
│   ├── restaurant/[id] # Strona restauracji
│   ├── cart/           # Koszyk
│   ├── orders/         # Zamówienia
│   ├── search/         # Wyszukiwarka
│   └── profile/        # Profil użytkownika
├── components/
│   ├── layout/         # Header, BottomNav
│   ├── home/           # RestaurantCard, CategoryFilter
│   └── restaurant/     # MenuItemCard
├── data/               # Mock data restauracji
├── lib/                # Cart context
└── types/              # TypeScript types
```

## 🔑 Kod promocyjny

Wpisz **FOODRUSH** w koszyku, żeby uzyskać 10% zniżki!

## 📦 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **next-pwa** – Service Worker i manifest
- **Lucide React** – ikony
- **React Context** – zarządzanie koszykiem
