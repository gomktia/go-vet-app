"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Phone, MessageCircle, AlertTriangle, Clock } from "lucide-react"
import Link from "next/link"

export default function EmergencyChatPage() {
  // Mock data - será substituído por dados reais do banco
  const emergencyVets = [
    {
      id: "1",
      name: "Dra. Lima",
      specialty: "Emergência Veterinária",
      avatar: "/caring-vet.png",
      online: true,
      responseTime: "Imediato",
      experience: "15 anos",
    },
    {
      id: "2",
      name: "Dr. Mendes",
      specialty: "Medicina Intensiva",
      avatar: "/caring-vet.png",
      online: true,
      responseTime: "< 2 min",
      experience: "12 anos",
    },
  ]

  const emergencyTips = [
    "Mantenha seu pet calmo e em local seguro",
    "Não dê medicamentos sem orientação veterinária",
    "Observe e anote os sintomas apresentados",
    "Tenha em mãos informações sobre peso e idade do pet",
    "Se possível, tire fotos ou vídeos dos sintomas",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <header className="bg-red-600 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-white hover:bg-red-700" asChild>
              <Link href="/chat">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
              <h1 className="text-xl font-bold">VetCare Emergência</h1>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white text-red-600">
            24h Disponível
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Emergency Alert */}
        <Card className="border-red-200 bg-red-50 mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Atendimento de Emergência 24h</h3>
                <p className="text-red-700 mb-4">
                  Se seu pet está em situação crítica, conecte-se imediatamente com nossos veterinários de plantão.
                  Atendimento prioritário garantido.
                </p>
                <div className="flex gap-2">
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Ligar Agora
                  </Button>
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat Emergência
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Emergency Veterinarians */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  Veterinários de Plantão
                </CardTitle>
                <CardDescription>Profissionais especializados em emergências disponíveis agora</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {emergencyVets.map((vet) => (
                  <div key={vet.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={vet.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{vet.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="font-semibold">{vet.name}</h4>
                          <p className="text-sm text-gray-600">{vet.specialty}</p>
                          <p className="text-xs text-gray-500">{vet.experience} de experiência</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800 mb-2">Online</Badge>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {vet.responseTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-red-600 hover:bg-red-700" asChild>
                        <Link href={`/chat/${vet.id}?emergency=true`}>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Chat Emergência
                        </Link>
                      </Button>
                      <Button variant="outline" className="bg-transparent">
                        <Phone className="w-4 h-4 mr-2" />
                        Ligar
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Emergency Tips */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dicas de Emergência</CardTitle>
                <CardDescription>Enquanto aguarda o atendimento</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {emergencyTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800">Situações Críticas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-orange-700 mb-4">
                  Se seu pet apresenta algum destes sintomas, procure atendimento imediatamente:
                </p>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Dificuldade para respirar</li>
                  <li>• Sangramento intenso</li>
                  <li>• Convulsões</li>
                  <li>• Perda de consciência</li>
                  <li>• Intoxicação</li>
                  <li>• Trauma grave</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contato de Emergência</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-2xl font-bold text-red-600">(11) 9999-0000</div>
                  <p className="text-sm text-gray-600">Linha direta 24h para emergências</p>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Ligar Agora
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
