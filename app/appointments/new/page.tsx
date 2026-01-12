"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Calendar, Clock, MapPin, Video, User, Stethoscope } from "lucide-react"
import Link from "next/link"

export default function NewAppointmentPage() {
  const [appointmentData, setAppointmentData] = useState({
    petId: "",
    vetId: "",
    type: "",
    date: "",
    time: "",
    location: "",
    address: "",
    notes: "",
    priority: "normal",
  })

  // Mock data - será substituído por dados reais do banco
  const pets = [
    { id: "1", name: "Rex", breed: "Golden Retriever", avatar: "/golden-retriever.png" },
    { id: "2", name: "Mimi", breed: "Persa", avatar: "/fluffy-persian-cat.png" },
    { id: "3", name: "Buddy", breed: "Labrador", avatar: "/black-labrador.png" },
  ]

  const veterinarians = [
    {
      id: "1",
      name: "Dr. Silva",
      specialty: "Clínico Geral",
      avatar: "/caring-vet.png",
      rating: 4.9,
      available: true,
    },
    {
      id: "2",
      name: "Dra. Santos",
      specialty: "Dermatologia",
      avatar: "/caring-vet.png",
      rating: 4.8,
      available: true,
    },
    {
      id: "3",
      name: "Dr. Costa",
      specialty: "Cirurgia",
      avatar: "/caring-vet.png",
      rating: 4.9,
      available: false,
    },
  ]

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
    // TODO: Implementar salvamento no banco de dados
    console.log("Appointment data:", appointmentData)
  }

  const selectedPet = pets.find((pet) => pet.id === appointmentData.petId)
  const selectedVet = veterinarians.find((vet) => vet.id === appointmentData.vetId)

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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-emerald-800 mb-2">Novo Agendamento</h2>
            <p className="text-emerald-700">Agende uma consulta, cirurgia ou teleconsulta para seu pet</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Pet Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-600" />
                  Selecionar Pet
                </CardTitle>
                <CardDescription>Escolha qual pet será atendido</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {pets.map((pet) => (
                    <div
                      key={pet.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        appointmentData.petId === pet.id
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 hover:border-emerald-300"
                      }`}
                      onClick={() => setAppointmentData({ ...appointmentData, petId: pet.id })}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={pet.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{pet.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{pet.name}</p>
                          <p className="text-sm text-gray-600">{pet.breed}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Type */}
            <Card>
              <CardHeader>
                <CardTitle>Tipo de Atendimento</CardTitle>
                <CardDescription>Selecione o tipo de serviço desejado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Consulta *</Label>
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
                  <Label htmlFor="location">Local do Atendimento *</Label>
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
                    <Label htmlFor="address">Endereço para Visita *</Label>
                    <Input
                      id="address"
                      placeholder="Digite o endereço completo"
                      value={appointmentData.address}
                      onChange={(e) => setAppointmentData({ ...appointmentData, address: e.target.value })}
                      required
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Veterinarian Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-blue-600" />
                  Selecionar Veterinário
                </CardTitle>
                <CardDescription>Escolha o profissional que irá atender seu pet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {veterinarians.map((vet) => (
                    <div
                      key={vet.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        appointmentData.vetId === vet.id
                          ? "border-blue-500 bg-blue-50"
                          : vet.available
                            ? "border-gray-200 hover:border-blue-300"
                            : "border-gray-100 bg-gray-50 cursor-not-allowed"
                      }`}
                      onClick={() => vet.available && setAppointmentData({ ...appointmentData, vetId: vet.id })}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={vet.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{vet.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{vet.name}</p>
                            <p className="text-sm text-gray-600">{vet.specialty}</p>
                            <p className="text-sm text-yellow-600">⭐ {vet.rating}</p>
                          </div>
                        </div>
                        <Badge variant={vet.available ? "default" : "secondary"}>
                          {vet.available ? "Disponível" : "Indisponível"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Date and Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Data e Horário
                </CardTitle>
                <CardDescription>Escolha quando deseja ser atendido</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Data *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={appointmentData.date}
                      onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Horário *</Label>
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

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Observações</CardTitle>
                <CardDescription>Informações adicionais sobre o atendimento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="notes">Descreva os sintomas ou motivo da consulta</Label>
                  <Textarea
                    id="notes"
                    placeholder="Ex: Pet apresentando tosse há 3 dias, perda de apetite..."
                    value={appointmentData.notes}
                    onChange={(e) => setAppointmentData({ ...appointmentData, notes: e.target.value })}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            {(selectedPet || selectedVet || appointmentData.date) && (
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Agendamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedPet && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span>
                          Pet: {selectedPet.name} ({selectedPet.breed})
                        </span>
                      </div>
                    )}
                    {selectedVet && (
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-gray-500" />
                        <span>
                          Veterinário: {selectedVet.name} - {selectedVet.specialty}
                        </span>
                      </div>
                    )}
                    {appointmentData.type && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>Tipo: {appointmentData.type}</span>
                      </div>
                    )}
                    {appointmentData.date && appointmentData.time && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>
                          Data: {new Date(appointmentData.date).toLocaleDateString("pt-BR")} às {appointmentData.time}
                        </span>
                      </div>
                    )}
                    {appointmentData.location && (
                      <div className="flex items-center gap-2">
                        {appointmentData.location === "online" ? (
                          <Video className="w-4 h-4 text-gray-500" />
                        ) : (
                          <MapPin className="w-4 h-4 text-gray-500" />
                        )}
                        <span>Local: {appointmentData.location}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" className="flex-1 bg-transparent" asChild>
                <Link href="/appointments">Cancelar</Link>
              </Button>
              <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                Agendar Consulta
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
