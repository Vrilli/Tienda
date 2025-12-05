import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden group">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" 
        />
        <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ${product.price.toFixed(2)}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.short}</p>
        <div className="flex gap-2">
          <Link 
            href={`/product/${product.id}`} 
            className="flex-1 px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-full text-sm font-semibold hover:bg-purple-50 transition text-center"
          >
            Ver Detalles
          </Link>
          <button 
            onClick={() => addToCart(product)} 
            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-sm font-semibold hover:from-purple-700 hover:to-indigo-700 transition"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}