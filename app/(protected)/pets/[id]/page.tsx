"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  ArrowLeft,
  Edit,
  Calendar,
  FileText,
  Syringe,
  Pill,
  Activity,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

export default function PetProfilePage({ params }: { params: { id: string } }) {
  // Mock data - será substituído por dados reais do banco
  const pet = {
    id: params.id,
    name: "Rex",
    type: "Cão",
    breed: "Golden Retriever",
    age: "3 anos",
    birthDate: "15/03/2021",
    weight: "28 kg",
    color: "Dourado",
    gender: "Macho",
    microchip: "123456789012345",
    avatar: "/golden-retriever.png",
    status: "Saudável",
    observations: "Pet muito dócil e brincalhão. Gosta de nadar e correr no parque.",
  }

  const consultations = [
    {
      id: 1,
      date: "15/03/2024",
      vet: "Dr. Silva",
      type: "Consulta de rotina",
      diagnosis: "Pet saudável",
      treatment: "Manter cuidados atuais",
    },
    {
      id: 2,
      date: "10/01/2024",
      vet: "Dra. Santos",
      type: "Vacinação",
      diagnosis: "Aplicação de vacinas anuais",
      treatment: "Observar por 24h",
    },
  ]

  const vaccines = [
    { name: "V10", date: "10/01/2024", nextDate: "10/01/2025", status: "Em dia" },
    { name: "Antirrábica", date: "10/01/2024", nextDate: "10/01/2025", status: "Em dia" },
    { name: "Giárdia", date: "15/03/2023", nextDate: "15/03/2024", status: "Vencida" },
  ]

  const medications = [
    { name: "Antipulgas", dosage: "1 comprimido", frequency: "Mensal", lastGiven: "01/03/2024" },
    { name: "Vermífugo", dosage: "2ml", frequency: "Trimestral", lastGiven: "15/01/2024" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/pets">
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
          <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
            <Link href={`/pets/${pet.id}/edit`}>
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Pet Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="w-32 h-32 mx-auto md:mx-0">
                <AvatarImage src={pet.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">{pet.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h2 className="text-3xl font-bold text-emerald-800">{pet.name}</h2>
                  <Badge
                    variant={pet.status === "Saudável" ? "default" : "secondary"}
                    className="w-fit mx-auto md:mx-0"
                  >
                    {pet.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Raça</p>
                    <p className="font-medium">{pet.breed}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Idade</p>
                    <p className="font-medium">{pet.age}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Peso</p>
                    <p className="font-medium">{pet.weight}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Sexo</p>
                    <p className="font-medium">{pet.gender}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button className="h-20 flex-col gap-2 bg-emerald-600 hover:bg-emerald-700" asChild>
            <Link href="/appointments/new">
              <Calendar className="w-6 h-6" />
              <span className="text-sm">Agendar</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
            asChild
          >
            <Link href="/chat">
              <MessageCircle className="w-6 h-6" />
              <span className="text-sm">Chat Vet</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
            asChild
          >
            <Link href="/home-visit">
              <MapPin className="w-6 h-6" />
              <span className="text-sm">Visita</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
            asChild
          >
            <Link href="/emergency">
              <Phone className="w-6 h-6" />
              <span className="text-sm">Emergência</span>
            </Link>
          </Button>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="info" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="vaccines">Vacinas</TabsTrigger>
            <TabsTrigger value="medications">Medicamentos</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  Informações Gerais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Data de Nascimento</p>
                    <p className="font-medium">{pet.birthDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Cor</p>
                    <p className="font-medium">{pet.color}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Microchip</p>
                    <p className="font-medium">{pet.microchip}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tipo</p>
                    <p className="font-medium">{pet.type}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Observações</p>
                  <p className="text-sm bg-gray-50 p-3 rounded-lg">{pet.observations}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Histórico de Consultas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {consultations.map((consultation) => (
                  <div key={consultation.id} className="border-l-4 border-emerald-200 pl-4 py-2">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{consultation.type}</h4>
                      <span className="text-sm text-gray-500">{consultation.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Veterinário:</strong> {consultation.vet}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Diagnóstico:</strong> {consultation.diagnosis}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Tratamento:</strong> {consultation.treatment}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vaccines" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Syringe className="w-5 h-5 text-green-600" />
                  Carteira de Vacinação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {vaccines.map((vaccine, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{vaccine.name}</h4>
                      <p className="text-sm text-gray-600">Última aplicação: {vaccine.date}</p>
                      <p className="text-sm text-gray-600">Próxima: {vaccine.nextDate}</p>
                    </div>
                    <Badge variant={vaccine.status === "Em dia" ? "default" : "destructive"}>{vaccine.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="w-5 h-5 text-purple-600" />
                  Medicamentos e Tratamentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {medications.map((medication, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">{medication.name}</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Dosagem</p>
                        <p className="font-medium">{medication.dosage}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Frequência</p>
                        <p className="font-medium">{medication.frequency}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-600">Última administração</p>
                        <p className="font-medium">{medication.lastGiven}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
