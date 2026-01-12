"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    ArrowLeft,
    Save,
    Shield,
    Globe,
    Bell,
    Zap,
    Lock,
    Cpu,
    Database
} from "lucide-react"
import Link from "next/link"

export default function AdminSettingsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 pb-20 transition-colors duration-300">
            <div className="max-w-5xl mx-auto space-y-10">
                {/* Header Section */}
                <div className="flex items-center gap-6">
                    <Link href="/dashboard/admin">
                        <Button variant="ghost" size="icon" className="rounded-full bg-white dark:bg-slate-900 shadow-sm border dark:border-slate-800">
                            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Configurações do <span className="text-purple-600 dark:text-purple-400">Sistema</span></h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Controle global e parâmetros operacionais do SaaS.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Column */}
                    <div className="lg:col-span-8 space-y-8">
                        <Card className="border-none shadow-xl dark:bg-slate-900/50">
                            <CardHeader className="p-8">
                                <CardTitle className="text-xl font-bold flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                                        <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    Parâmetros da Plataforma
                                </CardTitle>
                                <CardDescription className="dark:text-slate-400">Configurações de rede e acessibilidade global.</CardDescription>
                            </CardHeader>
                            <CardContent className="px-8 pb-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase text-slate-400 tracking-widest">Domínio Principal</Label>
                                        <Input defaultValue="vetcare-saas.com" className="rounded-xl border-slate-200 dark:border-slate-800 h-11 bg-white/50 dark:bg-slate-900/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase text-slate-400 tracking-widest">Timezone Global</Label>
                                        <Input defaultValue="America/Sao_Paulo (GMT-3)" className="rounded-xl border-slate-200 dark:border-slate-800 h-11 bg-white/50 dark:bg-slate-900/50" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-slate-800 dark:text-white">Modo de Manutenção</p>
                                        <p className="text-[10px] text-slate-400 font-medium">Bloquear acesso de usuários não-admin.</p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl dark:bg-slate-900/50 overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-500" />
                            <CardHeader className="p-8">
                                <CardTitle className="text-xl font-bold flex items-center gap-3">
                                    <Zap className="w-5 h-5 text-amber-500" /> Inteligência Artificial
                                </CardTitle>
                                <CardDescription>Gerenciamento de recursos da IA Triage.</CardDescription>
                            </CardHeader>
                            <CardContent className="px-8 pb-8 space-y-6">
                                {[
                                    { label: "Triagem Veterinária", desc: "Habilitar assistente de pré-consulta.", active: true },
                                    { label: "Sugestão de Diagnóstico", desc: "Apoio a tomada de decisão clínica.", active: false },
                                    { label: "Visão Computacional", desc: "Análise de exames por imagem.", active: true }
                                ].map((feat, i) => (
                                    <div key={i} className="flex items-center justify-between group">
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-purple-500 transition-colors">{feat.label}</p>
                                            <p className="text-xs text-slate-400 font-medium">{feat.desc}</p>
                                        </div>
                                        <Switch defaultChecked={feat.active} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4 space-y-8">
                        <Card className="border-none shadow-xl bg-slate-900 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                <Lock className="w-20 h-20" />
                            </div>
                            <CardHeader className="p-8 relative z-10">
                                <CardTitle className="text-xl font-bold">Segurança Admin</CardTitle>
                            </CardHeader>
                            <CardContent className="px-8 pb-8 space-y-4 relative z-10">
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black rounded-xl h-12 shadow-lg">Revogar Sessões</Button>
                                <Button variant="ghost" className="w-full text-slate-400 hover:text-white text-[10px] font-black uppercase">Segurança 2FA</Button>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl dark:bg-slate-900/50">
                            <CardHeader className="p-8">
                                <CardTitle className="text-lg font-bold flex items-center gap-3">
                                    <Cpu className="w-5 h-5 text-blue-500" /> Monitoramento
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-8 pb-8 space-y-4">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-400 font-bold uppercase">Uso de CPU</span>
                                    <span className="text-emerald-500 font-black">24%</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                                    <div className="bg-emerald-500 h-full rounded-full w-[24%]" />
                                </div>
                                <div className="flex justify-between items-center text-xs pt-2">
                                    <span className="text-slate-400 font-bold uppercase">Banco de Dados</span>
                                    <span className="text-blue-500 font-black">82%</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                                    <div className="bg-blue-500 h-full rounded-full w-[82%]" />
                                </div>
                            </CardContent>
                        </Card>

                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl h-14 shadow-lg shadow-purple-500/20">
                            <Save className="w-5 h-5 mr-3" /> SALVAR MASTER
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
