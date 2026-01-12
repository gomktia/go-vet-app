"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Settings,
  MessageCircle,
  ScreenShare,
  Users,
  Clock,
} from "lucide-react"
import { useSearchParams } from "next/navigation"
import { ChatService } from "@/lib/chat"

export default function VideoCallPage({ params }: { params: { roomId: string } }) {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isConnected, setIsConnected] = useState(false)
  const [participants, setParticipants] = useState([
    {
      id: "1",
      name: "Maria Silva",
      role: "tutor",
      avatar: "/diverse-user-avatars.png",
      isVideoEnabled: true,
      isAudioEnabled: true,
    },
    {
      id: "2",
      name: "Dr. João Santos",
      role: "veterinarian",
      avatar: "/caring-vet.png",
      isVideoEnabled: true,
      isAudioEnabled: true,
    },
  ])

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const chatService = ChatService.getInstance()

  useEffect(() => {
    console.log("[v0] Initializing video call", { roomId: params.roomId, token })

    // Simular conexão
    setTimeout(() => {
      setIsConnected(true)
      console.log("[v0] Video call connected")
    }, 2000)

    // Iniciar timer da chamada
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    // Simular acesso à câmera
    if (localVideoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream
          }
        })
        .catch((error) => {
          console.error("[v0] Error accessing camera:", error)
        })
    }

    return () => {
      clearInterval(timer)
      // Cleanup video streams
      if (localVideoRef.current?.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [params.roomId, token])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleEndCall = async () => {
    try {
      await chatService.endVideoCall(params.roomId)
      console.log("[v0] Call ended")
      window.close()
    } catch (error) {
      console.error("[v0] Error ending call:", error)
    }
  }

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled)
    console.log("[v0] Video toggled:", !isVideoEnabled)
  }

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled)
    console.log("[v0] Audio toggled:", !isAudioEnabled)
  }

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing)
    console.log("[v0] Screen sharing toggled:", !isScreenSharing)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-white font-semibold">Videochamada VetCare</h1>
          <Badge variant="outline" className="text-green-400 border-green-400">
            <Clock className="w-3 h-3 mr-1" />
            {formatDuration(callDuration)}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-white">
            <Users className="w-3 h-3 mr-1" />
            {participants.length} participantes
          </Badge>
          {!isConnected && (
            <Badge variant="outline" className="text-yellow-400 border-yellow-400">
              Conectando...
            </Badge>
          )}
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative p-4">
        {/* Main Video (Remote) */}
        <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden relative">
          {isConnected ? (
            <video ref={remoteVideoRef} className="w-full h-full object-cover" autoPlay playsInline />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/caring-vet.png" />
                    <AvatarFallback>Dr</AvatarFallback>
                  </Avatar>
                </div>
                <p className="text-lg font-medium">Dr. João Santos</p>
                <p className="text-gray-400">Conectando...</p>
              </div>
            </div>
          )}

          {/* Remote participant info overlay */}
          <div className="absolute top-4 left-4">
            <div className="bg-black/50 text-white px-3 py-1 rounded-lg text-sm">Dr. João Santos</div>
          </div>
        </div>

        {/* Local Video (Picture-in-Picture) */}
        <Card className="absolute top-8 right-8 w-64 h-48 overflow-hidden">
          <CardContent className="p-0 h-full relative">
            {isVideoEnabled ? (
              <video ref={localVideoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/diverse-user-avatars.png" />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
              </div>
            )}

            <div className="absolute bottom-2 left-2">
              <div className="bg-black/50 text-white px-2 py-1 rounded text-xs">Você</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-6">
        <div className="flex items-center justify-center gap-4">
          {/* Audio Toggle */}
          <Button
            size="lg"
            variant={isAudioEnabled ? "secondary" : "destructive"}
            className="rounded-full w-14 h-14"
            onClick={toggleAudio}
          >
            {isAudioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </Button>

          {/* Video Toggle */}
          <Button
            size="lg"
            variant={isVideoEnabled ? "secondary" : "destructive"}
            className="rounded-full w-14 h-14"
            onClick={toggleVideo}
          >
            {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </Button>

          {/* Screen Share */}
          <Button
            size="lg"
            variant={isScreenSharing ? "default" : "secondary"}
            className="rounded-full w-14 h-14"
            onClick={toggleScreenShare}
          >
            <ScreenShare className="w-6 h-6" />
          </Button>

          {/* Chat */}
          <Button size="lg" variant="secondary" className="rounded-full w-14 h-14">
            <MessageCircle className="w-6 h-6" />
          </Button>

          {/* Settings */}
          <Button size="lg" variant="secondary" className="rounded-full w-14 h-14">
            <Settings className="w-6 h-6" />
          </Button>

          {/* End Call */}
          <Button
            size="lg"
            variant="destructive"
            className="rounded-full w-14 h-14 bg-red-600 hover:bg-red-700"
            onClick={handleEndCall}
          >
            <PhoneOff className="w-6 h-6" />
          </Button>
        </div>

        {/* Status indicators */}
        <div className="flex justify-center gap-4 mt-4 text-sm text-gray-400">
          {!isAudioEnabled && (
            <span className="flex items-center gap-1">
              <MicOff className="w-3 h-3" />
              Microfone desligado
            </span>
          )}
          {!isVideoEnabled && (
            <span className="flex items-center gap-1">
              <VideoOff className="w-3 h-3" />
              Câmera desligada
            </span>
          )}
          {isScreenSharing && (
            <span className="flex items-center gap-1">
              <ScreenShare className="w-3 h-3" />
              Compartilhando tela
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
