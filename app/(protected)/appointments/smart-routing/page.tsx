"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  ArrowLeft,
  MapPin,
  Clock,
  Route,
  Navigation,
  Calendar,
  Phone,
  Car,
  Share2,
  Bell,
  Maximize as Optimize,
} from "lucide-react"
import Link from "next/link"

interface SmartAppointment {
  id: string
  pet: { name: string; avatar: string }
  client: { name: string; phone: string }
  address: string
  city: string
  coordinates: { lat: number; lng: number }
  time: string
  duration: number
  type: string
  priority: "baixa" | "normal" | "alta" | "urgente"
  status: "agendado" | "confirmado" | "em_transito" | "concluido" | "cancelado"
  distance?: number
  estimatedTravel?: number
}

export default function SmartRoutingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [selectedCity, setSelectedCity] = useState("all")
  const [optimizedRoute, setOptimizedRoute] = useState<SmartAppointment[]>([])
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [shareableRoute, setShareableRoute] = useState("")

  // Mock data com coordenadas reais de cidades de SC
  const appointments: SmartAppointment[] = [
    {
      id: "1",
      pet: { name: "Rex", avatar: "/golden-retriever.png" },
      client: { name: "Maria Silva", phone: "(48) 99999-1234" },
      address: "Rua das Flores, 123 - Centro",
      city: "Tubarão",
      coordinates: { lat: -28.4669, lng: -49.0057 },
      time: "09:00",
      duration: 45,
      type: "Consulta Domiciliar",
      priority: "normal",
      status: "agendado",
    },
    {
      id: "2",
      pet: { name: "Mimi", avatar: "/fluffy-persian-cat.png" },
      client: { name: "João Santos", phone: "(48) 99999-5678" },
      address: "Av. Marcolino Martins Cabral, 456",
      city: "Tubarão",
      coordinates: { lat: -28.4789, lng: -49.0123 },
      time: "10:30",
      duration: 30,
      type: "Vacinação",
      priority: "alta",
      status: "confirmado",
    },
    {
      id: "3",
      pet: { name: "Buddy", avatar: "/black-labrador.png" },
      client: { name: "Ana Costa", phone: "(48) 99999-9012" },
      address: "Rua Principal, 789 - Dehon",
      city: "Tubarão",
      coordinates: { lat: -28.4556, lng: -49.0234 },
      time: "14:00",
      duration: 60,
      type: "Cirurgia Menor",
      priority: "alta",
      status: "agendado",
    },
    {
      id: "4",
      pet: { name: "Luna", avatar: "/siamese-cat.png" },
      client: { name: "Carlos Oliveira", phone: "(48) 99999-3456" },
      address: "Rua das Palmeiras, 321",
      city: "Capivari de Baixo",
      coordinates: { lat: -28.4456, lng: -48.9567 },
      time: "11:00",
      duration: 30,
      type: "Consulta",
      priority: "normal",
      status: "agendado",
    },
    {
      id: "5",
      pet: { name: "Thor", avatar: "/german-shepherd.png" },
      client: { name: "Lucia Ferreira", phone: "(48) 99999-7890" },
      address: "Av. Central, 654",
      city: "Laguna",
      coordinates: { lat: -28.48, lng: -48.7789 },
      time: "15:30",
      duration: 45,
      type: "Exame",
      priority: "normal",
      status: "agendado",
    },
  ]

  const cities = ["Tubarão", "Capivari de Baixo", "Laguna", "Imbituba", "Jaguaruna"]

  const filteredAppointments = appointments.filter((apt) => {
    const matchesDate = apt.time // Em produção, filtrar por data
    const matchesCity = selectedCity === "all" || apt.city === selectedCity
    return matchesDate && matchesCity
  })

  // Algoritmo de otimização de rota (TSP simplificado)
  const optimizeRoute = () => {
    setIsOptimizing(true)

    setTimeout(() => {
      const sorted = [...filteredAppointments].sort((a, b) => {
        // Priorizar urgência
        const priorityWeight = { urgente: 4, alta: 3, normal: 2, baixa: 1 }
        if (priorityWeight[a.priority] !== priorityWeight[b.priority]) {
          return priorityWeight[b.priority] - priorityWeight[a.priority]
        }

        // Depois por proximidade geográfica (simulado)
        return a.coordinates.lat - b.coordinates.lat
      })

      // Calcular distâncias e tempos estimados
      const optimized = sorted.map((apt, index) => {
        const distance = index === 0 ? 0 : Math.random() * 15 + 5 // 5-20km
        const estimatedTravel = Math.round(distance * 3) // ~3min por km

        return {
          ...apt,
          distance: Math.round(distance * 10) / 10,
          estimatedTravel,
        }
      })

      setOptimizedRoute(optimized)
      setIsOptimizing(false)

      // Gerar link compartilhável
      const routeId = Math.random().toString(36).substr(2, 9)
      setShareableRoute(`https://cancianvet.app/route/${routeId}`)
    }, 2000)
  }

  const getTotalDistance = () => {
    return optimizedRoute.reduce((total, apt) => total + (apt.distance || 0), 0)
  }

  const getTotalTime = () => {
    const travelTime = optimizedRoute.reduce((total, apt) => total + (apt.estimatedTravel || 0), 0)
    const serviceTime = optimizedRoute.reduce((total, apt) => total + apt.duration, 0)
    return travelTime + serviceTime
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgente":
        return "destructive"
      case "alta":
        return "secondary"
      case "normal":
        return "outline"
      case "baixa":
        return "default"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "default"
      case "em_transito":
        return "secondary"
      case "concluido":
        return "default"
      case "cancelado":
        return "destructive"
      default:
        return "outline"
    }
  }

  const shareRoute = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Rota CancianVet",
        text: `Acompanhe minha rota de atendimentos veterinários`,
        url: shareableRoute,
      })
    } else {
      navigator.clipboard.writeText(shareableRoute)
      alert("Link copiado para a área de transferência!")
    }
  }

  const notifyClients = () => {
    // Simular envio de notificações
    alert(`Notificações enviadas para ${optimizedRoute.length} clientes sobre horários atualizados!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/appointments">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-emerald-800">CancianVet</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-emerald-800 mb-2">Otimização de Rotas</h2>
          <p className="text-emerald-700">Organize seus atendimentos domiciliares por proximidade e prioridade</p>
        </div>

        {/* Filters and Controls */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Data</label>
            <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Cidade</label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="Todas as cidades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as cidades</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={optimizeRoute}
            disabled={isOptimizing || filteredAppointments.length === 0}
            className="bg-blue-600 hover:bg-blue-700 mt-7"
          >
            {isOptimizing ? (
              <>
                <Optimize className="w-4 h-4 mr-2 animate-spin" />
                Otimizando...
              </>
            ) : (
              <>
                <Route className="w-4 h-4 mr-2" />
                Otimizar Rota
              </>
            )}
          </Button>

          {optimizedRoute.length > 0 && (
            <Button onClick={shareRoute} variant="outline" className="bg-transparent mt-7">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          )}
        </div>

        {/* Route Summary */}
        {optimizedRoute.length > 0 && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Navigation className="w-5 h-5" />
                Rota Otimizada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{optimizedRoute.length}</p>
                  <p className="text-sm text-gray-600">Atendimentos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{getTotalDistance().toFixed(1)} km</p>
                  <p className="text-sm text-gray-600">Distância Total</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round(getTotalTime() / 60)}h {getTotalTime() % 60}min
                  </p>
                  <p className="text-sm text-gray-600">Tempo Total</p>
                </div>
                <div className="text-center">
                  <Button onClick={notifyClients} size="sm" className="bg-green-600 hover:bg-green-700">
                    <Bell className="w-4 h-4 mr-1" />
                    Notificar Clientes
                  </Button>
                </div>
              </div>

              {shareableRoute && (
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-600 mb-2">Link para compartilhar rota:</p>
                  <code className="text-xs bg-gray-100 p-2 rounded block break-all">{shareableRoute}</code>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Appointments List */}
        <div className="space-y-4">
          {(optimizedRoute.length > 0 ? optimizedRoute : filteredAppointments).map((appointment, index) => (
            <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {/* Route Order */}
                  {optimizedRoute.length > 0 && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>
                  )}

                  {/* Pet Info */}
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={appointment.pet.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{appointment.pet.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{appointment.pet.name}</h3>
                      <p className="text-sm text-gray-600">{appointment.client.name}</p>
                      <p className="text-xs text-gray-500">{appointment.client.phone}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">{appointment.city}</span>
                    </div>
                    <p className="text-xs text-gray-600">{appointment.address}</p>
                    {appointment.distance && (
                      <p className="text-xs text-blue-600 mt-1">
                        📍 {appointment.distance}km • 🕒 {appointment.estimatedTravel}min viagem
                      </p>
                    )}
                  </div>

                  {/* Time and Type */}
                  <div className="text-center">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">{appointment.time}</span>
                    </div>
                    <p className="text-xs text-gray-600">{appointment.duration}min</p>
                    <p className="text-xs text-gray-500">{appointment.type}</p>
                  </div>

                  {/* Priority and Status */}
                  <div className="flex flex-col gap-2">
                    <Badge variant={getPriorityColor(appointment.priority)}>{appointment.priority}</Badge>
                    <Badge variant={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Phone className="w-4 h-4 mr-1" />
                      Ligar
                    </Button>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      <Car className="w-4 h-4 mr-1" />
                      Navegar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum atendimento domiciliar encontrado</h3>
            <p className="text-gray-600 mb-4">Selecione uma data diferente ou agende novos atendimentos</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href="/appointments/new">Agendar Atendimento</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
