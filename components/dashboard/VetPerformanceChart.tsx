"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
    { day: "Seg", consults: 4 },
    { day: "Ter", consults: 7 },
    { day: "Qua", consults: 5 },
    { day: "Qui", consults: 9 },
    { day: "Sex", consults: 6 },
    { day: "Sab", consults: 3 },
    { day: "Dom", consults: 0 },
]

export function VetPerformanceChart() {
    return (
        <Card className="dark:bg-slate-900/50 dark:border-slate-800 border-none shadow-md overflow-hidden bg-white">
            <CardHeader className="pb-0 pt-4 px-6">
                <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fluxo de Atendimento</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="h-40 w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorConsults" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#059669" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#64748b' }}
                                dy={10}
                            />
                            <YAxis hide />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    fontSize: '10px',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="consults"
                                stroke="#059669"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorConsults)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
