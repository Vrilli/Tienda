// components/Navbar.js
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Navbar() {
  const { items } = useCart()
  const count = items.reduce((s, i) => s + i.qty, 0)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/sobre-mi', label: 'Sobre mí' },
    { href: '/contactanos', label: 'Contáctanos' },
    { href: '/cart', label: 'Carrito' },
  ]

  const isActive = (href) => router.pathname === href

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-bold text-xl sm:text-2xl text-slate-800 hover:text-blue-600 transition flex-shrink-0 flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-blue-600">⚡</span> TechStore
          </Link>

          {/* Menú + carrito (desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {/* Links principales */}
            <ul className="flex items-center gap-4 text-sm font-medium">
              {navLinks
                .filter(link => link.href !== '/cart') // en desktop, "Carrito" va como botón aparte
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`px-3 py-1 rounded-full transition ${
                        isActive(link.href)
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
              ))}
            </ul>

            {/* Carrito */}
            <Link 
              href="/cart" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2 text-sm relative shadow-sm"
            >
              🛒 <span className="hidden lg:inline">Carrito</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </Link>
          </div>

          {/* Carrito + botón menú (mobile) */}
          <div className="flex md:hidden items-center gap-2">
            <Link 
              href="/cart" 
              className="px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-1 text-sm relative shadow-sm"
            >
              🛒
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-slate-600 hover:text-blue-600 transition"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {menuOpen && (
          <div className="md:hidden mt-3 pb-2 space-y-2 border-t border-slate-200 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block w-full px-4 py-2 rounded-lg text-sm font-medium text-left ${
                  isActive(link.href)
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
