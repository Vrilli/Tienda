import { useCart } from '../context/CartContext'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'

export default function CartPage() {
  const { items, updateQty, removeFromCart, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const { user, loading: authLoading } = useAuth()

  async function checkout() {
    setLoading(true)
    
    // Simular procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generar número de orden
    const orderNum = 'SK-' + Date.now().toString().slice(-8)
    setOrderNumber(orderNum)
    
    setLoading(false)
    setShowPaymentSuccess(true)
    
    // Limpiar carrito después de 5 segundos
    setTimeout(() => {
      clearCart()
    }, 5000)
  }

  if (authLoading) {
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
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Acceso Restringido</h2>
          <p className="text-gray-600 mb-8">
            Debes iniciar sesión para acceder a tu carrito de compras
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

  // Modal de Pago Exitoso
  if (showPaymentSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-bounce-in">
          <div className="mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Pago Exitoso!</h2>
            <p className="text-gray-600 mb-4">Tu pedido ha sido procesado correctamente</p>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 mb-6">
            <div className="text-sm text-gray-600 mb-1">Número de Orden</div>
            <div className="text-2xl font-bold text-purple-600">{orderNumber}</div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6">
            <div className="text-sm text-gray-600 mb-1">Total Pagado</div>
            <div className="text-3xl font-bold text-green-600">${total.toFixed(2)}</div>
          </div>

          <div className="space-y-2 mb-6 text-left bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-500">✓</span>
              <span>Confirmación enviada a tu email</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-500">✓</span>
              <span>Envío estimado: 3-5 días hábiles</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-500">✓</span>
              <span>Recibirás tracking de tu pedido</span>
            </div>
          </div>

          <Link
            href="/"
            className="block w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-bold hover:from-purple-700 hover:to-indigo-700 transition shadow-lg"
          >
            Seguir Comprando
          </Link>
          
          <p className="text-xs text-gray-500 mt-4">
            El carrito se vaciará automáticamente en unos segundos...
          </p>
        </div>
      </div>
    )
  }

  if (items.length === 0) return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">🛒</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h2>
      <p className="text-gray-600 mb-6">¡Descubre nuestros productos increíbles!</p>
      <Link href="/" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-indigo-700 transition inline-block">
        Ir a la tienda
      </Link>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">🛒 Tu Carrito</h2>
      <div className="space-y-4">
        {items.map(i => (
          <div key={i.id} className="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <img src={i.image} className="w-24 h-24 object-cover rounded-xl shadow" />
              <div>
                <div className="font-bold text-lg text-gray-800">{i.title}</div>
                <div className="text-purple-600 font-semibold">${i.price.toFixed(2)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Cantidad:</label>
                <input 
                  type="number" 
                  value={i.qty} 
                  onChange={(e) => updateQty(i.id, Math.max(1, +e.target.value))} 
                  className="w-20 p-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200" 
                />
              </div>
              <button 
                onClick={() => removeFromCart(i.id)} 
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-gray-800">Total:</span>
          <span className="text-3xl font-bold text-purple-600">${total.toFixed(2)}</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            disabled={loading} 
            onClick={checkout} 
            className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-bold hover:from-green-600 hover:to-green-700 transition disabled:opacity-50 text-lg shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Procesando Pago...</span>
              </>
            ) : (
              <>
                <span>💳</span>
                <span>Proceder al Pago</span>
              </>
            )}
          </button>
          <button 
            onClick={clearCart}
            disabled={loading}
            className="px-6 py-4 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition disabled:opacity-50"
          >
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  )
}