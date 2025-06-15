# 🔧 GUÍA PARA DEBUGGEAR WEBHOOK N8N

## 🚨 **PROBLEMA ACTUAL**
Error: `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`

**Causa:** Tu webhook de n8n está respondiendo con HTML en lugar de JSON.

## 🔍 **CÓMO DEBUGGEAR**

### **PASO 1: Verificar la URL del webhook**

1. **Ve a tu workflow de n8n**
2. **Copia la URL exacta del webhook**
3. **Agrégala como variable de entorno:**

```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://tu-n8n-instance.com/webhook/financia-waitlist
```

### **PASO 2: Probar el webhook manualmente**

**Usa curl para probar:**
```bash
curl -X POST https://tu-n8n-instance.com/webhook/financia-waitlist \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "email": "test@example.com",
    "registrationType": "email",
    "timestamp": "2025-01-27T10:30:00Z"
  }'
```

**Respuesta esperada (JSON):**
```json
{
  "success": true,
  "message": "Registered successfully"
}
```

**Respuesta problemática (HTML):**
```html
<!DOCTYPE html>
<html>
<head><title>Error</title></head>
<body>Error 404</body>
</html>
```

### **PASO 3: Configurar n8n correctamente**

**En tu webhook node de n8n:**

1. **Response Mode:** `Respond to Webhook`
2. **Response Code:** `200`
3. **Response Headers:**
   ```json
   {
     "Content-Type": "application/json"
   }
   ```
4. **Response Body:**
   ```json
   {
     "success": true,
     "message": "Email registered successfully",
     "timestamp": "{{ $now }}"
   }
   ```

### **PASO 4: Verificar logs en tiempo real**

**Abre la consola del navegador (F12) y ve a la pestaña Network:**

1. **Registra un email en tu landing**
2. **Ve la request a `/api/waitlist`**
3. **Revisa la respuesta del webhook**

**En los logs del servidor, verás:**
```
Sending to webhook: https://tu-url.com/webhook/...
Webhook response status: 200
Webhook response headers: {"content-type": "text/html"}  ← PROBLEMA
```

**Debería ser:**
```
Webhook response headers: {"content-type": "application/json"}  ← CORRECTO
```

## 🛠️ **SOLUCIONES COMUNES**

### **Problema 1: URL incorrecta**
```
❌ https://n8n.com/webhook/financia  (404 error)
✅ https://tu-instancia.n8n.cloud/webhook/financia-waitlist
```

### **Problema 2: Webhook inactivo**
- Verifica que tu workflow esté **activado** en n8n
- El webhook node debe estar **conectado** al flujo

### **Problema 3: Configuración de respuesta**
```javascript
// ❌ MAL - Solo texto
return "OK";

// ✅ BIEN - JSON válido
return {
  success: true,
  message: "Registered successfully"
};
```

### **Problema 4: Headers incorrectos**
```javascript
// En n8n, asegúrate de configurar:
Response Headers: {
  "Content-Type": "application/json"
}
```

## 🧪 **TESTING PASO A PASO**

### **Test 1: Webhook directo**
```bash
curl -X POST TU_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

### **Test 2: Desde tu landing**
1. Abre F12 → Network
2. Registra un email
3. Ve la request a `/api/waitlist`
4. Revisa si hay errores

### **Test 3: Logs del servidor**
```bash
# Si tienes acceso a logs
tail -f /var/log/your-app.log
```

## 📋 **CHECKLIST DE VERIFICACIÓN**

- [ ] ✅ URL del webhook es correcta
- [ ] ✅ Workflow de n8n está activado
- [ ] ✅ Webhook node responde con JSON
- [ ] ✅ Headers incluyen `Content-Type: application/json`
- [ ] ✅ Variable de entorno `NEXT_PUBLIC_N8N_WEBHOOK_URL` configurada
- [ ] ✅ No hay errores 404/500 en el webhook

## 🆘 **SI SIGUE SIN FUNCIONAR**

### **Opción 1: Deshabilitar webhook temporalmente**
En `lib/supabase.ts`, comenta la línea del webhook:
```javascript
// await sendToN8nWebhook(...);  // Comentar temporalmente
```

### **Opción 2: Usar webhook de prueba**
Usa un servicio como webhook.site para probar:
```
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://webhook.site/tu-unique-id
```

### **Opción 3: Logs detallados**
Agrega más logs en `sendToN8nWebhook()` para ver exactamente qué está pasando.

---

## 🎯 **PRÓXIMOS PASOS**

1. **Verifica tu URL de webhook de n8n**
2. **Configura la respuesta JSON en n8n**
3. **Prueba con curl**
4. **Actualiza la variable de entorno**

**¿Cuál es la URL exacta de tu webhook de n8n?** 🔗