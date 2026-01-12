export interface Review {
  id: string
  vetId: string
  vetName: string
  tutorId: string
  tutorName: string
  petId: string
  petName: string
  appointmentId?: string
  rating: number // 1-5 stars
  title: string
  comment: string
  categories: ReviewCategory[]
  isVerified: boolean
  isAnonymous: boolean
  createdAt: string
  updatedAt: string
  helpfulVotes: number
  reportCount: number
  vetResponse?: VetResponse
}

export interface ReviewCategory {
  category: "communication" | "expertise" | "punctuality" | "facilities" | "price" | "overall"
  rating: number
  label: string
}

export interface VetResponse {
  id: string
  vetId: string
  message: string
  createdAt: string
}

export interface ReviewStats {
  vetId: string
  totalReviews: number
  averageRating: number
  ratingDistribution: { [key: number]: number }
  categoryAverages: { [key: string]: number }
  recentReviews: Review[]
  verifiedReviewsCount: number
}

// Dados de exemplo
export const sampleReviews: Review[] = [
  {
    id: "1",
    vetId: "2",
    vetName: "Dr. João Santos",
    tutorId: "1",
    tutorName: "Maria Silva",
    petId: "1",
    petName: "Rex",
    appointmentId: "1",
    rating: 5,
    title: "Excelente atendimento!",
    comment:
      "Dr. João foi muito atencioso e cuidadoso com o Rex. Explicou tudo detalhadamente e o tratamento foi muito eficaz. Recomendo!",
    categories: [
      { category: "communication", rating: 5, label: "Comunicação" },
      { category: "expertise", rating: 5, label: "Conhecimento" },
      { category: "punctuality", rating: 4, label: "Pontualidade" },
      { category: "facilities", rating: 5, label: "Instalações" },
      { category: "overall", rating: 5, label: "Geral" },
    ],
    isVerified: true,
    isAnonymous: false,
    createdAt: "2024-12-08T10:00:00Z",
    updatedAt: "2024-12-08T10:00:00Z",
    helpfulVotes: 12,
    reportCount: 0,
    vetResponse: {
      id: "1",
      vetId: "2",
      message:
        "Muito obrigado pelo feedback, Maria! Foi um prazer cuidar do Rex. Estou sempre à disposição para qualquer dúvida.",
      createdAt: "2024-12-08T14:00:00Z",
    },
  },
  {
    id: "2",
    vetId: "2",
    vetName: "Dr. João Santos",
    tutorId: "3",
    tutorName: "Carlos Oliveira",
    petId: "3",
    petName: "Luna",
    rating: 4,
    title: "Bom profissional",
    comment:
      "Atendimento bom, mas a consulta demorou um pouco mais que o esperado. No geral, estou satisfeito com o tratamento da Luna.",
    categories: [
      { category: "communication", rating: 4, label: "Comunicação" },
      { category: "expertise", rating: 5, label: "Conhecimento" },
      { category: "punctuality", rating: 3, label: "Pontualidade" },
      { category: "facilities", rating: 4, label: "Instalações" },
      { category: "overall", rating: 4, label: "Geral" },
    ],
    isVerified: true,
    isAnonymous: false,
    createdAt: "2024-12-07T15:30:00Z",
    updatedAt: "2024-12-07T15:30:00Z",
    helpfulVotes: 5,
    reportCount: 0,
  },
  {
    id: "3",
    vetId: "2",
    vetName: "Dr. João Santos",
    tutorId: "4",
    tutorName: "Usuário Anônimo",
    petId: "4",
    petName: "Buddy",
    rating: 5,
    title: "Salvou meu pet!",
    comment:
      "Atendimento de emergência excepcional. Dr. João foi muito rápido e eficiente. Meu pet está bem graças a ele!",
    categories: [
      { category: "communication", rating: 5, label: "Comunicação" },
      { category: "expertise", rating: 5, label: "Conhecimento" },
      { category: "punctuality", rating: 5, label: "Pontualidade" },
      { category: "overall", rating: 5, label: "Geral" },
    ],
    isVerified: true,
    isAnonymous: true,
    createdAt: "2024-12-06T20:15:00Z",
    updatedAt: "2024-12-06T20:15:00Z",
    helpfulVotes: 8,
    reportCount: 0,
  },
]

export const getVetReviews = (vetId: string): Review[] => {
  return sampleReviews.filter((review) => review.vetId === vetId)
}

export const getVetStats = (vetId: string): ReviewStats => {
  const reviews = getVetReviews(vetId)
  const totalReviews = reviews.length

  if (totalReviews === 0) {
    return {
      vetId,
      totalReviews: 0,
      averageRating: 0,
      ratingDistribution: {},
      categoryAverages: {},
      recentReviews: [],
      verifiedReviewsCount: 0,
    }
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews

  const ratingDistribution = reviews.reduce(
    (dist, review) => {
      dist[review.rating] = (dist[review.rating] || 0) + 1
      return dist
    },
    {} as { [key: number]: number },
  )

  const categoryAverages = reviews.reduce(
    (avgs, review) => {
      review.categories.forEach((cat) => {
        if (!avgs[cat.category]) avgs[cat.category] = []
        avgs[cat.category].push(cat.rating)
      })
      return avgs
    },
    {} as { [key: string]: number[] },
  )

  Object.keys(categoryAverages).forEach((category) => {
    const ratings = categoryAverages[category]
    categoryAverages[category] = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
  })

  return {
    vetId,
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10,
    ratingDistribution,
    categoryAverages,
    recentReviews: reviews.slice(0, 3),
    verifiedReviewsCount: reviews.filter((r) => r.isVerified).length,
  }
}

export const createReview = (
  review: Omit<Review, "id" | "createdAt" | "updatedAt" | "helpfulVotes" | "reportCount">,
): Review => {
  const newReview: Review = {
    ...review,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    helpfulVotes: 0,
    reportCount: 0,
  }

  sampleReviews.push(newReview)
  return newReview
}

export const addVetResponse = (reviewId: string, vetId: string, message: string): void => {
  const review = sampleReviews.find((r) => r.id === reviewId)
  if (review && review.vetId === vetId) {
    review.vetResponse = {
      id: Date.now().toString(),
      vetId,
      message,
      createdAt: new Date().toISOString(),
    }
    review.updatedAt = new Date().toISOString()
  }
}
