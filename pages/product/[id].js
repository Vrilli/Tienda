import { useRouter } from 'next/router'
import { useCart } from '../../context/CartContext'
import products from '../../data/products.json'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

export default function ProductPage() {
  const router = useRouter()
  const { id } = router.query
  const product = products.find(p => p.id === id)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md px-4">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Acceso Restringido</h2>
          <p className="text-gray-600 mb-8">
            Debes iniciar sesión para ver los detalles de este producto
          </p>
          <Link 
            href="/auth/signin" 
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-indigo-700 transition shadow-lg"
          >
            Iniciar Sesión / Registrarse
          </Link>
        </div>
      </div>
    )
  }

  if (!product) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h2>
      <Link href="/" className="text-purple-600 hover:text-purple-800">Volver a la tienda</Link>
    </div>
  )

  return (
    <div>
      <Link href="/" className="text-purple-600 hover:text-purple-800 mb-6 inline-block">
        ← Volver a la tienda
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.title}</h1>
          <p className="text-gray-600 italic mb-4">{product.short}</p>
          
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <div className="text-3xl font-bold text-purple-600">${product.price.toFixed(2)}</div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Descripción</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {product.ingredients && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Ingredientes Clave</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, i) => (
                  <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.benefits && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Beneficios</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Selector de Cantidad */}
          <div className="mb-6 bg-gray-50 rounded-xl p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Cantidad
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 bg-white border-2 border-purple-300 text-purple-600 rounded-lg font-bold text-xl hover:bg-purple-50 hover:border-purple-500 transition active:scale-95"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max="99"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(99, parseInt(e.target.value) || 1)))}
                className="w-20 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
              />
              <button
                onClick={() => setQuantity(Math.min(99, quantity + 1))}
                className="w-12 h-12 bg-white border-2 border-purple-300 text-purple-600 rounded-lg font-bold text-xl hover:bg-purple-50 hover:border-purple-500 transition active:scale-95"
              >
                +
              </button>
              <div className="ml-auto text-right">
                <div className="text-sm text-gray-600">Subtotal</div>
                <div className="text-2xl font-bold text-purple-600">
                  ${(product.price * quantity).toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Mensaje de éxito */}
          {showSuccess && (
            <div className="mb-4 bg-green-50 border-2 border-green-500 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2 animate-pulse">
              <span className="text-xl">✓</span>
              <span className="font-semibold">¡{quantity} {quantity === 1 ? 'producto agregado' : 'productos agregados'} al carrito!</span>
            </div>
          )}

          {/* Botón Agregar al Carrito */}
          <button 
            onClick={() => {
              for (let i = 0; i < quantity; i++) {
                addToCart(product)
              }
              setShowSuccess(true)
              setTimeout(() => setShowSuccess(false), 3000)
            }} 
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="text-2xl">🛒</span>
            <span>Agregar {quantity > 1 ? `${quantity} unidades` : ''} al Carrito</span>
          </button>

          {/* Botón Ver Carrito */}
          <Link
            href="/cart"
            className="mt-3 block w-full px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-full text-base font-semibold hover:bg-purple-50 transition text-center"
          >
            Ver Carrito
          </Link>
        </div>
      </div>
    </div>
  )
}