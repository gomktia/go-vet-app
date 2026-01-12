"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function BackButton() {
    const router = useRouter()

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-emerald-600"
        >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
        </Button>
    )
}
