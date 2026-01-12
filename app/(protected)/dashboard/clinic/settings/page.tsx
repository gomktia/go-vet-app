"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
    ArrowLeft,
    Save,
    Building2,
    MapPin,
    Bell,
    Shield,
    Globe,
    Camera,
    Plus,
    Trash2
} from "lucide-react"
import Link from "next/link"

export default function ClinicSettingsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 pb-20 transition-colors duration-300">
            <div className="max-w-5xl mx-auto space-y-10">
                {/* Header Section */}
                <div className="flex items-center gap-6">
                    <Link href="/dashboard/clinic">
                        <Button variant="ghost" size="icon" className="rounded-full bg-white dark:bg-slate-900 shadow-sm border dark:border-slate-800">
                            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Configurações da <span className="text-indigo-600 dark:text-indigo-400">Unidade</span></h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Gerencie as informações, salas e preferências operacionais do Hospital.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Settings Area */}
                    <div className="lg:col-span-8 space-y-8">
                        <Card className="border-none shadow-xl dark:bg-slate-900/50 overflow-hidden">
                            <div className="h-2 bg-indigo-500 w-full" />
                            <CardHeader className="p-8">
                                <CardTitle className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/20">
                                        <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    Identidade da Clínica
                                </CardTitle>
                                <CardDescription className="dark:text-slate-400">Informações públicas exibidas para parceiros e tutores.</CardDescription>
                            </CardHeader>
                            <CardContent className="px-8 pb-8 space-y-8">
                                <div className="flex items-center gap-8">
                                    <div className="relative group">
                                        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 overflow-hidden group-hover:border-indigo-400 transition-colors">
                                            <Building2 className="w-8 h-8 text-slate-400" />
                                        </div>
                                        <button className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 rounded-full text-white shadow-lg shadow-indigo-500/30 hover:scale-110 transition-transform">
                                            <Camera className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h4 className="font-bold text-slate-900 dark:text-white">Logo da Unidade</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Formato JPG, PNG ou SVG. Tamanho máximo de 2MB.</p>
                                        <div className="flex gap-2 pt-2">
                                            <Button size="sm" variant="outline" className="h-8 rounded-lg text-[10px] font-black uppercase">Alterar</Button>
                                            <Button size="sm" variant="ghost" className="h-8 rounded-lg text-[10px] font-black uppercase text-red-500">Remover</Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Nome da Unidade</Label>
                                        <Input id="name" defaultValue="Hospital Veterinário Tubarão" className="rounded-xl border-slate-200 dark:border-slate-800 h-12 bg-white/50 dark:bg-slate-900/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address" className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Endereço Principal</Label>
                                        <Input id="address" defaultValue="Av. Atlântica, 1500 - Balneário Camboriú" className="rounded-xl border-slate-200 dark:border-slate-800 h-12 bg-white/50 dark:bg-slate-900/50" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio" className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Sobre a Unidade (Apresentação)</Label>
                                    <Textarea
                                        id="bio"
                                        defaultValue="O Hospital Veterinário Tubarão é referência em alta complexidade na região sul, contando com 5 salas cirúrgicas de última geração e equipe 24h."
                                        className="rounded-xl border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50"
                                        rows={4}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl dark:bg-slate-900/50">
                            <CardHeader className="p-8">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="text-xl font-bold flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20">
                                                <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            Gerenciamento de Salas
                                        </CardTitle>
                                        <CardDescription className="dark:text-slate-400">Administre os espaços disponíveis para locação.</CardDescription>
                                    </div>
                                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-10 px-4">
                                        <Plus className="w-4 h-4 mr-2" /> Adicionar Sala
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="px-8 pb-8">
                                <div className="space-y-3">
                                    {[
                                        { name: "Sala Cirúrgica 01", type: "Cirurgia", price: "R$ 150/h" },
                                        { name: "Consultório 03", type: "Geral", price: "R$ 45/h" },
                                        { name: "Sala de Ultrassom", type: "Exame", price: "R$ 80/h" }
                                    ].map((s, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border dark:border-slate-700 group hover:border-indigo-400 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-2 h-10 bg-indigo-500 rounded-full" />
                                                <div>
                                                    <p className="font-bold text-slate-800 dark:text-white">{s.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase">{s.type} • {s.price}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-500">
                                                    <Plus className="w-4 h-4 rotate-45" /> {/* Edit hack */}
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Settings Area */}
                    <div className="lg:col-span-4 space-y-8">
                        <Card className="border-none shadow-xl dark:bg-slate-900/50">
                            <CardHeader className="p-8">
                                <CardTitle className="text-xl font-bold flex items-center gap-3">
                                    <Bell className="w-5 h-5 text-indigo-500" /> Operações
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-8 pb-8 space-y-6">
                                {[
                                    { id: "auto-app", l: "Aprovação Automática", d: "Aprovar salas para vets VIPs." },
                                    { id: "notif-req", l: "Notificar Direção", d: "Alertar novos pedidos." },
                                    { id: "telemed", l: "Canal Digital", d: "Habilitar salas virtuais." }
                                ].map(item => (
                                    <div key={item.id} className="flex items-start justify-between gap-4">
                                        <div className="space-y-1">
                                            <Label htmlFor={item.id} className="text-sm font-bold text-slate-800 dark:text-white leading-none">{item.l}</Label>
                                            <p className="text-[10px] text-slate-500 leading-tight">{item.d}</p>
                                        </div>
                                        <Switch id={item.id} defaultChecked />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl bg-slate-900 text-white overflow-hidden relative group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                <Shield className="w-20 h-20" />
                            </div>
                            <CardHeader className="p-8 relative z-10">
                                <CardTitle className="text-xl font-bold">Segurança</CardTitle>
                                <CardDescription className="text-slate-400 text-xs">Acesso restrito à gerência.</CardDescription>
                            </CardHeader>
                            <CardContent className="px-8 pb-8 space-y-6 relative z-10">
                                <div className="space-y-2">
                                    <Label htmlFor="pin" className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">PIN de Transação</Label>
                                    <Input id="pin" type="password" placeholder="****" className="rounded-xl border-slate-700 bg-slate-800 h-11 text-white text-center text-xl tracking-widest" maxLength={4} />
                                </div>
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl h-12 shadow-lg">Redefinir PIN</Button>
                            </CardContent>
                        </Card>

                        <div className="space-y-3">
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl h-14 shadow-lg shadow-indigo-500/20">
                                <Save className="w-5 h-5 mr-3" /> ATUALIZAR UNIDADE
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
