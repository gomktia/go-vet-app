"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, Smartphone, Lock, ArrowLeft, Check } from "lucide-react"
import { availablePlans, PaymentService, samplePaymentMethods, type Plan } from "@/lib/payments"
import Link from "next/link"

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan")
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<"existing" | "new_card" | "pix">("new_card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [pixData, setPixData] = useState<{ qrCode: string; pixKey: string; expiresAt: string } | null>(null)

  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    cpf: "",
  })

  const paymentService = PaymentService.getInstance()

  useEffect(() => {
    if (planId) {
      const plan = availablePlans.find((p) => p.id === planId)
      setSelectedPlan(plan || null)
    }
  }, [planId])

  const handlePayment = async () => {
    if (!selectedPlan) return

    setIsProcessing(true)

    try {
      if (paymentMethod === "pix") {
        // Processar pagamento PIX
        const pixPayment = await paymentService.createPixPayment(
          selectedPlan.price,
          `Assinatura ${selectedPlan.name} - VetCare`,
        )
        setPixData(pixPayment)
      } else {
        // Processar pagamento com cartão
        const paymentIntent = await paymentService.createPaymentIntent(
          selectedPlan.price,
          paymentMethod === "existing" ? samplePaymentMethods[0].id : "new_card",
          {
            planId: selectedPlan.id,
            description: `Assinatura ${selectedPlan.name} - VetCare`,
          },
        )

        const confirmedPayment = await paymentService.confirmPayment(paymentIntent.id)

        if (confirmedPayment.status === "succeeded") {
          // Criar assinatura
          await paymentService.createSubscription(selectedPlan.id, paymentIntent.paymentMethodId)
          setPaymentSuccess(true)
        }
      }
    } catch (error) {
      console.error("[Checkout] Payment error:", error)
      alert("Erro no pagamento. Tente novamente.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Plano não encontrado</h3>
            <p className="text-gray-600 mb-4">O plano selecionado não foi encontrado.</p>
            <Button asChild>
              <Link href="/subscription">Voltar aos Planos</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Pagamento Confirmado!</h3>
            <p className="text-gray-600 mb-4">Sua assinatura do plano {selectedPlan.name} foi ativada com sucesso.</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href="/dashboard">Ir para Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (pixData) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Pagamento via PIX
              </CardTitle>
              <CardDescription>Escaneie o QR Code ou copie a chave PIX para finalizar o pagamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 mb-4">
                  <img src="/qr-code-pix.png" alt="QR Code PIX" className="mx-auto" />
                </div>
                <p className="text-sm text-gray-600 mb-4">Escaneie este QR Code com o app do seu banco</p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <Label className="text-sm font-medium">Chave PIX (Copia e Cola)</Label>
                  <div className="flex gap-2 mt-2">
                    <Input value={pixData.pixKey} readOnly className="font-mono text-xs" />
                    <Button variant="outline" onClick={() => navigator.clipboard.writeText(pixData.pixKey)}>
                      Copiar
                    </Button>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Valor:</strong> R$ {selectedPlan.price.toFixed(2)}
                  <br />
                  <strong>Expira em:</strong> {new Date(pixData.expiresAt).toLocaleString("pt-BR")}
                  <br />
                  Após o pagamento, sua assinatura será ativada automaticamente.
                </AlertDescription>
              </Alert>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <Link href="/subscription">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Link>
                </Button>
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">Verificar Pagamento</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{selectedPlan.name}</h4>
                      <p className="text-sm text-gray-600">{selectedPlan.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">R$ {selectedPlan.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">por {selectedPlan.interval === "month" ? "mês" : "ano"}</p>
                    </div>
                  </div>

                  {selectedPlan.trialDays && (
                    <Alert>
                      <AlertDescription>
                        <strong>Período gratuito:</strong> {selectedPlan.trialDays} dias grátis. Você será cobrado
                        apenas após o término do período.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Separator />

                  <div className="space-y-2">
                    <h5 className="font-medium">Recursos inclusos:</h5>
                    <ul className="space-y-1">
                      {selectedPlan.features.slice(0, 5).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-emerald-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>R$ {selectedPlan.price.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Pagamento Seguro
                </CardTitle>
                <CardDescription>Escolha sua forma de pagamento preferida</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Payment Method Selection */}
                  <div>
                    <Label className="text-base font-medium">Forma de Pagamento</Label>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value: any) => setPaymentMethod(value)}
                      className="mt-3"
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="new_card" id="new_card" />
                        <Label htmlFor="new_card" className="flex items-center gap-2 cursor-pointer">
                          <CreditCard className="w-4 h-4" />
                          Cartão de Crédito/Débito
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="pix" id="pix" />
                        <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer">
                          <Smartphone className="w-4 h-4" />
                          PIX (Aprovação instantânea)
                        </Label>
                      </div>

                      {samplePaymentMethods.length > 0 && (
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="existing" id="existing" />
                          <Label htmlFor="existing" className="flex items-center gap-2 cursor-pointer">
                            <CreditCard className="w-4 h-4" />
                            Cartão terminado em {samplePaymentMethods[0].last4}
                          </Label>
                        </div>
                      )}
                    </RadioGroup>
                  </div>

                  {/* Card Form */}
                  {paymentMethod === "new_card" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Número do Cartão</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardData.number}
                          onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Validade</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/AA"
                            value={cardData.expiry}
                            onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            id="cvc"
                            placeholder="123"
                            value={cardData.cvc}
                            onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="cardName">Nome no Cartão</Label>
                        <Input
                          id="cardName"
                          placeholder="Nome como está no cartão"
                          value={cardData.name}
                          onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                        />
                      </div>

                      <div>
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          placeholder="000.000.000-00"
                          value={cardData.cpf}
                          onChange={(e) => setCardData({ ...cardData, cpf: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="space-y-4">
                    <Button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      size="lg"
                    >
                      {isProcessing ? (
                        "Processando..."
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          {paymentMethod === "pix" ? "Gerar PIX" : "Finalizar Pagamento"}
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-gray-600 text-center">
                      Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade. Seus dados são
                      protegidos com criptografia SSL.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
