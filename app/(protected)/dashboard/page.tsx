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
  Zap,
  Stethoscope,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { getCurrentUser, logoutUser } from "@/lib/auth"
import { useRouter } from "next/navigation"

import { PetHealthScore } from "@/components/dashboard/PetHealthScore"
import { PetHealthTimeline } from "@/components/dashboard/PetHealthTimeline"
import { PetWeightChart } from "@/components/dashboard/PetWeightChart"
import { IATriageChat } from "@/components/dashboard/IATriageChat"

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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  // Mock data
  const pets = [
    { id: 1, name: "Rex", type: "Cão", breed: "Golden Retriever", age: "3 anos", avatar: "/golden-retriever.png", healthScore: 92 },
    { id: 2, name: "Mimi", type: "Gato", breed: "Persa", age: "2 anos", avatar: "/fluffy-persian-cat.png", healthScore: 88 },
  ]

  const appointments = [
    { id: 1, pet: "Rex", type: "Consulta", date: "Hoje, 14:00", vet: "Dr. Silva", status: "confirmado" },
    { id: 2, pet: "Mimi", type: "Vacina", date: "Amanhã, 10:30", vet: "Dra. Santos", status: "pendente" },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
              Olá, <span className="text-emerald-600 dark:text-emerald-400">{user.name ? user.name.split(" ")[0] : "Usuário"}</span>!
            </h2>
            <p className="text-slate-500 dark:text-slate-400">Aqui está um resumo da saúde dos seus pets.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-full dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <Settings className="w-4 h-4 mr-2" /> Preferências
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-full shadow-lg shadow-emerald-600/20 px-6">
              <Plus className="w-4 h-4 mr-2" /> Agendar Consulta
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Health & Stats */}
          <div className="lg:col-span-8 space-y-8">
            {/* Highlights Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <PetHealthScore petName="Rex" score={92} lastUpdate="há 2 horas" />
              <PetWeightChart />
            </div>

            {/* Quick Actions Horizontal */}
            <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
              <Link href="/chat" className="flex-shrink-0 flex items-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 hover:border-emerald-500 transition-all group">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="font-bold text-sm dark:text-white">Chat Vet</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">IA + Doutor</p>
                </div>
              </Link>

              <Link href="/dashboard/marketplace" className="flex-shrink-0 flex items-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 hover:border-blue-500 transition-all group">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-bold text-sm dark:text-white">Clínicas</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Encontrar Rede</p>
                </div>
              </Link>

              <Link href="/appointments" className="flex-shrink-0 flex items-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 hover:border-amber-500 transition-all group">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="font-bold text-sm dark:text-white">Agendas</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Confirmadas</p>
                </div>
              </Link>

              <Link href="/health-tips" className="flex-shrink-0 flex items-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 hover:border-pink-500 transition-all group">
                <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-xl group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <p className="font-bold text-sm dark:text-white">Dicas</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Saúde & Bem-estar</p>
                </div>
              </Link>
            </div>

            {/* Próximos Agendamentos */}
            <Card className="dark:bg-slate-900/50 dark:border-slate-800 overflow-hidden border-none shadow-md">
              <CardHeader className="bg-white dark:bg-slate-900 border-b dark:border-slate-800">
                <CardTitle className="flex items-center justify-between text-lg font-bold dark:text-white">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    Próximos Agendamentos
                  </span>
                  <Button variant="ghost" size="sm" className="text-emerald-600 text-xs font-bold" asChild>
                    <Link href="/appointments">VER TODOS</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="divide-y dark:divide-slate-800 p-0">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl flex items-center justify-center">
                        <Stethoscope className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-bold dark:text-white leading-tight">
                          {appointment.type} - {appointment.pet}
                        </p>
                        <p className="text-xs text-slate-500 mb-1">{appointment.vet}</p>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold py-0 h-5">
                            {appointment.status.toUpperCase()}
                          </Badge>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold uppercase tracking-wider">
                            <Clock className="w-3 h-3" /> {appointment.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="outline" className="h-10 w-10 rounded-xl dark:border-slate-800">
                        <Phone className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </Button>
                      <Button size="icon" className="h-10 w-10 rounded-xl bg-blue-600 hover:bg-blue-700">
                        <Video className="w-4 h-4 text-white" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar Style */}
          <div className="lg:col-span-4 space-y-8">
            {/* Pet Health Timeline */}
            <PetHealthTimeline />

            {/* Meus Pets Preview */}
            <Card className="dark:bg-slate-900/50 dark:border-white/5 overflow-hidden border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400">Meus Amigos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pets.map((pet) => (
                  <div key={pet.id} className="flex items-center gap-4 group p-2 hover:bg-white dark:hover:bg-slate-800 rounded-2xl transition-all cursor-pointer">
                    <div className="relative">
                      <Avatar className="h-14 w-14 border-2 border-white dark:border-slate-800 shadow-sm transition-transform group-hover:scale-105">
                        <AvatarImage src={pet.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="font-bold">{pet.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white leading-none">{pet.healthScore}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 dark:text-white">{pet.name}</p>
                      <p className="text-xs text-slate-500">
                        {pet.breed} • {pet.age}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full text-slate-400 group-hover:text-emerald-500">
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-xs font-bold text-emerald-600 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/20" asChild>
                  <Link href="/pets">GERENCIAR TODOS OS PETS</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Lembretes / Financeiro Compact */}
            <div className="bg-indigo-600 dark:bg-indigo-800 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h4 className="text-2xl font-black mb-1">VetCare+</h4>
                <p className="text-indigo-100 text-sm mb-6 opacity-80">Cobertura total de saúde para seus pets em um único plano.</p>
                <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-bold rounded-2xl">
                  VER BENEFÍCIOS
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Triage Chatbot */}
      <IATriageChat />
    </div>
  )
}
