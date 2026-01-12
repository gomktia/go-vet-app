"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Calendar, User, Home, Plus, Bell } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NotificationService } from "@/lib/notifications"

export default function MobileNavigation() {
  const pathname = usePathname()
  const [unreadCount, setUnreadCount] = useState(3)
  const [hasNotifications, setHasNotifications] = useState(false)

  useEffect(() => {
    // Check notification permission on mount
    const checkNotifications = async () => {
      const notificationService = NotificationService.getInstance()
      const hasPermission = await notificationService.requestPermission()
      setHasNotifications(hasPermission)
    }

    checkNotifications()
  }, [])

  const navItems = [
    {
      href: "/dashboard",
      icon: Home,
      label: "Início",
      active: pathname === "/dashboard",
    },
    {
      href: "/pets",
      icon: Heart,
      label: "Pets",
      active: pathname.startsWith("/pets"),
    },
    {
      href: "/chat",
      icon: MessageCircle,
      label: "Chat",
      active: pathname.startsWith("/chat"),
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    {
      href: "/appointments",
      icon: Calendar,
      label: "Agenda",
      active: pathname.startsWith("/appointments"),
    },
    {
      href: "/dashboard",
      icon: User,
      label: "Perfil",
      active: pathname === "/profile",
    },
  ]

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 md:hidden">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                className={`flex-col gap-1 h-auto py-2 px-3 relative ${
                  item.active ? "text-emerald-600" : "text-gray-600"
                }`}
                asChild
              >
                <Link href={item.href}>
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                  {item.badge && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500 text-white">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </Button>
            )
          })}
        </div>
      </nav>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-40 md:hidden">
        <Button size="lg" className="rounded-full w-14 h-14 bg-emerald-600 hover:bg-emerald-700 shadow-lg" asChild>
          <Link href="/chat/emergency">
            <Plus className="w-6 h-6" />
          </Link>
        </Button>
      </div>

      {/* Notification Bell */}
      {hasNotifications && (
        <div className="fixed top-4 right-4 z-40 md:hidden">
          <Button size="sm" variant="outline" className="rounded-full w-10 h-10 bg-white/80 backdrop-blur-sm">
            <Bell className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Bottom padding for content */}
      <div className="h-16 md:hidden" />
    </>
  )
}
