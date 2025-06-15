'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Check } from 'lucide-react';

// Países de América con sus códigos
const americanCountries = [
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

// Validación de email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validación de teléfono
function isValidPhone(phone: string, countryCode: string): boolean {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  if (!/^\d+$/.test(cleanPhone)) {
    return false;
  }

  const validations: { [key: string]: RegExp } = {
    '+1': /^\d{10}$/,
    '+52': /^\d{10}$/,
    '+54': /^\d{10}$/,
    '+55': /^\d{11}$/,
    '+56': /^\d{9}$/,
    '+57': /^\d{10}$/,
    '+58': /^\d{10}$/,
    '+51': /^\d{9}$/,
    '+593': /^\d{9}$/,
    '+595': /^\d{9}$/,
    '+598': /^\d{8}$/,
    '+591': /^\d{8}$/,
    '+592': /^\d{7}$/,
    '+597': /^\d{7}$/,
    '+594': /^\d{9}$/,
  };

  const validation = validations[countryCode];
  return validation ? validation.test(cleanPhone) : false;
}

const messages = [
  {
    id: 1,
    text: "Hoy gasté $50.000 COP en el almuerzo con mis compañeros",
    time: "07:44",
    type: "user"
  },
  {
    id: 2,
    text: "💰 Confirma tu transacción:\nMonto: $50.000 COP\nCategoría: Comida 🍔\nCuenta: Efectivo 💵\nDescripción: Almuerzo",
    time: "07:44",
    type: "bot"
  },
  {
    id: 3,
    text: "Sí",
    time: "07:45",
    type: "user"
  },
  {
    id: 4,
    text: "Transacción registrada ✅",
    time: "07:45",
    type: "bot"
  },
  {
    id: 5,
    text: "",
    time: "07:46",
    type: "voice",
    duration: "0:15"
  },
  {
    id: 6,
    text: "💰 Confirma tu transacción:\nMonto: $300.000 COP\nCategoría: Audífonos 🎧\nCuenta: Tarjeta 💳\nDescripción: Audífonos Bluetooth",
    time: "07:46",
    type: "bot"
  },
  {
    id: 7,
    text: "Sí",
    time: "07:47",
    type: "user"
  }
];

function WhatsAppChat() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < messages.length) {
        setVisibleMessages(prev => [...prev, messages[currentIndex].id]);
        setCurrentIndex(prev => prev + 1);
      }
    }, currentIndex === 0 ? 500 : 
        currentIndex === 1 ? 1500 : 
        currentIndex === 2 ? 800 : 
        currentIndex === 3 ? 1000 : 
        currentIndex === 4 ? 1200 : 
        currentIndex === 5 ? 1500 : 800);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Reset animation every 15 seconds - only when animation is complete
  useEffect(() => {
    if (currentIndex === messages.length) {
      const resetTimer = setTimeout(() => {
        setVisibleMessages([]);
        setCurrentIndex(0);
      }, 15000);

      return () => clearTimeout(resetTimer);
    }
  }, [currentIndex, messages.length]);

  return (
    <div className="bg-[#0b141a] rounded-2xl p-6 max-w-lg mx-auto shadow-2xl border border-gray-700">
      {/* WhatsApp Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-700">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
          F
        </div>
        <div>
          <h4 className="text-white font-medium text-lg">FinancIA</h4>
          <p className="text-gray-400 text-sm">en línea</p>
        </div>
      </div>

      {/* Messages */}
      <div className="py-6 space-y-4 min-h-[500px]">
        {messages.map((message) => {
          const isVisible = visibleMessages.includes(message.id);
          return (
            <div
              key={message.id}
              className={`transition-all duration-500 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'voice' ? (
                  // Voice message
                  <div className="bg-[#dcf8c6] max-w-sm px-5 py-4 rounded-lg rounded-br-sm shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-emerald-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">{message.duration}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-right">{message.time}</p>
                  </div>
                ) : (
                  <div
                    className={`max-w-sm px-5 py-3 rounded-lg shadow-sm ${
                      message.type === 'user'
                        ? 'bg-[#dcf8c6] text-gray-800 rounded-br-sm'
                        : 'bg-white text-gray-800 rounded-bl-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line text-base leading-relaxed">{message.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-2">
                      <p className="text-xs text-gray-500">{message.time}</p>
                      {message.type === 'user' && (
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Diálogo 1: Registro de Gasto
function ExpenseTrackingChat() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-xl border border-blue-200 w-96 h-96 flex-shrink-0 transform rotate-[-1deg] overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
          F
        </div>
        <span className="text-lg font-medium text-gray-700">FinancIA</span>
      </div>
      
      <div className="space-y-4 h-full overflow-hidden">
        <div className="flex justify-end">
          <div className="bg-[#dcf8c6] px-4 py-3 rounded-lg rounded-br-sm max-w-[240px]">
            <p className="text-sm text-gray-800">Hoy gasté $50.000 COP en el almuerzo con mis compañeros</p>
            <p className="text-xs text-gray-500 text-right mt-2">14:23</p>
          </div>
        </div>
        
        <div className="flex justify-start">
          <div className="bg-white px-4 py-3 rounded-lg rounded-bl-sm max-w-[240px] border">
            <p className="text-sm text-gray-800">💰 Confirma tu transacción:
Monto: $50.000 COP
Categoría: Comida 🍔
Cuenta: Efectivo 💳
Descripción: Almuerzo</p>
            <p className="text-xs text-gray-500 text-right mt-2">14:23</p>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-[#dcf8c6] px-4 py-3 rounded-lg rounded-br-sm max-w-[240px]">
            <p className="text-sm text-gray-800">Sí</p>
            <p className="text-xs text-gray-500 text-right mt-2">14:24</p>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="bg-white px-4 py-3 rounded-lg rounded-bl-sm max-w-[240px] border">
            <p className="text-sm text-gray-800">Transacción registrada ✅</p>
            <p className="text-xs text-gray-500 text-right mt-2">14:24</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Diálogo 2: Registro con Voz
function VoiceMessageChat() {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-2xl p-8 shadow-xl border border-orange-200 w-96 h-96 flex-shrink-0 transform rotate-[1.5deg] overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
          F
        </div>
        <span className="text-lg font-medium text-gray-700">FinancIA</span>
      </div>
      
      <div className="space-y-4 h-full overflow-hidden">
        <div className="flex justify-end">
          <div className="bg-[#dcf8c6] px-4 py-3 rounded-lg rounded-br-sm max-w-[220px]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                </svg>
              </div>
              <div className="flex-1 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm text-gray-600">0:06</span>
            </div>
            <p className="text-xs text-gray-500 text-right mt-2">16:12</p>
          </div>
        </div>
        
        <div className="flex justify-start">
          <div className="bg-white px-4 py-3 rounded-lg rounded-bl-sm max-w-[240px] border">
            <p className="text-sm text-gray-800">💰 Confirma tu transacción:
Monto: $40.000 COP
Categoría: Auto 🚗
Descripción: Servicio Auto
Cuenta: Bancolombia 🏦</p>
            <p className="text-xs text-gray-500 text-right mt-2">16:12</p>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-[#dcf8c6] px-4 py-3 rounded-lg rounded-br-sm max-w-[240px]">
            <p className="text-sm text-gray-800">Confirmar ✅</p>
            <p className="text-xs text-gray-500 text-right mt-2">16:13</p>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="bg-white px-4 py-3 rounded-lg rounded-bl-sm max-w-[240px] border">
            <p className="text-sm text-gray-800">Transacción registrada, puedes ver el balance en tu cuenta 💸</p>
            <p className="text-xs text-gray-500 text-right mt-2">16:13</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mensajes creativos y divertidos
function WeekendSpendingChat() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 shadow-xl border border-purple-200 w-96 h-96 flex-shrink-0 transform rotate-[-0.5deg] overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
          F
        </div>
        <span className="text-lg font-medium text-gray-700">FinancIA</span>
      </div>
      
      <div className="space-y-4 h-full overflow-hidden">
        <div className="flex justify-end">
          <div className="bg-[#dcf8c6] px-4 py-3 rounded-lg rounded-br-sm max-w-[240px]">
            <p className="text-sm text-gray-800">¿Qué tal estuvo mi fin de semana en gastos? 🤔</p>
            <p className="text-xs text-gray-500 text-right mt-2">15:44</p>
          </div>
        </div>
        
        <div className="flex justify-start">
          <div className="bg-white px-4 py-3 rounded-lg rounded-bl-sm max-w-[240px] border">
            <p className="text-sm text-gray-800">🎉 Wey, tu fin de semana costó $200.000 COP en fiestas... Te recomiendo que le bajes un poquito 😅🍻 ¿O quieres quebrar?</p>
            <p className="text-xs text-gray-500 text-right mt-2">15:45</p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <div className="bg-[#dcf8c6] px-4 py-3 rounded-lg rounded-br-sm max-w-[240px]">
            <p className="text-sm text-gray-800">Jajaja, gracias por el sarcasmo 😂</p>
            <p className="text-xs text-gray-500 text-right mt-2">15:46</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UberAnalysisChat() {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-2xl p-8 shadow-xl border border-yellow-200 w-96 h-96 flex-shrink-0 transform rotate-[2deg] overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
          F
        </div>
        <span className="text-lg font-medium text-gray-700">FinancIA</span>
      </div>
      
      <div className="space-y-4 h-full overflow-hidden">
        <div className="flex justify-end">
          <div className="bg-[#dcf8c6] px-4 py-3 rounded-lg rounded-br-sm max-w-[240px]">
            <p className="text-sm text-gray-800">¿Por qué gasto tanto en transporte? 🚗💸</p>
            <p className="text-xs text-gray-500 text-right mt-2">18:29</p>
          </div>
        </div>
        
        <div className="flex justify-start">
          <div className="bg-white px-4 py-3 rounded-lg rounded-bl-sm max-w-[240px] border">
            <p className="text-sm text-gray-800">🚗 Hermano, gastaste $104.000 COP en Ubers porque seguiste "durmiendo accidentalmente" 😴 Te recomiendo poner 5 alarmas o comprar una bici 🚴‍♂️</p>
            <p className="text-xs text-gray-500 text-right mt-2">18:30</p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <div className="bg-[#dcf8c6] px-4 py-3 rounded-lg rounded-br-sm max-w-[240px]">
            <p className="text-sm text-gray-800">¡Oye! No es mi culpa que las camas sean tan cómodas 😅</p>
            <p className="text-xs text-gray-500 text-right mt-2">18:31</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoffeeHabitChat() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 shadow-xl border border-green-200 w-96 h-96 flex-shrink-0 transform rotate-[-1.5deg] overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
          F
        </div>
        <span className="text-lg font-medium text-gray-700">FinancIA</span>
      </div>
      
      <div className="space-y-4 h-full overflow-hidden">
        <div className="flex justify-end">
          <div className="bg-[#dcf8c6] px-4 py-3 rounded-lg rounded-br-sm max-w-[240px]">
            <p className="text-sm text-gray-800">¿Es normal que gaste tanto en café? ☕😅</p>
            <p className="text-xs text-gray-500 text-right mt-2">12:14</p>
          </div>
        </div>
        
        <div className="flex justify-start">
          <div className="bg-white px-4 py-3 rounded-lg rounded-bl-sm max-w-[240px] border">
            <p className="text-sm text-gray-800">☕ Wey, $85.000 COP esta semana en café... Te recomiendo comprar una cafetera o vas a terminar hipotecando la casa por un latte 😂☕</p>
            <p className="text-xs text-gray-500 text-right mt-2">12:15</p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <div className="bg-[#dcf8c6] px-4 py-3 rounded-lg rounded-br-sm max-w-[240px]">
            <p className="text-sm text-gray-800">¡Exacto! Sin café no hay trabajo 💪☕</p>
            <p className="text-xs text-gray-500 text-right mt-2">12:16</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoppingSurpriseChat() {
  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-100 rounded-2xl p-8 shadow-xl border border-teal-200 w-96 h-96 flex-shrink-0 transform rotate-[0.5deg] overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
          F
        </div>
        <span className="text-lg font-medium text-gray-700">FinancIA</span>
      </div>
      
      <div className="space-y-4 h-full overflow-hidden">
        <div className="flex justify-end">
          <div className="bg-[#dcf8c6] px-4 py-3 rounded-lg rounded-br-sm max-w-[240px]">
            <p className="text-sm text-gray-800">¿Cuánto gasté ayer en el centro comercial? 🛍️</p>
            <p className="text-xs text-gray-500 text-right mt-2">09:44</p>
          </div>
        </div>
        
        <div className="flex justify-start">
          <div className="bg-white px-4 py-3 rounded-lg rounded-bl-sm max-w-[240px] border">
            <p className="text-sm text-gray-800">🛍️ ¡Sorpresa! Tu "compra rápida" fue de $350.000 COP. Hermano, te recomiendo hacer una lista antes de ir o vas a terminar comprando hasta el aire acondicionado del mall 😱💳</p>
            <p className="text-xs text-gray-500 text-right mt-2">09:45</p>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-[#dcf8c6] px-4 py-3 rounded-lg rounded-br-sm max-w-[240px]">
            <p className="text-sm text-gray-800">¡Pero encontré ofertas increíbles! 🤷‍♀️</p>
            <p className="text-xs text-gray-500 text-right mt-2">09:47</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeliveryInsightChat() {
  return (
    <div className="bg-gradient-to-br from-rose-50 to-pink-100 rounded-2xl p-8 shadow-xl border border-rose-200 w-96 h-96 flex-shrink-0 transform rotate-[-2deg] overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
          F
        </div>
        <span className="text-lg font-medium text-gray-700">FinancIA</span>
      </div>
      
      <div className="space-y-4 h-full overflow-hidden">
        <div className="flex justify-end">
          <div className="bg-[#dcf8c6] px-4 py-3 rounded-lg rounded-br-sm max-w-[240px]">
            <p className="text-sm text-gray-800">¿Qué me recomiendas para ahorrar en comida? 🍕</p>
            <p className="text-xs text-gray-500 text-right mt-2">20:29</p>
          </div>
        </div>
        
        <div className="flex justify-start">
          <div className="bg-white px-4 py-3 rounded-lg rounded-bl-sm max-w-[240px] border">
            <p className="text-sm text-gray-800">🍕 Wey, ordenaste delivery 23 veces por $450.000 COP este mes. Te recomiendo aprender a cocinar o al menos hacer amigos con un chef 😢👨‍🍳</p>
            <p className="text-xs text-gray-500 text-right mt-2">20:30</p>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-[#dcf8c6] px-4 py-3 rounded-lg rounded-br-sm max-w-[240px]">
            <p className="text-sm text-gray-800">Mi cocina y yo estamos en una pausa 😅🍔</p>
            <p className="text-xs text-gray-500 text-right mt-2">20:31</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SavingsGoalChat() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl p-8 shadow-xl border border-indigo-200 w-96 h-96 flex-shrink-0 transform rotate-[1deg] overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
          F
        </div>
        <span className="text-lg font-medium text-gray-700">FinancIA</span>
      </div>
      
      <div className="space-y-4 h-full overflow-hidden">
        <div className="flex justify-end">
          <div className="bg-[#dcf8c6] px-4 py-3 rounded-lg rounded-br-sm max-w-[240px]">
            <p className="text-sm text-gray-800">¿Cómo voy con mi meta de ahorro para vacaciones? 🏖️</p>
            <p className="text-xs text-gray-500 text-right mt-2">10:14</p>
          </div>
        </div>
        
        <div className="flex justify-start">
          <div className="bg-white px-4 py-3 rounded-lg rounded-bl-sm max-w-[240px] border">
            <p className="text-sm text-gray-800">🎯 ¡Vas súper bien! Ya tienes el 67% de tu meta ($1.340.000 COP de $2.000.000 COP) 🏖️✈️ Te recomiendo seguir así y no gastarte todo en café 😉</p>
            <p className="text-xs text-gray-500 text-right mt-2">10:15</p>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-[#dcf8c6] px-4 py-3 rounded-lg rounded-bl-sm max-w-[240px]">
            <p className="text-sm text-gray-800">¡Sí! Ya puedo oler la playa 🌊😎</p>
            <p className="text-xs text-gray-500 text-right mt-2">10:16</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente del carrusel con scroll INFINITO VERDADERO (como en la imagen)
function TrueInfiniteScrollCarousel() {
  const [translateX, setTranslateX] = useState(0);
  const chatComponents = [
    ExpenseTrackingChat,
    VoiceMessageChat,
    WeekendSpendingChat,
    UberAnalysisChat,
    CoffeeHabitChat,
    ShoppingSurpriseChat,
    DeliveryInsightChat,
    SavingsGoalChat
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX(prev => prev + 1); // Movimiento pixel por pixel
    }, 20); // Cada 20ms = 50fps para movimiento súper fluido

    return () => clearInterval(interval);
  }, []);

  // Cada tarjeta tiene 384px de ancho + 32px de gap = 416px total
  const cardWidth = 416;
  const totalWidth = chatComponents.length * cardWidth;

  // Creamos múltiples copias para el efecto infinito
  const infiniteComponents: React.JSX.Element[] = [];
  for (let i = 0; i < 10; i++) { // 10 copias para asegurar scroll infinito
    chatComponents.forEach((Component, index) => {
      infiniteComponents.push(<Component key={`${i}-${index}`} />);
    });
  }

  return (
    <div className="overflow-hidden">
      <div 
        className="flex space-x-8"
        style={{ 
          transform: `translateX(-${translateX % totalWidth}px)`,
          width: `${infiniteComponents.length * cardWidth}px`
        }}
      >
        {infiniteComponents}
      </div>
    </div>
  );
}

// Sección de análisis con mockups
function AnalysisSection() {
  return (
    <div className="container mx-auto px-6 py-20">
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            Descubre patrones
          </span>
          , no solo números.
        </h2>
      </div>

      {/* Mockups Container */}
      <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {/* Left Mockup - Spending Summary */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-8">Resumen de Gastos</h3>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 border border-emerald-500/30">
                <div className="text-emerald-400 text-sm font-medium mb-2">Hoy</div>
                <div className="text-white text-2xl font-bold">$85.000</div>
                <div className="text-emerald-300 text-xs mt-1">COP</div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-500/30">
                <div className="text-blue-400 text-sm font-medium mb-2">Esta Semana</div>
                <div className="text-white text-2xl font-bold">$420.000</div>
                <div className="text-blue-300 text-xs mt-1">COP</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
                <div className="text-purple-400 text-sm font-medium mb-2">Este Mes</div>
                <div className="text-white text-2xl font-bold">$1.850.000</div>
                <div className="text-purple-300 text-xs mt-1">COP</div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-500/30">
                <div className="text-orange-400 text-sm font-medium mb-2">Total</div>
                <div className="text-white text-2xl font-bold">$5.240.000</div>
                <div className="text-orange-300 text-xs mt-1">COP</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Mockup - TreeMap Visualization */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-8">Mapa de Gastos por Categoría</h3>
            
            {/* TreeMap Style Visualization */}
            <div className="grid grid-cols-4 grid-rows-4 gap-2 h-80">
              {/* Comida - Large block */}
              <div className="col-span-2 row-span-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="text-white text-sm font-medium">🍔 Comida</div>
                  <div className="text-white text-lg font-bold">$680.000</div>
                </div>
                <div className="text-red-100 text-xs">36.7%</div>
              </div>
              
              {/* Transporte */}
              <div className="col-span-2 row-span-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="text-white text-sm font-medium">🚗 Transporte</div>
                  <div className="text-white text-lg font-bold">$320.000</div>
                </div>
                <div className="text-blue-100 text-xs">17.3%</div>
              </div>
              
              {/* Entretenimiento */}
              <div className="col-span-1 row-span-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="text-white text-xs font-medium">🎮 Entret.</div>
                  <div className="text-white text-base font-bold">$280.000</div>
                </div>
                <div className="text-purple-100 text-xs">15.1%</div>
              </div>
              
              {/* Compras */}
              <div className="col-span-1 row-span-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="text-white text-xs font-medium">🛍️ Compras</div>
                  <div className="text-white text-base font-bold">$240.000</div>
                </div>
                <div className="text-green-100 text-xs">13.0%</div>
              </div>
              
              {/* Servicios */}
              <div className="col-span-1 row-span-1 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="text-white text-xs font-medium">⚡ Servicios</div>
                  <div className="text-white text-sm font-bold">$180.000</div>
                </div>
                <div className="text-yellow-100 text-xs">9.7%</div>
              </div>
              
              {/* Salud */}
              <div className="col-span-1 row-span-1 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="text-white text-xs font-medium">🏥 Salud</div>
                  <div className="text-white text-sm font-bold">$150.000</div>
                </div>
                <div className="text-teal-100 text-xs">8.1%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom descriptive text */}
      <div className="text-center max-w-4xl mx-auto mt-16">
        <p className="text-lg text-white/80 leading-relaxed font-light">
          Olvídate de las hojas de cálculo confusas. Aquí puedes ver tus gastos por categoría, tus ingresos a lo largo del tiempo o el impacto de tus hábitos en gráficas que realmente te hablan.
        </p>
      </div>
    </div>
  );
}

// Waitlist Component - Solo webhook, sin Supabase
function WaitlistSection() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+57');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validar campos requeridos
      if (activeTab === 'email' && !email) {
        throw new Error('Email es requerido');
      }

      if (activeTab === 'phone' && !phone) {
        throw new Error('Teléfono es requerido');
      }

      // Validaciones adicionales
      if (activeTab === 'email' && !isValidEmail(email)) {
        throw new Error('Por favor ingresa un email válido');
      }

      if (activeTab === 'phone' && !isValidPhone(phone, countryCode)) {
        throw new Error('Por favor ingresa un número de teléfono válido');
      }

      // Enviar a la API
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: activeTab === 'email' ? email : undefined,
          phone: activeTab === 'phone' ? phone : undefined,
          countryCode: activeTab === 'phone' ? countryCode : undefined,
          registrationType: activeTab
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al registrarse');
      }

      setIsSubmitted(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
        setPhone('');
      }, 3000);

    } catch (err: any) {
      setError(err.message || 'Error al registrarse');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="waitlist" className="relative py-32 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
      </div>

      {/* Background matching landing */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #0D1D35 0%, #9DFAD7 100%)'
      }}></div>
      
      {/* Glowing Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Sé de los primeros en{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              transformar tus finanzas
            </span>
          </h2>

          {/* Persuasive subtitle */}
          <p className="text-xl text-white/90 mb-12 font-light">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 font-medium">
              No te quedes atrás
            </span>
            {' '}mientras otros ya están tomando el control de su dinero
          </p>

          {/* Glassmorphism Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl max-w-2xl mx-auto">
            {!isSubmitted ? (
              <>
                {/* Tab Selector */}
                <div className="flex bg-white/10 rounded-2xl p-2 mb-8 max-w-md mx-auto">
                  <button
                    onClick={() => setActiveTab('email')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                      activeTab === 'email'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    <span className="font-medium">Email</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('phone')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                      activeTab === 'phone'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="font-medium">WhatsApp</span>
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200">
                    {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {activeTab === 'email' ? (
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        required
                        disabled={isLoading}
                        className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm text-lg disabled:opacity-50"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        disabled={isLoading}
                        className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm text-lg disabled:opacity-50"
                      >
                        {americanCountries.map((country) => (
                          <option key={country.code} value={country.code} className="bg-gray-800 text-white">
                            {country.flag} {country.code} {country.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="300 123 4567"
                        required
                        disabled={isLoading}
                        className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm text-lg disabled:opacity-50"
                      />
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-2xl text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-emerald-400/50 hover:border-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Registrando...
                      </div>
                    ) : (
                      activeTab === 'email' ? 'Registrar mi correo' : 'Registrar mi WhatsApp'
                    )}
                  </Button>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">¡Perfecto! 🎉</h3>
                <p className="text-white/80 text-lg">
                  Te notificaremos cuando FinancIA esté listo para transformar tus finanzas.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
      `}</style>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="relative py-16" style={{
      background: 'linear-gradient(135deg, #0D1D35 0%, #9DFAD7 100%)'
    }}>
      <div className="container mx-auto px-6">
        <div className="text-center">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-white mb-2">FinancIA</h3>
            <p className="text-white/70 text-lg">Tu asistente financiero personal</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-white/80">
            <a href="#" className="hover:text-emerald-400 transition-colors">Inicio</a>
            <a href="#features-demo" className="hover:text-emerald-400 transition-colors">Producto</a>
            <a href="#waitlist" className="hover:text-emerald-400 transition-colors">Lista de Espera</a>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/20 mb-8"></div>

          {/* Copyright */}
          <div className="text-white/60 text-sm">
            <p className="mb-2">
              © 2025 FinancIA. Todos los derechos reservados.
            </p>
            <p className="flex items-center justify-center gap-2">
              Hecho con <span className="text-red-400">❤️</span> en Colombia 🇨🇴
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-demo');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #0D1D35 0%, #9DFAD7 100%)'
    }}>
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            FinancIA
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={scrollToFeatures}
              className="text-white hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Producto
            </button>
            <a href="#" className="text-white hover:text-emerald-400 transition-colors">
              Inicio
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Tu asistente financiero personal,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 underline decoration-emerald-400 decoration-4 underline-offset-8">
                ahora en tu WhatsApp
              </span>
            </h1>
            
            <p className="text-xl text-gray-100 leading-relaxed max-w-lg">
              Con tan solo un mensaje, nuestro asistente te ayuda a transformar tu dinero. 
              Registra, visualiza y recibe consejos inteligentes al instante.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToWaitlist}
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-2xl text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Quiero ser parte
              </Button>
            </div>
          </div>

          {/* Right Content - WhatsApp Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-teal-500/20 rounded-full blur-xl"></div>
              
              <WhatsAppChat />
            </div>
          </div>
        </div>
      </div>

      {/* Features Demo Section */}
      <div id="features-demo" className="container mx-auto px-6 py-20">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Libérate del Excel y las apps olvidadas
          </h2>
          <h3 className="text-2xl lg:text-3xl font-medium text-white/90 leading-relaxed mb-12">
            Imagina tener un amigo que{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              siempre cuida tu dinero
            </span>
          </h3>
        </div>

        {/* True Infinite Scroll Carousel */}
        <div className="mb-16">
          <TrueInfiniteScrollCarousel />
        </div>

        {/* Bottom descriptive text */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-lg text-white/80 leading-relaxed font-light">
            ¿Necesitas un consejo rápido? Pregúntale. ¿Quieres saber dónde se fue tu último gasto? Él lo sabe. Es la tranquilidad de tener un experto que te acompaña en cada decisión financiera, sin juicios y siempre listo para ayudarte.
          </p>
        </div>
      </div>

      {/* Analysis Section */}
      <AnalysisSection />

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white">A un mensaje de distancia</h3>
            <p className="text-gray-100">Registra gastos, consulta balances y recibe consejos con solo enviar un mensaje</p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Habla, él se encarga del resto</h3>
            <p className="text-gray-100">Usa comandos de voz para registrar gastos mientras caminas o manejas</p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Envía fotos de tus gastos</h3>
            <p className="text-gray-100">Toma una foto del recibo y FinancIA extraerá automáticamente la información</p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Claridad visual</h3>
            <p className="text-gray-100">Gráficos intuitivos que muestran patrones de gasto y tendencias financieras</p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Consejo financiero</h3>
            <p className="text-gray-100">Recomendaciones personalizadas basadas en tus hábitos de gasto y metas</p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">WhatsApp Nativo</h3>
            <p className="text-gray-100">Usa la app que ya conoces, sin descargas adicionales ni configuraciones complejas</p>
          </div>
        </div>
      </div>

      {/* Waitlist Section */}
      <WaitlistSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}