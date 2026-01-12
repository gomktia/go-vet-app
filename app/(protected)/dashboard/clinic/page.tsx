"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Building2,
    CalendarCheck,
    Clock,
    DollarSign,
    CheckCircle2,
    XCircle,
    Stethoscope,
    Users,
    Settings,
    LogOut,
    Bell,
    MapPin,
    Video,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { logoutUser } from "@/lib/auth"

import { ClinicRevenueChart } from "@/components/dashboard/ClinicRevenueChart"
import { TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react"

export default function ClinicDashboardPage() {
    const router = useRouter()
    const [requests, setRequests] = useState([
        {
            id: 1,
            vetName: "Dr. João Santos",
            specialty: "Ortopedia",
            procedure: "Cirurgia de LCA",
            date: "Amanhã, 08:00",
            duration: "3h",
            room: "Sala Cirúrgica 01",
            status: "pending"
        },
        {
            id: 2,
            vetName: "Dra. Ana Costa",
            specialty: "Dermatologia",
            procedure: "Biopsia de Pele",
            date: "Hoje, 14:00",
            duration: "1h",
            room: "Consultório 03",
            status: "pending"
        }
    ])

    const handleApprove = (id: number) => {
        setRequests(requests.map(r => r.id === id ? { ...r, status: "approved" } : r))
    }

    const handleReject = (id: number) => {
        setRequests(requests.filter(r => r.id !== id))
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Gestão da <span className="text-indigo-600 dark:text-indigo-400">Unidade</span></h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Bem-vindo ao centro de operações do Hospital Veterinário Tubarão.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-full dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm px-6">
                        <Settings className="w-4 h-4 mr-2" /> Unidade
                    </Button>
                    <Link href="/dashboard/clinic/schedule">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-700 dark:hover:bg-indigo-600 rounded-full shadow-lg shadow-indigo-600/20 px-8">
                            Agenda Mestra
                        </Button>
                    </Link>
                </div>
            </div>

            {/* KPI Cards Premium */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="border-none shadow-lg shadow-indigo-500/5 dark:bg-slate-900/50">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl">
                                <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <Badge className="bg-emerald-50 text-emerald-600 border-none text-[10px] font-bold">+12%</Badge>
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Ocupação</p>
                        <h3 className="text-3xl font-black text-slate-800 dark:text-white">85.4%</h3>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg shadow-emerald-500/5 dark:bg-slate-900/50">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl">
                                <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-emerald-500" />
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Faturamento Hoje</p>
                        <h3 className="text-3xl font-black text-slate-800 dark:text-white">R$ 4.2k</h3>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg shadow-orange-500/5 dark:bg-slate-900/50">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="p-2 bg-orange-50 dark:bg-orange-950/30 rounded-xl">
                                <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pendentes</p>
                        <h3 className="text-3xl font-black text-slate-800 dark:text-white">{requests.filter(r => r.status === 'pending').length}</h3>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg shadow-blue-500/5 dark:bg-slate-900/50 text-white bg-indigo-600 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <TrendingUp className="w-16 h-16" />
                    </div>
                    <CardContent className="p-6 relative z-10">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-xs font-bold text-indigo-100 uppercase tracking-widest">ROI Mensal</p>
                        </div>
                        <h3 className="text-3xl font-black">2.4x</h3>
                        <p className="text-[10px] text-indigo-100 mt-2 font-semibold">Crescimento de margem vs Mês anterior</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Requests & Charts */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Secondary Metrics Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <ClinicRevenueChart />
                        <Card className="border-none shadow-md shadow-slate-200/50 dark:bg-slate-900/50 dark:shadow-none bg-white p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h4 className="font-bold text-slate-800 dark:text-white uppercase text-xs tracking-wider">Top Parceiros</h4>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { name: "Dr. João Santos", procedures: 12, rev: "R$ 4.200" },
                                    { name: "Dra. Maria Helena", procedures: 8, rev: "R$ 2.800" },
                                    { name: "Dr. Roberto Silva", procedures: 5, rev: "R$ 1.500" }
                                ].map((p, i) => (
                                    <div key={i} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">{p.name[0]}</div>
                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-500 transition-colors">{p.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-bold text-slate-800 dark:text-white">{p.rev}</p>
                                            <p className="text-[10px] text-slate-400">{p.procedures} locações</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" className="w-full mt-6 text-indigo-600 text-xs font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/30">VER RELATÓRIO COMPLETO</Button>
                        </Card>
                    </div>

                    {/* Solicitações de Sala Premium */}
                    <Card className="border-none shadow-lg dark:bg-slate-900/50 overflow-hidden">
                        <CardHeader className="bg-slate-900 text-white p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                                        <CalendarCheck className="w-6 h-6 text-indigo-400" /> Solicitações Pendentes
                                    </CardTitle>
                                    <p className="text-slate-400 text-xs mt-1">Validação de agenda técnica para cirurgias e consultas</p>
                                </div>
                                <Badge className="bg-amber-500 text-white border-none">{requests.filter(r => r.status === 'pending').length} NOVAS</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y dark:divide-slate-800">
                                {requests.length === 0 && (
                                    <div className="p-12 text-center text-slate-500 italic">Nenhuma solicitação pendente no momento.</div>
                                )}
                                {requests.map(req => (
                                    <div key={req.id} className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                        <div className="flex items-center gap-5 flex-1 w-full">
                                            <Avatar className="h-14 w-14 border-2 border-white dark:border-slate-800 shadow-md">
                                                <AvatarFallback className="bg-indigo-100 text-indigo-700 font-black text-lg">
                                                    {req.vetName.split(' ')[1]?.[0] || req.vetName[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-lg text-slate-800 dark:text-white leading-tight">{req.vetName}</h4>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    <Badge variant="outline" className="text-[10px] uppercase font-bold text-indigo-600 border-indigo-100 dark:border-indigo-900/30">{req.specialty}</Badge>
                                                    <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> {req.room}</span>
                                                </div>
                                                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mt-2">
                                                    Procedimento: <span className="text-slate-900 dark:text-indigo-300">{req.procedure}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                                            <div className="text-right">
                                                <p className="text-sm font-black text-slate-800 dark:text-white">{req.date}</p>
                                                <p className="text-xs text-slate-400 font-semibold uppercase tracking-tighter">Duração: {req.duration}</p>
                                            </div>
                                            {req.status === 'pending' ? (
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" className="h-10 rounded-xl border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30" onClick={() => handleReject(req.id)}>
                                                        RECUSAR
                                                    </Button>
                                                    <Button className="h-10 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20" onClick={() => handleApprove(req.id)}>
                                                        APROVAR
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-none px-4 py-1.5 font-bold uppercase text-[10px] tracking-widest">
                                                    CONFIRMADA
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar - Unit Status */}
                <div className="space-y-6">
                    <Card className="border-none shadow-lg dark:bg-slate-900/50 bg-white">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest">Estado das Salas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 px-6 pb-6 text-slate-900 dark:text-slate-100">
                            {[
                                { name: "Sala Cirúrgica 01", status: "OCUPADA", color: "bg-red-500", vet: "Dr. João" },
                                { name: "Sala Cirúrgica 02", status: "LIVRE", color: "bg-emerald-500", vet: "-" },
                                { name: "Consultório 01", status: "LIMPEZA", color: "bg-amber-400", vet: "-" },
                                { name: "Consultório 03", status: "AGENDADO", color: "bg-blue-400", vet: "Dra. Ana" }
                            ].map((s, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:scale-[1.02] transition-transform cursor-default">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-3 h-3 rounded-full ${s.color} ${s.status === 'LIVRE' ? 'animate-pulse' : ''}`}></div>
                                        <div>
                                            <span className="font-bold text-sm block">{s.name}</span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase">{s.vet !== '-' ? `Com ${s.vet}` : s.status}</span>
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-black text-slate-300">#{i + 1}</div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Card Telemedicina Admin */}
                    <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-indigo-500/20">
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6">
                                <Video className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-black mb-2 leading-tight">Canal de Telemedicina</h3>
                            <p className="text-blue-100 text-sm mb-8 opacity-80 leading-relaxed font-medium">Configure as salas virtuais e gerencie os atendimentos à distância para seus conveniados.</p>
                            <Link href="/dashboard/telemedicine">
                                <Button className="w-full bg-white text-blue-700 hover:bg-blue-50 font-black rounded-2xl h-12 shadow-lg">
                                    ACESSAR SALAS
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
