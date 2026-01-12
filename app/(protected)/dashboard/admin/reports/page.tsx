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
    Activity,
    ShieldCheck,
    Globe,
    Zap,
    PieChart,
    BarChart3
} from "lucide-react"
import Link from "next/link"

export default function AdminReportsPage() {
    const stats = [
        { label: "MRR Total", val: "R$ 48.250", trend: "+15%", color: "indigo", icon: DollarSign },
        { label: "Usuários Ativos", val: "1,552", trend: "+8%", color: "emerald", icon: Users },
        { label: "Transações IA", val: "4,2k", trend: "+24%", color: "purple", icon: Zap },
        { label: "Uptime Sistema", val: "99.98%", trend: "Estável", color: "blue", icon: Activity }
    ]

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 pb-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard/admin">
                            <Button variant="ghost" size="icon" className="rounded-full bg-white dark:bg-slate-900 shadow-sm border dark:border-slate-800">
                                <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Métricas <span className="text-purple-600 dark:text-purple-400">Globais</span></h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Controle total sobre o ecossistema VetCare e performance SaaS.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-full dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm px-6">
                            Gerar Audit Log
                        </Button>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-600 rounded-full shadow-lg shadow-purple-500/20 px-8">
                            <Download className="w-4 h-4 mr-2" /> Exportar Relatório
                        </Button>
                    </div>
                </div>

                {/* Global Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {stats.map((kpi, i) => {
                        const Icon = kpi.icon
                        return (
                            <Card key={i} className="border-none shadow-lg dark:bg-slate-900/50 group overflow-hidden">
                                <CardContent className="p-6 relative">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-2 rounded-xl bg-${kpi.color}-50 dark:bg-${kpi.color}-950/20`}>
                                            <Icon className={`w-5 h-5 text-${kpi.color}-600 dark:text-${kpi.color}-400`} />
                                        </div>
                                        <Badge className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border-none font-black text-[10px]">{kpi.trend}</Badge>
                                    </div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                                    <h3 className="text-3xl font-black text-slate-800 dark:text-white leading-none">{kpi.val}</h3>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="border-none shadow-xl dark:bg-slate-900/50">
                        <CardHeader className="p-8">
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-purple-500" /> Crescimento de MRR
                            </CardTitle>
                            <CardDescription className="dark:text-slate-400">Evolução do faturamento recorrente nos últimos 12 meses.</CardDescription>
                        </CardHeader>
                        <CardContent className="px-8 pb-8 h-[300px] flex items-center justify-center border-t dark:border-slate-800">
                            <div className="text-slate-400 text-sm font-medium italic flex flex-col items-center gap-4">
                                <BarChart3 className="w-12 h-12 opacity-20" />
                                Integrando com Chart Service...
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl dark:bg-slate-900/50">
                        <CardHeader className="p-8">
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <PieChart className="w-6 h-6 text-indigo-500" /> Distribuição de Usuários
                            </CardTitle>
                            <CardDescription className="dark:text-slate-400">Cisao por cargos e tipos de assinatura.</CardDescription>
                        </CardHeader>
                        <CardContent className="px-8 pb-8 space-y-6 border-t dark:border-slate-800 pt-8">
                            {[
                                { label: "Tutores (B2C)", val: 65, color: "bg-emerald-500" },
                                { label: "Veterinários (B2B)", val: 25, color: "bg-purple-500" },
                                { label: "Clínicas & Hospitais", val: 10, color: "bg-indigo-500" }
                            ].map((m, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-xs font-black">
                                        <span className="text-slate-500 uppercase tracking-tighter">{m.label}</span>
                                        <span className="text-slate-900 dark:text-white">{m.val}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className={`h-full ${m.color} rounded-full transition-all duration-1000`} style={{ width: `${m.val}%` }} />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-none shadow-xl dark:bg-slate-900/50 overflow-hidden">
                    <CardHeader className="p-8 border-b dark:border-slate-800">
                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                            <ShieldCheck className="w-6 h-6 text-blue-500" /> Saúde do Ecossistema
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-3 divide-x dark:divide-slate-800 p-0">
                        <div className="p-8 space-y-2">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Latência API</p>
                            <h4 className="text-3xl font-black text-slate-800 dark:text-white">42ms</h4>
                            <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold">EXCELENTE</Badge>
                        </div>
                        <div className="p-8 space-y-2">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Taxa de Churn</p>
                            <h4 className="text-3xl font-black text-slate-800 dark:text-white">1.2%</h4>
                            <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold">ESTÁVEL</Badge>
                        </div>
                        <div className="p-8 space-y-2">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">NPS Médio</p>
                            <h4 className="text-3xl font-black text-slate-800 dark:text-white">88</h4>
                            <Badge className="bg-purple-50 text-purple-600 border-none font-bold">ZONA DE EXCELÊNCIA</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
