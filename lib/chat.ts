export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderRole: "tutor" | "veterinarian"
  content: string
  type: "text" | "image" | "file" | "audio" | "video" | "prescription"
  timestamp: string
  attachments?: Attachment[]
  isRead: boolean
  reactions?: Reaction[]
}

export interface Attachment {
  id: string
  name: string
  url: string
  type: "image" | "document" | "audio" | "video"
  size: number
}

export interface Reaction {
  emoji: string
  userId: string
  userName: string
}

export interface Conversation {
  id: string
  participants: Participant[]
  petId?: string
  petName?: string
  lastMessage?: Message
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Participant {
  id: string
  name: string
  role: "tutor" | "veterinarian"
  avatar?: string
  isOnline: boolean
  lastSeen?: string
}

// WebSocket connection simulation
export class ChatService {
  private static instance: ChatService
  private connections: Map<string, WebSocket> = new Map()
  private messageHandlers: Map<string, (message: Message) => void> = new Map()

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService()
    }
    return ChatService.instance
  }

  // Simular conexão WebSocket
  connect(conversationId: string, onMessage: (message: Message) => void): void {
    // Em produção, conectaria ao WebSocket real
    console.log(`[v0] Connecting to conversation ${conversationId}`)
    this.messageHandlers.set(conversationId, onMessage)

    // Simular mensagens em tempo real
    setTimeout(() => {
      const simulatedMessage: Message = {
        id: Date.now().toString(),
        conversationId,
        senderId: "vet-1",
        senderName: "Dr. Silva",
        senderRole: "veterinarian",
        content: "Olá! Como posso ajudar você hoje?",
        type: "text",
        timestamp: new Date().toISOString(),
        isRead: false,
      }
      onMessage(simulatedMessage)
    }, 2000)
  }

  disconnect(conversationId: string): void {
    console.log(`[v0] Disconnecting from conversation ${conversationId}`)
    this.messageHandlers.delete(conversationId)
  }

  sendMessage(message: Omit<Message, "id" | "timestamp">): Promise<Message> {
    return new Promise((resolve) => {
      const newMessage: Message = {
        ...message,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      }

      console.log(`[v0] Sending message:`, newMessage)

      // Simular envio
      setTimeout(() => {
        resolve(newMessage)
      }, 500)
    })
  }

  // Funcionalidades de videochamada
  startVideoCall(conversationId: string): Promise<{ roomId: string; token: string }> {
    return new Promise((resolve) => {
      console.log(`[v0] Starting video call for conversation ${conversationId}`)
      setTimeout(() => {
        resolve({
          roomId: `room-${conversationId}-${Date.now()}`,
          token: `token-${Math.random().toString(36).substr(2, 9)}`,
        })
      }, 1000)
    })
  }

  endVideoCall(roomId: string): Promise<void> {
    return new Promise((resolve) => {
      console.log(`[v0] Ending video call ${roomId}`)
      setTimeout(resolve, 500)
    })
  }
}

// Dados de exemplo
export const sampleConversations: Conversation[] = [
  {
    id: "1",
    participants: [
      {
        id: "1",
        name: "Maria Silva",
        role: "tutor",
        avatar: "/diverse-user-avatars.png",
        isOnline: true,
      },
      {
        id: "2",
        name: "Dr. João Santos",
        role: "veterinarian",
        avatar: "/caring-vet.png",
        isOnline: true,
      },
    ],
    petId: "1",
    petName: "Rex",
    isActive: true,
    createdAt: "2024-12-09T10:00:00Z",
    updatedAt: "2024-12-09T14:30:00Z",
  },
]

export const sampleMessages: Message[] = [
  {
    id: "1",
    conversationId: "1",
    senderId: "1",
    senderName: "Maria Silva",
    senderRole: "tutor",
    content: "Olá Dr. João, o Rex está com coceira há alguns dias.",
    type: "text",
    timestamp: "2024-12-09T10:00:00Z",
    isRead: true,
  },
  {
    id: "2",
    conversationId: "1",
    senderId: "2",
    senderName: "Dr. João Santos",
    senderRole: "veterinarian",
    content: "Olá Maria! Vou ajudar você. Pode me enviar algumas fotos da região afetada?",
    type: "text",
    timestamp: "2024-12-09T10:05:00Z",
    isRead: true,
  },
]
