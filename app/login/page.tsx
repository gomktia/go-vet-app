"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Eye, EyeOff, Info } from "lucide-react"
import Link from "next/link"
import { authenticateUser, loginUser } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const user = authenticateUser(email, password)

    if (user) {
      loginUser(user)
      router.push("/dashboard")
    } else {
      setError("Email ou senha incorretos")
    }

    setLoading(false)
  }

  const fillTestUser = (userType: "tutor" | "vet") => {
    if (userType === "tutor") {
      setEmail("tutor@vetcare.com")
      setPassword("123456")
    } else {
      setEmail("vet@vetcare.com")
      setPassword("123456")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-emerald-800">VetCare</h1>
          </div>
          <CardTitle className="text-2xl text-emerald-800">Bem-vindo de volta</CardTitle>
          <CardDescription>Entre na sua conta para acessar o cuidado veterinário completo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-blue-600" />
              <h3 className="font-medium text-blue-800">Usuários de Teste</h3>
            </div>
            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full text-left justify-start border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
                onClick={() => fillTestUser("tutor")}
              >
                👤 Tutor: tutor@vetcare.com / 123456
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full text-left justify-start border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
                onClick={() => fillTestUser("vet")}
              >
                🩺 Veterinário: vet@vetcare.com / 123456
              </Button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>
            )}

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Link href="/forgot-password" className="text-sm text-emerald-600 hover:underline">
              Esqueceu sua senha?
            </Link>
            <div className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-emerald-600 hover:underline font-medium">
                Cadastre-se
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
