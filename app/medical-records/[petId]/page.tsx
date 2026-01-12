"use client"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Calendar, Pill, TestTube, Download, Eye, Edit, Stethoscope } from "lucide-react"
import { getMedicalRecords, type MedicalRecord } from "@/lib/medical-records"
import { pets } from "@/lib/pets"

export default function MedicalRecordsPage() {
  const params = useParams()
  const petId = params.petId as string
  const pet = pets.find((p) => p.id === petId)
  const records = getMedicalRecords(petId)

  const getTypeColor = (type: MedicalRecord["type"]) => {
    const colors = {
      consultation: "bg-blue-100 text-blue-800",
      surgery: "bg-red-100 text-red-800",
      vaccination: "bg-green-100 text-green-800",
      exam: "bg-purple-100 text-purple-800",
      emergency: "bg-orange-100 text-orange-800",
    }
    return colors[type]
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
    return <div>Pet não encontrado</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Prontuário Médico</h1>
              <p className="text-gray-600 mt-1">
                {pet.name} - {pet.species} - {pet.breed}
              </p>
            </div>
            <div className="flex gap-2">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Nova Consulta
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="records" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="records">Histórico</TabsTrigger>
            <TabsTrigger value="medications">Medicações</TabsTrigger>
            <TabsTrigger value="exams">Exames</TabsTrigger>
            <TabsTrigger value="vaccinations">Vacinas</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-4">
            {records.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum registro médico</h3>
                  <p className="text-gray-600 mb-4">Este pet ainda não possui registros médicos.</p>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Criar primeiro registro
                  </Button>
                </CardContent>
              </Card>
            ) : (
              records.map((record) => (
                <Card key={record.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getTypeColor(record.type)}>{getTypeLabel(record.type)}</Badge>
                          <Badge variant="outline">{new Date(record.date).toLocaleDateString("pt-BR")}</Badge>
                        </div>
                        <CardTitle className="text-xl">{record.diagnosis}</CardTitle>
                        <CardDescription>Dr. {record.vetName} - CRMV SP-12345</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Sintomas</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {record.symptoms.map((symptom, index) => (
                            <li key={index}>• {symptom}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Tratamento</h4>
                        <p className="text-sm text-gray-600">{record.treatment}</p>
                      </div>
                    </div>

                    {record.medications.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Medicações Prescritas</h4>
                        <div className="space-y-2">
                          {record.medications.map((med) => (
                            <div key={med.id} className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{med.name}</span>
                                <Badge variant="outline">{med.dosage}</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {med.frequency} por {med.duration}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {record.notes && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Observações</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{record.notes}</p>
                      </div>
                    )}

                    {record.nextAppointment && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600">
                        <Calendar className="h-4 w-4" />
                        Próxima consulta: {new Date(record.nextAppointment).toLocaleDateString("pt-BR")}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="medications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5" />
                  Medicações Ativas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {records
                    .flatMap((r) => r.medications)
                    .map((med) => (
                      <div key={med.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{med.name}</h3>
                            <p className="text-sm text-gray-600">
                              {med.dosage} - {med.frequency}
                            </p>
                            <p className="text-sm text-gray-500">Duração: {med.duration}</p>
                          </div>
                          <Badge>Ativa</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{med.instructions}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exams">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="h-5 w-5" />
                  Exames Realizados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {records
                    .flatMap((r) => r.exams)
                    .map((exam) => (
                      <div key={exam.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{exam.type}</h3>
                            <p className="text-sm text-gray-600">{exam.result}</p>
                            <p className="text-sm text-gray-500">{new Date(exam.date).toLocaleDateString("pt-BR")}</p>
                          </div>
                          <Badge
                            className={
                              exam.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : exam.status === "abnormal"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {exam.status === "completed"
                              ? "Normal"
                              : exam.status === "abnormal"
                                ? "Alterado"
                                : "Pendente"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vaccinations">
            <Card>
              <CardHeader>
                <CardTitle>Cartão de Vacinação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-600">Funcionalidade em desenvolvimento</p>
                  <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">Adicionar Vacina</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
