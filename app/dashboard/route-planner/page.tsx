"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Calendar, Clock, Navigation, CheckCircle2, AlertCircle, Building2 } from "lucide-react"
import { mockAppointments } from "@/lib/appointments"
import { clinics } from "@/lib/clinics"

export default function RoutePlannerPage() {
    const [startCity, setStartCity] = useState("Tubarão")
    const [selectedDate, setSelectedDate] = useState("2026-02-15")
    const [isOptimizing, setIsOptimizing] = useState(false)

    // Filter appointments for the selected date (mock logic)
    const routeAppointments = mockAppointments.filter(apt => apt.date.startsWith(selectedDate))

    const handleOptimize = () => {
        setIsOptimizing(true)
        setTimeout(() => setIsOptimizing(false), 1500) // Simulating API call
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-emerald-800">Planejador de Rotas Inteligente</h1>
                    <p className="text-gray-600">Otimize seus atendimentos entre cidades e maximize seu faturamento.</p>
                </div>
                <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleOptimize}
                    disabled={isOptimizing}
                >
                    {isOptimizing ? (
                        <>
                            <Clock className="mr-2 h-4 w-4 animate-spin" /> Otimizando...
                        </>
                    ) : (
                        <>
                            <Navigation className="mr-2 h-4 w-4" /> Gerar Melhor Rota
                        </>
                    )}
                </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Configuration */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Configuração da Viagem</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Cidade de Partida (Base)</Label>
                                <div className="flex items-center gap-2">
                                    <MapPin className="text-emerald-600 w-5 h-5" />
                                    <Input
                                        value={startCity}
                                        onChange={(e) => setStartCity(e.target.value)}
                                        placeholder="Ex: Tubarão"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Data da Viagem</Label>
                                <div className="flex items-center gap-2">
                                    <Calendar className="text-emerald-600 w-5 h-5" />
                                    <Input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-emerald-50 border-emerald-200">
                        <CardHeader>
                            <CardTitle className="text-emerald-800 text-lg">Resumo da Rota</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm text-emerald-900">
                                <div className="flex justify-between">
                                    <span>Distância Total:</span>
                                    <span className="font-bold">245 km</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tempo de Estrada:</span>
                                    <span className="font-bold">3h 20min</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Atendimentos:</span>
                                    <span className="font-bold">{routeAppointments.length}</span>
                                </div>
                                <div className="pt-2 border-t border-emerald-200 flex justify-between text-base">
                                    <span>Faturamento Estimado:</span>
                                    <span className="font-bold text-emerald-700">R$ 2.250,00</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Route Timeline */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cronograma Otimizado</CardTitle>
                            <CardDescription>Sequência ideal para economizar tempo e combustível</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="relative border-l-2 border-emerald-100 ml-4 space-y-8 pb-4">

                                {/* Start Point */}
                                <div className="relative pl-8">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-sm" />
                                    <h3 className="font-semibold text-lg text-gray-800">Partida de {startCity}</h3>
                                    <p className="text-sm text-gray-500">08:00</p>
                                </div>

                                {routeAppointments.map((apt, index) => (
                                    <div key={apt.id} className="relative pl-8">
                                        {/* Timeline Dot */}
                                        <div className={`absolute -left-[9px] top-6 w-4 h-4 rounded-full border-4 border-white shadow-sm
                      ${apt.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}`}
                                        />

                                        <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <Badge variant="outline" className="mb-2 bg-emerald-50 text-emerald-700 border-emerald-200">
                                                        {apt.city}
                                                    </Badge>
                                                    <h4 className="font-bold text-gray-900">{apt.type === 'surgery' ? 'Cirurgia' : 'Consulta'} - {apt.petName}</h4>
                                                    <p className="text-sm text-gray-600 flex items-center gap-1">
                                                        <Building2 className="w-3 h-3" />
                                                        {apt.clinicName || "Atendimento Domiciliar"}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-lg">{new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                    <p className="text-xs text-gray-400">{apt.duration} min</p>
                                                </div>
                                            </div>

                                            {/* Status da Sala (Feature SaaS) */}
                                            {apt.clinicName && (
                                                <div className="mt-3 bg-gray-50 p-2 rounded text-xs flex items-center justify-between">
                                                    <span className="text-gray-600">Status da Sala/Recurso:</span>
                                                    {apt.roomStatus === 'approved' ? (
                                                        <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                                                            <CheckCircle2 className="w-3 h-3 mr-1" /> Confirmada
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                                                            <AlertCircle className="w-3 h-3 mr-1" /> Aguardando Clínica
                                                        </Badge>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
