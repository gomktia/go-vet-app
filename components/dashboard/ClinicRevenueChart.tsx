"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

const data = [
    { specialty: "Ortopedia", revenue: 12500, color: "#6366f1" },
    { specialty: "Cardio", revenue: 8400, color: "#10b981" },
    { specialty: "Dermato", revenue: 6200, color: "#f59e0b" },
    { specialty: "Geral", revenue: 4100, color: "#3b82f6" },
]

export function ClinicRevenueChart() {
    return (
        <Card className="dark:bg-slate-900/50 dark:border-slate-800 border-none shadow-md overflow-hidden">
            <CardHeader className="pb-2 px-6">
                <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Receita por Especialidade (Mensal)</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" opacity={0.1} />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="specialty"
                                type="category"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 'bold' }}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{
                                    backgroundColor: '#0f172a',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: '#fff',
                                    fontSize: '12px'
                                }}
                                formatter={(value) => [`R$ ${value}`, 'Receita']}
                            />
                            <Bar dataKey="revenue" radius={[0, 8, 8, 0]} barSize={20}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
