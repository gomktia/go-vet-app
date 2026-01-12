"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, Crown, Zap, Heart, Star, CreditCard } from "lucide-react"
import { availablePlans, PaymentService, type Plan } from "@/lib/payments"

export default function SubscriptionPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const paymentService = PaymentService.getInstance()

  const filteredPlans = availablePlans.filter((plan) =>
    isAnnual ? plan.interval === "year" : plan.interval === "month",
  )

  const handleSelectPlan = async (planId: string) => {
    setSelectedPlan(planId)
    setIsProcessing(true)

    try {
      console.log("[Subscription] Selecting plan:", planId)
      // Redirecionar para página de pagamento
      window.location.href = `/subscription/checkout?plan=${planId}`
    } catch (error) {
      console.error("[Subscription] Error selecting plan:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const renderPlanCard = (plan: Plan) => (
    <Card
      key={plan.id}
      className={`relative ${plan.isPopular ? "border-emerald-500 shadow-lg scale-105" : "border-gray-200"}`}
    >
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-emerald-600 text-white px-4 py-1">
            <Star className="w-3 h-3 mr-1" />
            Mais Popular
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          {plan.id === "basic" && <Heart className="w-12 h-12 text-emerald-600" />}
          {plan.id === "premium" && <Crown className="w-12 h-12 text-purple-600" />}
          {plan.id === "annual" && <Zap className="w-12 h-12 text-yellow-600" />}
        </div>

        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription className="text-gray-600">{plan.description}</CardDescription>

        <div className="mt-4">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold">R$</span>
            <span className="text-5xl font-bold">{plan.price.toFixed(0)}</span>
            <span className="text-xl text-gray-600">,{((plan.price % 1) * 100).toFixed(0)}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">por {plan.interval === "month" ? "mês" : "ano"}</p>

          {plan.trialDays && (
            <Badge variant="outline" className="mt-2">
              {plan.trialDays} dias grátis
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          className={`w-full ${
            plan.isPopular ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-900 hover:bg-gray-800"
          }`}
          onClick={() => handleSelectPlan(plan.id)}
          disabled={isProcessing && selectedPlan === plan.id}
        >
          {isProcessing && selectedPlan === plan.id ? (
            "Processando..."
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              {plan.trialDays ? `Iniciar ${plan.trialDays} dias grátis` : "Assinar Agora"}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Escolha seu Plano VetCare</h1>
          <p className="text-xl text-gray-600 mb-8">
            Cuidado veterinário completo para seus pets, quando e onde precisar
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isAnnual ? "font-medium" : "text-gray-600"}`}>Mensal</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span className={`text-sm ${isAnnual ? "font-medium" : "text-gray-600"}`}>Anual</span>
            {isAnnual && <Badge className="bg-green-100 text-green-800 ml-2">Economize 17%</Badge>}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">{filteredPlans.map(renderPlanCard)}</div>

        {/* Features Comparison */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">Compare os Planos</CardTitle>
            <CardDescription className="text-center">
              Veja todas as funcionalidades incluídas em cada plano
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Funcionalidade</th>
                    <th className="text-center py-3 px-4">Básico</th>
                    <th className="text-center py-3 px-4">Premium</th>
                    <th className="text-center py-3 px-4">Anual</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Chat com veterinários</td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Videochamadas</td>
                    <td className="text-center py-3 px-4 text-gray-400">-</td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Atendimento 24h</td>
                    <td className="text-center py-3 px-4 text-gray-400">-</td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Perfis de pets</td>
                    <td className="text-center py-3 px-4">Até 2</td>
                    <td className="text-center py-3 px-4">Ilimitado</td>
                    <td className="text-center py-3 px-4">Ilimitado</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Consultas mensais</td>
                    <td className="text-center py-3 px-4">5</td>
                    <td className="text-center py-3 px-4">Ilimitado</td>
                    <td className="text-center py-3 px-4">Ilimitado</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Perguntas Frequentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Posso cancelar a qualquer momento?</h4>
                <p className="text-sm text-gray-600">
                  Sim, você pode cancelar sua assinatura a qualquer momento. O cancelamento será efetivo no final do
                  período atual.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Como funciona o período gratuito?</h4>
                <p className="text-sm text-gray-600">
                  Durante o período gratuito, você tem acesso completo ao plano escolhido. Após o término, será cobrado
                  automaticamente.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Posso trocar de plano?</h4>
                <p className="text-sm text-gray-600">
                  Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações são aplicadas
                  no próximo ciclo de cobrança.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Quais formas de pagamento aceitas?</h4>
                <p className="text-sm text-gray-600">
                  Aceitamos cartão de crédito, débito, PIX e transferência bancária. Todos os pagamentos são processados
                  com segurança.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
