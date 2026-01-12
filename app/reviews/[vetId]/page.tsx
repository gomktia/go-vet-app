"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ThumbsUp, Flag, MessageCircle, Filter, TrendingUp, Award, Shield } from "lucide-react"
import { getVetReviews, getVetStats, type Review } from "@/lib/reviews"
import Link from "next/link"

export default function VetReviewsPage() {
  const params = useParams()
  const vetId = params.vetId as string
  const [sortBy, setSortBy] = useState<"recent" | "rating" | "helpful">("recent")
  const [filterRating, setFilterRating] = useState<number | null>(null)

  const reviews = getVetReviews(vetId)
  const stats = getVetStats(vetId)

  const filteredAndSortedReviews = reviews
    .filter((review) => (filterRating ? review.rating === filterRating : true))
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "helpful":
          return b.helpfulVotes - a.helpfulVotes
        case "recent":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClasses = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    }

    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  const renderReview = (review: Review) => (
    <Card key={review.id} className="mb-4">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/diverse-user-avatars.png" />
              <AvatarFallback>{review.isAnonymous ? "A" : review.tutorName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{review.isAnonymous ? "Usuário Anônimo" : review.tutorName}</h4>
                {review.isVerified && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <Shield className="w-3 h-3 mr-1" />
                    Verificado
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                {renderStars(review.rating, "sm")}
                <span className="text-sm text-gray-600">{new Date(review.createdAt).toLocaleDateString("pt-BR")}</span>
                <Badge variant="outline" className="text-xs">
                  {review.petName}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <ThumbsUp className="w-4 h-4 mr-1" />
              {review.helpfulVotes}
            </Button>
            <Button variant="ghost" size="sm">
              <Flag className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h5 className="font-medium mb-2">{review.title}</h5>
        <p className="text-gray-700 mb-4">{review.comment}</p>

        {/* Category Ratings */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {review.categories.map((category) => (
            <div key={category.category} className="text-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-600">{category.label}</span>
                <span className="font-medium">{category.rating}/5</span>
              </div>
              <Progress value={category.rating * 20} className="h-1" />
            </div>
          ))}
        </div>

        {/* Vet Response */}
        {review.vetResponse && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src="/caring-vet.png" />
                <AvatarFallback>Dr</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">Resposta do veterinário</span>
              <span className="text-xs text-gray-500">
                {new Date(review.vetResponse.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </div>
            <p className="text-sm text-gray-700">{review.vetResponse.message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Avaliações</h1>
              <p className="text-gray-600 mt-1">Dr. João Santos - CRMV SP-12345</p>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href={`/reviews/${vetId}/create`}>Avaliar Veterinário</Link>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Stats Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Overall Rating */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Avaliação Geral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stats.averageRating}</div>
                  {renderStars(Math.round(stats.averageRating), "lg")}
                  <p className="text-sm text-gray-600 mt-2">Baseado em {stats.totalReviews} avaliações</p>
                  <Badge variant="outline" className="mt-2">
                    <Shield className="w-3 h-3 mr-1" />
                    {stats.verifiedReviewsCount} verificadas
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Rating Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Notas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = stats.ratingDistribution[rating] || 0
                    const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0

                    return (
                      <div key={rating} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-12">
                          <span className="text-sm">{rating}</span>
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        </div>
                        <Progress value={percentage} className="flex-1 h-2" />
                        <span className="text-sm text-gray-600 w-8">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Category Averages */}
            <Card>
              <CardHeader>
                <CardTitle>Avaliação por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(stats.categoryAverages).map(([category, average]) => {
                    const labels = {
                      communication: "Comunicação",
                      expertise: "Conhecimento",
                      punctuality: "Pontualidade",
                      facilities: "Instalações",
                      overall: "Geral",
                    }

                    return (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{labels[category as keyof typeof labels]}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{Math.round(average * 10) / 10}</span>
                          {renderStars(Math.round(average), "sm")}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="all" className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">Todas ({stats.totalReviews})</TabsTrigger>
                  <TabsTrigger value="recent">Recentes</TabsTrigger>
                  <TabsTrigger value="verified">Verificadas ({stats.verifiedReviewsCount})</TabsTrigger>
                </TabsList>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrar
                  </Button>
                  <Button variant="outline" size="sm">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Ordenar
                  </Button>
                </div>
              </div>

              <TabsContent value="all" className="space-y-4">
                {filteredAndSortedReviews.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma avaliação encontrada</h3>
                      <p className="text-gray-600 mb-4">Seja o primeiro a avaliar este veterinário.</p>
                      <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                        <Link href={`/reviews/${vetId}/create`}>Fazer Avaliação</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  filteredAndSortedReviews.map(renderReview)
                )}
              </TabsContent>

              <TabsContent value="recent">{stats.recentReviews.map(renderReview)}</TabsContent>

              <TabsContent value="verified">
                {filteredAndSortedReviews.filter((r) => r.isVerified).map(renderReview)}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
