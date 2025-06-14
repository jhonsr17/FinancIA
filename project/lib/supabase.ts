// Eliminamos toda la funcionalidad de Supabase
// Este archivo ahora solo maneja validaciones y webhooks

// Validación de email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validación de teléfono (solo números de América)
export function isValidPhone(phone: string, countryCode: string): boolean {
  // Remover espacios y caracteres especiales
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  // Validar que solo contenga números
  if (!/^\d+$/.test(cleanPhone)) {
    return false;
  }

  // Validaciones específicas por país de América
  const validations: { [key: string]: RegExp } = {
    '+1': /^\d{10}$/, // USA/Canadá: 10 dígitos
    '+52': /^\d{10}$/, // México: 10 dígitos
    '+54': /^\d{10}$/, // Argentina: 10 dígitos
    '+55': /^\d{11}$/, // Brasil: 11 dígitos
    '+56': /^\d{9}$/, // Chile: 9 dígitos
    '+57': /^\d{10}$/, // Colombia: 10 dígitos
    '+58': /^\d{10}$/, // Venezuela: 10 dígitos
    '+51': /^\d{9}$/, // Perú: 9 dígitos
    '+593': /^\d{9}$/, // Ecuador: 9 dígitos
    '+595': /^\d{9}$/, // Paraguay: 9 dígitos
    '+598': /^\d{8}$/, // Uruguay: 8 dígitos
    '+591': /^\d{8}$/, // Bolivia: 8 dígitos
    '+592': /^\d{7}$/, // Guyana: 7 dígitos
    '+597': /^\d{7}$/, // Suriname: 7 dígitos
    '+594': /^\d{9}$/, // Guayana Francesa: 9 dígitos
  };

  const validation = validations[countryCode];
  return validation ? validation.test(cleanPhone) : false;
}

// Función para enviar webhook a n8n
export async function sendToN8nWebhook(data: {
  email?: string;
  phone?: string;
  countryCode?: string;
  registrationType: 'email' | 'phone';
}) {
  try {
    // URL del webhook de n8n (deberás reemplazar con tu URL real)
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook/financia-waitlist';
    
    const payload = {
      timestamp: new Date().toISOString(),
      registrationType: data.registrationType,
      email: data.email || null,
      phone: data.phone || null,
      countryCode: data.countryCode || null,
      source: 'financia-landing',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'unknown',
      referrer: typeof window !== 'undefined' ? document.referrer : 'unknown'
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending to n8n webhook:', error);
    throw error;
  }
}

// Países de América con sus códigos
export const americanCountries = [
  { code: '+1', name: 'Estados Unidos / Canadá', flag: '🇺🇸' },
  { code: '+52', name: 'México', flag: '🇲🇽' },
  { code: '+54', name: 'Argentina', flag: '🇦🇷' },
  { code: '+55', name: 'Brasil', flag: '🇧🇷' },
  { code: '+56', name: 'Chile', flag: '🇨🇱' },
  { code: '+57', name: 'Colombia', flag: '🇨🇴' },
  { code: '+58', name: 'Venezuela', flag: '🇻🇪' },
  { code: '+51', name: 'Perú', flag: '🇵🇪' },
  { code: '+593', name: 'Ecuador', flag: '🇪🇨' },
  { code: '+595', name: 'Paraguay', flag: '🇵🇾' },
  { code: '+598', name: 'Uruguay', flag: '🇺🇾' },
  { code: '+591', name: 'Bolivia', flag: '🇧🇴' },
  { code: '+592', name: 'Guyana', flag: '🇬🇾' },
  { code: '+597', name: 'Suriname', flag: '🇸🇷' },
  { code: '+594', name: 'Guayana Francesa', flag: '🇬🇫' },
];