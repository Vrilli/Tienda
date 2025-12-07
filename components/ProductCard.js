import Link from 'next/link'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="relative overflow-hidden bg-slate-100">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-md">
          ${product.price.toFixed(2)}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition">{product.title}</h3>
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{product.short}</p>
        <div className="flex gap-2">
          <Link 
            href={`/product/${product.id}`} 
            className="flex-1 px-4 py-2 border-2 border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 hover:border-blue-500 hover:text-blue-600 transition text-center"
          >
            Ver Detalles
          </Link>
          <button 
            onClick={() => addToCart(product)} 
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}
