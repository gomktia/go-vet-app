"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Users,
  MessageSquare,
  DollarSign,
  AlertTriangle,
  Stethoscope,
  Heart,
  Pill,
  Settings,
  BarChart3,
  Clock,
  MapPin,
  Phone,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function VetDashboard() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const todayAppointments = [
    {
      id: "1",
      time: "09:00",
      pet: "Max",
      owner: "Maria Silva",
      type: "Consulta de Rotina",
      status: "confirmed",
    },
    {
      id: "2",
      time: "10:30",
      pet: "Luna",
      owner: "João Santos",
      type: "Cirurgia",
      status: "in-progress",
    },
    {
      id: "3",
      time: "14:00",
      pet: "Rex",
      owner: "Ana Costa",
      type: "Vacinação",
      status: "pending",
    },
    {
      id: "4",
      time: "15:30",
      pet: "Mimi",
      owner: "Carlos Lima",
      type: "Exame",
      status: "confirmed",
    },
  ]

  const recentMessages = [
    {
      id: "1",
      from: "Maria Silva",
      pet: "Max",
      message: "Max está com pouco apetite desde ontem...",
      time: "10 min atrás",
      urgent: false,
    },
    {
      id: "2",
      from: "João Santos",
      pet: "Luna",
      message: "Emergência: Luna não consegue urinar!",
      time: "25 min atrás",
      urgent: true,
    },
    {
      id: "3",
      from: "Ana Costa",
      pet: "Rex",
      message: "Resultado do exame de sangue chegou?",
      time: "1 hora atrás",
      urgent: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado"
      case "in-progress":
        return "Em Andamento"
      case "pending":
        return "Pendente"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900">Dashboard Veterinário</h1>
            <p className="text-emerald-700">Bem-vindo, Dr. João Santos</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-100 bg-transparent"
              onClick={() => router.push("/dashboard/vet/settings")}
            >
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </Button>
            <Button
              variant="outline"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-100 bg-transparent"
              onClick={() => router.push("/dashboard/vet/reports")}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Relatórios
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Emergência
            </Button>
            <Link href="/appointments/new">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Calendar className="w-4 h-4 mr-2" />
                Nova Consulta
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link href="/appointments">
            <Card className="border-emerald-200 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-emerald-700">Consultas Hoje</CardTitle>
                <Calendar className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-900">8</div>
                <p className="text-xs text-emerald-600">+2 desde ontem</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/pets">
            <Card className="border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-700">Pacientes Ativos</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">156</div>
                <p className="text-xs text-blue-600">+12 este mês</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/chat">
            <Card className="border-purple-200 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-700">Mensagens</CardTitle>
                <MessageSquare className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">23</div>
                <p className="text-xs text-purple-600">5 não lidas</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/payments">
            <Card className="border-yellow-200 hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-700">Receita Mensal</CardTitle>
                <DollarSign className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-900">R$ 18.5k</div>
                <p className="text-xs text-yellow-600">+8% vs mês anterior</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <Card className="border-emerald-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-emerald-900">Agenda de Hoje</CardTitle>
                    <CardDescription>Seus compromissos para hoje, 15 de Janeiro</CardDescription>
                  </div>
                  <Link href="/appointments">
                    <Button variant="outline" size="sm" className="border-emerald-300 text-emerald-700 bg-transparent">
                      <Clock className="w-4 h-4 mr-2" />
                      Ver Agenda Completa
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border border-emerald-100 rounded-lg hover:bg-emerald-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-emerald-900">{appointment.time}</div>
                        </div>
                        <div>
                          <h3 className="font-medium text-emerald-900">{appointment.pet}</h3>
                          <p className="text-sm text-emerald-600">{appointment.owner}</p>
                          <p className="text-xs text-emerald-500">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(appointment.status)}>
                          {getStatusText(appointment.status)}
                        </Badge>
                        <Link href={`/appointments/${appointment.id}/edit`}>
                          <Button size="sm" variant="outline">
                            Ver Detalhes
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Messages & Quick Actions */}
          <div className="space-y-6">
            {/* Recent Messages */}
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900">Mensagens Recentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-shadow ${message.urgent ? "border-red-200 bg-red-50" : "border-emerald-100 bg-white"}`}
                    onClick={() => router.push(`/chat/${message.id}`)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-emerald-900">{message.from}</h4>
                      {message.urgent && <Badge className="bg-red-100 text-red-800">Urgente</Badge>}
                    </div>
                    <p className="text-sm text-emerald-600 mb-1">{message.pet}</p>
                    <p className="text-sm text-emerald-800">{message.message}</p>
                    <p className="text-xs text-emerald-500 mt-1">{message.time}</p>
                  </div>
                ))}
                <Link href="/chat">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Ver Todas as Mensagens</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/appointments/new">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Stethoscope className="w-4 h-4 mr-2" />
                    Nova Consulta
                  </Button>
                </Link>
                <Link href="/pets/new">
                  <Button
                    variant="outline"
                    className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-100 bg-transparent"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Cadastrar Paciente
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-100 bg-transparent"
                  onClick={() => router.push("/dashboard/vet/prescriptions")}
                >
                  <Pill className="w-4 h-4 mr-2" />
                  Prescrever Medicamento
                </Button>
                <Link href="/chat/new">
                  <Button
                    variant="outline"
                    className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-100 bg-transparent"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </Link>
                <Link href="/location">
                  <Button
                    variant="outline"
                    className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-100 bg-transparent"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Visitas Domiciliares
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-100 bg-transparent"
                  onClick={() => router.push("/chat/emergency")}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Atendimento Emergência
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
