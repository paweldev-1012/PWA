import type { Metadata, Viewport } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'FoodRush – Zamów jedzenie z dostawą',
  description: 'Zamów jedzenie z ulubionych restauracji w kilka minut. Szybka dostawa do domu!',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'FoodRush',
  },
  openGraph: {
    title: 'FoodRush – Zamów jedzenie z dostawą',
    description: 'Szybka dostawa z najlepszych restauracji',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#FF3008',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-dark text-white font-body antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
