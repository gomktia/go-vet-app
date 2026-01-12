"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { verifyEmail } from "@/lib/auth"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const token = searchParams.get("token")

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error")
        return
      }

      try {
        const success = await verifyEmail(token)
        setStatus(success ? "success" : "error")
      } catch (error) {
        setStatus("error")
      }
    }

    verify()
  }, [token])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {status === "loading" && <Loader2 className="h-12 w-12 text-emerald-600 animate-spin" />}
            {status === "success" && <CheckCircle className="h-12 w-12 text-green-600" />}
            {status === "error" && <XCircle className="h-12 w-12 text-red-600" />}
          </div>
          <CardTitle className="text-2xl font-bold">
            {status === "loading" && "Verificando email..."}
            {status === "success" && "Email verificado!"}
            {status === "error" && "Erro na verificação"}
          </CardTitle>
          <CardDescription>
            {status === "loading" && "Aguarde enquanto verificamos seu email"}
            {status === "success" && "Seu email foi verificado com sucesso"}
            {status === "error" && "Não foi possível verificar seu email"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {status === "success" && (
            <Alert className="mb-4">
              <AlertDescription>Agora você pode fazer login normalmente em sua conta.</AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                O link pode ter expirado ou ser inválido. Solicite um novo email de verificação.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Link href="/login">Ir para Login</Link>
            </Button>
            {status === "error" && (
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/register">Criar nova conta</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
