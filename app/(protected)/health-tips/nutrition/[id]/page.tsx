"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Clock, BookOpen, Share, Bookmark } from "lucide-react"
import Link from "next/link"

export default function NutritionArticlePage({ params }: { params: { id: string } }) {
  // Mock data - será substituído por dados reais do banco
  const article = {
    id: params.id,
    title: "Alimentação para Filhotes de Cães",
    category: "Nutrição",
    petType: "Cão",
    author: "Dra. Maria Santos",
    publishDate: "15 de março de 2024",
    readTime: "5 min",
    image: "/puppy-eating.jpg",
    content: `
      <h2>Introdução</h2>
      <p>A alimentação adequada é fundamental para o desenvolvimento saudável de filhotes de cães. Durante os primeiros meses de vida, os nutrientes corretos são essenciais para o crescimento ósseo, desenvolvimento muscular e fortalecimento do sistema imunológico.</p>
      
      <h2>Necessidades Nutricionais</h2>
      <p>Filhotes precisam de uma dieta rica em:</p>
      <ul>
        <li><strong>Proteínas:</strong> 22-32% da dieta para desenvolvimento muscular</li>
        <li><strong>Gorduras:</strong> 8-22% para energia e desenvolvimento cerebral</li>
        <li><strong>Cálcio e Fósforo:</strong> Para formação óssea adequada</li>
        <li><strong>DHA:</strong> Para desenvolvimento cognitivo</li>
      </ul>
      
      <h2>Cronograma de Alimentação</h2>
      <h3>0-4 semanas</h3>
      <p>Leite materno exclusivo. Se necessário, use substituto do leite canino.</p>
      
      <h3>4-6 semanas</h3>
      <p>Introdução gradual de ração úmida específica para filhotes, misturada com água morna.</p>
      
      <h3>6-12 semanas</h3>
      <p>Transição para ração seca de alta qualidade, 4 refeições por dia.</p>
      
      <h3>3-6 meses</h3>
      <p>3 refeições por dia, mantendo ração específica para filhotes.</p>
      
      <h3>6-12 meses</h3>
      <p>2 refeições por dia, podendo iniciar transição para ração de adulto em raças pequenas.</p>
      
      <h2>Dicas Importantes</h2>
      <ul>
        <li>Sempre deixe água fresca disponível</li>
        <li>Evite mudanças bruscas na alimentação</li>
        <li>Não ofereça alimentos humanos</li>
        <li>Monitore o peso regularmente</li>
        <li>Consulte sempre um veterinário</li>
      </ul>
      
      <h2>Sinais de Boa Nutrição</h2>
      <p>Um filhote bem nutrido apresenta:</p>
      <ul>
        <li>Pelagem brilhante e macia</li>
        <li>Energia e disposição para brincar</li>
        <li>Crescimento adequado</li>
        <li>Fezes firmes e bem formadas</li>
        <li>Olhos brilhantes e alertas</li>
      </ul>
    `,
    relatedArticles: [
      { id: 2, title: "Transição Alimentar em Filhotes", readTime: "3 min" },
      { id: 3, title: "Alimentos Proibidos para Cães", readTime: "4 min" },
      { id: 4, title: "Suplementação em Filhotes", readTime: "6 min" },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/health-tips">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-emerald-800">VetCare</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-transparent">
              <Share className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline">{article.petType}</Badge>
              <Badge variant="secondary">{article.category}</Badge>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-emerald-800 mb-4 text-balance">{article.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Por {article.author}</span>
              <span>•</span>
              <span>{article.publishDate}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-8">
            <img
              src={article.image || "/placeholder.svg?height=400&width=800"}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Article Content */}
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="pt-6">
                  <div
                    className="prose prose-emerald max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </CardContent>
              </Card>

              {/* Author Info */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Sobre o Autor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-emerald-600">DS</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{article.author}</h4>
                      <p className="text-sm text-gray-600">
                        Médica Veterinária especializada em Nutrição Animal. Mais de 10 anos de experiência em clínica
                        de pequenos animais.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Table of Contents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Neste Artigo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#introducao" className="text-emerald-600 hover:underline">
                        Introdução
                      </a>
                    </li>
                    <li>
                      <a href="#necessidades" className="text-emerald-600 hover:underline">
                        Necessidades Nutricionais
                      </a>
                    </li>
                    <li>
                      <a href="#cronograma" className="text-emerald-600 hover:underline">
                        Cronograma de Alimentação
                      </a>
                    </li>
                    <li>
                      <a href="#dicas" className="text-emerald-600 hover:underline">
                        Dicas Importantes
                      </a>
                    </li>
                    <li>
                      <a href="#sinais" className="text-emerald-600 hover:underline">
                        Sinais de Boa Nutrição
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <Card>
                <CardHeader>
                  <CardTitle>Artigos Relacionados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {article.relatedArticles.map((related) => (
                    <div key={related.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <Link href={`/health-tips/nutrition/${related.id}`} className="block">
                        <h4 className="font-medium text-sm mb-1">{related.title}</h4>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {related.readTime}
                        </span>
                      </Link>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Dúvidas?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Tem alguma dúvida sobre alimentação do seu pet? Converse com nossos veterinários.
                  </p>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                    <Link href="/chat/new">Falar com Veterinário</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
