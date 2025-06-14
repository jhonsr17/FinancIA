# 🚀 CONFIGURACIÓN FINAL - FinancIA en Hostinger

## ✅ **PASO 1: Verificar estructura de archivos**

Asegúrate de que en tu carpeta `public_html` de Hostinger tengas esta estructura:

```
public_html/
├── index.html          ← Página principal ✅
├── admin.html          ← Panel de administración ✅
├── 404.html           ← Página de error ✅
├── favicon.ico        ← Icono del sitio
└── _next/             ← Recursos de Next.js ✅
    ├── static/
    └── ...
```

## 🔧 **PASO 2: Configurar variables de entorno**

**IMPORTANTE:** Para que el formulario de lista de espera funcione, necesitas configurar las variables de entorno en Hostinger:

### **Opción A: En cPanel (RECOMENDADO)**
1. Ve a tu cPanel de Hostinger
2. Busca **"Environment Variables"** o **"Variables de Entorno"**
3. Agrega estas variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://vntybltgheokemonnixc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZudHlibHRnaGVva2Vtb25uaXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MDM1NDgsImV4cCI6MjA2NTE3OTU0OH0.Rrk5mBVC6_hnkVHqLDTuTBVOItBddpJwHlGRKnqoyas
```

### **Opción B: Crear archivo .env (ALTERNATIVO)**
Si no encuentras Environment Variables, crea un archivo `.env` en `public_html`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://vntybltgheokemonnixc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZudHlibHRnaGVva2Vtb25uaXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MDM1NDgsImV4cCI6MjA2NTE3OTU0OH0.Rrk5mBVC6_hnkVHqLDTuTBVOItBddpJwHlGRKnqoyas
```

## 📝 **PASO 3: Crear archivo .htaccess**

Crea un archivo llamado `.htaccess` en la carpeta `public_html` con este contenido:

```apache
# Redirect all requests to index.html for SPA routing
RewriteEngine On
RewriteBase /

# Handle Next.js routing
RewriteRule ^admin$ /admin.html [L]
RewriteRule ^admin/$ /admin.html [L]

# Handle 404 errors
ErrorDocument 404 /404.html

# Security headers
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Cache static assets
<filesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 month"
</filesMatch>

# Compress files
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

## 🎯 **PASO 4: URLs de tu sitio**

Una vez configurado, tu sitio estará disponible en:

- **🏠 Página Principal:** `https://tudominio.com`
- **👨‍💼 Panel de Administración:** `https://tudominio.com/admin`
- **📱 Lista de Espera:** Funcional en la página principal

## 🧪 **PASO 5: Probar funcionalidad**

### **Probar la página principal:**
1. Ve a `https://tudominio.com`
2. Verifica que se vea el diseño correctamente
3. Prueba el formulario de lista de espera

### **Probar el panel de administración:**
1. Ve a `https://tudominio.com/admin`
2. Deberías ver las estadísticas de la lista de espera

## 🆘 **SOLUCIÓN DE PROBLEMAS**

### **❌ Error: "Página no carga"**
- Verifica que `index.html` esté en la raíz de `public_html`
- Revisa que el archivo `.htaccess` esté creado correctamente

### **❌ Error: "Estilos no se ven"**
- Asegúrate de que la carpeta `_next` esté completa
- Verifica que los archivos CSS estén en `_next/static/css/`

### **❌ Error: "Formulario no funciona"**
- Configura las variables de entorno de Supabase
- Verifica que la base de datos esté activa en Supabase

### **❌ Error: "Admin no carga"**
- Verifica que `admin.html` esté en `public_html`
- Revisa el archivo `.htaccess`

## 📞 **CONTACTO SOPORTE**

Si tienes problemas:
1. Panel de Hostinger → **"Soporte"**
2. Explica: "Mi sitio web estático no carga correctamente"

---

## 🎉 **¡FELICIDADES!**

Tu sitio FinancIA ya está listo en producción. Los usuarios pueden:
- ✅ Ver la landing page
- ✅ Registrarse en la lista de espera
- ✅ Tú puedes ver estadísticas en `/admin`

**¡Tu startup ya está online!** 🚀