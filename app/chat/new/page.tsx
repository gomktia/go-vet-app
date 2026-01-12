"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, MessageCircle, Star, Clock } from "lucide-react"
import Link from "next/link"

export default function NewChatPage() {
  const [selectedPet, setSelectedPet] = useState("")
  const [selectedVet, setSelectedVet] = useState("")
  const [urgency, setUrgency] = useState("")
  const [description, setDescription] = useState("")

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
      responseTime: "~5 min",
      online: true,
      price: "R$ 80",
    },
    {
      id: "2",
      name: "Dra. Santos",
      specialty: "Dermatologia",
      avatar: "/caring-vet.png",
      rating: 4.8,
      responseTime: "~10 min",
      online: true,
      price: "R$ 120",
    },
    {
      id: "3",
      name: "Dr. Costa",
      specialty: "Cirurgia",
      avatar: "/caring-vet.png",
      rating: 4.9,
      responseTime: "~15 min",
      online: false,
      price: "R$ 150",
    },
    {
      id: "4",
      name: "Dra. Lima",
      specialty: "Emergência 24h",
      avatar: "/caring-vet.png",
      rating: 4.7,
      responseTime: "~2 min",
      online: true,
      price: "R$ 200",
    },
  ]

  const handleStartChat = () => {
    if (selectedPet && selectedVet) {
      // TODO: Implementar início da conversa
      console.log("Starting chat:", { selectedPet, selectedVet, urgency, description })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/chat">
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
            <h2 className="text-3xl font-bold text-emerald-800 mb-2">Nova Conversa</h2>
            <p className="text-emerald-700">Conecte-se com um veterinário qualificado</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pet Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Selecionar Pet</CardTitle>
                  <CardDescription>Qual pet precisa de atendimento?</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {pets.map((pet) => (
                      <div
                        key={pet.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          selectedPet === pet.id
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-emerald-300"
                        }`}
                        onClick={() => setSelectedPet(pet.id)}
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

              {/* Urgency Level */}
              <Card>
                <CardHeader>
                  <CardTitle>Nível de Urgência</CardTitle>
                  <CardDescription>Isso nos ajuda a priorizar seu atendimento</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível de urgência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">Baixa - Dúvida geral ou consulta de rotina</SelectItem>
                      <SelectItem value="media">Média - Sintomas leves, não urgente</SelectItem>
                      <SelectItem value="alta">Alta - Sintomas preocupantes</SelectItem>
                      <SelectItem value="emergencia">Emergência - Situação crítica</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Descreva a Situação</CardTitle>
                  <CardDescription>Conte-nos o que está acontecendo com seu pet</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="description">Sintomas ou dúvidas</Label>
                    <Textarea
                      id="description"
                      placeholder="Ex: Meu pet está com tosse há 2 dias, não quer comer..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Veterinarians Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Escolher Veterinário</CardTitle>
                  <CardDescription>Selecione o profissional ideal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {veterinarians.map((vet) => (
                    <div
                      key={vet.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedVet === vet.id
                          ? "border-blue-500 bg-blue-50"
                          : vet.online
                            ? "border-gray-200 hover:border-blue-300"
                            : "border-gray-100 bg-gray-50 cursor-not-allowed"
                      }`}
                      onClick={() => vet.online && setSelectedVet(vet.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={vet.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{vet.name[0]}</AvatarFallback>
                          </Avatar>
                          {vet.online && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{vet.name}</h4>
                            <Badge variant={vet.online ? "default" : "secondary"}>
                              {vet.online ? "Online" : "Offline"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{vet.specialty}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              {vet.rating}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {vet.responseTime}
                            </div>
                            <div className="font-medium text-emerald-600">{vet.price}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Start Chat Button */}
              <Button
                onClick={handleStartChat}
                disabled={!selectedPet || !selectedVet}
                className="w-full bg-emerald-600 hover:bg-emerald-700 h-12"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Iniciar Conversa
              </Button>

              {selectedPet && selectedVet && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Resumo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Pet:</span>
                      <span>{pets.find((p) => p.id === selectedPet)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Veterinário:</span>
                      <span>{veterinarians.find((v) => v.id === selectedVet)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Valor:</span>
                      <span className="font-medium text-emerald-600">
                        {veterinarians.find((v) => v.id === selectedVet)?.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
