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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 pb-20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard/vet">
            <Button variant="ghost" size="icon" className="rounded-full bg-white dark:bg-slate-900 shadow-sm border dark:border-slate-800">
              <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Painel de <span className="text-emerald-600 dark:text-emerald-400">Configurações</span></h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Personalize sua experiência e gerencie sua identidade profissional.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Settings Area */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="border-none shadow-xl dark:bg-slate-900/50 overflow-hidden">
              <div className="h-2 bg-emerald-500 w-full" />
              <CardHeader className="p-8">
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20">
                    <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  Informações Profissionais
                </CardTitle>
                <CardDescription className="dark:text-slate-400">Essas informações serão exibidas para tutores e no Marketplace.</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Nome Completo</Label>
                    <Input id="name" defaultValue="Dr. João Santos" className="rounded-xl border-slate-200 dark:border-slate-800 h-12 bg-white/50 dark:bg-slate-900/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="crmv" className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Número CRMV</Label>
                    <Input id="crmv" defaultValue="SP-12345" className="rounded-xl border-slate-200 dark:border-slate-800 h-12 bg-white/50 dark:bg-slate-900/50" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Email de Contato</Label>
                    <Input id="email" type="email" defaultValue="vet@vetcare.com" className="rounded-xl border-slate-200 dark:border-slate-800 h-12 bg-white/50 dark:bg-slate-900/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Telefone Profissional</Label>
                    <Input id="phone" defaultValue="(11) 99999-9999" className="rounded-xl border-slate-200 dark:border-slate-800 h-12 bg-white/50 dark:bg-slate-900/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialties" className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Especialidades (separadas por vírgula)</Label>
                  <Input id="specialties" defaultValue="Clínica Geral, Cirurgia, Dermatologia" className="rounded-xl border-slate-200 dark:border-slate-800 h-12 bg-white/50 dark:bg-slate-900/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Biografia Resumida</Label>
                  <Textarea
                    id="bio"
                    defaultValue="Veterinário com 10 anos de experiência em clínica geral e cirurgia de pequenos animais. Especialista em técnicas minimamente invasivas."
                    className="rounded-xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl dark:bg-slate-900/50">
              <CardHeader className="p-8">
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20">
                    <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  Disponibilidade Clínica
                </CardTitle>
                <CardDescription className="dark:text-slate-400">Gerencie seus horários de atendimento padrão.</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Início / Término</Label>
                    <div className="flex gap-4">
                      <Input id="start-time" type="time" defaultValue="08:00" className="rounded-xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 h-12" />
                      <Input id="end-time" type="time" defaultValue="18:00" className="rounded-xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Pausa de Almoço</Label>
                    <div className="flex gap-4">
                      <Input type="time" defaultValue="12:00" className="rounded-xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 h-12" />
                      <Input type="time" defaultValue="13:00" className="rounded-xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 h-12" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t dark:border-slate-800">
                  <Label className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Dias de Atendimento</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day) => (
                      <div key={day} className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                        <Label htmlFor={day.toLowerCase()} className="text-xs font-bold text-slate-600 dark:text-slate-300">
                          {day}
                        </Label>
                        <Switch id={day.toLowerCase()} defaultChecked={day !== "Domingo" && day !== "Sábado"} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Settings Area */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="border-none shadow-xl dark:bg-slate-900/50">
              <CardHeader className="p-8">
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                  <Bell className="w-5 h-5 text-indigo-500" /> Preferências
                </CardTitle>
                <CardDescription className="dark:text-slate-400 text-xs">Controle de notificações e privacidade.</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6">
                {[
                  { id: "email", l: "Notificações por Email", d: "Alertas de agendamento e financeiros." },
                  { id: "sms", l: "Alertas via SMS", d: "Apenas para casos urgentes." },
                  { id: "emerg", l: "Canal de Emergência", d: "Ativar chat 24h para pacientes VIP." }
                ].map(item => (
                  <div key={item.id} className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <Label htmlFor={item.id} className="text-sm font-bold text-slate-800 dark:text-white leading-none">{item.l}</Label>
                      <p className="text-[10px] text-slate-500 font-medium leading-tight">{item.d}</p>
                    </div>
                    <Switch id={item.id} defaultChecked />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl dark:bg-slate-900/50 bg-slate-900 text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <Shield className="w-20 h-20" />
              </div>
              <CardHeader className="p-8 relative z-10">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  Segurança
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs">Matenha sua conta protegida.</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6 relative z-10">
                <div className="space-y-2">
                  <Label htmlFor="new-pw" className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Alterar Senha</Label>
                  <Input id="new-pw" type="password" placeholder="Nova senha" className="rounded-xl border-slate-700 bg-slate-800 h-11 text-white placeholder:text-slate-500" />
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl h-12 shadow-lg shadow-emerald-500/10">Atualizar Senha</Button>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-[1.5rem] h-14 shadow-lg shadow-emerald-500/20">
                <Save className="w-5 h-5 mr-3" /> SALVAR ALTERAÇÕES
              </Button>
              <Button variant="ghost" className="w-full text-slate-400 hover:text-red-500 font-bold text-xs uppercase tracking-widest">
                Excluir Minha Conta Profissional
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
