"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, DollarSign, Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function PaymentsPage() {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)

  const payments = [
    {
      id: "1",
      service: "Consulta Veterinária",
      pet: "Max (Golden Retriever)",
      amount: 150.0,
      date: "2024-01-15",
      status: "paid",
      method: "Cartão de Crédito",
    },
    {
      id: "2",
      service: "Cirurgia de Castração",
      pet: "Luna (Gato Persa)",
      amount: 450.0,
      date: "2024-01-10",
      status: "pending",
      method: "PIX",
    },
    {
      id: "3",
      service: "Vacinação Múltipla",
      pet: "Rex (Labrador)",
      amount: 120.0,
      date: "2024-01-08",
      status: "paid",
      method: "Débito",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "overdue":
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-emerald-900">Pagamentos</h1>
          <p className="text-emerald-700">Gerencie seus pagamentos e métodos de pagamento</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-emerald-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-700">Total Pago</CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-900">R$ 270,00</div>
              <p className="text-xs text-emerald-600">Este mês</p>
            </CardContent>
          </Card>

          <Card className="border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">Pendente</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-900">R$ 450,00</div>
              <p className="text-xs text-yellow-600">1 pagamento</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Próximo Vencimento</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">20/01</div>
              <p className="text-xs text-blue-600">Cirurgia - Luna</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment History */}
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-900">Histórico de Pagamentos</CardTitle>
              <CardDescription>Seus últimos pagamentos e transações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 border border-emerald-100 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-emerald-900">{payment.service}</h3>
                      <Badge className={`${getStatusColor(payment.status)} flex items-center gap-1`}>
                        {getStatusIcon(payment.status)}
                        {payment.status === "paid" ? "Pago" : payment.status === "pending" ? "Pendente" : "Vencido"}
                      </Badge>
                    </div>
                    <p className="text-sm text-emerald-600">{payment.pet}</p>
                    <p className="text-xs text-emerald-500">
                      {payment.date} • {payment.method}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-900">R$ {payment.amount.toFixed(2)}</p>
                    {payment.status === "pending" && (
                      <Button size="sm" className="mt-2 bg-emerald-600 hover:bg-emerald-700">
                        Pagar Agora
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-900">Métodos de Pagamento</CardTitle>
              <CardDescription>Gerencie seus cartões e métodos de pagamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Saved Cards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-emerald-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-8 h-8 text-emerald-600" />
                    <div>
                      <p className="font-medium text-emerald-900">**** **** **** 1234</p>
                      <p className="text-sm text-emerald-600">Visa • Exp: 12/26</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800">Principal</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border border-emerald-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-8 h-8 text-emerald-600" />
                    <div>
                      <p className="font-medium text-emerald-900">**** **** **** 5678</p>
                      <p className="text-sm text-emerald-600">Mastercard • Exp: 08/25</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>
              </div>

              {/* Add New Payment Method */}
              <div className="pt-4 border-t border-emerald-100">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">+ Adicionar Novo Cartão</Button>
              </div>

              {/* PIX Option */}
              <div className="p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-medium text-emerald-900 mb-2">Pagamento via PIX</h4>
                <p className="text-sm text-emerald-700 mb-3">Pague instantaneamente com PIX</p>
                <Button
                  variant="outline"
                  className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-100 bg-transparent"
                >
                  Pagar com PIX
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Payment */}
        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-900">Pagamento Rápido</CardTitle>
            <CardDescription>Faça um pagamento para serviços não agendados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="service" className="text-emerald-700">
                  Serviço
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consulta</SelectItem>
                    <SelectItem value="vaccination">Vacinação</SelectItem>
                    <SelectItem value="surgery">Cirurgia</SelectItem>
                    <SelectItem value="exam">Exame</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount" className="text-emerald-700">
                  Valor
                </Label>
                <Input id="amount" placeholder="R$ 0,00" />
              </div>
              <div>
                <Label htmlFor="pet" className="text-emerald-700">
                  Pet
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o pet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="max">Max (Golden Retriever)</SelectItem>
                    <SelectItem value="luna">Luna (Gato Persa)</SelectItem>
                    <SelectItem value="rex">Rex (Labrador)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Pagar Agora</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
