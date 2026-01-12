import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Calendar, MessageCircle, FileText, MapPin, Bell } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-emerald-800">VetCare</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href="/register">Cadastrar</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6 text-balance">
            Cuidado veterinário completo na palma da sua mão
          </h2>
          <p className="text-lg text-emerald-700 mb-8 text-pretty">
            Conecte-se com veterinários qualificados, agende consultas, monitore a saúde do seu pet e tenha acesso a
            informações médicas confiáveis - tudo em um só lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href="/register">Começar Agora</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
              asChild
            >
              <Link href="/about">Saiba Mais</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center text-emerald-800 mb-12">
          Tudo que você precisa para cuidar do seu pet
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-emerald-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <CardTitle className="text-emerald-800">Chat com Veterinários</CardTitle>
              <CardDescription>
                Converse diretamente com veterinários qualificados via texto, áudio ou vídeo
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-emerald-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-emerald-800">Agendamentos</CardTitle>
              <CardDescription>Agende consultas, cirurgias e exames de forma rápida e prática</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-emerald-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-emerald-800">Histórico Médico</CardTitle>
              <CardDescription>Mantenha o histórico completo de consultas, vacinas e tratamentos</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-emerald-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-emerald-800">Dicas de Saúde</CardTitle>
              <CardDescription>Acesse informações sobre alimentação, doenças e cuidados preventivos</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-emerald-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-teal-600" />
              </div>
              <CardTitle className="text-emerald-800">Visitas Domiciliares</CardTitle>
              <CardDescription>Solicite atendimento veterinário no conforto da sua casa</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-emerald-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-pink-600" />
              </div>
              <CardTitle className="text-emerald-800">Lembretes</CardTitle>
              <CardDescription>Receba notificações sobre vacinas, medicamentos e consultas</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Pronto para cuidar melhor do seu pet?</h3>
          <p className="text-emerald-100 mb-8 text-lg">Junte-se a milhares de tutores que já confiam no VetCare</p>
          <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-emerald-50" asChild>
            <Link href="/register">Criar Conta Gratuita</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-800 text-emerald-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">VetCare</span>
          </div>
          <p className="text-sm">© 2024 VetCare. Cuidando do seu pet com amor e tecnologia.</p>
        </div>
      </footer>
    </div>
  )
}
