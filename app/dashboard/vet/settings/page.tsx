"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, User, Bell, Shield, Calendar } from "lucide-react"
import Link from "next/link"

export default function VetSettings() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/vet">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-emerald-900">Configurações</h1>
            <p className="text-emerald-700">Gerencie suas preferências e informações do perfil</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informações Pessoais
                </CardTitle>
                <CardDescription>Atualize suas informações profissionais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" defaultValue="Dr. João Santos" />
                  </div>
                  <div>
                    <Label htmlFor="crmv">CRMV</Label>
                    <Input id="crmv" defaultValue="SP-12345" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="vet@vetcare.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" defaultValue="(11) 99999-9999" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="specialties">Especialidades</Label>
                  <Input id="specialties" defaultValue="Clínica Geral, Cirurgia, Dermatologia" />
                </div>
                <div>
                  <Label htmlFor="bio">Biografia Profissional</Label>
                  <Textarea
                    id="bio"
                    defaultValue="Veterinário com 10 anos de experiência em clínica geral e cirurgia de pequenos animais."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Horários de Atendimento
                </CardTitle>
                <CardDescription>Configure seus horários disponíveis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-time">Horário de Início</Label>
                    <Input id="start-time" type="time" defaultValue="08:00" />
                  </div>
                  <div>
                    <Label htmlFor="end-time">Horário de Término</Label>
                    <Input id="end-time" type="time" defaultValue="18:00" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="lunch-break">Horário de Almoço</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="time" defaultValue="12:00" placeholder="Início" />
                    <Input type="time" defaultValue="13:00" placeholder="Fim" />
                  </div>
                </div>
                <div>
                  <Label>Dias de Trabalho</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Switch id={day.toLowerCase()} defaultChecked={day !== "Domingo"} />
                        <Label htmlFor={day.toLowerCase()} className="text-sm">
                          {day}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notification & Security Settings */}
          <div className="space-y-6">
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900 flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notificações
                </CardTitle>
                <CardDescription>Configure suas preferências de notificação</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email</Label>
                    <p className="text-sm text-emerald-600">Receber notificações por email</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notifications">SMS</Label>
                    <p className="text-sm text-emerald-600">Receber notificações por SMS</p>
                  </div>
                  <Switch id="sms-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emergency-notifications">Emergências</Label>
                    <p className="text-sm text-emerald-600">Notificações de emergência 24h</p>
                  </div>
                  <Switch id="emergency-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="appointment-reminders">Lembretes</Label>
                    <p className="text-sm text-emerald-600">Lembretes de consultas</p>
                  </div>
                  <Switch id="appointment-reminders" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Segurança
                </CardTitle>
                <CardDescription>Configurações de segurança da conta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Senha Atual</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Alterar Senha</Button>
              </CardContent>
            </Card>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
