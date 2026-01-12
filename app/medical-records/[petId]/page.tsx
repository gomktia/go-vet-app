"use client"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Calendar, Pill, TestTube, Download, Eye, Edit, Stethoscope, Heart } from "lucide-react"
import { getMedicalRecords, type MedicalRecord } from "@/lib/medical-records"
import { pets } from "@/lib/pets"

export default function MedicalRecordsPage() {
  const params = useParams()
  const petId = params.petId as string
  const pet = pets.find((p) => p.id === petId)
  const records = getMedicalRecords(petId)

  const getTypeStyle = (type: MedicalRecord["type"]) => {
    const styles = {
      consultation: "bg-blue-100 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
      surgery: "bg-rose-100 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400",
      vaccination: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
      exam: "bg-purple-100 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400",
      emergency: "bg-amber-100 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400",
    }
    return styles[type]
  }

  const getTypeLabel = (type: MedicalRecord["type"]) => {
    const labels = {
      consultation: "Consulta",
      surgery: "Cirurgia",
      vaccination: "Vacinação",
      exam: "Exame",
      emergency: "Emergência",
    }
    return labels[type]
  }

  if (!pet) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold">Pet não encontrado</div>
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 pb-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-[2.5rem] bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden relative group">
              <img src={pet.avatar || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&auto=format&fit=crop"} alt={pet.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Prontuário <span className="text-indigo-600 dark:text-indigo-400">Médico</span></h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {pet.name} • <span className="uppercase text-[10px] font-black tracking-widest">{pet.species} - {pet.breed}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-full dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm px-6">
              <Download className="w-4 h-4 mr-2" /> Exportar PDF
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-full shadow-lg shadow-emerald-500/20 px-8">
              <Plus className="w-4 h-4 mr-2" /> Novo Registro
            </Button>
          </div>
        </div>

        <Tabs defaultValue="records" className="space-y-10">
          <TabsList className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border dark:border-slate-800 p-1.5 rounded-2xl h-auto">
            <TabsTrigger value="records" className="rounded-xl px-8 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-md font-bold text-xs transition-all tracking-widest uppercase">Histórico</TabsTrigger>
            <TabsTrigger value="medications" className="rounded-xl px-8 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-md font-bold text-xs transition-all tracking-widest uppercase">Medicações</TabsTrigger>
            <TabsTrigger value="exams" className="rounded-xl px-8 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-md font-bold text-xs transition-all tracking-widest uppercase">Exames</TabsTrigger>
            <TabsTrigger value="vaccinations" className="rounded-xl px-8 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-md font-bold text-xs transition-all tracking-widest uppercase">Vacinas</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {records.length === 0 ? (
              <Card className="border-none shadow-xl dark:bg-slate-900/50 p-12 text-center">
                <Stethoscope className="h-20 w-20 text-slate-200 dark:text-slate-800 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Sem registros ainda</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs mx-auto">Tudo limpo! {pet.name} ainda não possui ocorrências clínicas registradas.</p>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8">Abrir Ficha Clínica</Button>
              </Card>
            ) : (
              records.map((record) => (
                <Card key={record.id} className="border-none shadow-xl dark:bg-slate-900/50 overflow-hidden group hover:shadow-indigo-500/10 transition-all duration-500">
                  <CardHeader className="p-8 border-b dark:border-slate-800 relative">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Stethoscope className="w-24 h-24" />
                    </div>
                    <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative z-10">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <Badge className={`${getTypeStyle(record.type)} border-none font-black text-[10px] px-3 py-1 uppercase tracking-widest`}>{getTypeLabel(record.type)}</Badge>
                          <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-tighter">
                            <Calendar className="w-3 h-3" />
                            {new Date(record.date).toLocaleDateString("pt-BR", { day: '2-digit', month: 'long', year: 'numeric' })}
                          </div>
                        </div>
                        <CardTitle className="text-3xl font-black text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">{record.diagnosis}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-2 font-bold text-slate-500">
                          <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[8px] font-black">V</div>
                          Dr. {record.vetName} • CRMV SP-12345
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="secondary" size="icon" className="rounded-xl h-12 w-12 bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm">
                          <Eye className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                        </Button>
                        <Button variant="secondary" size="icon" className="rounded-xl h-12 w-12 bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm">
                          <Edit className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-12 gap-10">
                      <div className="md:col-span-5 space-y-6">
                        <div>
                          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Anamnese / Sintomas</h4>
                          <div className="flex flex-wrap gap-2">
                            {record.symptoms.map((symptom, index) => (
                              <Badge key={index} variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-none font-bold text-[10px] px-3 py-1">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Plano Terapêutico</h4>
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-2 border-indigo-500 pl-4">{record.treatment}</p>
                        </div>
                      </div>

                      <div className="md:col-span-7 space-y-6">
                        {record.medications.length > 0 && (
                          <div className="bg-slate-50/50 dark:bg-slate-800/20 rounded-[2rem] p-6 border dark:border-slate-800">
                            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 flex items-center gap-2">
                              <Pill className="w-4 h-4 text-rose-500" /> Medicações Prescritas
                            </h4>
                            <div className="space-y-4">
                              {record.medications.map((med) => (
                                <div key={med.id} className="flex items-center justify-between group/med">
                                  <div>
                                    <span className="font-bold text-slate-800 dark:text-white block">{med.name}</span>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                                      {med.frequency} • {med.duration}
                                    </p>
                                  </div>
                                  <Badge className="bg-white dark:bg-slate-800 text-[9px] font-black text-slate-500 border dark:border-slate-700">{med.dosage}</Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {record.notes && (
                          <div className="p-6 rounded-[2rem] bg-indigo-50/30 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/30">
                            <h4 className="text-[10px] font-black uppercase text-indigo-500 tracking-widest mb-3">Observações do Vet</h4>
                            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed">{record.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {record.nextAppointment && (
                      <div className="mt-8 pt-6 border-t dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                          <Calendar className="h-5 w-5" />
                          Retorno Sugerido: {new Date(record.nextAppointment).toLocaleDateString("pt-BR")}
                        </div>
                        <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-500 transition-colors">Confirmar Agendamento</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="medications" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-none shadow-xl dark:bg-slate-900/50 overflow-hidden">
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3">
                  <Pill className="h-6 w-6 text-rose-500" /> Farmácia Digital
                </CardTitle>
                <CardDescription className="dark:text-slate-400">Todo o histórico de medicamentos prescritos.</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {records
                    .flatMap((r) => r.medications)
                    .map((med) => (
                      <div key={med.id} className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border dark:border-slate-700 hover:border-indigo-400 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-black text-slate-800 dark:text-white">{med.name}</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                              {med.dosage} - {med.frequency}
                            </p>
                          </div>
                          <Badge className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border-none font-black text-[9px] px-3">ATIVA</Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{med.instructions}</p>
                        <div className="pt-4 border-t dark:border-slate-700 flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase">Duração: {med.duration}</span>
                          <Button variant="ghost" size="sm" className="text-[10px] font-black text-indigo-500 hover:text-indigo-600">RECOMPRAR</Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exams" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-none shadow-xl dark:bg-slate-900/50 overflow-hidden">
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3">
                  <TestTube className="h-6 w-6 text-purple-500" /> Central de Exames
                </CardTitle>
                <CardDescription className="dark:text-slate-400">Análises clínicas e diagnósticos por imagem.</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-4">
                  {records
                    .flatMap((r) => r.exams)
                    .map((exam) => (
                      <div key={exam.id} className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border dark:border-slate-700 group hover:bg-white dark:hover:bg-slate-800 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center">
                            <TestTube className="w-6 h-6 text-purple-500" />
                          </div>
                          <div>
                            <h3 className="font-black text-lg text-slate-800 dark:text-white leading-tight">{exam.type}</h3>
                            <p className="text-xs font-bold text-slate-500 italic mt-1">{exam.result}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{new Date(exam.date).toLocaleDateString("pt-BR")}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge
                            className={`text-[10px] font-black uppercase tracking-widest px-4 py-1 border-none ${exam.status === "completed"
                              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                              : exam.status === "abnormal"
                                ? "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400"
                                : "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
                              }`}
                          >
                            {exam.status === "completed" ? "Normal" : exam.status === "abnormal" ? "Alterado" : "Pendente"}
                          </Badge>
                          <Button variant="outline" size="icon" className="rounded-xl h-12 w-12"><Download className="w-5 h-5" /></Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vaccinations" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-none shadow-xl dark:bg-slate-900/50 p-12 text-center">
              <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Heart className="h-10 w-10 text-indigo-500 animate-pulse" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Cartão de Vacinação v2.0</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">Em breve sua carteira de vacinação digital estará sincronizada com o prontuário global.</p>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8">Habilitar Alertas</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
