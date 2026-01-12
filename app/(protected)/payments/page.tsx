"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CreditCard,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronLeft,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Receipt,
  Download
} from "lucide-react"
import Link from "next/link"

export default function PaymentsPage() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)

  const payments = [
    {
      id: "1",
      service: "Consulta Veterinária",
      pet: "Rex (Golden Retriever)",
      amount: 150.0,
      date: "Hoje, 14:00",
      status: "paid",
      method: "Visa • 1234",
    },
    {
      id: "2",
      service: "Cirurgia de Castração",
      pet: "Mimi (Gato Persa)",
      amount: 450.0,
      date: "14 Jan 2024",
      status: "pending",
      method: "PIX",
    },
    {
      id: "3",
      service: "Vacinação Múltipla",
      pet: "Rex (Golden Retriever)",
      amount: 120.0,
      date: "10 Jan 2024",
      status: "paid",
      method: "Débito",
    },
  ]

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
      case "pending":
        return "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
      case "overdue":
        return "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400"
      default:
        return "bg-slate-50 text-slate-600"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <Link href="/dashboard" className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm hover:translate-x-[-4px] transition-transform">
              <ChevronLeft className="w-4 h-4" /> VOLTAR AO DASHBOARD
            </Link>
            <h1 className="text-5xl font-black tracking-tight dark:text-white uppercase italic">Financeiro</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-md">Gerencie suas faturas, métodos de pagamento e acompanhe suas despesas de saúde pet.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-2xl h-14 px-8 font-black shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">
              <Download className="w-5 h-5 mr-2" /> EXPORTAR PDF
            </Button>
          </div>
        </div>

        {/* Summary Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
              <DollarSign className="w-20 h-20" />
            </div>
            <CardContent className="p-8">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl w-fit mb-6">
                <ArrowUpRight className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Gasto Mensal (Jan)</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-black text-slate-900 dark:text-white">R$ 270,00</h3>
                <Badge variant="outline" className="text-[10px] text-emerald-600 border-none bg-emerald-50 dark:bg-emerald-950/20 px-2">+R$ 45</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
              <Clock className="w-20 h-20" />
            </div>
            <CardContent className="p-8">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-2xl w-fit mb-6">
                <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pagamentos Pendentes</p>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white">R$ 450,00</h3>
              <p className="text-xs text-amber-500 font-bold mt-2 uppercase tracking-wide">Vence em 2 dias</p>
            </CardContent>
          </Card>

          <Card className="border-none bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-20 h-20" />
            </div>
            <CardContent className="p-8">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl w-fit mb-6">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <p className="text-[10px] font-black text-indigo-100 uppercase tracking-widest mb-1">Seguro Ativo</p>
              <h3 className="text-4xl font-black">Plano Premium</h3>
              <p className="text-xs text-indigo-100 mt-2 font-medium">Cobertura total Rex & Mimi</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content - History */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="border-none bg-white dark:bg-slate-900/50 shadow-xl dark:shadow-none overflow-hidden">
              <CardHeader className="p-8 border-b dark:border-slate-800 bg-white/50 dark:bg-slate-900 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-black uppercase tracking-tight">Histórico de Transações</CardTitle>
                  <CardDescription className="text-slate-500 font-medium">Todos os seus gastos com saúde animal.</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-emerald-600 font-black text-xs">VISUALIZAR TUDO</Button>
              </CardHeader>
              <CardContent className="p-0 divide-y dark:divide-slate-800">
                {payments.map((payment) => (
                  <div key={payment.id} className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <div className="flex items-center gap-6 w-full md:w-auto">
                      <div className="h-14 w-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Receipt className="w-6 h-6 text-slate-500" />
                      </div>
                      <div>
                        <h4 className="font-black text-lg text-slate-900 dark:text-white leading-tight">{payment.service}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{payment.pet}</p>
                          <span className="text-slate-300 dark:text-slate-700 font-thin">|</span>
                          <p className="text-xs text-slate-400 font-medium">{payment.date} • {payment.method}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-6">
                      <div className="text-right">
                        <p className="text-2xl font-black text-slate-900 dark:text-white">R$ {payment.amount.toFixed(2)}</p>
                        <Badge className={`${getStatusStyle(payment.status)} border-none mt-1 text-[10px] font-black uppercase tracking-widest`}>
                          {payment.status === "paid" ? "Liquidado" : "Pendente"}
                        </Badge>
                      </div>
                      {payment.status === "pending" ? (
                        <Button className="bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 px-6 h-12 rounded-xl font-black transition-all active:scale-95 shadow-lg">
                          PAGAR
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-slate-400 hover:text-emerald-600">
                          <Download className="w-5 h-5" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* SaaS Split View (Innovator Feature) */}
            <Card className="border-none bg-indigo-50 dark:bg-indigo-950/20 overflow-hidden">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-indigo-900 dark:text-indigo-400 font-black uppercase tracking-tight flex items-center gap-3 italic">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  Transparência de Repasse
                </CardTitle>
                <CardDescription className="text-indigo-700/60 dark:text-indigo-400/60 font-medium">Como seu pagamento de R$ 1.500,00 foi distribuído automaticamente.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Seu Investimento</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">R$ 1.500</p>
                    <div className="h-1 w-full bg-slate-100 dark:bg-slate-700 rounded-full mt-4 overflow-hidden">
                      <div className="h-full bg-slate-400 w-full"></div>
                    </div>
                  </div>
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border-l-4 border-emerald-500">
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Vet (70%)</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">R$ 1.050</p>
                    <div className="h-1 w-full bg-slate-100 dark:bg-slate-700 rounded-full mt-4 overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[70%]"></div>
                    </div>
                  </div>
                  <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border-l-4 border-blue-500">
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">Hospital (30%)</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">R$ 450</p>
                    <div className="h-1 w-full bg-slate-100 dark:bg-slate-700 rounded-full mt-4 overflow-hidden">
                      <div className="h-full bg-blue-500 w-[30%]"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 p-4 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-2xl flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                  O repasse foi liquidado via Smart Split na conta dos prestadores.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            {/* Payment Methods Card */}
            <Card className="border-none bg-white dark:bg-slate-900 shadow-xl dark:shadow-none overflow-hidden h-full">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-lg font-black uppercase tracking-tight">Meus Cartões</CardTitle>
                <CardDescription className="text-slate-500 font-medium">Gerencie suas fontes de pagamento.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-4 space-y-6">
                <div className="space-y-4">
                  <div className="p-6 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                      <CreditCard className="w-12 h-12" />
                    </div>
                    <div className="relative z-10">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Principal</p>
                      <p className="text-xl font-bold tracking-widest mb-6">•••• •••• •••• 1234</p>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Validade</p>
                          <p className="text-xs font-bold">12/26</p>
                        </div>
                        <p className="text-xs font-bold italic tracking-tighter">VISA</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group py-10">
                    <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Plus className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Adicionar Cartão</p>
                  </div>
                </div>

                <div className="pt-6 border-t dark:border-slate-800 space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Opções Rápidas</h4>
                  <Button variant="outline" className="w-full h-12 rounded-xl dark:border-slate-800 font-bold justify-start gap-4">
                    <div className="h-6 w-6 bg-emerald-500 flex items-center justify-center rounded text-[8px] font-black text-white">PIX</div>
                    Pagar via PIX
                  </Button>
                  <Button variant="outline" className="w-full h-12 rounded-xl dark:border-slate-800 font-bold justify-start gap-4">
                    <Download className="w-5 h-5 text-slate-400" />
                    Boletos em Aberto
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
