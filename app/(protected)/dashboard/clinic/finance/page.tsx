"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    ArrowLeft,
    Download,
    TrendingUp,
    DollarSign,
    Users,
    Building2,
    Calendar,
    ArrowUpRight,
    PieChart,
    BarChart3,
    ArrowDownRight
} from "lucide-react"
import Link from "next/link"
import { ClinicRevenueChart } from "@/components/dashboard/ClinicRevenueChart"

export default function ClinicFinancePage() {
    const transactions = [
        { id: 1, type: "Locação Sala", vet: "Dr. João Santos", amount: 450, date: "Hoje, 09:30", status: "completed" },
        { id: 2, type: "Comissão Cirurgia", vet: "Dra. Ana Costa", amount: 1200, date: "Hoje, 11:20", status: "completed" },
        { id: 3, type: "Locação Consultório", vet: "Dra. Maria Helena", amount: 150, date: "Hoje, 14:00", status: "pending" },
        { id: 4, type: "Taxa Serviço", vet: "Dr. Roberto Silva", amount: 85, date: "Ontem", status: "completed" },
        { id: 5, type: "Locação Sala", vet: "Dr. João Santos", amount: 450, date: "Ontem", status: "completed" },
    ]

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 pb-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* HeaderSection */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard/clinic">
                            <Button variant="ghost" size="icon" className="rounded-full bg-white dark:bg-slate-900 shadow-sm border dark:border-slate-800">
                                <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Gestão <span className="text-indigo-600 dark:text-indigo-400">Financeira</span></h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Relatórios detalhados de faturamento, repasses e ROI da unidade.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-full dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm px-6">
                            Conciliação
                        </Button>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-700 dark:hover:bg-indigo-600 rounded-full shadow-lg shadow-indigo-500/20 px-8">
                            <Download className="w-4 h-4 mr-2" /> Exportar DRE
                        </Button>
                    </div>
                </div>

                {/* Global Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: "Receita Total", val: "R$ 124.500", trend: "+12.5%", color: "indigo", icon: DollarSign },
                        { label: "Custos Operacionais", val: "R$ 42.300", trend: "-2.1%", color: "emerald", icon: Building2 },
                        { label: "Margem Líquida", val: "34.2%", trend: "+4.3%", color: "blue", icon: TrendingUp },
                        { label: "Ticket Médio", val: "R$ 385", trend: "+0.8%", color: "purple", icon: Users }
                    ].map((kpi, i) => {
                        const Icon = kpi.icon
                        return (
                            <Card key={i} className="border-none shadow-lg dark:bg-slate-900/50 group overflow-hidden">
                                <CardContent className="p-6 relative">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-2 rounded-xl bg-${kpi.color}-50 dark:bg-${kpi.color}-950/20`}>
                                            <Icon className={`w-5 h-5 text-${kpi.color}-600 dark:text-${kpi.color}-400`} />
                                        </div>
                                        <Badge className={`${kpi.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400' : 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400'} border-none font-black text-[10px]`}>{kpi.trend}</Badge>
                                    </div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                                    <h3 className="text-3xl font-black text-slate-800 dark:text-white leading-none">{kpi.val}</h3>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Chart Section */}
                    <div className="lg:col-span-8 space-y-8">
                        <Card className="border-none shadow-xl dark:bg-slate-900/50">
                            <CardHeader className="p-8">
                                <CardTitle className="text-xl font-bold flex items-center gap-2">
                                    <BarChart3 className="w-6 h-6 text-indigo-500" /> Distribuição de Receita
                                </CardTitle>
                                <CardDescription className="dark:text-slate-400">Faturamento segmentado por especialidade e tipo de atendimento.</CardDescription>
                            </CardHeader>
                            <CardContent className="px-8 pb-8">
                                <ClinicRevenueChart />
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl dark:bg-slate-900/50 overflow-hidden">
                            <CardHeader className="p-8 bg-slate-900 text-white">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="text-xl font-bold">Lançamentos Recentes</CardTitle>
                                        <CardDescription className="text-slate-400">Histórico de transações financeiras e repasses.</CardDescription>
                                    </div>
                                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">Ver Tudo</Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y dark:divide-slate-800">
                                    {transactions.map(t => (
                                        <div key={t.id} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${t.status === 'completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                                                    {t.vet[4]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800 dark:text-white">{t.type}</p>
                                                    <p className="text-xs text-slate-500 font-medium">{t.vet} • {t.date}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-black text-slate-900 dark:text-white">R$ {t.amount}</p>
                                                <Badge variant="outline" className={`text-[9px] font-black uppercase ${t.status === 'completed' ? 'border-emerald-200 text-emerald-600' : 'border-amber-200 text-amber-600'}`}>{t.status === 'completed' ? 'CONCLUÍDO' : 'PENDENTE'}</Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Side Bar Metrics */}
                    <div className="lg:col-span-4 space-y-8">
                        <Card className="border-none shadow-xl dark:bg-slate-900/50">
                            <CardHeader className="p-8 pb-4">
                                <CardTitle className="text-lg font-bold">Ocupação vs ROI</CardTitle>
                            </CardHeader>
                            <CardContent className="px-8 pb-8 space-y-6">
                                {[
                                    { label: "Salas Cirúrgicas", val: 88, color: "bg-indigo-500" },
                                    { label: "Consultórios", val: 65, color: "bg-blue-400" },
                                    { label: "Diagnóstico", val: 42, color: "bg-emerald-400" }
                                ].map((m, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold">
                                            <span className="text-slate-500 dark:text-slate-400 uppercase tracking-tighter">{m.label}</span>
                                            <span className="text-slate-900 dark:text-white">{m.val}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div className={`h-full ${m.color} rounded-full transition-all duration-1000`} style={{ width: `${m.val}%` }} />
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-8 p-6 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2rem] text-white relative group overflow-hidden shadow-lg shadow-indigo-600/20">
                                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
                                    <h4 className="font-black text-lg leading-none mb-1 relative z-10">Meta Trimestral</h4>
                                    <p className="text-indigo-100 text-[10px] font-medium opacity-80 mb-6 relative z-10">Faltam R$ 12.400 para atingir o bônus de performance.</p>
                                    <div className="flex items-end justify-between relative z-10">
                                        <span className="text-2xl font-black">74%</span>
                                        <ArrowUpRight className="w-8 h-8 opacity-40" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl dark:bg-slate-900/50">
                            <CardHeader className="p-8">
                                <CardTitle className="text-lg font-bold">Ações Rápidas</CardTitle>
                            </CardHeader>
                            <CardContent className="px-8 pb-8 space-y-3">
                                <Button className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-800 dark:text-slate-200 font-bold rounded-xl h-12 border-none">
                                    Gerar DRE Mensal
                                </Button>
                                <Button className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-800 dark:text-slate-200 font-bold rounded-xl h-12 border-none">
                                    Repasse de Veterinários
                                </Button>
                                <Button variant="ghost" className="w-full text-indigo-600 dark:text-indigo-400 font-black text-[10px] tracking-widest uppercase mt-4">
                                    Configurações de Taxas
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
