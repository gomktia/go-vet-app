import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "CancianVet - Cuidado Veterinário Digital",
  description: "Plataforma completa para cuidados veterinários com chat, agendamentos e prontuário eletrônico",
  generator: "CancianVet App",
  manifest: "/manifest.json",
  keywords: ["veterinário", "pets", "saúde animal", "telemedicina", "consulta online"],
  authors: [{ name: "CancianVet Team" }],
  creator: "CancianVet",
  publisher: "CancianVet",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/icon-192x192.jpg",
    shortcut: "/icon-192x192.jpg",
    apple: "/icon-192x192.jpg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CancianVet",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#059669" },
    { media: "(prefers-color-scheme: dark)", color: "#065f46" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="application-name" content="CancianVet" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CancianVet" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#059669" />
        <meta name="msapplication-tap-highlight" content="no" />

        <link rel="preload" href="/icon-192x192.jpg" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('[SW] Registration successful');
                    })
                    .catch(function(error) {
                      console.log('[SW] Registration failed');
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
