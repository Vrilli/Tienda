import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { CartProvider } from '../context/CartContext'
import Navbar from '../components/Navbar'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8 bg-white">
            <Component {...pageProps} />
          </main>
        </div>
        <style jsx global>{`
          @keyframes bounce-in {
            0% {
              transform: scale(0.3);
              opacity: 0;
            }
            50% {
              transform: scale(1.05);
            }
            70% {
              transform: scale(0.9);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-bounce-in {
            animation: bounce-in 0.6s ease-out;
          }
        `}</style>
      </CartProvider>
    </SessionProvider>
  )
}