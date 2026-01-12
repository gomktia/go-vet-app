"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  TrendingUp,
  Video,
  Play,
  FileText,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { VetPerformanceChart } from "@/components/dashboard/VetPerformanceChart"

export default function VetDashboard() {
  const router = useRouter()

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
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Consultório <span className="text-emerald-600 dark:text-emerald-400">Digital</span></h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Sua central de pacientes, diagnósticos e produtividade.</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none rounded-full shadow-sm dark:border-slate-800 h-10 font-bold transition-all active:scale-95" asChild>
            <Link href="/dashboard/vet/settings">
              <Settings className="w-4 h-4 mr-2" /> Preferências
            </Link>
          </Button>
          <Button className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-full shadow-lg shadow-emerald-500/20 px-8 h-10 font-bold transition-all active:scale-95" asChild>
            <Link href="/dashboard/vet/reports">
              <BarChart3 className="w-4 h-4 mr-2" /> Relatórios
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* KPI Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-none shadow-md shadow-slate-200/50 dark:bg-slate-900/50">
              <CardContent className="p-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Agendados</p>
                <div className="flex items-end gap-2">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none">12</h3>
                  <Badge variant="outline" className="text-[9px] text-emerald-600 border-none p-0">+2</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md shadow-slate-200/50 dark:bg-slate-900/50">
              <CardContent className="p-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Financeiro</p>
                <div className="flex items-end gap-2">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none">R$ 1.8k</h3>
                  <Badge variant="outline" className="text-[9px] text-emerald-600 border-none p-0">85%</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md shadow-slate-200/50 dark:bg-slate-900/50">
              <CardContent className="p-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Pacientes</p>
                <div className="flex items-end gap-2">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none">156</h3>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md shadow-slate-200/50 dark:bg-slate-900/50 bg-indigo-600 text-white">
              <CardContent className="p-4">
                <p className="text-[10px] font-black text-indigo-100 uppercase tracking-widest mb-2 font-mono">Chat Emergência</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black leading-none">3</h3>
                  <div className="h-2 w-2 rounded-full bg-red-400 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <VetPerformanceChart />
            <Card className="border-none shadow-lg dark:bg-indigo-900 bg-indigo-600 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-24 h-24" />
              </div>
              <CardContent className="p-6 relative z-10">
                <h3 className="text-xl font-black mb-1">Qualidade do Cuidado</h3>
                <p className="text-indigo-100 text-xs mb-4">Seu Patient Score está acima da média da plataforma.</p>
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <Avatar key={i} className="border-2 border-indigo-600 h-8 w-8">
                        <AvatarFallback className="bg-white text-indigo-600 text-[10px]">P</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-indigo-100">+48 Tutores Satisfeitos</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Schedule - Refactored */}
          <Card className="border-none shadow-xl dark:bg-slate-900/50 overflow-hidden">
            <CardHeader className="bg-slate-50 dark:bg-slate-900/80 border-b dark:border-slate-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-black dark:text-white uppercase tracking-tight">Agenda de Hoje</CardTitle>
                  <p className="text-slate-500 text-xs font-medium">Você tem 4 compromissos restantes.</p>
                </div>
                <Link href="/appointments">
                  <Button variant="ghost" size="sm" className="text-emerald-600 font-black text-xs">VER TUDO</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0 divide-y dark:divide-slate-800">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm font-black text-slate-400 group-hover:text-emerald-600 transition-colors">{appointment.time}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white">{appointment.pet}</h4>
                      <p className="text-xs text-slate-500">{appointment.owner} • {appointment.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={`${getStatusColor(appointment.status)} text-[10px] font-bold border-none px-3 py-1 uppercase`}>
                      {appointment.status.replace('-', ' ')}
                    </Badge>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/dashboard/telemedicine`}>
                        <Button size="icon" variant="ghost" className="h-9 w-9 bg-blue-600 hover:bg-blue-700 rounded-xl">
                          <Video className="w-4 h-4 text-white" />
                        </Button>
                      </Link>
                      <Button size="icon" variant="outline" className="h-9 w-9 rounded-xl dark:border-slate-800">
                        <FileText className="w-4 h-4 text-slate-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-8">
          {/* Telemedicine CTA */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <h3 className="text-2xl font-black mb-4">Sala de Espera</h3>
            <p className="text-slate-400 text-xs mb-6 leading-relaxed">3 pacientes aguardando agendamento por telemedicina.</p>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 font-black rounded-2xl h-12 shadow-lg shadow-emerald-500/20 group transition-all active:scale-[0.98]" asChild>
              <Link href="/dashboard/telemedicine">
                <Play className="w-4 h-4 mr-2 fill-current" /> INICIAR CHAMADA
              </Link>
            </Button>
          </div>

          {/* Task List */}
          <Card className="border-none shadow-lg dark:bg-slate-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest">Tarefas Diagnósticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { t: "Revisar Exame Rex", p: "Urgente", done: false },
                { t: "Assinar Prescrição Mimi", p: "Hoje", done: true },
                { t: "Follow-up Max", p: "Pendente", done: false }
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className={`h-5 w-5 rounded-md border-2 flex items-center justify-center ${task.done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                      {task.done && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${task.done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white'}`}>{task.t}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{task.p}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-[10px] font-black text-slate-400 hover:text-emerald-600">ADICIONAR TAREFA</Button>
            </CardContent>
          </Card>

          {/* Emergency Messages */}
          <Card className="border-none shadow-lg dark:bg-slate-900/50 bg-red-50/50 dark:bg-red-950/10">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-black text-red-600 uppercase tracking-widest">Urgências</CardTitle>
              <div className="h-2 w-2 rounded-full bg-red-600 animate-ping"></div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMessages.filter(m => m.urgent).map(m => (
                <div key={m.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-l-4 border-red-600 shadow-sm cursor-pointer hover:scale-[1.02] transition-transform">
                  <p className="text-xs font-black text-slate-900 dark:text-white">{m.from} <span className="text-red-600">({m.pet})</span></p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{m.message}</p>
                  <p className="text-[9px] text-slate-400 mt-2 font-bold uppercase">{m.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
