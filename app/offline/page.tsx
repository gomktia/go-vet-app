"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WifiOff, RefreshCw, Heart, MessageCircle, Calendar, FileText } from "lucide-react"
import Link from "next/link"

export default function OfflinePage() {
  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <WifiOff className="w-8 h-8 text-gray-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Você está offline</CardTitle>
          <CardDescription>
            Não foi possível conectar à internet. Algumas funcionalidades ainda estão disponíveis.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Available offline features */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Disponível offline:</h3>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
                <Link href="/pets">
                  <Heart className="w-6 h-6 text-emerald-600" />
                  <span className="text-sm">Meus Pets</span>
                </Link>
              </Button>

              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
                <Link href="/appointments">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <span className="text-sm">Consultas</span>
                </Link>
              </Button>

              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
                <Link href="/medical-records/1">
                  <FileText className="w-6 h-6 text-purple-600" />
                  <span className="text-sm">Prontuários</span>
                </Link>
              </Button>

              <Button variant="outline" className="h-20 flex-col gap-2 opacity-50 bg-transparent" disabled>
                <MessageCircle className="w-6 h-6 text-gray-400" />
                <span className="text-sm">Chat</span>
              </Button>
            </div>
          </div>

          {/* Retry connection */}
          <div className="space-y-3">
            <Button onClick={handleRetry} className="w-full bg-emerald-600 hover:bg-emerald-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar novamente
            </Button>

            <p className="text-sm text-gray-600">Suas ações serão sincronizadas quando a conexão for restaurada.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
