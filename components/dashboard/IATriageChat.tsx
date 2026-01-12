"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Bot, Send, Sparkles, X, MessageSquareQuote } from "lucide-react"

export function IATriageChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { role: "bot", content: "Olá! Sou o Assistente de Triagem VetCare. Como posso ajudar com seu pet hoje? Descreva qualquer sintoma ou comportamento incomum." }
    ])
    const [input, setInput] = useState("")

    const handleSend = () => {
        if (!input.trim()) return
        const userMsg = input
        setMessages(prev => [...prev, { role: "user", content: userMsg }])
        setInput("")

        // Simulação de resposta da IA
        setTimeout(() => {
            let response = "Entendi. Com base no que você disse, recomendo observar se há febre ou falta de apetite. Deseja agendar uma consulta preventiva?"
            if (userMsg.toLowerCase().includes("vômito") || userMsg.toLowerCase().includes("sangue")) {
                response = "⚠️ ATENÇÃO: Os sintomas descritos sugerem urgência. Recomendamos procurar o Hospital Veterinário Tubarão imediatamente (24h)."
            }
            setMessages(prev => [...prev, { role: "bot", content: response }])
        }, 1000)
    }

    if (!isOpen) {
        return (
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-2xl z-50 group border-4 border-white dark:border-slate-900"
            >
                <Sparkles className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </Button>
        )
    }

    return (
        <div className="fixed bottom-6 right-6 w-[350px] shadow-2xl z-50 animate-in slide-in-from-bottom-5 duration-300">
            <Card className="border-none bg-white dark:bg-slate-900 overflow-hidden">
                <CardHeader className="bg-indigo-600 p-4 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-white/20 rounded-lg">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-sm font-bold text-white">Triagem IA</CardTitle>
                            <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                <span className="text-[10px] text-indigo-100 uppercase tracking-widest font-bold">Online</span>
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10 h-8 w-8">
                        <X className="w-4 h-4" />
                    </Button>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="h-[350px] overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === "user"
                                        ? "bg-indigo-600 text-white rounded-tr-none"
                                        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-tl-none shadow-sm"
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2">
                        <Input
                            placeholder="Descreva os sintomas..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            className="rounded-full border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
                        />
                        <Button size="icon" onClick={handleSend} className="rounded-full bg-indigo-600 h-10 w-10 flex-shrink-0">
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
