"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Search, Utensils, Shield, Stethoscope, AlertTriangle, Microscope } from "lucide-react"
import Link from "next/link"

export default function HealthTipsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - será substituído por dados reais do banco
  const nutritionTips = [
    {
      id: 1,
      title: "Alimentação para Filhotes",
      category: "Nutrição",
      petType: "Cão",
      description: "Guia completo sobre alimentação adequada para filhotes de cães",
      content: "Filhotes precisam de uma dieta rica em proteínas e cálcio para desenvolvimento adequado...",
      image: "/puppy-eating.jpg",
      readTime: "5 min",
    },
    {
      id: 2,
      title: "Dieta para Gatos Idosos",
      category: "Nutrição",
      petType: "Gato",
      description: "Como adaptar a alimentação de gatos seniores",
      content: "Gatos idosos têm necessidades nutricionais específicas...",
      image: "/senior-cat-eating.jpg",
      readTime: "4 min",
    },
    {
      id: 3,
      title: "Alimentos Tóxicos para Pets",
      category: "Segurança",
      petType: "Todos",
      description: "Lista de alimentos que podem ser perigosos para seus pets",
      content: "Chocolate, cebola, uva e outros alimentos podem ser tóxicos...",
      image: "/toxic-foods.jpg",
      readTime: "3 min",
    },
  ]

  const diseases = [
    {
      id: 1,
      name: "Parvovirose Canina",
      type: "Viral",
      severity: "Alta",
      petType: "Cão",
      symptoms: ["Vômito", "Diarreia com sangue", "Letargia", "Perda de apetite"],
      prevention: "Vacinação adequada, evitar contato com animais não vacinados",
      treatment: "Hospitalização, fluidoterapia, medicação sintomática",
      prognosis: "Bom com tratamento precoce",
    },
    {
      id: 2,
      name: "Rinotraqueíte Felina",
      type: "Viral",
      severity: "Média",
      petType: "Gato",
      symptoms: ["Espirros", "Secreção nasal", "Conjuntivite", "Febre"],
      prevention: "Vacinação, evitar estresse, ambiente limpo",
      treatment: "Antibióticos, anti-inflamatórios, cuidados de suporte",
      prognosis: "Bom com tratamento adequado",
    },
    {
      id: 3,
      name: "Dermatite Atópica",
      type: "Alérgica",
      severity: "Média",
      petType: "Todos",
      symptoms: ["Coceira intensa", "Vermelhidão", "Descamação", "Feridas"],
      prevention: "Evitar alérgenos, higiene adequada, dieta balanceada",
      treatment: "Antialérgicos, shampoos medicamentosos, dieta hipoalergênica",
      prognosis: "Controlável com manejo adequado",
    },
  ]

  const exams = [
    {
      id: 1,
      name: "Hemograma Completo",
      type: "Sangue",
      indication: "Avaliação geral de saúde, investigação de infecções",
      preparation: "Jejum de 8-12 horas",
      duration: "Resultado em 24h",
      frequency: "Anual ou conforme indicação veterinária",
    },
    {
      id: 2,
      name: "Ultrassom Abdominal",
      type: "Imagem",
      indication: "Avaliação de órgãos internos, diagnóstico de massas",
      preparation: "Jejum de 8 horas, bexiga cheia",
      duration: "30-45 minutos",
      frequency: "Conforme indicação veterinária",
    },
    {
      id: 3,
      name: "Ecocardiograma",
      type: "Imagem",
      indication: "Avaliação da função cardíaca",
      preparation: "Não necessário jejum",
      duration: "20-30 minutos",
      frequency: "Anual para pets idosos ou com sopro",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Alta":
        return "destructive"
      case "Média":
        return "secondary"
      case "Baixa":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-emerald-800">VetCare</h1>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-emerald-800 mb-2">Informações de Saúde</h2>
          <p className="text-emerald-700">Dicas, informações sobre doenças e cuidados preventivos para seu pet</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar informações de saúde..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="nutrition" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="nutrition" className="flex items-center gap-2">
              <Utensils className="w-4 h-4" />
              Nutrição
            </TabsTrigger>
            <TabsTrigger value="diseases" className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              Doenças
            </TabsTrigger>
            <TabsTrigger value="prevention" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Prevenção
            </TabsTrigger>
            <TabsTrigger value="exams" className="flex items-center gap-2">
              <Microscope className="w-4 h-4" />
              Exames
            </TabsTrigger>
          </TabsList>

          {/* Nutrition Tab */}
          <TabsContent value="nutrition" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nutritionTips.map((tip) => (
                <Link key={tip.id} href={`/health-tips/nutrition/${tip.id}`} className="group block h-full">
                  <Card className="hover:shadow-xl transition-all border-none bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm overflow-hidden flex flex-col h-full pb-4">
                    <div className="flex flex-col h-full">
                      <div className="aspect-video bg-slate-200 dark:bg-slate-800 relative overflow-hidden flex-shrink-0">
                        <img
                          src={tip.image || "/placeholder.svg?height=200&width=300"}
                          alt={tip.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      <CardHeader className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400 border-none font-bold text-[10px] uppercase tracking-widest">{tip.petType}</Badge>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{tip.readTime}</span>
                        </div>
                        <div>
                          <CardTitle className="text-xl font-black text-slate-800 dark:text-white leading-tight mb-2 group-hover:text-emerald-600 transition-colors">{tip.title}</CardTitle>
                          <CardDescription className="text-sm font-medium text-slate-500 dark:text-slate-400 line-clamp-2 italic">{tip.description}</CardDescription>
                        </div>
                      </CardHeader>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Quick Nutrition Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-orange-600" />
                  Dicas Rápidas de Alimentação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Para Cães:</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Ração de qualidade adequada à idade</li>
                      <li>• Água fresca sempre disponível</li>
                      <li>• Evitar ossos cozidos</li>
                      <li>• Petiscos com moderação</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Para Gatos:</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Ração específica para felinos</li>
                      <li>• Múltiplas refeições pequenas</li>
                      <li>• Evitar leite e derivados</li>
                      <li>• Estimular consumo de água</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Diseases Tab */}
          <TabsContent value="diseases" className="space-y-6">
            <div className="space-y-4">
              {diseases.map((disease) => (
                <Card key={disease.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        {disease.name}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge variant="outline">{disease.petType}</Badge>
                        <Badge variant={getSeverityColor(disease.severity)}>{disease.severity}</Badge>
                        <Badge variant="secondary">{disease.type}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <h4 className="font-medium mb-2 text-red-600">Sintomas</h4>
                        <ul className="text-sm space-y-1">
                          {disease.symptoms.map((symptom, index) => (
                            <li key={index}>• {symptom}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 text-blue-600">Prevenção</h4>
                        <p className="text-sm">{disease.prevention}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 text-green-600">Tratamento</h4>
                        <p className="text-sm">{disease.treatment}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 text-purple-600">Prognóstico</h4>
                        <p className="text-sm">{disease.prognosis}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Prevention Tab */}
          <TabsContent value="prevention" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    Calendário de Vacinação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Cães</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>V8/V10 (1ª dose)</span>
                          <span>6-8 semanas</span>
                        </div>
                        <div className="flex justify-between">
                          <span>V8/V10 (2ª dose)</span>
                          <span>9-12 semanas</span>
                        </div>
                        <div className="flex justify-between">
                          <span>V8/V10 (3ª dose)</span>
                          <span>12-16 semanas</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Antirrábica</span>
                          <span>16 semanas</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>Reforço anual</span>
                          <span>Todas</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Controle de Parasitas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Vermifugação</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Filhotes: a cada 15 dias até 6 meses</li>
                        <li>• Adultos: a cada 3-6 meses</li>
                        <li>• Usar vermífugos de amplo espectro</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Controle de Pulgas e Carrapatos</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Aplicação mensal de antipulgas</li>
                        <li>• Inspeção regular da pele</li>
                        <li>• Tratamento do ambiente</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-600" />
                    Cuidados Diários
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• Escovação regular dos dentes</li>
                    <li>• Limpeza das orelhas semanalmente</li>
                    <li>• Corte das unhas mensalmente</li>
                    <li>• Banhos conforme necessário</li>
                    <li>• Exercícios diários adequados</li>
                    <li>• Ambiente limpo e seguro</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-emerald-600" />
                    Check-ups Regulares
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Filhotes (até 1 ano)</h4>
                      <p className="text-sm text-gray-600">Consultas mensais</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Adultos (1-7 anos)</h4>
                      <p className="text-sm text-gray-600">Consultas semestrais</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Idosos (7+ anos)</h4>
                      <p className="text-sm text-gray-600">Consultas trimestrais</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams" className="space-y-6">
            <div className="space-y-4">
              {exams.map((exam) => (
                <Card key={exam.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Microscope className="w-5 h-5 text-purple-600" />
                        {exam.name}
                      </CardTitle>
                      <Badge variant="outline">{exam.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <h4 className="font-medium mb-1 text-blue-600">Indicação</h4>
                        <p className="text-sm">{exam.indication}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1 text-orange-600">Preparação</h4>
                        <p className="text-sm">{exam.preparation}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1 text-green-600">Duração</h4>
                        <p className="text-sm">{exam.duration}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1 text-purple-600">Frequência</h4>
                        <p className="text-sm">{exam.frequency}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quando Solicitar Exames</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-2 text-red-600">Sinais de Alerta</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Perda de apetite prolongada</li>
                      <li>• Vômitos ou diarreia persistentes</li>
                      <li>• Mudanças no comportamento</li>
                      <li>• Dificuldade para urinar</li>
                      <li>• Tosse ou dificuldade respiratória</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-blue-600">Check-up Preventivo</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Hemograma anual</li>
                      <li>• Exames de função renal e hepática</li>
                      <li>• Raio-X de tórax (pets idosos)</li>
                      <li>• Ultrassom abdominal</li>
                      <li>• Exame oftalmológico</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-green-600">Pré-Cirúrgicos</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Hemograma completo</li>
                      <li>• Função renal e hepática</li>
                      <li>• Eletrocardiograma</li>
                      <li>• Raio-X de tórax</li>
                      <li>• Avaliação anestésica</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
