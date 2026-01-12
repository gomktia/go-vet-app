"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Calendar, MessageSquare, Heart, Pill, Stethoscope, CreditCard, Settings } from "lucide-react"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "appointment",
      title: "Consulta Agendada",
      message: "Consulta com Dr. Silva para Max amanhã às 14:00",
      time: "2 horas atrás",
      read: false,
      icon: Calendar,
    },
    {
      id: "2",
      type: "medication",
      title: "Hora do Medicamento",
      message: "Dar antibiótico para Luna - 2 comprimidos",
      time: "4 horas atrás",
      read: false,
      icon: Pill,
    },
    {
      id: "3",
      type: "message",
      title: "Nova Mensagem",
      message: "Dr. Silva enviou uma mensagem sobre o exame de Rex",
      time: "6 horas atrás",
      read: true,
      icon: MessageSquare,
    },
    {
      id: "4",
      type: "vaccination",
      title: "Vacina Vencendo",
      message: "Vacina antirrábica de Max vence em 3 dias",
      time: "1 dia atrás",
      read: true,
      icon: Heart,
    },
    {
      id: "5",
      type: "payment",
      title: "Pagamento Processado",
      message: "Pagamento de R$ 150,00 foi aprovado",
      time: "2 dias atrás",
      read: true,
      icon: CreditCard,
    },
  ])

  const [settings, setSettings] = useState({
    appointments: true,
    medications: true,
    messages: true,
    vaccinations: true,
    payments: false,
    emergencies: true,
    promotions: false,
  })

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "appointment":
        return "bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
      case "medication":
        return "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
      case "message":
        return "bg-purple-100 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400"
      case "vaccination":
        return "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400"
      case "payment":
        return "bg-amber-100 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 pb-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Central de <span className="text-emerald-600 dark:text-emerald-400">Notificações</span></h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
              {unreadCount > 0 ? `Você possui ${unreadCount} alertas pendentes de leitura.` : "Seu mural de notificações está atualizado."}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-full dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
              Limpar Todas
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-full shadow-lg shadow-emerald-500/20 px-8">
              <Settings className="w-4 h-4 mr-2" /> Preferências
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Notifications List */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="border-none shadow-xl dark:bg-slate-900/50 overflow-hidden">
              <CardHeader className="p-8 border-b dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                  <Bell className="w-6 h-6 text-emerald-500" /> Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y dark:divide-slate-800">
                  {notifications.map((notification) => {
                    const IconComponent = notification.icon
                    return (
                      <div
                        key={notification.id}
                        className={`p-6 transition-all cursor-pointer group hover:bg-slate-50 dark:hover:bg-slate-800/50 ${!notification.read ? "bg-emerald-50/30 dark:bg-emerald-950/10" : "bg-white dark:bg-transparent"
                          }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-6">
                          <div className={`p-3 rounded-2xl shadow-sm ${getTypeStyle(notification.type)}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className={`font-bold ${!notification.read ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
                                {notification.title}
                              </h3>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{notification.time}</span>
                            </div>
                            <p className={`text-sm leading-relaxed ${!notification.read ? "text-slate-800 dark:text-slate-200" : "text-slate-500 dark:text-slate-400 font-medium"}`}>
                              {notification.message}
                            </p>
                            {!notification.read && (
                              <div className="mt-3 flex gap-2">
                                <Badge className="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 border-none text-[9px] font-black px-2 py-0.5">URGENTE</Badge>
                                <button className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase hover:underline">Marcar como lida</button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Configuration Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="border-none shadow-xl dark:bg-slate-900/50">
              <CardHeader className="p-8">
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-white">Filtros</CardTitle>
                <CardDescription className="dark:text-slate-400">Quais tipos de alertas você deseja ver.</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6">
                {[
                  { id: "appointments", l: "Agendamentos", c: settings.appointments },
                  { id: "medications", l: "Medicamentos", c: settings.medications },
                  { id: "messages", l: "Mensagens", c: settings.messages },
                  { id: "vaccinations", l: "Hospitalar", c: settings.vaccinations },
                  { id: "payments", l: "Financeiro", c: settings.payments }
                ].map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all">
                    <Label htmlFor={item.id} className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      {item.l}
                    </Label>
                    <Switch
                      id={item.id}
                      checked={item.c}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, [item.id]: checked }))}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-slate-900 text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <Stethoscope className="w-20 h-20" />
              </div>
              <CardHeader className="p-8 relative z-10">
                <CardTitle className="text-lg font-bold">Assistência Direta</CardTitle>
                <CardDescription className="text-slate-400 text-xs">Precisa de ajuda urgente?</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-3 relative z-10">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl h-12 shadow-lg">
                  EMERGÊNCIA 24H
                </Button>
                <Button variant="ghost" className="w-full text-slate-400 hover:text-white text-[10px] font-black uppercase">
                  Falar com Suporte
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
