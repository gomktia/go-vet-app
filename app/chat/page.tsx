"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Search, MessageCircle, Phone, Video, Plus, Clock } from "lucide-react"
import Link from "next/link"

export default function ChatPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - será substituído por dados reais do banco
  const conversations = [
    {
      id: 1,
      vet: {
        name: "Dr. Silva",
        specialty: "Clínico Geral",
        avatar: "/caring-vet.png",
        online: true,
      },
      lastMessage: {
        text: "Como está o Rex após a medicação?",
        time: "14:30",
        sender: "vet",
        unread: 2,
      },
      pet: "Rex",
    },
    {
      id: 2,
      vet: {
        name: "Dra. Santos",
        specialty: "Dermatologia",
        avatar: "/caring-vet.png",
        online: false,
      },
      lastMessage: {
        text: "Obrigado pelas fotos. Vou analisar e te respondo em breve.",
        time: "11:45",
        sender: "vet",
        unread: 0,
      },
      pet: "Mimi",
    },
    {
      id: 3,
      vet: {
        name: "Dr. Costa",
        specialty: "Cirurgia",
        avatar: "/caring-vet.png",
        online: true,
      },
      lastMessage: {
        text: "A cirurgia foi um sucesso! Buddy está se recuperando bem.",
        time: "09:15",
        sender: "vet",
        unread: 0,
      },
      pet: "Buddy",
    },
    {
      id: 4,
      vet: {
        name: "Dra. Lima",
        specialty: "Emergência",
        avatar: "/caring-vet.png",
        online: true,
      },
      lastMessage: {
        text: "Posso ajudar com alguma emergência?",
        time: "Ontem",
        sender: "vet",
        unread: 0,
      },
      pet: "Geral",
    },
  ]

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.vet.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.pet.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-emerald-800 mb-2">Chat Veterinário</h2>
            <p className="text-emerald-700">Converse diretamente com veterinários qualificados</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/chat/new">
              <Plus className="w-4 h-4 mr-2" />
              Nova Conversa
            </Link>
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar conversas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button className="h-20 flex-col gap-2 bg-red-600 hover:bg-red-700" asChild>
            <Link href="/chat/emergency">
              <Phone className="w-6 h-6" />
              <span className="text-sm">Emergência 24h</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
            asChild
          >
            <Link href="/chat/video">
              <Video className="w-6 h-6" />
              <span className="text-sm">Videochamada</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
            asChild
          >
            <Link href="/chat/specialists">
              <MessageCircle className="w-6 h-6" />
              <span className="text-sm">Especialistas</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
            asChild
          >
            <Link href="/chat/ai">
              <Heart className="w-6 h-6" />
              <span className="text-sm">Assistente IA</span>
            </Link>
          </Button>
        </div>

        {/* Conversations List */}
        <div className="space-y-4">
          {filteredConversations.map((conversation) => (
            <Card key={conversation.id} className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
              <Link href={`/chat/${conversation.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    {/* Avatar with Online Status */}
                    <div className="relative">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={conversation.vet.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{conversation.vet.name[0]}</AvatarFallback>
                      </Avatar>
                      {conversation.vet.online && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>

                    {/* Conversation Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-lg truncate">{conversation.vet.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {conversation.lastMessage.time}
                          </span>
                          {conversation.lastMessage.unread > 0 && (
                            <Badge className="bg-red-500 text-white min-w-[20px] h-5 text-xs flex items-center justify-center">
                              {conversation.lastMessage.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{conversation.vet.specialty}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700 truncate flex-1 mr-2">{conversation.lastMessage.text}</p>
                        <Badge variant="outline" className="text-xs">
                          {conversation.pet}
                        </Badge>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Video className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {filteredConversations.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma conversa encontrada</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? "Tente buscar com outros termos" : "Inicie sua primeira conversa com um veterinário"}
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/chat/new">
                <Plus className="w-4 h-4 mr-2" />
                Nova Conversa
              </Link>
            </Button>
          </div>
        )}

        {/* Online Veterinarians */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Veterinários Online Agora
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {conversations
                .filter((conv) => conv.vet.online)
                .map((conversation) => (
                  <div
                    key={`online-${conversation.id}`}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <Avatar>
                      <AvatarImage src={conversation.vet.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{conversation.vet.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{conversation.vet.name}</p>
                      <p className="text-sm text-gray-600">{conversation.vet.specialty}</p>
                    </div>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" asChild>
                      <Link href={`/chat/${conversation.id}`}>Chat</Link>
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
