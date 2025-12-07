// pages/contactanos.js
import { useState } from 'react'

export default function Contactanos() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  })

  const [enviado, setEnviado] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (enviado) setEnviado(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí podrías enviar los datos a una API si lo necesitas.
    setEnviado(true)
    setForm({ nombre: '', email: '', mensaje: '' })
  }

  return (
    <section className="max-w-xl space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">
        Contáctanos
      </h1>

      <p className="text-slate-700">
        ¿Tienes dudas sobre algún producto, tu pedido o necesitas una recomendación?
        Escríbenos y te responderemos lo antes posible.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 space-y-4"
      >
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            value={form.nombre}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Escribe tu nombre"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="tucorreo@ejemplo.com"
          />
        </div>

        <div>
          <label
            htmlFor="mensaje"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            required
            rows={4}
            value={form.mensaje}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
            placeholder="Cuéntanos en qué podemos ayudarte"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 text-white py-2 text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          Enviar mensaje
        </button>

        {enviado && (
          <p className="mt-3 text-center text-sm font-semibold text-green-600">
            mensaje enviado pronto nos contactaremos contigo
          </p>
        )}
      </form>
    </section>
  )
}
