"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Heart,
  ArrowLeft,
  Send,
  Paperclip,
  Mic,
  Camera,
  Video,
  Phone,
  MoreVertical,
  ImageIcon,
  Play,
  Download,
  Clock,
  CheckCheck,
} from "lucide-react"
import Link from "next/link"
import { ChatService, type Message, sampleMessages } from "@/lib/chat"

export default function ChatConversationPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatService = ChatService.getInstance()

  useEffect(() => {
    console.log("[v0] Initializing chat connection")

    // Carregar mensagens existentes
    const existingMessages = sampleMessages.filter((m) => m.conversationId === params.id)
    setMessages(existingMessages)

    // Conectar ao chat em tempo real
    chatService.connect(params.id, (newMessage: Message) => {
      console.log("[v0] Received new message:", newMessage)
      setMessages((prev) => [...prev, newMessage])
      setIsTyping(false)
    })

    setIsConnected(true)

    // Simular indicador de digitação
    const typingInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsTyping(true)
        setTimeout(() => setIsTyping(false), 2000)
      }
    }, 10000)

    return () => {
      chatService.disconnect(params.id)
      clearInterval(typingInterval)
    }
  }, [params.id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Mock data - será substituído por dados reais do banco
  const conversation = {
    id: params.id,
    vet: {
      name: "Dr. Silva",
      specialty: "Clínico Geral",
      avatar: "/caring-vet.png",
      online: true,
    },
    pet: "Rex",
  }

  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        const newMessage = await chatService.sendMessage({
          conversationId: params.id,
          senderId: "1", // ID do usuário atual
          senderName: "Maria Silva",
          senderRole: "tutor",
          content: message.trim(),
          type: "text",
          isRead: false,
        })

        console.log("[v0] Message sent successfully:", newMessage)
        setMessages((prev) => [...prev, newMessage])
        setMessage("")
      } catch (error) {
        console.error("[v0] Error sending message:", error)
      }
    }
  }

  const handleFileUpload = (type: string) => {
    console.log("[v0] Uploading file type:", type)
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log("[v0] File selected:", file.name, file.type)

      // Simular upload e envio
      const fileMessage = await chatService.sendMessage({
        conversationId: params.id,
        senderId: "1",
        senderName: "Maria Silva",
        senderRole: "tutor",
        content: file.name,
        type: file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "file",
        isRead: false,
        attachments: [
          {
            id: Date.now().toString(),
            name: file.name,
            url: URL.createObjectURL(file),
            type: file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "document",
            size: file.size,
          },
        ],
      })

      setMessages((prev) => [...prev, fileMessage])
    }
  }

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording)
    console.log("[v0] Recording:", !isRecording)

    if (!isRecording) {
      // Simular início da gravação
      setTimeout(async () => {
        if (isRecording) return // Se parou de gravar

        const audioMessage = await chatService.sendMessage({
          conversationId: params.id,
          senderId: "1",
          senderName: "Maria Silva",
          senderRole: "tutor",
          content: "Mensagem de áudio",
          type: "audio",
          isRead: false,
        })

        setMessages((prev) => [...prev, audioMessage])
        setIsRecording(false)
      }, 3000)
    }
  }

  const handleVideoCall = async () => {
    try {
      console.log("[v0] Starting video call")
      const { roomId, token } = await chatService.startVideoCall(params.id)

      // Redirecionar para página de videochamada
      window.open(`/chat/video/${roomId}?token=${token}`, "_blank")
    } catch (error) {
      console.error("[v0] Error starting video call:", error)
    }
  }

  const renderMessage = (msg: Message) => {
    const isUser = msg.senderRole === "tutor"

    return (
      <div key={msg.id} className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
        {!isUser && (
          <Avatar className="w-8 h-8">
            <AvatarImage src={conversation.vet.avatar || "/placeholder.svg"} />
            <AvatarFallback>{conversation.vet.name[0]}</AvatarFallback>
          </Avatar>
        )}

        <div className={`max-w-[70%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
          <div
            className={`rounded-2xl px-4 py-2 ${
              isUser ? "bg-emerald-600 text-white rounded-br-md" : "bg-white border border-gray-200 rounded-bl-md"
            }`}
          >
            {msg.type === "text" && <p className="text-sm">{msg.content}</p>}

            {msg.type === "image" && msg.attachments?.[0] && (
              <div className="relative">
                <img
                  src={msg.attachments[0].url || "/placeholder.svg"}
                  alt="Shared image"
                  className="rounded-lg max-w-full h-auto max-w-xs"
                />
                <Button size="sm" variant="secondary" className="absolute top-2 right-2 opacity-80 hover:opacity-100">
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            )}

            {msg.type === "video" && msg.attachments?.[0] && (
              <div className="relative">
                <video src={msg.attachments[0].url} className="rounded-lg max-w-full h-auto max-w-xs" controls />
              </div>
            )}

            {msg.type === "audio" && (
              <div className="flex items-center gap-3 min-w-[200px]">
                <Button size="sm" variant="secondary" className="rounded-full w-8 h-8 p-0">
                  <Play className="w-4 h-4" />
                </Button>
                <div className="flex-1">
                  <div className="h-1 bg-gray-300 rounded-full">
                    <div className="h-1 bg-emerald-600 rounded-full w-1/3"></div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">0:45</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 px-2">
            <span className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {isUser && <CheckCheck className={`w-3 h-3 ${msg.isRead ? "text-emerald-600" : "text-gray-400"}`} />}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/chat">
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

            {/* Chat Header Info */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.vet.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{conversation.vet.name[0]}</AvatarFallback>
                  </Avatar>
                  {conversation.vet.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{conversation.vet.name}</h3>
                  <p className="text-sm text-gray-600">{conversation.vet.specialty}</p>
                </div>
                <Badge variant="outline">{conversation.pet}</Badge>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="bg-transparent">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="bg-transparent" onClick={handleVideoCall}>
                  <Video className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="bg-transparent">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {!isConnected && (
        <Alert className="mx-4 mt-4">
          <Clock className="h-4 w-4" />
          <AlertDescription>Conectando ao chat...</AlertDescription>
        </Alert>
      )}

      {/* Messages Area */}
      <div className="flex-1 container mx-auto px-4 py-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map(renderMessage)}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={conversation.vet.avatar || "/placeholder.svg"} />
                <AvatarFallback>{conversation.vet.name[0]}</AvatarFallback>
              </Avatar>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-end gap-3">
            {/* Attachment Options */}
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="bg-transparent" onClick={() => handleFileUpload("image")}>
                <ImageIcon className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="bg-transparent" onClick={() => handleFileUpload("video")}>
                <Camera className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="bg-transparent" onClick={() => handleFileUpload("file")}>
                <Paperclip className="w-4 h-4" />
              </Button>
            </div>

            {/* Message Input */}
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
                disabled={!isConnected}
              />
              <Button
                size="sm"
                variant="outline"
                className={`bg-transparent ${isRecording ? "bg-red-100 border-red-300" : ""}`}
                onClick={handleVoiceRecord}
              >
                <Mic className={`w-4 h-4 ${isRecording ? "text-red-600" : ""}`} />
              </Button>
            </div>

            {/* Send Button */}
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || !isConnected}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {isRecording && (
            <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              Gravando áudio... Clique no microfone para parar
            </div>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
        onChange={handleFileChange}
      />
    </div>
  )
}
