import { NextRequest, NextResponse } from 'next/server'
import { isValidEmail, isValidPhone, sendToN8nWebhook } from '@/lib/supabase'

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
      });

      return NextResponse.json({
        success: true,
        message: '¡Te has unido exitosamente a la lista de espera!',
        data: {
          registrationType,
          timestamp: new Date().toISOString()
        }
      })

    } catch (webhookError) {
      console.error('Webhook error:', webhookError);
      
      // Aunque falle el webhook, no queremos mostrar error al usuario
      // En producción podrías implementar un sistema de retry
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