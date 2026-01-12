"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle2, FlaskConical, Syringe, Stethoscope } from "lucide-react"

const timelineEvents = [
    {
        id: 1,
        date: "15 Fev, 2026",
        title: "Vacina Antirrábica",
        pet: "Rex",
        icon: Syringe,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        status: "Concluído"
    },
    {
        id: 2,
        date: "10 Jan, 2026",
        title: "Exame de Sangue",
        pet: "Rex",
        icon: FlaskConical,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        status: "Concluído"
    },
    {
        id: 3,
        date: "05 Jan, 2026",
        title: "Check-up Trimestral",
        pet: "Rex",
        icon: Stethoscope,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        status: "Concluído"
    }
]

export function PetHealthTimeline() {
    return (
        <Card className="dark:bg-slate-900/50 dark:border-slate-800">
            <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    Timeline de Saúde
                </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
                <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500/50 before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
                    {timelineEvents.map((event) => (
                        <div key={event.id} className="relative flex items-center justify-between md:justify-start">
                            <div className="flex items-center w-full">
                                <div className={`p-2 rounded-full ${event.bgColor} z-10 shadow-sm border border-white dark:border-slate-900`}>
                                    <event.icon className={`w-5 h-5 ${event.color}`} />
                                </div>
                                <div className="ml-6 flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{event.title}</p>
                                        <time className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{event.date}</time>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-slate-500">{event.pet}</span>
                                        <Badge variant="outline" className="text-[9px] h-4 px-1 py-0 leading-none border-emerald-200 text-emerald-700 dark:border-emerald-900/50 dark:text-emerald-400">
                                            <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> {event.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
