"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Star, Heart, ArrowLeft, Send } from "lucide-react"
import { createReview, type ReviewCategory } from "@/lib/reviews"
import { getCurrentUser } from "@/lib/auth"
import Link from "next/link"

export default function CreateReviewPage() {
  const params = useParams()
  const router = useRouter()
  const vetId = params.vetId as string
  const user = getCurrentUser()

  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<ReviewCategory[]>([
    { category: "communication", rating: 0, label: "Comunicação" },
    { category: "expertise", rating: 0, label: "Conhecimento Técnico" },
    { category: "punctuality", rating: 0, label: "Pontualidade" },
    { category: "facilities", rating: 0, label: "Instalações" },
    { category: "overall", rating: 0, label: "Experiência Geral" },
  ])

  const updateCategoryRating = (categoryIndex: number, newRating: number) => {
    const updatedCategories = [...categories]
    updatedCategories[categoryIndex].rating = newRating
    setCategories(updatedCategories)
  }

  const renderStarRating = (
    currentRating: number,
    onRate: (rating: number) => void,
    onHover?: (rating: number) => void,
    size: "sm" | "md" | "lg" = "md",
  ) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
    }

    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="transition-colors hover:scale-110"
            onClick={() => onRate(star)}
            onMouseEnter={() => onHover?.(star)}
            onMouseLeave={() => onHover?.(0)}
          >
            <Star
              className={`${sizeClasses[size]} transition-colors ${
                star <= (onHover ? hoverRating : currentRating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 hover:text-yellow-200"
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      alert("Você precisa estar logado para avaliar")
      return
    }

    if (rating === 0) {
      alert("Por favor, selecione uma avaliação geral")
      return
    }

    if (!title.trim() || !comment.trim()) {
      alert("Por favor, preencha o título e comentário")
      return
    }

    setIsSubmitting(true)

    try {
      const newReview = createReview({
        vetId,
        vetName: "Dr. João Santos",
        tutorId: user.id,
        tutorName: user.name,
        petId: "1", // Em produção, seria selecionado
        petName: "Rex",
        rating,
        title: title.trim(),
        comment: comment.trim(),
        categories: categories.filter((cat) => cat.rating > 0),
        isVerified: true, // Baseado na verificação do usuário
        isAnonymous,
      })

      console.log("Review created:", newReview)
      router.push(`/reviews/${vetId}`)
    } catch (error) {
      console.error("Error creating review:", error)
      alert("Erro ao enviar avaliação. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Login Necessário</h3>
            <p className="text-gray-600 mb-4">Você precisa estar logado para avaliar um veterinário.</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href="/login">Fazer Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" asChild>
              <Link href={`/reviews/${vetId}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Avaliar Veterinário</h1>
          <p className="text-gray-600 mt-1">Dr. João Santos - CRMV SP-12345</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Overall Rating */}
          <Card>
            <CardHeader>
              <CardTitle>Avaliação Geral</CardTitle>
              <CardDescription>Como você avalia sua experiência geral com este veterinário?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                {renderStarRating(rating, setRating, setHoverRating, "lg")}
                <span className="text-lg font-medium">{hoverRating || rating}/5</span>
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {rating === 5 && "Excelente!"}
                  {rating === 4 && "Muito bom!"}
                  {rating === 3 && "Bom"}
                  {rating === 2 && "Regular"}
                  {rating === 1 && "Precisa melhorar"}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Category Ratings */}
          <Card>
            <CardHeader>
              <CardTitle>Avaliação Detalhada</CardTitle>
              <CardDescription>Avalie aspectos específicos do atendimento (opcional)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div key={category.category} className="flex items-center justify-between">
                    <Label className="text-sm font-medium">{category.label}</Label>
                    <div className="flex items-center gap-2">
                      {renderStarRating(
                        category.rating,
                        (newRating) => updateCategoryRating(index, newRating),
                        undefined,
                        "sm",
                      )}
                      <span className="text-sm text-gray-600 w-8">
                        {category.rating > 0 ? `${category.rating}/5` : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Review Content */}
          <Card>
            <CardHeader>
              <CardTitle>Sua Avaliação</CardTitle>
              <CardDescription>Compartilhe sua experiência para ajudar outros tutores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título da Avaliação</Label>
                <Input
                  id="title"
                  placeholder="Ex: Excelente atendimento!"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={100}
                />
                <p className="text-xs text-gray-500 mt-1">{title.length}/100 caracteres</p>
              </div>

              <div>
                <Label htmlFor="comment">Comentário</Label>
                <Textarea
                  id="comment"
                  placeholder="Conte sobre sua experiência com este veterinário..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{comment.length}/500 caracteres</p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Options */}
          <Card>
            <CardHeader>
              <CardTitle>Opções de Privacidade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="anonymous">Avaliação Anônima</Label>
                  <p className="text-sm text-gray-600">Sua avaliação será exibida como "Usuário Anônimo"</p>
                </div>
                <Switch id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
              </div>
            </CardContent>
          </Card>

          {/* Terms Alert */}
          <Alert>
            <AlertDescription>
              Ao enviar sua avaliação, você concorda que ela seja pública e que seguirá nossas diretrizes de comunidade.
              Avaliações falsas ou ofensivas serão removidas.
            </AlertDescription>
          </Alert>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              disabled={isSubmitting || rating === 0 || !title.trim() || !comment.trim()}
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Avaliação
                </>
              )}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href={`/reviews/${vetId}`}>Cancelar</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
