"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  MapPin,
  Clock,
  Navigation,
  Phone,
  CheckCircle,
  AlertCircle,
  Car,
  RefreshCw as Refresh,
} from "lucide-react"

interface RouteTracking {
  id: string
  vetName: string
  vetPhone: string
  currentLocation: { lat: number; lng: number; address: string }
  estimatedArrival: string
  status: "em_transito" | "proximo" | "chegou" | "atendendo"
  appointments: Array<{
    id: string
    pet: string
    client: string
    address: string
    time: string
    status: "pendente" | "atual" | "concluido"
    estimatedArrival?: string
  }>
}

export default function RouteTrackingPage({ params }: { params: { routeId: string } }) {
  const [tracking, setTracking] = useState<RouteTracking | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock data - em produção viria de API real
  useEffect(() => {
    setTimeout(() => {
      setTracking({
        id: params.routeId,
        vetName: "Dr. João Santos",
        vetPhone: "(48) 99999-5678",
        currentLocation: {
          lat: -28.4669,
          lng: -49.0057,
          address: "Av. Marcolino Martins Cabral, 1200 - Tubarão",
        },
        estimatedArrival: "14:30",
        status: "em_transito",
        appointments: [
          {
            id: "1",
            pet: "Rex",
            client: "Maria Silva",
            address: "Rua das Flores, 123",
            time: "14:00",
            status: "concluido",
          },
          {
            id: "2",
            pet: "Mimi",
            client: "João Santos",
            address: "Av. Marcolino Martins Cabral, 456",
            time: "14:30",
            status: "atual",
            estimatedArrival: "14:35",
          },
          {
            id: "3",
            pet: "Buddy",
            client: "Ana Costa",
            address: "Rua Principal, 789",
            time: "15:00",
            status: "pendente",
            estimatedArrival: "15:10",
          },
        ],
      })
      setLoading(false)
    }, 1000)
  }, [params.routeId])

  const refreshLocation = () => {
    setLoading(true)
    // Simular atualização de localização
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "concluido":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "atual":
        return <Car className="w-4 h-4 text-blue-600" />
      case "pendente":
        return <Clock className="w-4 h-4 text-gray-400" />
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "em_transito":
        return "secondary"
      case "proximo":
        return "default"
      case "chegou":
        return "default"
      case "atendendo":
        return "default"
      default:
        return "outline"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "em_transito":
        return "Em Trânsito"
      case "proximo":
        return "Chegando"
      case "chegou":
        return "Chegou"
      case "atendendo":
        return "Atendendo"
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white animate-pulse" />
          </div>
          <p className="text-emerald-800 font-medium">Carregando localização...</p>
        </div>
      </div>
    )
  }

  if (!tracking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Rota não encontrada</h2>
          <p className="text-gray-600">Verifique o link e tente novamente</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-emerald-800">CancianVet</h1>
          </div>
          <Button onClick={refreshLocation} variant="outline" size="sm" className="bg-transparent">
            <Refresh className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Vet Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/caring-vet.png" />
                  <AvatarFallback>Dr</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-bold">{tracking.vetName}</h2>
                  <p className="text-sm text-gray-600">Veterinário CancianVet</p>
                </div>
              </div>
              <Badge variant={getStatusColor(tracking.status)}>{getStatusText(tracking.status)}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{tracking.currentLocation.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Chegada prevista: {tracking.estimatedArrival}</span>
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar para o Veterinário
                </Button>
                <Button size="sm" variant="outline" className="bg-transparent flex-1">
                  <Navigation className="w-4 h-4 mr-2" />
                  Ver no Mapa
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Route Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Progresso da Rota</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tracking.appointments.map((appointment, index) => (
                <div key={appointment.id} className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="flex-shrink-0">{getStatusIcon(appointment.status)}</div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium">{appointment.pet}</h3>
                      <span className="text-sm text-gray-500">{appointment.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{appointment.client}</p>
                    <p className="text-xs text-gray-500">{appointment.address}</p>

                    {appointment.status === "atual" && appointment.estimatedArrival && (
                      <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-700">
                        🚗 Chegada prevista: {appointment.estimatedArrival}
                      </div>
                    )}

                    {appointment.status === "concluido" && (
                      <div className="mt-2 p-2 bg-green-50 rounded text-sm text-green-700">
                        ✅ Atendimento concluído
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Updates */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">🔄 Atualizações em tempo real ativas</p>
          <p className="text-xs text-gray-500">Você receberá notificações quando o veterinário estiver chegando</p>
        </div>
      </div>
    </div>
  )
}
