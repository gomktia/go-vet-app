"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="w-9 px-0">
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            </Button>
        )
    }

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-9 px-0 hover:bg-emerald-100 dark:hover:bg-slate-800 transition-colors"
            title={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
        >
            {theme === "dark" ? (
                <Sun className="h-[1.2rem] w-[1.2rem] text-amber-400" />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] text-slate-700" />
            )}
            <span className="sr-only">Alternar tema</span>
        </Button>
    )
}
