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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "bg-blue-100 text-blue-800"
      case "medication":
        return "bg-green-100 text-green-800"
      case "message":
        return "bg-purple-100 text-purple-800"
      case "vaccination":
        return "bg-red-100 text-red-800"
      case "payment":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900">Notificações</h1>
            <p className="text-emerald-700">
              {unreadCount > 0 ? `${unreadCount} notificações não lidas` : "Todas as notificações foram lidas"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
              Marcar Todas como Lidas
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notifications List */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900 flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notificações Recentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notification) => {
                  const IconComponent = notification.icon
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                        notification.read
                          ? "border-emerald-100 bg-white hover:bg-emerald-50"
                          : "border-emerald-200 bg-emerald-50 hover:bg-emerald-100"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3
                              className={`font-medium ${notification.read ? "text-emerald-700" : "text-emerald-900"}`}
                            >
                              {notification.title}
                            </h3>
                            {!notification.read && <Badge className="bg-emerald-600 text-white">Nova</Badge>}
                          </div>
                          <p className={`text-sm ${notification.read ? "text-emerald-600" : "text-emerald-800"}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-emerald-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Notification Settings */}
          <div className="space-y-4">
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900">Configurações</CardTitle>
                <CardDescription>Personalize suas notificações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="appointments" className="text-emerald-700">
                    Agendamentos
                  </Label>
                  <Switch
                    id="appointments"
                    checked={settings.appointments}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, appointments: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="medications" className="text-emerald-700">
                    Medicamentos
                  </Label>
                  <Switch
                    id="medications"
                    checked={settings.medications}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, medications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="messages" className="text-emerald-700">
                    Mensagens
                  </Label>
                  <Switch
                    id="messages"
                    checked={settings.messages}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, messages: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="vaccinations" className="text-emerald-700">
                    Vacinações
                  </Label>
                  <Switch
                    id="vaccinations"
                    checked={settings.vaccinations}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, vaccinations: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="payments" className="text-emerald-700">
                    Pagamentos
                  </Label>
                  <Switch
                    id="payments"
                    checked={settings.payments}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, payments: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="emergencies" className="text-emerald-700">
                    Emergências
                  </Label>
                  <Switch
                    id="emergencies"
                    checked={settings.emergencies}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, emergencies: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="promotions" className="text-emerald-700">
                    Promoções
                  </Label>
                  <Switch
                    id="promotions"
                    checked={settings.promotions}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, promotions: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar Consulta
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-100 bg-transparent"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Conversar com Vet
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-100 bg-transparent"
                >
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Emergência 24h
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
