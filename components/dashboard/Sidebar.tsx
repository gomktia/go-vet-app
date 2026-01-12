"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getCurrentUser, logoutUser, type User } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import {
    LayoutDashboard,
    Users,
    Calendar,
    MessageSquare,
    FileText,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
    Heart,
    DollarSign,
    MapPin,
    Building2,
    Navigation,
    Stethoscope,
    BarChart3,
    Bell,
    CreditCard,
    Zap,
    Video,
} from "lucide-react"

export default function Sidebar() {
    const pathname = usePathname()
    const [user, setUser] = useState<User | null>(null)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const currentUser = getCurrentUser()
        setUser(currentUser)
    }, [])

    if (!mounted) return null

    const toggleCollapse = () => setIsCollapsed(!isCollapsed)
    const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen)

    const getLinks = (role: string) => {
        switch (role) {
            case "admin":
                return [
                    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
                    { href: "/dashboard/admin/users", label: "Usuários", icon: Users },
                    { href: "/dashboard/admin/finance", label: "Financeiro", icon: DollarSign },
                    { href: "/dashboard/admin/reports", label: "Relatórios", icon: FileText },
                ]
            case "clinic":
                return [
                    { href: "/dashboard/clinic", label: "Visão Geral", icon: LayoutDashboard },
                    { href: "/dashboard/clinic/schedule", label: "Agenda de Salas", icon: Calendar },
                    { href: "/dashboard/telemedicine", label: "Salas de Vídeo", icon: Video },
                    { href: "/dashboard/clinic/finance", label: "Faturamento", icon: DollarSign },
                ]
            case "veterinarian":
                return [
                    { href: "/dashboard/vet", label: "Visão Geral", icon: LayoutDashboard },
                    { href: "/appointments", label: "Minha Agenda", icon: Calendar },
                    { href: "/dashboard/telemedicine", label: "Telemedicina", icon: Video },
                    { href: "/pets", label: "Pacientes", icon: Users },
                    { href: "/dashboard/vet/reports", label: "Relatórios", icon: BarChart3 },
                    { href: "/dashboard/vet/settings", label: "Configurações", icon: Settings },
                ]
            default: // tutor
                return [
                    { href: "/dashboard", label: "Início", icon: LayoutDashboard },
                    { href: "/pets", label: "Meus Pets", icon: Heart },
                    { href: "/appointments", label: "Agendamentos", icon: Calendar },
                    { href: "/chat", label: "Chat", icon: MessageSquare },
                    { href: "/health-tips", label: "Dicas de Saúde", icon: Zap },
                    { href: "/payments", label: "Pagamentos", icon: CreditCard },
                    { href: "/dashboard/route-planner", label: "Rotas", icon: Navigation },
                    { href: "/dashboard/marketplace", label: "Rede de Clínicas", icon: Building2 },
                ]
        }
    }

    const links = user ? getLinks(user.role) : []

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 z-50">
                <div className="flex items-center gap-2 font-bold text-xl text-emerald-600 dark:text-emerald-500">
                    <Heart className="w-6 h-6 fill-current" />
                    <span>VetCare</span>
                </div>
                <div className="flex gap-2">
                    <ModeToggle />
                    <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Button>
                </div>
            </div>

            {/* Sidebar Overlay (Mobile) */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`fixed md:static inset-y-0 left-0 z-50 bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out flex flex-col 
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "w-20" : "w-64"}
          pt-16 md:pt-0
        `}
            >
                {/* Desktop Header / Logo */}
                <div className="hidden md:flex items-center justify-between h-16 px-4 border-b border-gray-100 dark:border-gray-800">
                    {!isCollapsed && (
                        <div className="flex items-center gap-2 font-bold text-xl text-emerald-600 dark:text-emerald-500 transition-opacity duration-300">
                            <Heart className="w-6 h-6 fill-current" />
                            <span>VetCare</span>
                        </div>
                    )}
                    {isCollapsed && (
                        <Heart className="w-6 h-6 text-emerald-600 dark:text-emerald-500 fill-current mx-auto" />
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hidden md:flex ml-auto"
                        onClick={toggleCollapse}
                    >
                        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    </Button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
                    {links.map((link) => {
                        const Icon = link.icon
                        const isActive = pathname === link.href

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group relative
                  ${isActive
                                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-emerald-400"}
                  ${isCollapsed ? "justify-center" : ""}
                `}
                                title={isCollapsed ? link.label : ""}
                                onClick={() => setIsMobileOpen(false)}
                            >
                                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 group-hover:text-emerald-600 dark:text-slate-500 dark:group-hover:text-emerald-400"}`} />
                                {!isCollapsed && (
                                    <span className="font-medium text-sm truncate">{link.label}</span>
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Footer Actions & User Info (Fixed at Bottom) */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-4 bg-white dark:bg-slate-950">
                    {/* Theme Toggle & Notifications Row */}
                    <div className={`flex items-center ${isCollapsed ? "flex-col gap-2" : "justify-between"}`}>
                        <ModeToggle />

                        <Link href="/notifications" className={`text-slate-500 hover:text-emerald-600 dark:text-slate-400 ${isCollapsed ? "p-2" : ""}`} title="Notificações">
                            <Bell className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={() => logoutUser()}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors
                    ${isCollapsed ? "justify-center" : ""}
                  `}
                        title={isCollapsed ? "Sair" : ""}
                    >
                        <LogOut className="w-5 h-5" />
                        {!isCollapsed && <span>Sair</span>}
                    </button>

                    {/* User Profile (Fixed) */}
                    {user && (
                        <div className={`pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
                            <Avatar className="h-9 w-9 border border-gray-200 dark:border-gray-700">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
                                    {user.name ? user.name.substring(0, 2).toUpperCase() : "U"}
                                </AvatarFallback>
                            </Avatar>
                            {!isCollapsed && (
                                <div className="overflow-hidden">
                                    <p className="font-medium text-sm truncate text-slate-900 dark:text-slate-100">{user.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate w-32" title={user.email}>{user.email}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </aside>
        </>
    )
}
