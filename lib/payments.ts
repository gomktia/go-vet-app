export interface PaymentMethod {
  id: string
  type: "credit_card" | "debit_card" | "pix" | "bank_transfer"
  provider: "stripe" | "mercadopago" | "pagseguro"
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
  createdAt: string
}

export interface PaymentIntent {
  id: string
  amount: number
  currency: "BRL"
  status: "pending" | "processing" | "succeeded" | "failed" | "canceled"
  paymentMethodId: string
  appointmentId?: string
  consultationId?: string
  description: string
  metadata: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface Subscription {
  id: string
  userId: string
  planId: string
  planName: string
  status: "active" | "canceled" | "past_due" | "trialing"
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  amount: number
  currency: "BRL"
  interval: "month" | "year"
  createdAt: string
}

export interface Plan {
  id: string
  name: string
  description: string
  price: number
  currency: "BRL"
  interval: "month" | "year"
  features: string[]
  isPopular: boolean
  trialDays?: number
}

// Planos disponíveis
export const availablePlans: Plan[] = [
  {
    id: "basic",
    name: "Básico",
    description: "Para tutores com 1-2 pets",
    price: 29.9,
    currency: "BRL",
    interval: "month",
    features: [
      "Chat com veterinários",
      "Até 2 perfis de pets",
      "5 consultas por mês",
      "Prontuário digital",
      "Lembretes de vacina",
    ],
    isPopular: false,
    trialDays: 7,
  },
  {
    id: "premium",
    name: "Premium",
    description: "Para famílias com múltiplos pets",
    price: 59.9,
    currency: "BRL",
    interval: "month",
    features: [
      "Chat ilimitado com veterinários",
      "Perfis ilimitados de pets",
      "Consultas ilimitadas",
      "Videochamadas",
      "Atendimento de emergência 24h",
      "Prontuário completo",
      "Relatórios de saúde",
      "Desconto em medicamentos",
    ],
    isPopular: true,
    trialDays: 14,
  },
  {
    id: "annual",
    name: "Anual Premium",
    description: "Premium com desconto anual",
    price: 599.9,
    currency: "BRL",
    interval: "year",
    features: [
      "Todos os recursos Premium",
      "2 meses grátis",
      "Consultas presenciais com desconto",
      "Kit de primeiros socorros",
      "Suporte prioritário",
    ],
    isPopular: false,
    trialDays: 30,
  },
]

// Simulação de métodos de pagamento
export const samplePaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "credit_card",
    provider: "stripe",
    last4: "4242",
    brand: "visa",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
    createdAt: "2024-12-01T10:00:00Z",
  },
  {
    id: "2",
    type: "pix",
    provider: "mercadopago",
    isDefault: false,
    createdAt: "2024-12-01T10:00:00Z",
  },
]

export class PaymentService {
  private static instance: PaymentService

  static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService()
    }
    return PaymentService.instance
  }

  // Criar intenção de pagamento
  async createPaymentIntent(
    amount: number,
    paymentMethodId: string,
    metadata: Record<string, any> = {},
  ): Promise<PaymentIntent> {
    console.log("[Payment] Creating payment intent:", { amount, paymentMethodId, metadata })

    // Simular criação de pagamento
    return new Promise((resolve) => {
      setTimeout(() => {
        const paymentIntent: PaymentIntent = {
          id: `pi_${Date.now()}`,
          amount,
          currency: "BRL",
          status: "pending",
          paymentMethodId,
          description: metadata.description || "Pagamento VetCare",
          metadata,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        resolve(paymentIntent)
      }, 1000)
    })
  }

  // Confirmar pagamento
  async confirmPayment(paymentIntentId: string): Promise<PaymentIntent> {
    console.log("[Payment] Confirming payment:", paymentIntentId)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simular sucesso/falha do pagamento
        const success = Math.random() > 0.1 // 90% de sucesso

        if (success) {
          resolve({
            id: paymentIntentId,
            amount: 59.9,
            currency: "BRL",
            status: "succeeded",
            paymentMethodId: "1",
            description: "Pagamento VetCare",
            metadata: {},
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        } else {
          reject(new Error("Pagamento recusado"))
        }
      }, 2000)
    })
  }

  // Processar pagamento PIX
  async createPixPayment(
    amount: number,
    description: string,
  ): Promise<{
    qrCode: string
    pixKey: string
    expiresAt: string
  }> {
    console.log("[Payment] Creating PIX payment:", { amount, description })

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          qrCode:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
          pixKey:
            "00020126580014br.gov.bcb.pix013636c4b4e4-4c4e-4c4e-4c4e-4c4e4c4e4c4e5204000053039865802BR5925VetCare Servicos Veterina6009SAO PAULO62070503***6304",
          expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutos
        })
      }, 1000)
    })
  }

  // Gerenciar assinaturas
  async createSubscription(planId: string, paymentMethodId: string): Promise<Subscription> {
    console.log("[Payment] Creating subscription:", { planId, paymentMethodId })

    const plan = availablePlans.find((p) => p.id === planId)
    if (!plan) throw new Error("Plano não encontrado")

    return new Promise((resolve) => {
      setTimeout(() => {
        const subscription: Subscription = {
          id: `sub_${Date.now()}`,
          userId: "1",
          planId: plan.id,
          planName: plan.name,
          status: plan.trialDays ? "trialing" : "active",
          currentPeriodStart: new Date().toISOString(),
          currentPeriodEnd: new Date(
            Date.now() + (plan.interval === "year" ? 365 : 30) * 24 * 60 * 60 * 1000,
          ).toISOString(),
          cancelAtPeriodEnd: false,
          amount: plan.price,
          currency: plan.currency,
          interval: plan.interval,
          createdAt: new Date().toISOString(),
        }
        resolve(subscription)
      }, 1500)
    })
  }

  // Cancelar assinatura
  async cancelSubscription(subscriptionId: string): Promise<Subscription> {
    console.log("[Payment] Canceling subscription:", subscriptionId)

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: subscriptionId,
          userId: "1",
          planId: "premium",
          planName: "Premium",
          status: "canceled",
          currentPeriodStart: new Date().toISOString(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          cancelAtPeriodEnd: true,
          amount: 59.9,
          currency: "BRL",
          interval: "month",
          createdAt: new Date().toISOString(),
        })
      }, 1000)
    })
  }

  // Adicionar método de pagamento
  async addPaymentMethod(type: PaymentMethod["type"], details: any): Promise<PaymentMethod> {
    console.log("[Payment] Adding payment method:", { type, details })

    return new Promise((resolve) => {
      setTimeout(() => {
        const paymentMethod: PaymentMethod = {
          id: Date.now().toString(),
          type,
          provider: "stripe",
          ...details,
          isDefault: false,
          createdAt: new Date().toISOString(),
        }
        resolve(paymentMethod)
      }, 1000)
    })
  }
}

