"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { QrCode, Shield, Smartphone } from "lucide-react"
import { getCurrentUser, enable2FA } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function TwoFactorSetupPage() {
  const [user, setUser] = useState(getCurrentUser())
  const [qrCode, setQrCode] = useState("")
  const [secret, setSecret] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isEnabled, setIsEnabled] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const setup2FA = async () => {
      try {
        const { secret, qrCode } = await enable2FA(user.id)
        setSecret(secret)
        setQrCode(qrCode)
      } catch (error) {
        setError("Erro ao configurar 2FA")
      }
    }

    setup2FA()
  }, [user, router])

  const handleVerify = () => {
    // Em produção, verificaria o código TOTP
    if (verificationCode.length === 6) {
      setIsEnabled(true)
      setError("")
    } else {
      setError("Código inválido")
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-emerald-600" />
              <CardTitle>Autenticação de Dois Fatores</CardTitle>
            </div>
            <CardDescription>Adicione uma camada extra de segurança à sua conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Ativar 2FA</h3>
                <p className="text-sm text-gray-600">Use um app autenticador para gerar códigos de segurança</p>
              </div>
              <Switch
                checked={isEnabled}
                onCheckedChange={setIsEnabled}
                disabled={!isEnabled && verificationCode.length !== 6}
              />
            </div>

            {!isEnabled && (
              <>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      1. Instale um app autenticador
                    </h4>
                    <p className="text-sm text-gray-600">
                      Recomendamos Google Authenticator, Authy ou Microsoft Authenticator
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <QrCode className="h-4 w-4" />
                      2. Escaneie o QR Code
                    </h4>
                    <div className="bg-white p-4 rounded-lg border inline-block">
                      <img src={qrCode || "/placeholder.svg"} alt="QR Code para 2FA" className="w-32 h-32" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Código manual: {secret}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">3. Digite o código de verificação</h4>
                    <div className="space-y-2">
                      <Label htmlFor="code">Código de 6 dígitos</Label>
                      <Input
                        id="code"
                        type="text"
                        placeholder="123456"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="max-w-xs"
                      />
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    onClick={handleVerify}
                    className="bg-emerald-600 hover:bg-emerald-700"
                    disabled={verificationCode.length !== 6}
                  >
                    Verificar e Ativar
                  </Button>
                </div>
              </>
            )}

            {isEnabled && (
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Autenticação de dois fatores ativada com sucesso! Sua conta agora está mais segura.
                </AlertDescription>
              </Alert>
            )}

            <div className="pt-4 border-t">
              <Button variant="outline" onClick={() => router.back()}>
                Voltar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
