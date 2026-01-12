"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    ArrowLeft,
    Download,
    TrendingUp,
    DollarSign,
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
    PieChart,
    BarChart3,
    Clock,
    Wallet
} from "lucide-react"
import Link from "next/link"

export default function AdminFinancePage() {
    const transactions = [
        { id: "TRX-8291", entity: "Dr. João Silva", amount: "R$ 450,00", type: "Repasse", status: "completed", date: "Hoje, 14:20" },
        { id: "TRX-8290", entity: "Hospital Tubarão", amount: "R$ 2.400,00", type: "Comissão SaaS", status: "completed", date: "Hoje, 12:05" },
        { id: "TRX-8289", entity: "Maria Oliveira", amount: "R$ 150,00", type: "Assinatura Tutor", status: "pending", date: "Hoje, 10:15" },
        { id: "TRX-8288", entity: "Dra. Ana Costa", amount: "R$ 890,00", type: "Repasse", status: "completed", date: "Ontem, 18:45" },
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
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Fluxo <span className="text-emerald-600 dark:text-emerald-400">Financeiro</span></h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Tesouraria SaaS: Monitoramento de transações, repasses e MRR.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-full dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm px-6">
                            Configurar Taxas
                        </Button>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-full shadow-lg shadow-emerald-500/20 px-8 font-black">
                            <Wallet className="w-4 h-4 mr-2" /> EFETUAR REPASSES
                        </Button>
                    </div>
                </div>

                {/* Financial KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: "Receita Bruta", val: "R$ 124.500", trend: "+12.5%", color: "blue", icon: DollarSign },
                        { label: "Taxas de Plataforma", val: "R$ 18.250", trend: "+8.2%", color: "emerald", icon: PieChart },
                        { label: "Pendente Repasse", val: "R$ 4.120", trend: "-5.0%", color: "amber", icon: Clock },
                        { label: "LTV Médio", val: "R$ 420", trend: "+1.2%", color: "purple", icon: TrendingUp }
                    ].map((kpi, i) => (
                        <Card key={i} className="border-none shadow-xl dark:bg-slate-900/50 relative overflow-hidden group">
                            <CardContent className="p-6">
                                <div className={`p-2 rounded-xl bg-${kpi.color}-50 dark:bg-${kpi.color}-950/20 w-fit mb-4`}>
                                    <kpi.icon className={`w-5 h-5 text-${kpi.color}-600 dark:text-${kpi.color}-400`} />
                                </div>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{kpi.label}</p>
                                <h3 className="text-3xl font-black text-slate-800 dark:text-white leading-none">{kpi.val}</h3>
                                <div className={`mt-4 flex items-center text-[10px] font-black ${kpi.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {kpi.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                    {kpi.trend} vs mês ant.
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Transactions List */}
                    <div className="lg:col-span-8 space-y-8">
                        <Card className="border-none shadow-xl dark:bg-slate-900/50">
                            <CardHeader className="p-8 flex flex-row items-center justify-between border-b dark:border-slate-800">
                                <div>
                                    <CardTitle className="text-xl font-bold">Últimas Transações</CardTitle>
                                    <CardDescription>Fluxo global em tempo real.</CardDescription>
                                </div>
                                <Button variant="ghost" className="text-blue-500 font-black text-xs">VER TUDO</Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y dark:divide-slate-800 text-sm font-medium">
                                    {transactions.map(t => (
                                        <div key={t.id} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-full ${t.type.includes('Repasse') ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'} dark:bg-white/5`}>
                                                    <CreditCard className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800 dark:text-white">{t.entity}</p>
                                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{t.type} • {t.id}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-black text-slate-900 dark:text-white">{t.amount}</p>
                                                <p className="text-[10px] text-slate-400 font-bold">{t.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Charts */}
                    <div className="lg:col-span-4 space-y-8">
                        <Card className="border-none shadow-xl dark:bg-slate-900/50 bg-white">
                            <CardHeader className="p-8">
                                <CardTitle className="text-lg font-bold">Meta de MRR</CardTitle>
                            </CardHeader>
                            <CardContent className="px-8 pb-8 flex flex-col items-center">
                                <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="80" cy="80" r="70" className="stroke-slate-100 dark:stroke-slate-800 stroke-[10] fill-none" />
                                        <circle cx="80" cy="80" r="70" className="stroke-emerald-500 stroke-[10] fill-none" strokeDasharray="440" strokeDashoffset="110" />
                                    </svg>
                                    <div className="absolute text-center">
                                        <p className="text-3xl font-black text-slate-900 dark:text-white leading-none">75%</p>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">da meta</p>
                                    </div>
                                </div>
                                <p className="text-center text-xs text-slate-500 font-medium">Buscando R$ 150k de faturamento mensal recorrente.</p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl bg-slate-900 text-white overflow-hidden group">
                            <CardHeader className="p-8 relative z-10">
                                <CardTitle className="text-lg font-bold">Assinaturas</CardTitle>
                            </CardHeader>
                            <CardContent className="px-8 pb-8 relative z-10 space-y-4">
                                {[
                                    { l: "Premium Vets", v: "550", c: "bg-purple-500" },
                                    { l: "Hospitais (Corp)", v: "142", c: "bg-blue-500" },
                                    { l: "Tutores Gold", v: "860", c: "bg-emerald-500" }
                                ].map((s, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                                            <span className="text-slate-400">{s.l}</span>
                                            <span>{s.v}</span>
                                        </div>
                                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                            <div className={`${s.c} h-full rounded-full`} style={{ width: `${Math.random() * 50 + 40}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                            <div className="absolute -bottom-4 -right-4 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                <BarChart3 className="w-24 h-24" />
                            </div>
                        </Card>
                    </div>
                </div>

            </div>
        </div>
    )
}
