"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

const data = [
    { month: "Set", weight: 28.5 },
    { month: "Out", weight: 29.2 },
    { month: "Nov", weight: 29.0 },
    { month: "Dez", weight: 30.1 },
    { month: "Jan", weight: 31.0 },
    { month: "Fev", weight: 30.5 },
]

export function PetWeightChart() {
    return (
        <Card className="dark:bg-slate-900/50 dark:border-slate-800 border-none shadow-md overflow-hidden">
            <CardHeader className="pb-0 pt-4 px-4">
                <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-tight">Evolução do Peso (kg)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="h-48 w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.1} />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#64748b' }}
                                dy={10}
                            />
                            <YAxis hide domain={['dataMin - 2', 'dataMax + 2']} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#0f172a',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: '#fff',
                                    fontSize: '12px'
                                }}
                                itemStyle={{ color: '#10b981' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="weight"
                                stroke="#10b981"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorWeight)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
