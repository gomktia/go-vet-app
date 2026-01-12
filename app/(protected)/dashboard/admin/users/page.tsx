"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    ArrowLeft,
    Search,
    Filter,
    MoreVertical,
    ShieldCheck,
    UserPlus,
    Building2,
    Users as UsersIcon,
    Mail,
    CheckCircle2,
    XCircle,
    TrendingUp
} from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function AdminUsersPage() {
    const [users, setUsers] = useState([
        { id: 1, name: "Dr. João Silva", email: "joao.silva@vet.email", role: "VETERINARIAN", status: "verified", date: "12 Mar 2024" },
        { id: 2, name: "Hospital Pelos & Patas", email: "adm@pelospatas.com", role: "CLINIC", status: "pending", date: "14 Mar 2024" },
        { id: 3, name: "Maria Oliveira", email: "maria.oli@gmail.com", role: "TUTOR", status: "verified", date: "15 Mar 2024" },
        { id: 4, name: "Clínica Pet Feliz", email: "contato@petfeliz.com", role: "CLINIC", status: "rejected", date: "10 Mar 2024" },
        { id: 5, name: "Dr. Roberto Martins", email: "roberto@vet.com", role: "VETERINARIAN", status: "pending", date: "16 Mar 2024" },
    ])

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
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Gestão de <span className="text-blue-600 dark:text-blue-400">Usuários</span></h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Controle total sobre permissões, verificações e banco de dados global.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-full dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm px-6">
                            Audit Log
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600 rounded-full shadow-lg shadow-blue-500/20 px-8">
                            <UserPlus className="w-4 h-4 mr-2" /> Novo Usuário
                        </Button>
                    </div>
                </div>

                {/* Filter Bar */}
                <Card className="border-none shadow-sm dark:bg-slate-900/50 p-4 rounded-[2rem] flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input placeholder="Buscar por nome, email ou ID..." className="pl-12 rounded-2xl border-none bg-slate-100 dark:bg-slate-800 h-12 focus-visible:ring-blue-500" />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="outline" className="rounded-2xl border-slate-200 dark:border-slate-800 h-12 flex-1 md:flex-none">
                            <Filter className="w-4 h-4 mr-2" /> Filtros
                        </Button>
                        <Button className="rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 h-12 shadow-sm font-bold flex-1 md:flex-none">
                            TODOS OS CARGOS
                        </Button>
                    </div>
                </Card>

                {/* Users Table / List */}
                <Card className="border-none shadow-xl dark:bg-slate-900/50 overflow-hidden">
                    <CardContent className="p-0">
                        <div className="divide-y dark:divide-slate-800">
                            {users.map(u => (
                                <div key={u.id} className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div className="flex items-center gap-5 flex-1 w-full">
                                        <Avatar className="h-14 w-14 border-4 border-white dark:border-slate-800 shadow-md">
                                            <AvatarFallback className="bg-blue-100 text-blue-700 font-black text-lg">
                                                {u.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-lg text-slate-800 dark:text-white leading-tight">{u.name}</h4>
                                                {u.status === 'verified' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                                            </div>
                                            <p className="text-sm text-slate-500 font-medium">{u.email}</p>
                                            <div className="flex gap-2 mt-2">
                                                <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-500 border-none text-[9px] font-black tracking-widest px-2">{u.role}</Badge>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter self-center">Desde {u.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 w-full md:w-auto justify-between">
                                        <div className="text-right hidden md:block">
                                            <Badge className={`text-[10px] font-black uppercase tracking-widest border-none ${u.status === 'verified' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400' :
                                                u.status === 'pending' ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400' :
                                                    'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400'
                                                }`}>
                                                {u.status}
                                            </Badge>
                                        </div>
                                        <div className="flex gap-2">
                                            {u.status === 'pending' && u.role !== 'TUTOR' && (
                                                <Button className="h-10 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 text-xs font-black">APROVAR</Button>
                                            )}
                                            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-blue-500">
                                                <MoreVertical className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="border-none shadow-lg dark:bg-slate-900/50 p-8 flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                            <UsersIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-slate-800 dark:text-white">1,552</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total de Usuários</p>
                        </div>
                    </Card>
                    <Card className="border-none shadow-lg dark:bg-slate-900/50 p-8 flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-slate-800 dark:text-white">12</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pendentes de Aprovação</p>
                        </div>
                    </Card>
                    <Card className="border-none shadow-lg bg-slate-900 text-white p-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Crescimento Semanal</p>
                                <h3 className="text-3xl font-black">+4.2%</h3>
                            </div>
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                        </div>
                    </Card>
                </div>

            </div>
        </div>
    )
}
