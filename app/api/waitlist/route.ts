import { NextRequest, NextResponse } from 'next/server'

// Validación de email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validación de teléfono (solo números de América)
function isValidPhone(phone: string, countryCode: string): boolean {
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
async function sendToN8nWebhook(data: {
  email?: string;
  phone?: string;
  countryCode?: string;
  registrationType: 'email' | 'phone';
}) {
  const response = await fetch('https://pruebasagency.app.n8n.cloud/webhook/7daba150-d1a5-42fc-8c37-634fd145a760', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  // Opcional para debug
  const responseText = await response.text();
  console.log('Respuesta del webhook:', responseText);

  if (!response.ok) {
    throw new Error(`Webhook error: ${response.status} - ${responseText}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, phone, countryCode, registrationType } = body

    // Validar tipo de registro
    if (!registrationType || !['email', 'phone'].includes(registrationType)) {
      return NextResponse.json(
        { error: 'Tipo de registro inválido' },
        { status: 400 }
      )
    }

    // Validar email
    if (registrationType === 'email') {
      if (!email) {
        return NextResponse.json(
          { error: 'Email es requerido' },
          { status: 400 }
        )
      }

      if (!isValidEmail(email)) {
        return NextResponse.json(
          { error: 'Por favor ingresa un email válido' },
          { status: 400 }
        )
      }
    }

    // Validar teléfono
    if (registrationType === 'phone') {
      if (!phone || !countryCode) {
        return NextResponse.json(
          { error: 'Teléfono y código de país son requeridos' },
          { status: 400 }
        )
      }

      if (!isValidPhone(phone, countryCode)) {
        return NextResponse.json(
          { error: 'Por favor ingresa un número de teléfono válido para el país seleccionado' },
          { status: 400 }
        )
      }
    }

    // Enviar a webhook de n8n
    try {
      await sendToN8nWebhook({
        email: registrationType === 'email' ? email : undefined,
        phone: registrationType === 'phone' ? phone : undefined,
        countryCode: registrationType === 'phone' ? countryCode : undefined,
        registrationType
      })

      return NextResponse.json({
        success: true,
        message: '¡Te has unido exitosamente a la lista de espera!',
        data: {
          registrationType,
          timestamp: new Date().toISOString()
        }
      })

    } catch (webhookError) {
      console.error('Webhook error:', webhookError)

      return NextResponse.json({
        success: true,
        message: '¡Te has unido exitosamente a la lista de espera!',
        data: {
          registrationType,
          timestamp: new Date().toISOString()
        }
      })
    }

  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}