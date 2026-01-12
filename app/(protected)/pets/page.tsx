"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Heart, Plus, Search, FileText, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PetsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - será substituído por dados reais do banco
  const pets = [
    {
      id: 1,
      name: "Rex",
      type: "Cão",
      breed: "Golden Retriever",
      age: "3 anos",
      weight: "28 kg",
      color: "Dourado",
      avatar: "/golden-retriever.png",
      lastVisit: "15/03/2024",
      nextVaccine: "15/06/2024",
      status: "Saudável",
    },
    {
      id: 2,
      name: "Mimi",
      type: "Gato",
      breed: "Persa",
      age: "2 anos",
      weight: "4.5 kg",
      color: "Branco",
      avatar: "/fluffy-persian-cat.png",
      lastVisit: "10/03/2024",
      nextVaccine: "10/09/2024",
      status: "Em tratamento",
    },
    {
      id: 3,
      name: "Buddy",
      type: "Cão",
      breed: "Labrador",
      age: "5 anos",
      weight: "32 kg",
      color: "Preto",
      avatar: "/black-labrador.png",
      lastVisit: "20/02/2024",
      nextVaccine: "20/08/2024",
      status: "Saudável",
    },
  ]

  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-transparent">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-emerald-800 dark:text-emerald-400 mb-2">Meus Pets</h2>
            <p className="text-emerald-700 dark:text-emerald-500/80">Gerencie as informações dos seus companheiros</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
            <Link href="/pets/new">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Pet
            </Link>
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar por nome ou raça..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Pets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <Card key={pet.id} className="hover:shadow-lg transition-shadow flex flex-col h-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-emerald-100 dark:border-slate-800">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-16 h-16 border-2 border-emerald-100 dark:border-emerald-900/30">
                      <AvatarImage src={pet.avatar || "/placeholder.svg"} className="object-cover" />
                      <AvatarFallback className="bg-emerald-100 text-emerald-800 font-bold">{pet.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg text-emerald-900 dark:text-emerald-400 font-bold">{pet.name}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-slate-400">
                        {pet.breed} • {pet.age}
                      </p>
                    </div>
                  </div>
                  <Badge className={pet.status === "Saudável" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" : "bg-amber-100 text-amber-800 hover:bg-amber-200"}>
                    {pet.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Peso</p>
                    <p className="font-bold text-slate-700 dark:text-slate-200">{pet.weight}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Cor</p>
                    <p className="font-bold text-slate-700 dark:text-slate-200">{pet.color}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Última consulta</p>
                    <p className="font-bold text-slate-700 dark:text-slate-200">{pet.lastVisit}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 shadow-inner">
                    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Próxima vacina</p>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">{pet.nextVaccine}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 mt-auto">
                  <Button variant="outline" size="sm" className="flex-1 bg-white dark:bg-slate-800 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100" asChild>
                    <Link href={`/medical-records/${pet.id}`}>
                      <FileText className="w-4 h-4 mr-2" />
                      Ver Perfil
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300" asChild>
                    <Link href={`/pets/${pet.id}/edit`}>
                      <Edit className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20 bg-white dark:bg-slate-800 border-rose-100 dark:border-rose-900/30">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPets.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pet encontrado</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? "Tente buscar com outros termos" : "Adicione seu primeiro pet para começar"}
            </p>
            <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href="/pets/new">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Pet
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
