"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    PhoneOff,
    Mic,
    MicOff,
    Video,
    VideoOff,
    Settings,
    MessageSquare,
    Users,
    Share2,
    Maximize2,
    MoreVertical,
    Pipette,
    Heart,
    FileText
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function TelemedicineRoom() {
    const [isMuted, setIsMuted] = useState(false)
    const [isVideoOff, setIsVideoOff] = useState(false)

    return (
        <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 flex flex-col items-center">
            {/* Header Container */}
            <div className="w-full max-w-6xl flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                        <Video className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold leading-none">Consulta: Rex (Golden Retriever)</h1>
                        <p className="text-xs text-slate-400 mt-1">Duração: 12:45 • Qualidade: Excelente</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge className="bg-red-500/10 text-red-500 border-red-500/20 px-3 py-1 animate-pulse">
                        AO VIVO
                    </Badge>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                        <Settings className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Main Video Area */}
            <div className="w-full max-w-6xl grid lg:grid-cols-4 gap-6 flex-1 min-h-[500px]">
                {/* Remote Video (Pet/Tutor) */}
                <div className="lg:col-span-3 relative rounded-[2rem] overflow-hidden bg-slate-900 shadow-2xl group border border-white/5">
                    <img
                        src="/golden-retriever.png"
                        alt="Remote Feed"
                        className="w-full h-full object-cover opacity-80"
                    />

                    {/* Overlays */}
                    <div className="absolute top-6 left-6 flex gap-2">
                        <Badge className="bg-black/40 backdrop-blur-md border-none text-white px-3 py-1">
                            Maria (Tutor)
                        </Badge>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/40 backdrop-blur-md p-3 rounded-2xl flex gap-4">
                            <div className="flex items-center gap-2">
                                <Heart className="w-4 h-4 text-pink-500" />
                                <span className="text-xs font-bold">Rex: 88 bpm</span>
                            </div>
                            <div className="w-px h-4 bg-white/20" />
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-blue-400" />
                                <span className="text-xs font-bold">Estável</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Controls & Feed */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    {/* Local Feed */}
                    <div className="relative rounded-[2rem] overflow-hidden bg-slate-800 aspect-video lg:aspect-square shadow-xl border border-white/10 group">
                        <img
                            src="/caring-vet.png"
                            alt="Local Feed"
                            className={`w-full h-full object-cover transition-filter ${isVideoOff ? 'blur-2xl opacity-50' : ''}`}
                        />
                        {isVideoOff && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Avatar className="h-20 w-20 border-4 border-slate-700">
                                    <AvatarFallback className="bg-indigo-600 text-2xl font-bold italic">V</AvatarFallback>
                                </Avatar>
                            </div>
                        )}
                        <div className="absolute bottom-4 left-4">
                            <Badge className="bg-indigo-600/80 backdrop-blur-sm border-none">Você</Badge>
                        </div>
                    </div>

                    {/* Tools & Files */}
                    <div className="flex-1 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-6 space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Prontuário Rápido</h3>
                        <div className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start gap-3 bg-white/5 hover:bg-white/10 rounded-xl h-12 text-sm">
                                <FileText className="w-4 h-4 text-emerald-400" /> Histórico Clínico
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-3 bg-white/5 hover:bg-white/10 rounded-xl h-12 text-sm">
                                <Pipette className="w-4 h-4 text-blue-400" /> Prescrever Medicamento
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-3 bg-white/10 text-white rounded-xl h-12 text-sm border border-white/10">
                                <MessageSquare className="w-4 h-4 text-amber-400" /> Notas da Sessão
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Control Bar (Apple Floating Style) */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-900/80 backdrop-blur-2xl px-8 py-4 rounded-[2.5rem] border border-white/10 shadow-2xl z-50">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className={`h-12 w-12 rounded-full transition-all ${isMuted ? 'bg-red-500 text-white hover:bg-red-600' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
                >
                    {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={`h-12 w-12 rounded-full transition-all ${isVideoOff ? 'bg-red-500 text-white hover:bg-red-600' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
                >
                    {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                </Button>

                <div className="w-px h-8 bg-white/10 mx-2" />

                <Button className="h-12 px-8 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold flex gap-2 group shadow-lg shadow-red-600/20" asChild>
                    <Link href="/dashboard">
                        <PhoneOff className="w-5 h-5" /> Encerrar
                    </Link>
                </Button>

                <div className="w-px h-8 bg-white/10 mx-2" />

                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-slate-300 hover:bg-white/10 hover:text-white">
                    <Share2 className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-slate-300 hover:bg-white/10 hover:text-white">
                    <Maximize2 className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-slate-300 hover:bg-white/10 hover:text-white">
                    <MoreVertical className="w-5 h-5" />
                </Button>
            </div>
        </div>
    )
}
