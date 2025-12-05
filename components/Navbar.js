import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

export default function Navbar() {
  const { items } = useCart()
  const { data: session } = useSession()
  const count = items.reduce((s,i) => s + i.qty, 0)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-bold text-xl sm:text-2xl text-white hover:text-purple-200 transition flex-shrink-0"
            onClick={() => setMenuOpen(false)}
          >
            ✨ Skincare Studio
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">
            {!session && (
              <Link 
                href="/auth/signin" 
                className="px-4 py-2 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition text-sm"
              >
                Iniciar Sesión
              </Link>
            )}
            {session && (
              <>
                <span className="text-white text-sm font-medium max-w-[150px] truncate">
                  Hola, {session.user.name || session.user.email}
                </span>
                <button 
                  onClick={() => signOut()} 
                  className="px-4 py-2 bg-purple-800 text-white rounded-full hover:bg-purple-900 transition text-sm font-semibold"
                >
                  Cerrar Sesión
                </button>
              </>
            )}
            <Link 
              href="/cart" 
              className="px-4 py-2 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition flex items-center gap-2 text-sm"
            >
              🛒 <span className="hidden lg:inline">Carrito</span> ({count})
            </Link>
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="flex md:hidden items-center gap-2">
            <Link 
              href="/cart" 
              className="px-3 py-2 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition flex items-center gap-1 text-sm"
            >
              🛒 ({count})
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-white hover:text-purple-200 transition"
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
          <div className="md:hidden mt-3 pb-2 space-y-2 border-t border-purple-400 pt-3">
            {!session && (
              <Link 
                href="/auth/signin" 
                className="block w-full px-4 py-2 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition text-center text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
            )}
            {session && (
              <>
                <div className="px-4 py-2 text-white text-sm font-medium bg-purple-700 rounded-full text-center">
                  Hola, {session.user.name || session.user.email}
                </div>
                <button 
                  onClick={() => {
                    signOut()
                    setMenuOpen(false)
                  }} 
                  className="block w-full px-4 py-2 bg-purple-800 text-white rounded-full hover:bg-purple-900 transition text-sm font-semibold"
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