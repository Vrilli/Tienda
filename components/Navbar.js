import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

export default function Navbar() {
  const { items } = useCart()
  const { user, logout } = useAuth()
  const count = items.reduce((s,i) => s + i.qty, 0)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-bold text-xl sm:text-2xl text-slate-800 hover:text-blue-600 transition flex-shrink-0 flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-blue-600">⚡</span> TechStore
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">
            {!user && (
              <Link 
                href="/auth/signin" 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm shadow-sm"
              >
                Iniciar Sesión
              </Link>
            )}
            {user && (
              <>
                <span className="text-slate-600 text-sm font-medium max-w-[150px] truncate">
                  👤 {user.name || user.email}
                </span>
                <button 
                  onClick={logout} 
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition text-sm font-semibold border border-slate-200"
                >
                  Salir
                </button>
              </>
            )}
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

          {/* Mobile Menu Button & Cart */}
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

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-3 pb-2 space-y-2 border-t border-slate-200 pt-3">
            {!user && (
              <Link 
                href="/auth/signin" 
                className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-center text-sm shadow-sm"
                onClick={() => setMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
            )}
            {user && (
              <>
                <div className="px-4 py-2 text-slate-600 text-sm font-medium bg-slate-100 rounded-lg text-center border border-slate-200">
                  👤 {user.name || user.email}
                </div>
                <button 
                  onClick={() => {
                    logout()
                    setMenuOpen(false)
                  }} 
                  className="block w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition text-sm font-semibold border border-slate-200"
                >
                  Cerrar Sesión
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}