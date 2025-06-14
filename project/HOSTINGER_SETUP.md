# 🚀 Guía Completa: Subir FinancIA a Hostinger

## 🔧 **SOLUCIÓN PARA PROBLEMA DE PERMISOS**

### **Método 1: Usar cPanel File Manager (RECOMENDADO)**

1. **Accede a cPanel:**
   - Ve a tu panel de Hostinger
   - Busca y haz clic en **"cPanel"** (no File Manager directo)
   - Una vez en cPanel, busca **"File Manager"**

2. **Navegar correctamente:**
   ```
   📁 Estructura que debes ver:
   /
   ├── public_html/     ← AQUÍ van tus archivos
   ├── logs/
   ├── mail/
   └── tmp/
   ```

3. **Subir archivos:**
   - Entra a la carpeta `public_html`
   - Elimina cualquier archivo que esté ahí (index.html de ejemplo)
   - Haz clic en **"Upload"** (botón azul arriba)
   - Arrastra el archivo ZIP de tu carpeta `out`
   - Una vez subido, haz clic derecho → **"Extract"**

### **Método 2: Usar FTP (ALTERNATIVO)**

Si el método anterior no funciona:

1. **Descargar FileZilla:**
   - Ve a [filezilla-project.org](https://filezilla-project.org)
   - Descarga FileZilla Client (gratis)

2. **Configurar conexión FTP:**
   ```
   Host: ftp.tudominio.com (o la IP que te dio Hostinger)
   Usuario: tu_usuario_ftp
   Contraseña: tu_contraseña_ftp
   Puerto: 21
   ```

3. **Subir archivos:**
   - Conecta con FileZilla
   - Navega a `/public_html/`
   - Arrastra todos los archivos de tu carpeta `out` local

### **Método 3: Usar Hostinger File Manager Web**

1. **Acceso directo:**
   - Ve a: `https://files.hostinger.com`
   - Inicia sesión con tus credenciales de Hostinger
   - Selecciona tu dominio

2. **Subir archivos:**
   - Ve a `public_html`
   - Usa el botón "Upload" para subir tu ZIP
   - Extrae los archivos

## 📋 **CHECKLIST FINAL**

### ✅ **Estructura correcta en public_html:**
```
public_html/
├── index.html          ← Landing page principal
├── admin.html          ← Panel de administración
├── 404.html           ← Página de error
├── favicon.ico        ← Icono del sitio
└── _next/             ← Recursos de Next.js
    ├── static/
    └── ...
```

### ✅ **Variables de entorno (IMPORTANTE):**

**En Hostinger cPanel:**
1. Busca **"Environment Variables"** o **"Variables de Entorno"**
2. Agrega estas variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://vntybltgheokemonnixc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZudHlibHRnaGVva2Vtb25uaXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MDM1NDgsImV4cCI6MjA2NTE3OTU0OH0.Rrk5mBVC6_hnkVHqLDTuTBVOItBddpJwHlGRKnqoyas
```

### ✅ **Configurar .htaccess (para rutas):**

Crea un archivo `.htaccess` en `public_html` con este contenido:

```apache
# Redirect all requests to index.html for SPA routing
RewriteEngine On
RewriteBase /

# Handle Angular and React Router
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security headers
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Cache static assets
<filesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 month"
</filesMatch>
```

## 🎯 **URLs FINALES**

Una vez configurado correctamente:

- **🏠 Landing Page:** `https://tudominio.com`
- **👨‍💼 Panel Admin:** `https://tudominio.com/admin`
- **📝 Lista de Espera:** Funcional con Supabase

## 🆘 **SOLUCIÓN DE PROBLEMAS**

### **Error: "No tienes permisos"**
- Usa cPanel en lugar de File Manager directo
- Contacta soporte de Hostinger para verificar permisos

### **Error: "Página no carga"**
- Verifica que `index.html` esté en la raíz de `public_html`
- Revisa que no haya carpetas anidadas innecesarias

### **Error: "Formulario no funciona"**
- Configura las variables de entorno de Supabase
- Verifica que la base de datos esté activa

### **Error: "Estilos no cargan"**
- Asegúrate de que la carpeta `_next` esté completa
- Verifica permisos de archivos (755 para carpetas, 644 para archivos)

## 📞 **CONTACTO HOSTINGER**

Si sigues teniendo problemas:
1. Ve a tu panel de Hostinger
2. Busca **"Soporte"** o **"Help"**
3. Abre un ticket explicando: "No puedo acceder al File Manager para subir mi sitio web"

---

**¡Tu sitio estará listo en minutos!** 🚀