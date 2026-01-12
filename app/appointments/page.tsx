"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Plus, Search, Clock, MapPin, Phone, Video, Edit, Trash2, Heart } from "lucide-react"
import Link from "next/link"

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")

  // Mock data - será substituído por dados reais do banco
  const appointments = [
    {
      id: 1,
      pet: { name: "Rex", avatar: "/golden-retriever.png" },
      vet: { name: "Dr. Silva", avatar: "/caring-vet.png" },
      type: "Consulta",
      date: "2024-03-20",
      time: "14:00",
      duration: "30 min",
      status: "confirmado",
      location: "Presencial",
      address: "Clínica VetCare - Rua das Flores, 123",
      notes: "Consulta de rotina para check-up geral",
    },
    {
      id: 2,
      pet: { name: "Mimi", avatar: "/fluffy-persian-cat.png" },
      vet: { name: "Dra. Santos", avatar: "/caring-vet.png" },
      type: "Vacinação",
      date: "2024-03-21",
      time: "10:30",
      duration: "15 min",
      status: "pendente",
      location: "Presencial",
      address: "Clínica VetCare - Rua das Flores, 123",
      notes: "Aplicação de vacinas anuais",
    },
    {
      id: 3,
      pet: { name: "Buddy", avatar: "/black-labrador.png" },
      vet: { name: "Dr. Costa", avatar: "/caring-vet.png" },
      type: "Cirurgia",
      date: "2024-03-25",
      time: "09:00",
      duration: "2 horas",
      status: "agendado",
      location: "Presencial",
      address: "Hospital Veterinário - Av. Principal, 456",
      notes: "Castração programada",
    },
    {
      id: 4,
      pet: { name: "Rex", avatar: "/golden-retriever.png" },
      vet: { name: "Dr. Silva", avatar: "/caring-vet.png" },
      type: "Teleconsulta",
      date: "2024-03-18",
      time: "16:00",
      duration: "20 min",
      status: "concluido",
      location: "Online",
      address: "Videochamada",
      notes: "Acompanhamento pós-consulta",
    },
  ]

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || appointment.status === filterStatus
    const matchesType = filterType === "all" || appointment.type.toLowerCase() === filterType.toLowerCase()

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "default"
      case "pendente":
        return "secondary"
      case "agendado":
        return "outline"
      case "concluido":
        return "default"
      case "cancelado":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmado":
        return "Confirmado"
      case "pendente":
        return "Pendente"
      case "agendado":
        return "Agendado"
      case "concluido":
        return "Concluído"
      case "cancelado":
        return "Cancelado"
      default:
        return status
    }
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
            <h1 className="text-xl font-bold text-emerald-800">VetCare</h1>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-emerald-800 mb-2">Agendamentos</h2>
            <p className="text-emerald-700">Gerencie suas consultas, cirurgias e teleconsultas</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
            <Link href="/appointments/new">
              <Plus className="w-4 h-4 mr-2" />
              Novo Agendamento
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar agendamentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="confirmado">Confirmado</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="agendado">Agendado</SelectItem>
              <SelectItem value="concluido">Concluído</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectItem value="consulta">Consulta</SelectItem>
              <SelectItem value="vacinação">Vacinação</SelectItem>
              <SelectItem value="cirurgia">Cirurgia</SelectItem>
              <SelectItem value="teleconsulta">Teleconsulta</SelectItem>
              <SelectItem value="exame">Exame</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="bg-transparent">
            <Calendar className="w-4 h-4 mr-2" />
            Filtrar por Data
          </Button>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Pet and Vet Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={appointment.pet.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{appointment.pet.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{appointment.type}</h3>
                      <p className="text-sm text-gray-600">
                        Pet: {appointment.pet.name} • Veterinário: {appointment.vet.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{appointment.notes}</p>
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(appointment.date).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {appointment.time} ({appointment.duration})
                      </div>
                    </div>

                    {/* Location */}
                    <div className="text-center">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <MapPin className="w-4 h-4" />
                        {appointment.location}
                      </div>
                      <p className="text-xs text-gray-500 max-w-32 truncate">{appointment.address}</p>
                    </div>

                    {/* Status */}
                    <div className="text-center">
                      <Badge variant={getStatusColor(appointment.status)}>{getStatusText(appointment.status)}</Badge>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {appointment.location === "Online" && appointment.status === "confirmado" && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Video className="w-4 h-4 mr-1" />
                          Entrar
                        </Button>
                      )}
                      {appointment.location === "Presencial" && appointment.status === "confirmado" && (
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Phone className="w-4 h-4 mr-1" />
                          Ligar
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="bg-transparent" asChild>
                        <Link href={`/appointments/${appointment.id}/edit`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum agendamento encontrado</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== "all" || filterType !== "all"
                ? "Tente ajustar os filtros de busca"
                : "Agende sua primeira consulta para começar"}
            </p>
            <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href="/appointments/new">
                <Plus className="w-4 h-4 mr-2" />
                Novo Agendamento
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
