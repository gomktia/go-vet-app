"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Clock, Phone, Star, Car } from "lucide-react"

export default function LocationPage() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  const nearbyVets = [
    {
      id: "1",
      name: "Clínica VetCare Central",
      address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
      distance: "0.8 km",
      rating: 4.8,
      reviews: 156,
      phone: "(11) 3333-1234",
      hours: "Seg-Sex: 8h-18h | Sáb: 8h-14h",
      services: ["Consultas", "Cirurgias", "Emergência 24h"],
      homeVisit: true,
    },
    {
      id: "2",
      name: "Hospital Veterinário São Paulo",
      address: "Rua Augusta, 500 - Consolação, São Paulo - SP",
      distance: "1.2 km",
      rating: 4.6,
      reviews: 89,
      phone: "(11) 3333-5678",
      hours: "Seg-Dom: 24h",
      services: ["Emergência", "UTI", "Exames"],
      homeVisit: false,
    },
    {
      id: "3",
      name: "VetCare Jardins",
      address: "Rua Oscar Freire, 200 - Jardins, São Paulo - SP",
      distance: "2.1 km",
      rating: 4.9,
      reviews: 203,
      phone: "(11) 3333-9012",
      hours: "Seg-Sex: 7h-19h | Sáb-Dom: 8h-16h",
      services: ["Consultas", "Estética", "Vacinação"],
      homeVisit: true,
    },
  ]

  const homeVisitRequests = [
    {
      id: "1",
      pet: "Max",
      service: "Consulta Domiciliar",
      date: "Hoje, 16:00",
      vet: "Dr. Silva",
      address: "Rua das Flores, 123 - Vila Madalena",
      status: "confirmado",
    },
    {
      id: "2",
      pet: "Luna",
      service: "Vacinação",
      date: "Amanhã, 10:00",
      vet: "Dra. Santos",
      address: "Av. Rebouças, 456 - Pinheiros",
      status: "pendente",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-green-100 text-green-800"
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      case "cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-emerald-900">Localização e Visitas</h1>
          <p className="text-emerald-700">Encontre clínicas próximas ou agende uma visita domiciliar</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map and Search */}
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-900 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Clínicas Próximas
              </CardTitle>
              <CardDescription>Encontre veterinários na sua região</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="space-y-2">
                <Label htmlFor="location">Buscar por endereço</Label>
                <div className="flex gap-2">
                  <Input id="location" placeholder="Digite seu endereço ou CEP" className="flex-1" />
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Navigation className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="h-64 bg-emerald-100 rounded-lg flex items-center justify-center border-2 border-dashed border-emerald-300">
                <div className="text-center text-emerald-600">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-medium">Mapa Interativo</p>
                  <p className="text-sm">Visualize clínicas próximas</p>
                </div>
              </div>

              {/* Nearby Vets List */}
              <div className="space-y-3">
                {nearbyVets.map((vet) => (
                  <div
                    key={vet.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedLocation === vet.id
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-emerald-100 hover:bg-emerald-50"
                    }`}
                    onClick={() => setSelectedLocation(vet.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-emerald-900">{vet.name}</h3>
                        <p className="text-sm text-emerald-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {vet.distance}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{vet.rating}</span>
                        <span className="text-xs text-gray-500">({vet.reviews})</span>
                      </div>
                    </div>

                    <p className="text-sm text-emerald-700 mb-2">{vet.address}</p>

                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      <span className="text-xs text-emerald-600">{vet.hours}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {vet.services.map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {vet.homeVisit && (
                        <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                          <Car className="w-3 h-3 mr-1" />
                          Visita Domiciliar
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        Agendar
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="w-3 h-3 mr-1" />
                        Ligar
                      </Button>
                      {vet.homeVisit && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-emerald-700 border-emerald-300 bg-transparent"
                        >
                          <Car className="w-3 h-3 mr-1" />
                          Visita
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Home Visits */}
          <div className="space-y-6">
            {/* Request Home Visit */}
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900 flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Solicitar Visita Domiciliar
                </CardTitle>
                <CardDescription>Atendimento veterinário no conforto da sua casa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pet">Pet</Label>
                    <Input id="pet" placeholder="Selecione o pet" />
                  </div>
                  <div>
                    <Label htmlFor="service">Serviço</Label>
                    <Input id="service" placeholder="Tipo de atendimento" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Input id="address" placeholder="Rua, número, bairro, cidade" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Data</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="time">Horário</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Observações</Label>
                  <Input id="notes" placeholder="Informações adicionais sobre o atendimento" />
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Car className="w-4 h-4 mr-2" />
                  Solicitar Visita Domiciliar
                </Button>
              </CardContent>
            </Card>

            {/* Scheduled Home Visits */}
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900">Visitas Agendadas</CardTitle>
                <CardDescription>Suas próximas visitas domiciliares</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {homeVisitRequests.map((visit) => (
                  <div key={visit.id} className="p-4 border border-emerald-100 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-emerald-900">{visit.service}</h3>
                      <Badge className={getStatusColor(visit.status)}>{visit.status}</Badge>
                    </div>
                    <p className="text-sm text-emerald-600 mb-1">Pet: {visit.pet}</p>
                    <p className="text-sm text-emerald-600 mb-1">Veterinário: {visit.vet}</p>
                    <p className="text-sm text-emerald-700 mb-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {visit.date}
                    </p>
                    <p className="text-sm text-emerald-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {visit.address}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        Reagendar
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="w-3 h-3 mr-1" />
                        Contato
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Services */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-900 flex items-center gap-2">🚨 Emergência 24h</CardTitle>
                <CardDescription className="text-red-700">
                  Atendimento de emergência disponível 24 horas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-red-200">
                  <p className="font-medium text-red-900">Hospital Veterinário 24h</p>
                  <p className="text-sm text-red-700">Av. Paulista, 1500 - Bela Vista</p>
                  <p className="text-sm text-red-600">Distância: 1.5 km</p>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-red-600 hover:bg-red-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Ligar Emergência
                  </Button>
                  <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent">
                    <Navigation className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
