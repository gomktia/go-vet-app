"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    LineChart,
    Users,
    DollarSign,
    Activity,
    ShieldCheck,
    Search,
    Settings,
    LogOut,
    TrendingUp,
    AlertCircle
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { logoutUser } from "@/lib/auth"

export default function AdminDashboardPage() {
    const router = useRouter()

    // Mock data for new signups
    const [pendingUsers, setPendingUsers] = useState([
        { id: 1, name: "Clínica Pet Feliz", type: "clinic", email: "contato@petfeliz.com", date: "Hoje", status: "pending" },
        { id: 2, name: "Dr. Roberto Martins", type: "veterinarian", email: "roberto.vet@email.com", date: "Ontem", status: "pending" },
        { id: 3, name: "Hospital Vet Central", type: "clinic", email: "adm@vetcentral.com", date: "Há 2 dias", status: "pending" },
    ])

    const handleLogout = () => {
        logoutUser()
        router.push("/login")
    }

    const handleVerify = (id: number) => {
        setPendingUsers(pendingUsers.filter(u => u.id !== id))
        // In a real app, this would make an API call to update user status
    }

    return (
        <div className="min-h-screen bg-transparent">
            <div className="container mx-auto px-4 py-8 max-w-7xl">

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white">Visão Geral da Plataforma</h2>
                        <p className="text-slate-400">Métricas em tempo real do ecossistema SaaS.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                            <Settings className="w-4 h-4 mr-2" /> Configurações
                        </Button>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            <TrendingUp className="w-4 h-4 mr-2" /> Exportar Dados
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-slate-900 border-slate-800">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-slate-400">MRR (Recorrente)</p>
                                <DollarSign className="w-4 h-4 text-emerald-500" />
                            </div>
                            <h3 className="text-3xl font-bold text-white">R$ 48.250</h3>
                            <div className="mt-2 text-xs flex items-center gap-1 text-emerald-400">
                                <TrendingUp className="w-3 h-3" /> +15% esse mês
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-slate-800">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-slate-400">Vets Ativos</p>
                                <Users className="w-4 h-4 text-blue-500" />
                            </div>
                            <h3 className="text-3xl font-bold text-white">1,240</h3>
                            <div className="mt-2 text-xs flex items-center gap-1 text-blue-400">
                                <Users className="w-3 h-3" /> +45 novos essa semana
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-slate-800">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-slate-400">Clínicas Parceiras</p>
                                <Activity className="w-4 h-4 text-orange-500" />
                            </div>
                            <h3 className="text-3xl font-bold text-white">312</h3>
                            <div className="mt-2 text-xs flex items-center gap-1 text-orange-400">
                                <Activity className="w-3 h-3" /> 85% de ocupação média
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-slate-800">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-sm font-medium text-slate-400">Comissões (Platform)</p>
                                <LineChart className="w-4 h-4 text-purple-500" />
                            </div>
                            <h3 className="text-3xl font-bold text-white">R$ 12.800</h3>
                            <div className="mt-2 text-xs flex items-center gap-1 text-purple-400">
                                <TrendingUp className="w-3 h-3" /> 20% de take rate médio
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content - User Verifications */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="bg-slate-900 border-slate-800">
                            <CardHeader className="border-b border-slate-800">
                                <CardTitle className="text-white flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-purple-500" /> Verificações Pendentes
                                </CardTitle>
                                <CardDescription className="text-slate-400">
                                    Novos cadastros que aguardam aprovação manual ou verificação de documentos.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-800">
                                    {pendingUsers.length === 0 && (
                                        <div className="p-8 text-center text-slate-500">Tudo limpo! Nenhuma verificação pendente.</div>
                                    )}
                                    {pendingUsers.map(user => (
                                        <div key={user.id} className="p-6 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-10 w-10 bg-slate-800 border border-slate-700">
                                                    <AvatarFallback className="text-slate-300">
                                                        {user.name.substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h4 className="font-bold text-white">{user.name}</h4>
                                                    <p className="text-sm text-slate-500 flex items-center gap-2">
                                                        {user.type === 'clinic' ? '🏥 Clínica' : '🩺 Veterinário'} • {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-slate-500 mr-2">Cadastrado: {user.date}</span>
                                                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => handleVerify(user.id)}>
                                                    Aprovar
                                                </Button>
                                                <Button size="sm" variant="outline" className="border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800">
                                                    Analisar
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Activity Log */}
                        <Card className="bg-slate-900 border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-white text-lg">Atividade do Sistema</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((_, i) => (
                                        <div key={i} className="flex items-start gap-3 text-sm">
                                            <div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                                            <div>
                                                <p className="text-slate-300">Novo pagamento processado: <span className="font-mono text-emerald-400">R$ 450,00</span> (Comissão: R$ 90,00)</p>
                                                <p className="text-xs text-slate-500">Há {i * 15 + 5} minutos</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div key="alert" className="flex items-start gap-3 text-sm">
                                        <div className="mt-1 w-2 h-2 rounded-full bg-red-500"></div>
                                        <div>
                                            <p className="text-slate-300">Alerta de sistema: Falha na integração de SMS (Tentativa 2/3)</p>
                                            <p className="text-xs text-slate-500">Há 1 hora</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                        <Card className="bg-gradient-to-br from-purple-900 to-slate-900 border-none text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <TrendingUp className="w-24 h-24" />
                            </div>
                            <CardContent className="p-6 relative z-10">
                                <h3 className="font-bold text-lg mb-1">Growth Forecast</h3>
                                <p className="text-purple-200 text-sm mb-6">Previsão de crescimento baseada no MRR atual.</p>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>Meta do Mês (R$ 50k)</span>
                                            <span>96.5%</span>
                                        </div>
                                        <div className="w-full bg-purple-900/50 rounded-full h-2">
                                            <div className="bg-purple-400 h-2 rounded-full" style={{ width: '96.5%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-900 border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-white text-sm uppercase tracking-wider">Planos Mais Vendidos</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-300">Plano Pro (Vets)</span>
                                    <Badge variant="secondary" className="bg-slate-800 text-slate-300">65%</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-300">Plano Enterprise (Hosp)</span>
                                    <Badge variant="secondary" className="bg-slate-800 text-slate-300">25%</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-300">Básico (Free)</span>
                                    <Badge variant="secondary" className="bg-slate-800 text-slate-300">10%</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
