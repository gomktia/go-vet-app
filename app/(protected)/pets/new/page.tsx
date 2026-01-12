"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Upload, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewPetPage() {
  const [petData, setPetData] = useState({
    name: "",
    type: "",
    breed: "",
    birthDate: "",
    weight: "",
    color: "",
    gender: "",
    microchip: "",
    observations: "",
    photo: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar salvamento no banco de dados
    console.log("Pet data:", petData)
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPetData({ ...petData, photo: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/pets">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-emerald-800">VetCare</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-emerald-800 mb-2">Adicionar Novo Pet</h2>
            <p className="text-emerald-700">Preencha as informações do seu companheiro</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informações do Pet</CardTitle>
              <CardDescription>Todos os campos marcados com * são obrigatórios</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Photo Upload */}
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={petData.photo || "/placeholder.svg"} />
                    <AvatarFallback>
                      <Upload className="w-8 h-8 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Label htmlFor="photo" className="cursor-pointer">
                      <Button type="button" variant="outline" className="bg-transparent">
                        <Upload className="w-4 h-4 mr-2" />
                        Adicionar Foto
                      </Button>
                    </Label>
                    <Input id="photo" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome *</Label>
                    <Input
                      id="name"
                      placeholder="Nome do pet"
                      value={petData.name}
                      onChange={(e) => setPetData({ ...petData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo *</Label>
                    <Select value={petData.type} onValueChange={(value) => setPetData({ ...petData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cao">Cão</SelectItem>
                        <SelectItem value="gato">Gato</SelectItem>
                        <SelectItem value="passaro">Pássaro</SelectItem>
                        <SelectItem value="coelho">Coelho</SelectItem>
                        <SelectItem value="hamster">Hamster</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="breed">Raça *</Label>
                    <Input
                      id="breed"
                      placeholder="Raça do pet"
                      value={petData.breed}
                      onChange={(e) => setPetData({ ...petData, breed: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Data de Nascimento *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={petData.birthDate}
                      onChange={(e) => setPetData({ ...petData, birthDate: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={petData.weight}
                      onChange={(e) => setPetData({ ...petData, weight: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Sexo</Label>
                    <Select value={petData.gender} onValueChange={(value) => setPetData({ ...petData, gender: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o sexo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="macho">Macho</SelectItem>
                        <SelectItem value="femea">Fêmea</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color">Cor</Label>
                    <Input
                      id="color"
                      placeholder="Cor do pet"
                      value={petData.color}
                      onChange={(e) => setPetData({ ...petData, color: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="microchip">Microchip</Label>
                    <Input
                      id="microchip"
                      placeholder="Número do microchip"
                      value={petData.microchip}
                      onChange={(e) => setPetData({ ...petData, microchip: e.target.value })}
                    />
                  </div>
                </div>

                {/* Observations */}
                <div className="space-y-2">
                  <Label htmlFor="observations">Observações</Label>
                  <Textarea
                    id="observations"
                    placeholder="Informações adicionais sobre o pet (alergias, comportamento, etc.)"
                    value={petData.observations}
                    onChange={(e) => setPetData({ ...petData, observations: e.target.value })}
                    rows={4}
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" className="flex-1 bg-transparent" asChild>
                    <Link href="/pets">Cancelar</Link>
                  </Button>
                  <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    Salvar Pet
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
