"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, FileText, Shield } from "lucide-react"
import { pets } from "@/lib/pets"
import { getCurrentUser } from "@/lib/auth"

interface PrescriptionMedication {
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
}

export default function CreatePrescriptionPage() {
  const [selectedPet, setSelectedPet] = useState("")
  const [medications, setMedications] = useState<PrescriptionMedication[]>([
    { name: "", dosage: "", frequency: "", duration: "", instructions: "" },
  ])
  const [notes, setNotes] = useState("")
  const user = getCurrentUser()

  const addMedication = () => {
    setMedications([...medications, { name: "", dosage: "", frequency: "", duration: "", instructions: "" }])
  }

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index))
  }

  const updateMedication = (index: number, field: keyof PrescriptionMedication, value: string) => {
    const updated = medications.map((med, i) => (i === index ? { ...med, [field]: value } : med))
    setMedications(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui salvaria a prescrição
    console.log("Prescrição criada:", { selectedPet, medications, notes })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Nova Prescrição</h1>
          <p className="text-gray-600 mt-1">Criar prescrição médica digital</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seleção do Pet */}
          <Card>
            <CardHeader>
              <CardTitle>Informações do Paciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pet">Selecionar Pet</Label>
                  <Select value={selectedPet} onValueChange={setSelectedPet}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha o pet" />
                    </SelectTrigger>
                    <SelectContent>
                      {pets.map((pet) => (
                        <SelectItem key={pet.id} value={pet.id}>
                          {pet.name} - {pet.species} ({pet.breed})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medicações */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Medicações</CardTitle>
                <Button type="button" onClick={addMedication} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Medicação
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {medications.map((medication, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Medicação {index + 1}</Badge>
                      {medications.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeMedication(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Nome do Medicamento</Label>
                        <Input
                          value={medication.name}
                          onChange={(e) => updateMedication(index, "name", e.target.value)}
                          placeholder="Ex: Amoxicilina"
                        />
                      </div>
                      <div>
                        <Label>Dosagem</Label>
                        <Input
                          value={medication.dosage}
                          onChange={(e) => updateMedication(index, "dosage", e.target.value)}
                          placeholder="Ex: 250mg"
                        />
                      </div>
                      <div>
                        <Label>Frequência</Label>
                        <Input
                          value={medication.frequency}
                          onChange={(e) => updateMedication(index, "frequency", e.target.value)}
                          placeholder="Ex: 2x ao dia"
                        />
                      </div>
                      <div>
                        <Label>Duração</Label>
                        <Input
                          value={medication.duration}
                          onChange={(e) => updateMedication(index, "duration", e.target.value)}
                          placeholder="Ex: 7 dias"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Instruções de Uso</Label>
                      <Textarea
                        value={medication.instructions}
                        onChange={(e) => updateMedication(index, "instructions", e.target.value)}
                        placeholder="Ex: Administrar com alimento, não interromper o tratamento..."
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card>
            <CardHeader>
              <CardTitle>Observações Gerais</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Observações adicionais sobre o tratamento..."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Assinatura Digital */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Assinatura Digital
              </CardTitle>
              <CardDescription>Esta prescrição será assinada digitalmente com seu CRMV</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Veterinário:</strong> {user?.name}
                  <br />
                  <strong>CRMV:</strong> SP-12345
                  <br />
                  <strong>Data:</strong> {new Date().toLocaleDateString("pt-BR")}
                  <br />
                  <strong>Hora:</strong> {new Date().toLocaleTimeString("pt-BR")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex gap-4">
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              <FileText className="h-4 w-4 mr-2" />
              Gerar Prescrição
            </Button>
            <Button type="button" variant="outline">
              Salvar Rascunho
            </Button>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
