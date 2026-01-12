interface Coordinates {
  lat: number
  lng: number
}

interface RouteAppointment {
  id: string
  coordinates: Coordinates
  priority: "baixa" | "normal" | "alta" | "urgente"
  duration: number
  timeWindow?: { start: string; end: string }
}

export class SmartRoutingEngine {
  // Calcular distância entre dois pontos (fórmula de Haversine)
  private calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
    const R = 6371 // Raio da Terra em km
    const dLat = this.toRad(coord2.lat - coord1.lat)
    const dLon = this.toRad(coord2.lng - coord1.lng)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(coord1.lat)) * Math.cos(this.toRad(coord2.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180)
  }

  // Algoritmo de otimização de rota (TSP com heurísticas)
  public optimizeRoute(appointments: RouteAppointment[], startLocation: Coordinates): RouteAppointment[] {
    if (appointments.length <= 1) return appointments

    // Ordenar por prioridade primeiro
    const priorityWeights = { urgente: 4, alta: 3, normal: 2, baixa: 1 }
    const sortedByPriority = [...appointments].sort((a, b) => priorityWeights[b.priority] - priorityWeights[a.priority])

    // Aplicar algoritmo do vizinho mais próximo para cada grupo de prioridade
    const result: RouteAppointment[] = []
    let currentLocation = startLocation
    const remaining = [...sortedByPriority]

    while (remaining.length > 0) {
      let nearestIndex = 0
      let nearestDistance = this.calculateDistance(currentLocation, remaining[0].coordinates)

      // Encontrar o mais próximo considerando prioridade
      for (let i = 1; i < remaining.length; i++) {
        const distance = this.calculateDistance(currentLocation, remaining[i].coordinates)
        const priorityBonus = priorityWeights[remaining[i].priority] * 0.5 // Bonus de proximidade por prioridade

        if (distance - priorityBonus < nearestDistance) {
          nearestDistance = distance
          nearestIndex = i
        }
      }

      const nearest = remaining.splice(nearestIndex, 1)[0]
      result.push(nearest)
      currentLocation = nearest.coordinates
    }

    return result
  }

  // Calcular tempo estimado de viagem
  public calculateTravelTime(distance: number, trafficFactor = 1.2): number {
    // Velocidade média urbana: 25 km/h com fator de trânsito
    const avgSpeed = 25 / trafficFactor
    return Math.round((distance / avgSpeed) * 60) // em minutos
  }

  // Detectar conflitos de horário
  public detectTimeConflicts(appointments: RouteAppointment[]): string[] {
    const conflicts: string[] = []
    // Implementar lógica de detecção de conflitos
    return conflicts
  }

  // Sugerir reagendamentos automáticos
  public suggestRescheduling(appointments: RouteAppointment[], conflicts: string[]): RouteAppointment[] {
    // Implementar lógica de reagendamento inteligente
    return appointments
  }

  // Gerar notificações para clientes
  public generateClientNotifications(
    optimizedRoute: RouteAppointment[],
    startTime: string,
  ): Array<{
    appointmentId: string
    estimatedArrival: string
    message: string
  }> {
    const notifications: Array<{
      appointmentId: string
      estimatedArrival: string
      message: string
    }> = []

    const currentTime = new Date(`2024-01-01 ${startTime}`)

    optimizedRoute.forEach((appointment, index) => {
      if (index > 0) {
        // Adicionar tempo de viagem
        const prevAppointment = optimizedRoute[index - 1]
        const distance = this.calculateDistance(prevAppointment.coordinates, appointment.coordinates)
        const travelTime = this.calculateTravelTime(distance)
        currentTime.setMinutes(currentTime.getMinutes() + travelTime)
      }

      const estimatedArrival = currentTime.toTimeString().slice(0, 5)

      notifications.push({
        appointmentId: appointment.id,
        estimatedArrival,
        message: `Olá! O Dr. João está a caminho e deve chegar às ${estimatedArrival}. Acompanhe em tempo real: https://cancianvet.app/route/abc123`,
      })

      // Adicionar duração do atendimento
      currentTime.setMinutes(currentTime.getMinutes() + appointment.duration)
    })

    return notifications
  }
}

// Serviço de tracking em tempo real
export class RealTimeTracking {
  private trackingData: Map<string, any> = new Map()

  public startTracking(routeId: string, vetId: string): void {
    // Iniciar tracking GPS do veterinário
    console.log(`Starting GPS tracking for route ${routeId}, vet ${vetId}`)
  }

  public updateLocation(routeId: string, location: Coordinates): void {
    // Atualizar localização em tempo real
    this.trackingData.set(routeId, {
      ...this.trackingData.get(routeId),
      currentLocation: location,
      lastUpdate: new Date().toISOString(),
    })
  }

  public notifyClientArrival(appointmentId: string, estimatedMinutes: number): void {
    // Enviar notificação quando veterinário estiver próximo
    console.log(`Notifying client: Vet arriving in ${estimatedMinutes} minutes`)
  }

  public handleCancellation(appointmentId: string, reason: string): void {
    // Processar cancelamento e reorganizar rota
    console.log(`Appointment ${appointmentId} cancelled: ${reason}`)
  }
}

export const routingEngine = new SmartRoutingEngine()
export const realTimeTracking = new RealTimeTracking()
