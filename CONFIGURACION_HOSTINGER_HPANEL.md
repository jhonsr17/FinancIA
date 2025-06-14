# 🚀 CONFIGURACIÓN FINAL - FinancIA en Hostinger (hPanel)

## 🔧 **PASO 1: Configurar archivo .htaccess**

**IMPORTANTE:** Como solo tienes acceso a hPanel, necesitas crear un archivo `.htaccess` para que las rutas funcionen correctamente.

### **Crear .htaccess en hPanel:**

1. **Ve a tu hPanel de Hostinger**
2. **Busca "File Manager" o "Administrador de Archivos"**
3. **Navega a la carpeta `public_html`**
4. **Haz clic en "Nuevo Archivo" o "Create File"**
5. **Nombra el archivo: `.htaccess`** (con el punto al inicio)
6. **Pega este contenido:**

```apache
# Configuración para FinancIA
RewriteEngine On
RewriteBase /

# Redirigir admin a admin.html
RewriteRule ^admin/?$ /admin.html [L]

# Manejar errores 404
ErrorDocument 404 /404.html

# Headers de seguridad
<IfModule mod_headers.c>
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Cache para archivos estáticos
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/ico "access plus 1 month"
    ExpiresByType image/svg+xml "access plus 1 month"
</IfModule>

# Compresión GZIP
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

## 🔧 **PASO 2: Configurar variables de entorno**

### **Opción A: Buscar "Environment Variables" en hPanel**
1. En tu hPanel, busca **"Environment Variables"** o **"Variables de Entorno"**
2. Si lo encuentras, agrega estas variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://vntybltgheokemonnixc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZudHlibHRnaGVva2Vtb25uaXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MDM1NDgsImV4cCI6MjA2NTE3OTU0OH0.Rrk5mBVC6_hnkVHqLDTuTBVOItBddpJwHlGRKnqoyas
```

### **Opción B: Crear archivo .env (Si no encuentras Environment Variables)**
1. En File Manager, crea un nuevo archivo llamado `.env`
2. Pega este contenido:

```env
NEXT_PUBLIC_SUPABASE_URL=https://vntybltgheokemonnixc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZudHlibHRnaGVva2Vtb25uaXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MDM1NDgsImV4cCI6MjA2NTE3OTU0OH0.Rrk5mBVC6_hnkVHqLDTuTBVOItBddpJwHlGRKnqoyas
```

## ✅ **PASO 3: Verificar estructura de archivos**

Tu carpeta `public_html` debe tener esta estructura:

```
public_html/
├── .htaccess          ← CREAR ESTE ARCHIVO ✅
├── .env              ← CREAR SI NO HAY ENV VARIABLES ✅
├── index.html        ← Ya subido ✅
├── admin.html        ← Ya subido ✅
├── 404.html          ← Ya subido ✅
├── favicon.ico       ← Ya subido ✅
└── _next/            ← Ya subido ✅
    ├── static/
    └── ...
```

## 🎯 **PASO 4: URLs de tu sitio**

Una vez configurado:

- **🏠 Página Principal:** `https://tudominio.com`
- **👨‍💼 Panel Admin:** `https://tudominio.com/admin`
- **📱 Lista de Espera:** Funcional en la página principal

## 🧪 **PASO 5: Probar todo**

### **Test 1: Página principal**
1. Ve a tu dominio: `https://tudominio.com`
2. ¿Se ve la página de FinancIA correctamente?
3. ¿Los estilos cargan bien?

### **Test 2: Panel de administración**
1. Ve a: `https://tudominio.com/admin`
2. ¿Se carga el panel de estadísticas?

### **Test 3: Formulario de lista de espera**
1. En la página principal, prueba registrar un email
2. ¿Aparece el mensaje de éxito?
3. Ve al panel admin para ver si se registró

## 🆘 **SOLUCIÓN DE PROBLEMAS**

### **❌ "Página no carga"**
- Verifica que `index.html` esté en la raíz de `public_html`
- Asegúrate de que el archivo `.htaccess` esté creado

### **❌ "Admin da error 404"**
- Verifica que `admin.html` esté en `public_html`
- Revisa que el archivo `.htaccess` tenga la regla de rewrite para admin

### **❌ "Estilos no cargan"**
- Verifica que la carpeta `_next` esté completa
- Revisa los permisos de archivos (755 para carpetas, 644 para archivos)

### **❌ "Formulario no funciona"**
- Configura las variables de entorno
- Verifica que Supabase esté activo

## 📞 **CONTACTO SOPORTE HOSTINGER**

Si tienes problemas:
1. Ve a tu hPanel
2. Busca **"Soporte"** o **"Help"**
3. Abre un ticket: "Necesito ayuda configurando variables de entorno para mi sitio web"

---

## 🎉 **¡LISTO!**

Una vez hagas estos pasos, tu sitio FinancIA estará completamente funcional en producción.

**¿Cuál es tu dominio para que podamos probarlo juntos?** 🚀