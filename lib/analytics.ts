export interface AnalyticsData {
  revenue: {
    daily: number
    weekly: number
    monthly: number
    yearly: number
  }
  appointments: {
    total: number
    completed: number
    cancelled: number
    noShow: number
  }
  patients: {
    total: number
    active: number
    new: number
    returning: number
  }
  satisfaction: {
    average: number
    totalReviews: number
    npsScore: number
  }
  performance: {
    avgConsultationTime: number
    responseTime: number
    appointmentsPerDay: number
  }
}

export const getAnalyticsData = async (timeRange = "30d"): Promise<AnalyticsData> => {
  // Simulação de dados - em produção viria do banco de dados
  return {
    revenue: {
      daily: 2850,
      weekly: 18200,
      monthly: 72500,
      yearly: 870000,
    },
    appointments: {
      total: 353,
      completed: 325,
      cancelled: 18,
      noShow: 10,
    },
    patients: {
      total: 1247,
      active: 892,
      new: 85,
      returning: 807,
    },
    satisfaction: {
      average: 4.9,
      totalReviews: 52,
      npsScore: 87,
    },
    performance: {
      avgConsultationTime: 32,
      responseTime: 2.5,
      appointmentsPerDay: 12.3,
    },
  }
}

export const generateReport = async (type: "revenue" | "patients" | "performance", timeRange: string) => {
  // Simulação de geração de relatório
  const data = await getAnalyticsData(timeRange)

  return {
    type,
    timeRange,
    generatedAt: new Date().toISOString(),
    data,
    summary: `Relatório de ${type} para os últimos ${timeRange}`,
  }
}

export const exportAnalytics = (data: AnalyticsData, format: "csv" | "pdf" | "excel") => {
  // Simulação de exportação
  console.log(`Exportando dados em formato ${format}:`, data)

  // Em produção, geraria arquivo real
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = `analytics-${new Date().toISOString().split("T")[0]}.${format}`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
