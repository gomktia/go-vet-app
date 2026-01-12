"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    ArrowLeft,
    Calendar as CalendarIcon,
    Plus,
    Clock,
    MapPin,
    Filter,
    ChevronLeft,
    ChevronRight,
    Users
} from "lucide-react"
import Link from "next/link"

export default function ClinicSchedulePage() {
    const rooms = ["Sala Cirúrgica 01", "Sala Cirúrgica 02", "Consultório 03", "Sala de Exames"]
    const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

    const appointments = [
        { room: "Sala Cirúrgica 01", start: "08:00", duration: 3, vet: "Dr. João", proc: "Cirurgia LCA" },
        { room: "Consultório 03", start: "10:00", duration: 1, vet: "Dra. Ana", proc: "Biopsia" },
        { room: "Sala de Exames", start: "09:00", duration: 2, vet: "Dr. Roberto", proc: "Ultrassom" },
        { room: "Sala Cirúrgica 02", start: "14:00", duration: 4, vet: "Dra. Maria", proc: "Ortopedia" },
    ]

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 pb-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard/clinic">
                            <Button variant="ghost" size="icon" className="rounded-full bg-white dark:bg-slate-900 shadow-sm border dark:border-slate-800">
                                <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Agenda de <span className="text-indigo-600 dark:text-indigo-400">Salas</span></h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Controle em tempo real da ocupação técnica da unidade.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-full dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm px-6">
                            <Filter className="w-4 h-4 mr-2" /> Filtrar Salas
                        </Button>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-700 dark:hover:bg-indigo-600 rounded-full shadow-lg shadow-indigo-500/20 px-8">
                            <Plus className="w-4 h-4 mr-2" /> Nova Reserva
                        </Button>
                    </div>
                </div>

                {/* Calendar Control */}
                <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-[2rem] shadow-sm border dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="rounded-full"><ChevronLeft className="w-5 h-5" /></Button>
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 text-indigo-500" />
                            <span className="font-black text-slate-800 dark:text-white">Hoje, 12 de Junho</span>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-full"><ChevronRight className="w-5 h-5" /></Button>
                    </div>
                    <div className="flex gap-2">
                        <Badge className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-none font-bold">DIA</Badge>
                        <Badge className="bg-transparent text-slate-400 border-none font-bold">SEMANA</Badge>
                        <Badge className="bg-transparent text-slate-400 border-none font-bold">MÊS</Badge>
                    </div>
                </div>

                {/* Schedule Grid */}
                <Card className="border-none shadow-xl dark:bg-slate-900/50 overflow-x-auto">
                    <CardContent className="p-0">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-6 border-b dark:border-slate-800 text-left min-w-[150px] bg-slate-50 dark:bg-slate-900/80 sticky left-0 z-20">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Recurso / Sala</span>
                                    </th>
                                    {hours.map(h => (
                                        <th key={h} className="p-6 border-b border-l dark:border-slate-800 text-center min-w-[120px]">
                                            <span className="text-xs font-bold text-slate-500">{h}</span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map(room => (
                                    <tr key={room}>
                                        <td className="p-6 border-b dark:border-slate-800 font-bold text-slate-800 dark:text-white bg-white dark:bg-slate-900/50 sticky left-0 z-20 shadow-[2px_0_10px_rgba(0,0,0,0.05)]">
                                            <div className="flex flex-col">
                                                <span className="text-sm">{room}</span>
                                                <span className="text-[9px] font-black text-indigo-500 uppercase tracking-tighter">Ativo</span>
                                            </div>
                                        </td>
                                        {hours.map(h => {
                                            const appt = appointments.find(a => a.room === room && a.start === h)
                                            if (appt) {
                                                return (
                                                    <td key={h} colSpan={appt.duration} className="p-2 border-b border-l dark:border-slate-800">
                                                        <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-2xl p-4 h-full group hover:shadow-lg transition-all cursor-pointer">
                                                            <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase mb-1">{appt.proc}</p>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-[10px] font-black">{appt.vet[4]}</div>
                                                                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{appt.vet}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                )
                                            }
                                            // Check if this hour is covered by a previous colSpan
                                            const isCovered = appointments.some(a =>
                                                a.room === room &&
                                                hours.indexOf(a.start) < hours.indexOf(h) &&
                                                hours.indexOf(a.start) + a.duration > hours.indexOf(h)
                                            )
                                            if (isCovered) return null

                                            return (
                                                <td key={h} className="border-b border-l dark:border-slate-800 group hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors cursor-crosshair">
                                                    <div className="h-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Plus className="w-4 h-4 text-slate-300" />
                                                    </div>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

                {/* KPIs & Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="border-none shadow-lg dark:bg-slate-900/50 bg-white">
                        <CardHeader>
                            <CardTitle className="text-sm font-black text-slate-400 uppercase tracking-widest">Ocupação Média</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-end justify-between">
                                <h3 className="text-4xl font-black text-slate-900 dark:text-white">72%</h3>
                                <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px]">+5% hoje</Badge>
                            </div>
                            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 rounded-full w-[72%]" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg dark:bg-slate-900/50 bg-white">
                        <CardHeader>
                            <CardTitle className="text-sm font-black text-slate-400 uppercase tracking-widest">Procedimentos de Hoje</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-6">
                            <h3 className="text-4xl font-black text-slate-900 dark:text-white text-center">14</h3>
                            <div className="flex-1 space-y-1">
                                <div className="flex justify-between text-[10px] font-bold">
                                    <span className="text-slate-500">CONCLUÍDOS</span>
                                    <span className="text-emerald-500">9</span>
                                </div>
                                <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                                    <div className="h-full bg-emerald-500 rounded-full w-[64%]" />
                                </div>
                                <div className="flex justify-between text-[10px] font-bold">
                                    <span className="text-slate-500">RESTANTES</span>
                                    <span className="text-indigo-500">5</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg bg-indigo-700 text-white overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                            <Users className="w-20 h-20" />
                        </div>
                        <CardContent className="p-8 relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-1">Vets Ativos Hoje</p>
                            <h3 className="text-3xl font-black mb-4">08 Parceiros</h3>
                            <p className="text-xs text-indigo-100 font-medium opacity-80 leading-relaxed mb-6">Aumento de 20% na utilização de salas por veterinários terceiros.</p>
                            <Button variant="outline" className="w-full border-indigo-400 text-white hover:bg-indigo-600 rounded-xl h-10 border-2">Ver Lista</Button>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}
