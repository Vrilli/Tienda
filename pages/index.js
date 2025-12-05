import useSWR from 'swr'
import ProductCard from '../components/ProductCard'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const fetcher = (url) => fetch(url).then(r => r.json())

export default function Home() {
  const { data: session, status } = useSession()
  const { data: products } = useSWR('/api/products', fetcher)

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md px-4">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Acceso Restringido</h2>
          <p className="text-gray-600 mb-8">
            Debes iniciar sesión o registrarte para ver nuestros productos exclusivos de skincare
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

  return (
    <div>
      <header className="mb-8 text-center py-4">
        <p className="text-xl text-gray-600">Productos naturales y efectivos para tu piel</p>
        <p className="text-gray-500 mt-1">Descubre nuestra colección de cuidado facial premium</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </div>
  )
}