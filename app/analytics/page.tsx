"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  Heart,
  Clock,
  Star,
  Download,
  Filter,
} from "lucide-react"
import { useState } from "react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  // Dados simulados para os gráficos
  const monthlyRevenue = [
    { month: "Jan", revenue: 12000, appointments: 45, newPatients: 8 },
    { month: "Fev", revenue: 15000, appointments: 52, newPatients: 12 },
    { month: "Mar", revenue: 18000, appointments: 61, newPatients: 15 },
    { month: "Abr", revenue: 16500, appointments: 58, newPatients: 10 },
    { month: "Mai", revenue: 19000, appointments: 65, newPatients: 18 },
    { month: "Jun", revenue: 22000, appointments: 72, newPatients: 22 },
  ]

  const appointmentTypes = [
    { name: "Consulta Geral", value: 35, color: "#10b981" },
    { name: "Vacinação", value: 25, color: "#3b82f6" },
    { name: "Cirurgia", value: 15, color: "#f59e0b" },
    { name: "Exames", value: 20, color: "#8b5cf6" },
    { name: "Emergência", value: 5, color: "#ef4444" },
  ]

  const dailyActivity = [
    { hour: "08:00", appointments: 2, messages: 5 },
    { hour: "09:00", appointments: 4, messages: 8 },
    { hour: "10:00", appointments: 6, messages: 12 },
    { hour: "11:00", appointments: 5, messages: 10 },
    { hour: "12:00", appointments: 2, messages: 4 },
    { hour: "13:00", appointments: 1, messages: 2 },
    { hour: "14:00", appointments: 5, messages: 9 },
    { hour: "15:00", appointments: 7, messages: 15 },
    { hour: "16:00", appointments: 6, messages: 11 },
    { hour: "17:00", appointments: 4, messages: 7 },
    { hour: "18:00", appointments: 3, messages: 6 },
  ]

  const patientSatisfaction = [
    { month: "Jan", satisfaction: 4.2, reviews: 28 },
    { month: "Fev", satisfaction: 4.4, reviews: 35 },
    { month: "Mar", satisfaction: 4.6, reviews: 42 },
    { month: "Abr", satisfaction: 4.5, reviews: 38 },
    { month: "Mai", satisfaction: 4.7, reviews: 45 },
    { month: "Jun", satisfaction: 4.9, reviews: 52 },
  ]

  const topMetrics = [
    {
      title: "Receita Total",
      value: "R$ 102.500",
      change: "+15.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Consultas Realizadas",
      value: "353",
      change: "+8.1%",
      trend: "up",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Novos Pacientes",
      value: "85",
      change: "+22.5%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Avaliação Média",
      value: "4.9",
      change: "+0.3",
      trend: "up",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Taxa de Retorno",
      value: "87%",
      change: "+5.2%",
      trend: "up",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Tempo Médio Consulta",
      value: "32 min",
      change: "-2 min",
      trend: "down",
      icon: Clock,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900">Analytics Dashboard</h1>
            <p className="text-emerald-700">Análise detalhada do desempenho da clínica</p>
          </div>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 dias</SelectItem>
                <SelectItem value="30d">30 dias</SelectItem>
                <SelectItem value="90d">90 dias</SelectItem>
                <SelectItem value="1y">1 ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-emerald-300 text-emerald-700 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {topMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card key={index} className="border-emerald-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                      <Icon className={`w-4 h-4 ${metric.color}`} />
                    </div>
                    <div className="flex items-center gap-1">
                      {metric.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 text-green-600" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-600" />
                      )}
                      <span
                        className={`text-xs font-medium ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      >
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-bold text-emerald-900">{metric.value}</div>
                    <div className="text-xs text-emerald-600">{metric.title}</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Tabs de Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="revenue">Receita</TabsTrigger>
            <TabsTrigger value="patients">Pacientes</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="satisfaction">Satisfação</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Receita Mensal */}
              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Receita e Consultas</CardTitle>
                  <CardDescription>Evolução mensal da receita e número de consultas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stackId="1"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Tipos de Consulta */}
              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Distribuição de Consultas</CardTitle>
                  <CardDescription>Tipos de consultas mais frequentes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={appointmentTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {appointmentTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Atividade Diária */}
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900">Atividade por Horário</CardTitle>
                <CardDescription>Distribuição de consultas e mensagens ao longo do dia</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="appointments" fill="#10b981" name="Consultas" />
                    <Bar dataKey="messages" fill="#3b82f6" name="Mensagens" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Receita Hoje</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-900">R$ 2.850</div>
                  <p className="text-emerald-600">8 consultas realizadas</p>
                </CardContent>
              </Card>
              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Receita Semanal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-900">R$ 18.200</div>
                  <p className="text-emerald-600">52 consultas realizadas</p>
                </CardContent>
              </Card>
              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Receita Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-900">R$ 72.500</div>
                  <p className="text-emerald-600">198 consultas realizadas</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Novos Pacientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="newPatients" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Estatísticas de Pacientes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-emerald-700">Total de Pacientes:</span>
                    <span className="font-bold text-emerald-900">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-700">Pacientes Ativos:</span>
                    <span className="font-bold text-emerald-900">892</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-700">Taxa de Retorno:</span>
                    <span className="font-bold text-emerald-900">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-700">Média de Consultas/Paciente:</span>
                    <span className="font-bold text-emerald-900">3.2</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Indicadores de Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-700">Tempo Médio de Consulta:</span>
                    <Badge className="bg-green-100 text-green-800">32 min</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-700">Taxa de No-Show:</span>
                    <Badge className="bg-yellow-100 text-yellow-800">8%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-700">Tempo de Resposta (Chat):</span>
                    <Badge className="bg-green-100 text-green-800">2.5 min</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-700">Consultas por Dia:</span>
                    <Badge className="bg-blue-100 text-blue-800">12.3</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Metas vs Realizado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-emerald-700">Consultas Mensais</span>
                      <span className="text-emerald-900">198/200</span>
                    </div>
                    <div className="w-full bg-emerald-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "99%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-emerald-700">Receita Mensal</span>
                      <span className="text-emerald-900">R$ 72.5k/70k</span>
                    </div>
                    <div className="w-full bg-emerald-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "103%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-emerald-700">Novos Pacientes</span>
                      <span className="text-emerald-900">22/25</span>
                    </div>
                    <div className="w-full bg-emerald-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "88%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="satisfaction" className="space-y-6">
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900">Evolução da Satisfação</CardTitle>
                <CardDescription>Avaliação média dos pacientes ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={patientSatisfaction}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Avaliação Atual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-emerald-900 mb-2">4.9</div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-emerald-600">Baseado em 52 avaliações</p>
                </CardContent>
              </Card>

              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Reviews Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border-l-4 border-emerald-500 pl-3">
                      <p className="text-sm text-emerald-800">"Excelente atendimento!"</p>
                      <p className="text-xs text-emerald-600">Maria Silva - 5 estrelas</p>
                    </div>
                    <div className="border-l-4 border-emerald-500 pl-3">
                      <p className="text-sm text-emerald-800">"Dr. João é muito atencioso"</p>
                      <p className="text-xs text-emerald-600">João Santos - 5 estrelas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">NPS Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-emerald-900 mb-2">87</div>
                  <Badge className="bg-green-100 text-green-800 mb-2">Excelente</Badge>
                  <p className="text-emerald-600">Net Promoter Score</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
