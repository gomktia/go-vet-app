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
    Bell
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { logoutUser } from "@/lib/auth"

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

    const handleLogout = () => {
        logoutUser()
        router.push("/login")
    }

    const handleApprove = (id: number) => {
        setRequests(requests.map(r => r.id === id ? { ...r, status: "approved" } : r))
    }

    const handleReject = (id: number) => {
        setRequests(requests.filter(r => r.id !== id))
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header específico para Clínica */}
            <header className="bg-white border-b border-indigo-100 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-indigo-900">VetCare <span className="text-indigo-600 font-normal">Partner</span></h1>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/dashboard/clinic" className="text-indigo-900 font-medium border-b-2 border-indigo-600 pb-1">Visão Geral</Link>
                        <Link href="/dashboard/clinic/schedule" className="text-slate-500 hover:text-indigo-700 font-medium">Agenda de Salas</Link>
                        <Link href="/dashboard/clinic/finance" className="text-slate-500 hover:text-indigo-700 font-medium">Faturamento</Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" className="relative">
                            <Bell className="w-5 h-5 text-slate-500" />
                            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </Button>
                        <div className="h-8 w-px bg-slate-200 mx-1"></div>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/clinic-avatar.png" />
                            <AvatarFallback>HT</AvatarFallback>
                        </Avatar>
                        <div className="text-sm hidden md:block">
                            <p className="font-medium text-slate-700">Hospital Tubarão</p>
                            <p className="text-xs text-slate-400">Gerente Responsável</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={handleLogout} className="ml-2 text-slate-400 hover:text-red-500">
                            <LogOut className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="border-l-4 border-l-indigo-500 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-slate-500">Ocupação Hoje</p>
                                <CalendarCheck className="w-4 h-4 text-indigo-500" />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-800">85%</h3>
                            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                <span className="font-bold">↑ 12%</span> vs ontem
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-emerald-500 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-slate-500">Faturamento Previsto</p>
                                <DollarSign className="w-4 h-4 text-emerald-500" />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-800">R$ 4.250</h3>
                            <p className="text-xs text-slate-400 mt-1">Hoje</p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-orange-500 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-slate-500">Solicitações Pendentes</p>
                                <Clock className="w-4 h-4 text-orange-500" />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-800">{requests.filter(r => r.status === 'pending').length}</h3>
                            <p className="text-xs text-orange-600 mt-1 font-medium">Requer atenção imediata</p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-blue-500 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-slate-500">Parceiros Ativos</p>
                                <Users className="w-4 h-4 text-blue-500" />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-800">14</h3>
                            <p className="text-xs text-slate-400 mt-1">Especialistas cadastrados</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Column - Requests */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-indigo-100 shadow-md">
                            <CardHeader className="bg-indigo-50/50 border-b border-indigo-50">
                                <CardTitle className="text-indigo-900 flex items-center gap-2">
                                    <CalendarCheck className="w-5 h-5" /> Solicitações de Sala
                                </CardTitle>
                                <CardDescription>Aprove ou recuse solicitações de reserva de especialistas externos.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-100">
                                    {requests.length === 0 && (
                                        <div className="p-8 text-center text-slate-500">Nenhuma solicitação pendente no momento.</div>
                                    )}
                                    {requests.map(req => (
                                        <div key={req.id} className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                                            <div className="flex items-center gap-4 flex-1">
                                                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                                    <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold">
                                                        {req.vetName.substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h4 className="font-bold text-slate-800">{req.vetName} <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full ml-1">{req.specialty}</span></h4>
                                                    <p className="text-sm text-slate-600 mt-1">
                                                        <span className="font-medium text-indigo-600">{req.procedure}</span> • {req.room}
                                                    </p>
                                                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                                                        <span className="flex items-center gap-1"><CalendarCheck className="w-3 h-3" /> {req.date}</span>
                                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {req.duration}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {req.status === 'pending' ? (
                                                <div className="flex items-center gap-2 w-full md:w-auto">
                                                    <Button variant="outline" className="flex-1 md:flex-none border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleReject(req.id)}>
                                                        <XCircle className="w-4 h-4 mr-1" /> Recusar
                                                    </Button>
                                                    <Button className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm" onClick={() => handleApprove(req.id)}>
                                                        <CheckCircle2 className="w-4 h-4 mr-1" /> Aprovar Reserva
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 px-3 py-1">
                                                    <CheckCircle2 className="w-3 h-3 mr-1" /> Aprovado
                                                </Badge>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 justify-center">
                                <Button variant="link" className="text-indigo-600">Ver Histórico Completo</Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Sidebar - Quick Info */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-bold text-slate-700 uppercase tracking-wider">Salas Disponíveis Agora</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="font-medium text-emerald-900">Sala Cirúrgica 02</span>
                                    </div>
                                    <Badge variant="outline" className="text-emerald-700 border-emerald-200 bg-white">Livre</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 opacity-60">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                        <span className="font-medium text-slate-700">Sala Cirúrgica 01</span>
                                    </div>
                                    <Badge variant="secondary">Ocupada</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 opacity-60">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                        <span className="font-medium text-slate-700">Consultório 01</span>
                                    </div>
                                    <Badge variant="secondary">Limpeza</Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-indigo-900 text-white border-none">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-lg mb-2">Divulgue suas salas!</h3>
                                <p className="text-indigo-200 text-sm mb-4">Aumente sua taxa de ocupação ofertando horários ociosos no marketplace.</p>
                                <Button className="w-full bg-white text-indigo-900 hover:bg-indigo-50 font-bold">
                                    Configurar Ofertas
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
