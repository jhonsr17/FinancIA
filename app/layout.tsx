import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
});

export const metadata: Metadata = {
  title: 'FinancIA - Tu asistente financiero personal',
  description: 'Controla tus finanzas a través de WhatsApp con inteligencia artificial',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}