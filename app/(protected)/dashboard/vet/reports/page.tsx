"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, TrendingUp, Calendar, DollarSign, Users, Activity } from "lucide-react"
import Link from "next/link"

export default function VetReports() {
  const monthlyStats = [
    { month: "Jan", consultations: 45, revenue: 8500 },
    { month: "Fev", consultations: 52, revenue: 9200 },
    { month: "Mar", consultations: 48, revenue: 8800 },
    { month: "Abr", consultations: 61, revenue: 11200 },
    { month: "Mai", consultations: 58, revenue: 10500 },
    { month: "Jun", consultations: 65, revenue: 12300 },
  ]

  const topTreatments = [
    { name: "Vacinação", count: 156, percentage: 28 },
    { name: "Consulta Geral", count: 134, percentage: 24 },
    { name: "Cirurgia", count: 89, percentage: 16 },
    { name: "Exames", count: 78, percentage: 14 },
    { name: "Emergência", count: 45, percentage: 8 },
    { name: "Outros", count: 56, percentage: 10 },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link href="/dashboard/vet">
              <Button variant="ghost" size="icon" className="rounded-full bg-white dark:bg-slate-900 shadow-sm border dark:border-slate-800">
                <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Relatórios de <span className="text-emerald-600 dark:text-emerald-400">Desempenho</span></h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Insights detalhados da sua prática veterinária.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-full dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm px-6">
              Filtros Avançados
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-full shadow-lg shadow-emerald-500/20 px-8">
              <Download className="w-4 h-4 mr-2" /> Exportar Dados
            </Button>
          </div>
        </div>

        {/* High-Level KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Consultas", val: "389", trend: "+12%", color: "emerald", icon: Calendar },
            { label: "Receita", val: "R$ 60.5k", trend: "+18%", color: "blue", icon: DollarSign },
            { label: "Novos Tutores", val: "47", trend: "+8%", color: "purple", icon: Users },
            { label: "Satisfação", val: "96%", trend: "+2%", color: "orange", icon: Activity }
          ].map((kpi, i) => {
            const Icon = kpi.icon
            return (
              <Card key={i} className="border-none shadow-lg shadow-slate-200/50 dark:shadow-none dark:bg-slate-900/50 overflow-hidden group">
                <CardContent className="p-6 relative">
                  <div className={`absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-500 text-${kpi.color}-600`}>
                    <Icon className="w-24 h-24" />
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-xl bg-${kpi.color}-50 dark:bg-${kpi.color}-950/20`}>
                      <Icon className={`w-5 h-5 text-${kpi.color}-600 dark:text-${kpi.color}-400`} />
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border-none font-bold text-[10px]">{kpi.trend}</Badge>
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                  <h3 className="text-3xl font-black text-slate-800 dark:text-white leading-none">{kpi.val}</h3>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Timeline */}
          <Card className="border-none shadow-xl dark:bg-slate-900/50">
            <CardHeader className="p-8">
              <CardTitle className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-emerald-500" /> Histórico Semestral
              </CardTitle>
              <CardDescription className="dark:text-slate-400 font-medium">Evolução de atendimento e faturamento bruto</CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-4">
                {monthlyStats.map((stat) => (
                  <div key={stat.month} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700 shadow-sm hover:shadow-md cursor-default group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-slate-900 dark:text-white font-black text-sm shadow-sm">
                        {stat.month}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-white">{stat.consultations} consultas</p>
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">R$ {stat.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-1000 group-hover:bg-emerald-400"
                        style={{ width: `${(stat.consultations / 70) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Treatment Distribution */}
          <Card className="border-none shadow-xl dark:bg-slate-900/50">
            <CardHeader className="p-8">
              <CardTitle className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Activity className="w-6 h-6 text-blue-500" /> Especialidades
              </CardTitle>
              <CardDescription className="dark:text-slate-400 font-medium">Principais motivos de atendimento na clínica</CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-6">
                {topTreatments.map((treatment, index) => (
                  <div key={treatment.name} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-slate-700 dark:text-slate-300">{treatment.name}</span>
                      <span className="text-xs font-black text-slate-500">{treatment.count} atendimentos</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000`}
                          style={{ width: `${treatment.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 min-w-[3rem] text-right">{treatment.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-blue-600 rounded-[2rem] text-white relative overflow-hidden group shadow-lg shadow-blue-600/20">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
                <h4 className="text-lg font-black mb-1 leading-none relative z-10">Análise de IA VetCare</h4>
                <p className="text-blue-50 text-xs font-medium relative z-10">Identificamos um aumento de 15% na demanda por Cirurgia Ortopédica nas quartas-feiras.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Generation Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { t: "Relatório Financeiro", d: "DRE, Fluxo de Caixa e Repasses" },
            { t: "Relatório de Pacientes", d: "Demografia e Frequência Clínica" },
            { t: "Inventário Clínico", d: "Consumo de Médicamentos e Materiais" }
          ].map((report, i) => (
            <Card key={i} className="border-none shadow-md hover:shadow-xl transition-all dark:bg-slate-900/50 group cursor-default">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-800 dark:text-white">{report.t}</CardTitle>
                <CardDescription className="dark:text-slate-400 font-medium">{report.d}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-emerald-200 group-hover:scale-[1.02] transition-all">
                  <Download className="w-4 h-4 mr-2" /> Gerar Relatório
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
