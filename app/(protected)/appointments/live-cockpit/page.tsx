"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
    Heart,
    Clock,
    CheckCircle2,
    MessageCircle,
    Share2,
    AlertTriangle,
    Activity,
    Thermometer,
    Stethoscope,
    Send,
    Smartphone
} from "lucide-react"
import Link from "next/link"

// Simulação de estados da cirurgia
type SurgeryStep = "checkin" | "anesthesia" | "surgery" | "recovery" | "finished"

export default function SurgeryCockpitPage() {
    const [currentStep, setCurrentStep] = useState<SurgeryStep>("anesthesia")
    const [elapsedTime, setElapsedTime] = useState(0)
    const [isTimerRunning, setIsTimerRunning] = useState(true)
    const [vitals, setVitals] = useState({ bpm: 88, spo2: 98, temp: 38.5 })

    // Simula sinais vitais mudando
    useEffect(() => {
        const interval = setInterval(() => {
            setVitals(v => ({
                bpm: 85 + Math.floor(Math.random() * 10),
                spo2: 97 + Math.floor(Math.random() * 3),
                temp: 38.0 + Math.random()
            }))
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    // Timer da cirurgia
    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isTimerRunning) {
            interval = setInterval(() => {
                setElapsedTime(prev => prev + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isTimerRunning])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const steps = [
        { id: "checkin", label: "Check-in", icon: CheckCircle2 },
        { id: "anesthesia", label: "Anestesia", icon: Stethoscope },
        { id: "surgery", label: "Cirurgia", icon: Activity },
        { id: "recovery", label: "Recuperação", icon: Heart },
        { id: "finished", label: "Alta", icon: Share2 },
    ]

    const messages = {
        checkin: "Thor acabou de dar entrada na clínica. Tudo pronto para começar!",
        anesthesia: "Thor já está sendo anestesiado. Sinais vitais estáveis. Dormindo tranquilo.",
        surgery: "Cirurgia iniciada. Nossa equipe está 100% focada no procedimento.",
        recovery: "Procedimento finalizado! Thor está acordando da anestesia muito bem.",
        finished: "Tudo certo! Thor já está pronto para receber carinho. Pode vir buscar!"
    }

    const handleNextStep = () => {
        const currentIndex = steps.findIndex(s => s.id === currentStep)
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1].id as SurgeryStep)
        }
    }

    const getProgress = () => {
        const currentIndex = steps.findIndex(s => s.id === currentStep)
        return ((currentIndex + 1) / steps.length) * 100
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 font-sans">
            <div className="container mx-auto max-w-6xl space-y-6">

                {/* Header - Patient Info */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                            <span className="text-2xl">🐶</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Thor (Golden Retriever)</h1>
                            <p className="text-slate-500 flex items-center gap-2">
                                <span className="font-semibold text-emerald-600">Procedimento:</span>
                                Castração Eletiva
                                <span className="text-slate-300">|</span>
                                <span className="text-slate-400 text-sm">Tutor: Maria Silva</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-right hidden md:block">
                            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Tempo Decorrido</p>
                            <p className="text-3xl font-mono font-bold text-slate-700">{formatTime(elapsedTime)}</p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => setIsTimerRunning(!isTimerRunning)}>
                            {isTimerRunning ? "Pausar" : "Retomar"}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column - Vitals & Actions */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Vitals Monitor */}
                        <Card className="bg-slate-900 border-slate-800 text-emerald-400 relative overflow-hidden">
                            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent animate-pulse" />
                            <CardHeader className="pb-2">
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Activity className="w-5 h-5 animate-pulse" /> Monitoramento em Tempo Real
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="p-4 bg-slate-800/50 rounded-lg">
                                        <div className="text-slate-400 text-xs uppercase mb-1 flex items-center justify-center gap-1"><Heart className="w-3 h-3" /> BPM</div>
                                        <div className="text-4xl font-mono font-bold text-emerald-400">{vitals.bpm}</div>
                                    </div>
                                    <div className="p-4 bg-slate-800/50 rounded-lg">
                                        <div className="text-slate-400 text-xs uppercase mb-1 flex items-center justify-center gap-1"><Activity className="w-3 h-3" /> SpO2</div>
                                        <div className="text-4xl font-mono font-bold text-blue-400">{vitals.spo2}%</div>
                                    </div>
                                    <div className="p-4 bg-slate-800/50 rounded-lg">
                                        <div className="text-slate-400 text-xs uppercase mb-1 flex items-center justify-center gap-1"><Thermometer className="w-3 h-3" /> Temp</div>
                                        <div className="text-4xl font-mono font-bold text-amber-400">{vitals.temp.toFixed(1)}°C</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Center */}
                        <Card className="border-emerald-100 shadow-md">
                            <CardHeader className="bg-emerald-50/50 border-b border-emerald-50">
                                <CardTitle className="text-emerald-900">Cockpit de Controle</CardTitle>
                                <CardDescription>Gerencie o fluxo do procedimento e comunique o tutor.</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                {/* Stepper */}
                                <div className="relative mb-8">
                                    <Progress value={getProgress()} className="h-2 mb-4 bg-slate-100" />
                                    <div className="flex justify-between relative">
                                        {steps.map((step, index) => {
                                            const isActive = step.id === currentStep
                                            const isPast = steps.findIndex(s => s.id === currentStep) > index
                                            return (
                                                <div key={step.id} className="flex flex-col items-center gap-2 relative z-10">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${isActive ? "bg-emerald-600 border-warehouse-600 text-white shadow-lg scale-110" :
                                                            isPast ? "bg-emerald-100 border-emerald-200 text-emerald-700" :
                                                                "bg-white border-slate-200 text-slate-300"
                                                        }`}>
                                                        <step.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className={`text-xs font-semibold ${isActive ? "text-emerald-700" : "text-slate-400"}`}>{step.label}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl flex flex-col items-center text-center space-y-4">
                                    <h3 className="text-lg font-bold text-slate-800">
                                        Etapa Atual: <span className="text-emerald-600">{steps.find(s => s.id === currentStep)?.label}</span>
                                    </h3>
                                    <p className="text-slate-500 max-w-md">
                                        Ao avançar, o sistema enviará automaticamente uma notificação para o tutor informando o novo status.
                                    </p>
                                    <Button size="lg" className="w-full max-w-sm bg-emerald-600 hover:bg-emerald-700 h-12 text-lg shadow-emerald-200 shadow-lg" onClick={handleNextStep}>
                                        Concluir Etapa e Notificar <Send className="ml-2 w-5 h-5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                    </div>

                    {/* Right Column - Client Preview */}
                    <div className="space-y-6">
                        <Card className="bg-slate-50 border-slate-200 h-full">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-slate-700">
                                    <Smartphone className="w-5 h-5" /> Visão do Tutor
                                </CardTitle>
                                <CardDescription>Simulação do WhatsApp/App do Cliente</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-inner max-w-[280px] mx-auto h-[500px] flex flex-col relative overflow-hidden">
                                    {/* Mock Phone Header */}
                                    <div className="bg-[#075E54] text-white p-3 -m-4 mb-4 flex items-center gap-2">
                                        <div className="w-8 h-8 bg-white/20 rounded-full" />
                                        <div>
                                            <p className="text-sm font-bold">VetCare Bot</p>
                                            <p className="text-[10px] opacity-80">Online</p>
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 space-y-4 overflow-y-auto p-2 scrollbar-hide">
                                        <div className="bg-[#DCF8C6] p-3 rounded-lg rounded-tl-none self-start text-xs shadow-sm max-w-[90%] text-slate-800">
                                            Olá Maria, aqui é do VetCare. Vamos cuidar muito bem do Thor hoje! 🐶
                                            <span className="block text-[10px] text-right text-slate-400 mt-1">08:00</span>
                                        </div>

                                        {steps.map((step, index) => {
                                            const isCurrentOrPast = steps.findIndex(s => s.id === currentStep) >= index
                                            if (!isCurrentOrPast) return null

                                            return (
                                                <div key={step.id} className="bg-[#DCF8C6] p-3 rounded-lg rounded-tl-none self-start text-xs shadow-sm max-w-[90%] text-slate-800 animate-in slide-in-from-left-2 fade-in duration-500">
                                                    <strong>Status: {step.label}</strong><br />
                                                    {messages[step.id as SurgeryStep]}
                                                    <span className="block text-[10px] text-right text-slate-400 mt-1">
                                                        {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* Input Placeholder */}
                                    <div className="mt-2 text-center text-[10px] text-slate-400">
                                        O tutor recebe atualizações em tempo real.
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    )
}
