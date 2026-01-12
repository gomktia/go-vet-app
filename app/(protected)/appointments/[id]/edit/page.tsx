"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Calendar, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function EditAppointmentPage({ params }: { params: { id: string } }) {
  // Mock data - será substituído por dados reais do banco
  const [appointmentData, setAppointmentData] = useState({
    id: params.id,
    petName: "Rex",
    vetName: "Dr. Silva",
    type: "consulta",
    date: "2024-03-20",
    time: "14:00",
    location: "presencial",
    address: "Clínica VetCare - Rua das Flores, 123",
    notes: "Consulta de rotina para check-up geral",
    priority: "normal",
    status: "confirmado",
  })

  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar atualização no banco de dados
    console.log("Updated appointment data:", appointmentData)
  }

  const handleCancel = () => {
    // TODO: Implementar cancelamento
    console.log("Canceling appointment:", params.id)
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
              <h1 className="text-xl font-bold text-emerald-800">VetCare</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-emerald-800 mb-2">Editar Agendamento</h2>
            <p className="text-emerald-700">Modifique os detalhes da sua consulta</p>
          </div>

          {/* Current Status */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Status Atual</span>
                <Badge variant={appointmentData.status === "confirmado" ? "default" : "secondary"}>
                  {appointmentData.status === "confirmado" ? "Confirmado" : appointmentData.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Pet</p>
                  <p className="font-medium">{appointmentData.petName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Veterinário</p>
                  <p className="font-medium">{appointmentData.vetName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Data Original</p>
                  <p className="font-medium">
                    {new Date(appointmentData.date).toLocaleDateString("pt-BR")} às {appointmentData.time}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Tipo</p>
                  <p className="font-medium capitalize">{appointmentData.type}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date and Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Reagendar
                </CardTitle>
                <CardDescription>Altere a data e horário do atendimento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Nova Data</Label>
                    <Input
                      id="date"
                      type="date"
                      value={appointmentData.date}
                      onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Novo Horário</Label>
                    <Select
                      value={appointmentData.time}
                      onValueChange={(value) => setAppointmentData({ ...appointmentData, time: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o horário" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Details */}
            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Atendimento</CardTitle>
                <CardDescription>Modifique o tipo ou prioridade se necessário</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Consulta</Label>
                    <Select
                      value={appointmentData.type}
                      onValueChange={(value) => setAppointmentData({ ...appointmentData, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consulta">Consulta Geral</SelectItem>
                        <SelectItem value="vacinacao">Vacinação</SelectItem>
                        <SelectItem value="cirurgia">Cirurgia</SelectItem>
                        <SelectItem value="exame">Exames</SelectItem>
                        <SelectItem value="emergencia">Emergência</SelectItem>
                        <SelectItem value="teleconsulta">Teleconsulta</SelectItem>
                        <SelectItem value="retorno">Retorno</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Prioridade</Label>
                    <Select
                      value={appointmentData.priority}
                      onValueChange={(value) => setAppointmentData({ ...appointmentData, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="urgente">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Local do Atendimento</Label>
                  <Select
                    value={appointmentData.location}
                    onValueChange={(value) => setAppointmentData({ ...appointmentData, location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o local" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="presencial">Presencial - Clínica</SelectItem>
                      <SelectItem value="domicilio">Domicílio - Visita em Casa</SelectItem>
                      <SelectItem value="online">Online - Teleconsulta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {appointmentData.location === "domicilio" && (
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço para Visita</Label>
                    <Input
                      id="address"
                      placeholder="Digite o endereço completo"
                      value={appointmentData.address}
                      onChange={(e) => setAppointmentData({ ...appointmentData, address: e.target.value })}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Observações</CardTitle>
                <CardDescription>Atualize as informações sobre o atendimento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="notes">Motivo da consulta ou sintomas</Label>
                  <Textarea
                    id="notes"
                    placeholder="Descreva os sintomas ou motivo da consulta..."
                    value={appointmentData.notes}
                    onChange={(e) => setAppointmentData({ ...appointmentData, notes: e.target.value })}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button type="button" variant="outline" className="flex-1 bg-transparent" asChild>
                  <Link href="/appointments">Cancelar Edição</Link>
                </Button>
                <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  Salvar Alterações
                </Button>
              </div>

              {/* Cancel Appointment */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="w-5 h-5" />
                    Cancelar Agendamento
                  </CardTitle>
                  <CardDescription>
                    Esta ação não pode ser desfeita. O agendamento será cancelado permanentemente.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button type="button" variant="destructive" onClick={handleCancel} className="w-full">
                    Cancelar Agendamento
                  </Button>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
