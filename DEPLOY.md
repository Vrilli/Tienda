# Guía de Despliegue - TechStore

## ✅ Sistema de Autenticación con localStorage

La aplicación ahora usa **localStorage** para autenticación, lo que significa:
- ✅ Funciona 100% en producción
- ✅ No necesita base de datos
- ✅ No hay problemas de sistema de archivos de solo lectura
- ✅ Los usuarios se guardan en el navegador del cliente

## 🚀 Pasos para Desplegar

### 1. Instalar dependencias limpias
```bash
npm install
```

### 2. Probar localmente
```bash
npm run dev
```

### 3. Desplegar en Vercel (Recomendado)

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. Configura las variables de entorno:
   - `STRIPE_SECRET_KEY` = tu clave de Stripe (si usas pagos)
5. Despliega

### 4. Desplegar en Netlify

1. Sube tu código a GitHub
2. Ve a [netlify.com](https://netlify.com)
3. Importa tu repositorio
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Despliega

## 📝 Notas Importantes

- Los usuarios se guardan en el navegador (localStorage)
- Cada navegador tendrá sus propios usuarios
- Los datos persisten incluso si cierras el navegador
- Para producción real, considera migrar a una base de datos

## 🔧 Solución de Problemas

Si ves errores de NextAuth o "read-only file system":
1. Asegúrate de haber eliminado `pages/api/auth/[...nextauth].js`
2. Verifica que `next-auth` no esté en `package.json`
3. Ejecuta `npm install` de nuevo
4. Limpia el caché: `rm -rf .next` y `npm run build`

## ✨ Características

- ✅ Registro de usuarios
- ✅ Login/Logout
- ✅ Protección de rutas
- ✅ Carrito de compras
- ✅ Checkout simulado
- ✅ Responsive design
