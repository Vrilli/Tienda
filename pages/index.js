// pages/index.js
import useSWR from 'swr'
import ProductCard from '../components/ProductCard'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Home() {
  const { data: products, error } = useSWR('/api/products', fetcher)

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md px-4">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error al cargar los productos
          </h2>
          <p className="text-gray-600">
            Ocurrió un problema al obtener la información. Intenta recargar la página.
          </p>
        </div>
      </div>
    )
  }

  if (!products) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <header className="mb-12 text-center py-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-3 flex items-center justify-center gap-3">
          <span className="text-blue-600">⚡</span>
          Tecnología de Última Generación
        </h1>
        <p className="text-xl text-slate-600">
          Los mejores productos tech al mejor precio
        </p>
        <p className="text-slate-500 mt-2">
          Envío gratis en compras mayores a $100
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </div>
  )
}
