"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Activity, Heart, ShieldCheck } from "lucide-react"

interface PetHealthScoreProps {
    petName: string
    score: number // 0 to 100
    lastUpdate: string
}

export function PetHealthScore({ petName, score, lastUpdate }: PetHealthScoreProps) {
    const getScoreColor = (s: number) => {
        if (s >= 80) return "text-emerald-500"
        if (s >= 50) return "text-amber-500"
        return "text-red-500"
    }

    const getScoreBg = (s: number) => {
        if (s >= 80) return "bg-emerald-500"
        if (s >= 50) return "bg-amber-500"
        return "bg-red-500"
    }

    return (
        <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                        Saúde de {petName}
                    </CardTitle>
                    <span className={`text-2xl font-black ${getScoreColor(score)}`}>{score}</span>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative pt-1">
                    <Progress value={score} className="h-3 bg-white/10" indicatorClassName={getScoreBg(score)} />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                            <Activity className="w-3 h-3" /> Atividade
                        </div>
                        <div className="font-bold text-emerald-400">Excelente</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                            <Heart className="w-3 h-3" /> Batimentos
                        </div>
                        <div className="font-bold text-emerald-400">82 bpm</div>
                    </div>
                </div>

                <p className="text-[10px] text-slate-500 text-right italic">Última atualização: {lastUpdate}</p>
            </CardContent>
        </Card>
    )
}
