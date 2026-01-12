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
      pet: { name: "Mimi", avatar: "/white-persian-cat.jpg" },
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
      pet: { name: "Buddy", avatar: "/chocolate-labrador-dog.jpg" },
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

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
      case "pendente":
        return "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
      case "agendado":
        return "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400"
      case "concluido":
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
      case "cancelado":
        return "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400"
      default:
        return "bg-slate-50 text-slate-500"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmado": return "Confirmado"
      case "pendente": return "Pendente"
      case "agendado": return "Agendado"
      case "concluido": return "Concluído"
      case "cancelado": return "Cancelado"
      default: return status
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 pb-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Meus <span className="text-indigo-600 dark:text-indigo-400">Agendamentos</span></h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Histórico e próximas consultas para seus pets.</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg shadow-indigo-500/20 px-8 h-12" asChild>
            <Link href="/appointments/new">
              <Plus className="w-5 h-5 mr-2" />
              NOVO AGENDAMENTO
            </Link>
          </Button>
        </div>

        {/* Filters Premium */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative group md:col-span-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <Input
              placeholder="Buscar por pet, vet ou tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 pl-12 rounded-2xl border-none bg-white dark:bg-slate-900 shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-500/50"
            />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="h-12 rounded-2xl border-none bg-white dark:bg-slate-900 shadow-sm font-bold text-xs uppercase tracking-widest">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-none shadow-xl">
              <SelectItem value="all">Todos Status</SelectItem>
              <SelectItem value="confirmado">Confirmados</SelectItem>
              <SelectItem value="pendente">Pendentes</SelectItem>
              <SelectItem value="concluido">Concluídos</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="h-12 rounded-2xl border-none bg-white dark:bg-slate-900 shadow-sm font-bold text-xs uppercase tracking-widest">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-none shadow-xl">
              <SelectItem value="all">Todos Tipos</SelectItem>
              <SelectItem value="consulta">Consulta</SelectItem>
              <SelectItem value="vacinação">Vacinação</SelectItem>
              <SelectItem value="cirurgia">Cirurgia</SelectItem>
              <SelectItem value="teleconsulta">Telemedicina</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Timeline List */}
        <div className="space-y-6 relative before:absolute before:left-[1.8rem] before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {filteredAppointments.map((app) => (
            <div key={app.id} className="relative pl-14">
              {/* Timeline Node */}
              <div className={`absolute left-0 top-6 w-14 h-14 rounded-full border-4 border-slate-50 dark:border-slate-950 flex items-center justify-center shadow-lg z-10 ${app.status === 'concluido' ? 'bg-slate-200 dark:bg-slate-800' : 'bg-indigo-600'}`}>
                {app.location === 'Online' ? <Video className="w-6 h-6 text-white" /> : <Calendar className="w-6 h-6 text-white" />}
              </div>

              <Card className="border-none shadow-xl dark:bg-slate-900/50 overflow-hidden group hover:shadow-indigo-500/10 transition-all duration-500">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x dark:divide-slate-800">
                    {/* Info Column */}
                    <div className="p-8 flex-1 flex items-start gap-6">
                      <Avatar className="w-16 h-16 rounded-3xl border-2 border-white dark:border-slate-800 shadow-lg">
                        <AvatarImage src={app.pet.avatar} className="object-cover" />
                        <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold">{app.pet.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={`${getStatusStyle(app.status)} border-none font-black text-[9px] px-3 uppercase tracking-widest`}>{getStatusLabel(app.status)}</Badge>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{app.type}</span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-1">{app.pet.name} <span className="text-slate-400 font-normal">com {app.vet.name}</span></h3>
                        <p className="text-xs font-medium text-slate-500 line-clamp-1">{app.notes}</p>
                      </div>
                    </div>

                    {/* Schedule Column */}
                    <div className="p-8 lg:w-72 bg-slate-50/50 dark:bg-slate-900/20 space-y-4 flex flex-col justify-center">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm">
                          <Clock className="w-4 h-4 text-indigo-500" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Horário</p>
                          <p className="text-sm font-black text-slate-700 dark:text-slate-200">{app.time} <span className="font-medium text-xs opacity-50">({app.duration})</span></p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm">
                          <MapPin className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Local</p>
                          <p className="text-sm font-black text-slate-700 dark:text-slate-200 truncate max-w-[120px]">{app.address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions Column */}
                    <div className="p-8 lg:w-48 flex lg:flex-col items-center justify-center gap-3">
                      {app.status === 'confirmado' && app.location === 'Online' && (
                        <Link href="/dashboard/telemedicine" className="w-full">
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-500/20 font-black text-[10px] h-12">
                            ENTRAR <Video className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      )}
                      <div className="flex gap-2 w-full">
                        <Button variant="ghost" size="icon" className="flex-1 lg:flex-none h-12 w-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm border dark:border-slate-700 text-slate-400 hover:text-indigo-500">
                          <Edit className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="flex-1 lg:flex-none h-12 w-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm border dark:border-slate-700 text-slate-400 hover:text-rose-500">
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900/50 rounded-[3rem] shadow-sm">
            <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Calendar className="w-16 h-16 text-slate-300 dark:text-slate-700" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-3">Nenhum agendamento ativo</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto font-medium">
              Sua agenda está livre! Que tal planejar o próximo check-up do seu pet?
            </p>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-10 h-14 font-black" asChild>
              <Link href="/appointments/new">
                <Plus className="w-5 h-5 mr-2" />
                DETERMINAR AGENDAMENTO
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