// Integrações externas
export class ExternalIntegrations {
  // Integração com WhatsApp Business API
  static async sendWhatsAppNotification(phone: string, message: string): Promise<boolean> {
    console.log("[WhatsApp] Sending notification:", { phone, message })

    // Simular envio
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > 0.1) // 90% de sucesso
      }, 1000)
    })
  }

  // Integração com Google Calendar
  static async createCalendarEvent(event: {
    title: string
    description: string
    startTime: string
    endTime: string
    attendees: string[]
  }): Promise<{ eventId: string; meetLink?: string }> {
    console.log("[Calendar] Creating event:", event)

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          eventId: `event_${Date.now()}`,
          meetLink: `https://meet.google.com/abc-defg-hij`,
        })
      }, 1500)
    })
  }

  // Integração com sistema de delivery de medicamentos
  static async requestMedicationDelivery(order: {
    medications: Array<{ name: string; quantity: number; dosage: string }>
    address: string
    phone: string
    urgency: "normal" | "urgent"
  }): Promise<{ orderId: string; estimatedDelivery: string; trackingCode: string }> {
    console.log("[Delivery] Requesting medication delivery:", order)

    return new Promise((resolve) => {
      setTimeout(() => {
        const deliveryTime = order.urgency === "urgent" ? 2 : 24 // horas
        resolve({
          orderId: `order_${Date.now()}`,
          estimatedDelivery: new Date(Date.now() + deliveryTime * 60 * 60 * 1000).toISOString(),
          trackingCode: `VET${Date.now().toString().slice(-6)}`,
        })
      }, 1000)
    })
  }

  // Integração com laboratórios para exames
  static async scheduleLabTest(test: {
    type: string
    petId: string
    vetId: string
    urgency: "routine" | "urgent"
    instructions: string
  }): Promise<{ testId: string; scheduledDate: string; labLocation: string }> {
    console.log("[Lab] Scheduling test:", test)

    return new Promise((resolve) => {
      setTimeout(() => {
        const daysAhead = test.urgency === "urgent" ? 1 : 3
        resolve({
          testId: `test_${Date.now()}`,
          scheduledDate: new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000).toISOString(),
          labLocation: "Laboratório VetLab - Unidade Centro",
        })
      }, 1200)
    })
  }

  // Integração com sistema de telemedicina para segunda opinião
  static async requestSecondOpinion(secondOpinionCase: {
    petId: string
    primaryVetId: string
    symptoms: string
    diagnosis: string
    treatmentPlan: string
    urgency: "low" | "medium" | "high"
  }): Promise<{ requestId: string; estimatedResponse: string; specialistId: string }> {
    console.log("[SecondOpinion] Requesting consultation:", secondOpinionCase)

    return new Promise((resolve) => {
      setTimeout(() => {
        const responseHours =
          secondOpinionCase.urgency === "high" ? 2 : secondOpinionCase.urgency === "medium" ? 12 : 48
        resolve({
          requestId: `opinion_${Date.now()}`,
          estimatedResponse: new Date(Date.now() + responseHours * 60 * 60 * 1000).toISOString(),
          specialistId: `specialist_${Math.floor(Math.random() * 100)}`,
        })
      }, 1000)
    })
  }
}
