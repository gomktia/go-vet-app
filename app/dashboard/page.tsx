"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  Calendar,
  MessageCircle,
  Bell,
  Plus,
  Clock,
  Phone,
  Video,
  LogOut,
  Settings,
  CreditCard,
  Building2,
  Navigation,
} from "lucide-react"
import Link from "next/link"
import { getCurrentUser, logoutUser } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
    } else {
      setUser(currentUser)
    }
  }, [router])



  useEffect(() => {
    if (user?.role === "veterinarian") {
      router.push("/dashboard/vet")
    } else if (user?.role === "clinic") {
      router.push("/dashboard/clinic")
    } else if (user?.role === "admin") {
      router.push("/dashboard/admin")
    }
  }, [user, router])

  if (!user) {
    return <div>Carregando...</div>
  }

  // Mock data - será substituído por dados reais
  const pets = [
    { id: 1, name: "Rex", type: "Cão", breed: "Golden Retriever", age: "3 anos", avatar: "/golden-retriever.png" },
    { id: 2, name: "Mimi", type: "Gato", breed: "Persa", age: "2 anos", avatar: "/fluffy-persian-cat.png" },
  ]

  const appointments = [
    { id: 1, pet: "Rex", type: "Consulta", date: "Hoje, 14:00", vet: "Dr. Silva", status: "confirmado" },
    { id: 2, pet: "Mimi", type: "Vacina", date: "Amanhã, 10:30", vet: "Dra. Santos", status: "pendente" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}


      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-emerald-800 mb-2">Olá, {user.name ? user.name.split(" ")[0] : "Usuário"}!</h2>
          <p className="text-emerald-700">Bem-vindo de volta ao VetCare. Vamos cuidar dos seus pets hoje?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button className="h-20 flex-col gap-2 bg-emerald-600 hover:bg-emerald-700" asChild>
            <Link href="/chat">
              <MessageCircle className="w-6 h-6" />
              <span className="text-sm">Chat Veterinário</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
            asChild
          >
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
            <Link href="/pets/new">
              <Plus className="w-6 h-6" />
              <span className="text-sm">Novo Pet</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
            asChild
          >
            <Link href="/health-tips">
              <Heart className="w-6 h-6" />
              <span className="text-sm">Dicas Saúde</span>
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Próximos Agendamentos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  Próximos Agendamentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {appointment.type} - {appointment.pet}
                        </p>
                        <p className="text-sm text-gray-600">{appointment.vet}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {appointment.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={appointment.status === "confirmado" ? "default" : "secondary"}>
                        {appointment.status}
                      </Badge>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Video className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/appointments">Ver Todos os Agendamentos</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Chat Recente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  Conversas Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Avatar>
                      <AvatarImage src="/caring-vet.png" />
                      <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">Dr. Silva</p>
                      <p className="text-sm text-gray-600">Sobre a consulta do Rex...</p>
                    </div>
                    <Badge variant="secondary">2 min</Badge>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/chat">Abrir Chat</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Meus Pets */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-600" />
                    Meus Pets
                  </span>
                  <Button size="sm" variant="ghost" asChild>
                    <Link href="/pets/new">
                      <Plus className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pets.map((pet) => (
                  <div key={pet.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Avatar>
                      <AvatarImage src={pet.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{pet.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{pet.name}</p>
                      <p className="text-sm text-gray-600">
                        {pet.breed} • {pet.age}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/pets">Ver Todos</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Lembretes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-orange-600" />
                  Lembretes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm font-medium text-orange-800">Vacina do Rex</p>
                    <p className="text-xs text-orange-600">Vence em 3 dias</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Medicamento da Mimi</p>
                    <p className="text-xs text-blue-600">Hoje às 18:00</p>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/notifications">Ver Todas as Notificações</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  Pagamentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Último Pagamento</p>
                    <p className="text-xs text-green-600">R$ 150,00 - Consulta Rex</p>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/payments">Gerenciar Pagamentos</Link>
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
