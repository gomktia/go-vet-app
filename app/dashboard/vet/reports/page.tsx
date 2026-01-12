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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/vet">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-emerald-900">Relatórios</h1>
              <p className="text-emerald-700">Análise de desempenho e estatísticas</p>
            </div>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-emerald-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-700">Total de Consultas</CardTitle>
              <Calendar className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-900">389</div>
              <div className="flex items-center text-xs text-emerald-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% vs mês anterior
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">R$ 60.5k</div>
              <div className="flex items-center text-xs text-blue-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +18% vs mês anterior
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Novos Pacientes</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">47</div>
              <div className="flex items-center text-xs text-purple-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8% vs mês anterior
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">Taxa de Satisfação</CardTitle>
              <Activity className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-900">96%</div>
              <div className="flex items-center text-xs text-yellow-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +2% vs mês anterior
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Performance */}
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-900">Desempenho Mensal</CardTitle>
              <CardDescription>Consultas e receita dos últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyStats.map((stat, index) => (
                  <div
                    key={stat.month}
                    className="flex items-center justify-between p-3 border border-emerald-100 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-medium text-sm">
                        {stat.month}
                      </div>
                      <div>
                        <p className="font-medium text-emerald-900">{stat.consultations} consultas</p>
                        <p className="text-sm text-emerald-600">R$ {stat.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-20 h-2 bg-emerald-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${(stat.consultations / 70) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Treatments */}
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-900">Tratamentos Mais Realizados</CardTitle>
              <CardDescription>Distribuição por tipo de atendimento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topTreatments.map((treatment, index) => (
                  <div key={treatment.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-medium text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-emerald-900">{treatment.name}</p>
                        <p className="text-sm text-emerald-600">{treatment.count} procedimentos</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-emerald-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${treatment.percentage}%` }}
                        />
                      </div>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                        {treatment.percentage}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Reports */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-900">Relatório Financeiro</CardTitle>
              <CardDescription>Análise detalhada de receitas e despesas</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Download className="w-4 h-4 mr-2" />
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>

          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-900">Relatório de Pacientes</CardTitle>
              <CardDescription>Histórico e estatísticas dos pacientes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Download className="w-4 h-4 mr-2" />
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>

          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-900">Relatório de Medicamentos</CardTitle>
              <CardDescription>Prescrições e controle de estoque</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Download className="w-4 h-4 mr-2" />
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
