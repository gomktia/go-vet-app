
export interface Appointment {
    id: string
    petId: string
    petName: string // Denormalized for simpler UI
    tutorName: string
    vetId: string
    vetName: string
    date: string // ISO string
    duration: number // In minutes
    type: "consultation" | "surgery" | "vaccine" | "exam"
    status: "pending" | "confirmed" | "completed" | "cancelled"

    // Pivot: Fields for SaaS / Smart Routing
    city: string
    clinicId?: string // If null, it's a home visit or online
    clinicName?: string
    roomStatus?: "pending" | "approved" | "rejected"
    isRouteOptimized?: boolean
    notes?: string
    price: number
}

export const mockAppointments: Appointment[] = [
    {
        id: "apt1",
        petId: "1",
        petName: "Rex",
        tutorName: "Maria Silva",
        vetId: "v1",
        vetName: "Dr. Você",
        date: "2026-02-15T09:00:00",
        duration: 60,
        type: "surgery",
        status: "confirmed",
        city: "Torres",
        clinicId: "c2", // Clínica Pet Torres
        clinicName: "Clínica Pet Torres",
        roomStatus: "approved",
        price: 1500,
        notes: "Cirurgia Ortopédica"
    },
    {
        id: "apt2",
        petId: "2",
        petName: "Luna",
        tutorName: "João Santos",
        vetId: "v1",
        vetName: "Dr. Você",
        date: "2026-02-15T14:00:00",
        duration: 30,
        type: "consultation",
        status: "pending",
        city: "Tubarão", // Starting point
        clinicId: "c1",
        clinicName: "Hospital Veterinário Tubarão",
        roomStatus: "pending",
        price: 300
    },
    {
        id: "apt3",
        petId: "3",
        petName: "Thor",
        tutorName: "Pedro Alves",
        vetId: "v1",
        vetName: "Dr. Você",
        date: "2026-02-15T16:30:00",
        duration: 45,
        type: "exam",
        status: "pending",
        city: "Jaguaruna", // On the way
        clinicId: "c4",
        clinicName: "Centro Vet Jaguaruna",
        roomStatus: "pending",
        price: 450
    }
]
