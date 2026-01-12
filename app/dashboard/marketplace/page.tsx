"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Search, Star, Stethoscope, AlertCircle, Building2, CalendarCheck, TrendingUp } from "lucide-react"
import { clinics } from "@/lib/clinics"
import Link from "next/link"

export default function MarketplacePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-emerald-800">Rede de Clínicas Parceiras</h1>
                    <p className="text-gray-600">Alugue salas cirúrgicas e encontre novas oportunidades de atendimento.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <MapPin className="mr-2 h-4 w-4" /> Mapa
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <CalendarCheck className="mr-2 h-4 w-4" /> Minhas Reservas
                    </Button>
                </div>
            </div>

            <div className="flex gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Buscar por cidade, equipamento ou nome da clínica..." className="pl-10" />
                </div>
                <Button variant="secondary">Filtros Avançados</Button>
            </div>

            <Tabs defaultValue="available" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="available">Salas Disponíveis</TabsTrigger>
                    <TabsTrigger value="opportunities" className="relative">
                        Oportunidades & Leads
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="available" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clinics.map((clinic) => (
                        <Card key={clinic.id} className="overflow-hidden hover:shadow-lg transition-shadow border-emerald-100">
                            <div className="h-40 bg-gray-200 relative">
                                {/* Placeholder for clinic image */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                                    <Building2 className="w-12 h-12 opacity-20" />
                                </div>
                                {clinic.isPartner && (
                                    <Badge className="absolute top-2 right-2 bg-emerald-500 hover:bg-emerald-600">Parceiro Verificado</Badge>
                                )}
                            </div>

                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg text-emerald-900">{clinic.name}</CardTitle>
                                        <CardDescription className="flex items-center mt-1">
                                            <MapPin className="w-3 h-3 mr-1" /> {clinic.city}, {clinic.state}
                                        </CardDescription>
                                    </div>
                                    {clinic.rating && (
                                        <div className="flex items-center bg-amber-50 px-2 py-1 rounded text-amber-700 text-xs font-bold">
                                            <Star className="w-3 h-3 mr-1 fill-current" /> {clinic.rating}
                                        </div>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4 text-sm">
                                <p className="text-gray-600 line-clamp-2">{clinic.description || "Clínica parceira com estrutura completa para cirurgias e internação."}</p>

                                <div>
                                    <p className="font-semibold text-gray-700 mb-2">Equipamentos Disponíveis:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {clinic.equipment && clinic.equipment.length > 0 ? (
                                            clinic.equipment.slice(0, 3).map((eq, i) => (
                                                <Badge key={i} variant="secondary" className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200">
                                                    {eq}
                                                </Badge>
                                            ))
                                        ) : (
                                            <span className="text-gray-400 italic text-xs">Consulta básica apenas</span>
                                        )}
                                        {clinic.equipment && clinic.equipment.length > 3 && (
                                            <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">+{clinic.equipment.length - 3}</Badge>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                    <div className="text-xs text-gray-500">Valor Sala/Hora</div>
                                    <div className="font-bold text-emerald-700 text-lg">R$ {clinic.rentalPricePerHour || 0},00</div>
                                </div>
                            </CardContent>

                            <CardFooter>
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Ver Detalhes e Reservar</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="opportunities">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <TrendingUp className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-blue-900">Alta Demanda Detectada!</h3>
                                <p className="text-blue-700 mt-1">Clínicas na região de <span className="font-bold">Tubarão e Araranguá</span> reportam falta de especialistas em <span className="font-bold">Dermatologia</span>. Aproveite para ofertar seus serviços e preencher sua agenda.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {clinics.filter(c => c.pendingDemand && c.pendingDemand.length > 0).map(clinic => (
                            <Card key={clinic.id} className="border-l-4 border-l-blue-500">
                                <CardContent className="flex items-center justify-between p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-400">
                                            {clinic.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-gray-900">{clinic.name}</h4>
                                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> {clinic.city}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        {clinic.pendingDemand?.map((demand, i) => (
                                            <div key={i} className="text-center px-4 py-2 bg-blue-50 rounded-lg border border-blue-100">
                                                <div className="font-bold text-2xl text-blue-700">{demand.count}</div>
                                                <div className="text-xs font-semibold text-blue-900 uppercase tracking-wide">Pacientes {demand.specialty}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <Button className="bg-blue-600 hover:bg-blue-700">Contatar Clínica</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
