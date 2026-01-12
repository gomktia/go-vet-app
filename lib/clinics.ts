
export interface Clinic {
    id: string
    name: string
    address: string
    city: string
    state: string
    cnpj?: string
    phone: string
    managerName?: string
    description?: string // Marketing text
    imageUrl?: string
    operatingHours?: {
        open: string
        close: string
        weekends: boolean
    }
    facilities: {
        hasSurgeryRoom: boolean
        hasXRay: boolean
        hasUltrasound: boolean
        hasInternation: boolean
        surgeryRoomsCount?: number
    }
    equipment: string[] // List of available high-end equipment (e.g., "Anestesia Inalatória", "Raio-X Digital")
    rentalPricePerHour: number // Cost for the specialist to rent the room
    pendingDemand?: {
        specialty: string
        count: number
    }[] // "Reverse Demand": Clinic says "I have 3 cardio patients waiting"
    rating?: number
    isPartner: boolean
    latitude: number
    longitude: number
}

// Mock data para Hospitais Parceiros (Cenário SC/RS)
export const clinics: Clinic[] = [
    {
        id: "c1",
        name: "Hospital Veterinário Tubarão",
        description: "Referência em alta complexidade com UTI 24h.",
        address: "Av. Marcolino Martins Cabral, 1234",
        city: "Tubarão",
        state: "SC",
        phone: "(48) 3622-0000",
        facilities: {
            hasSurgeryRoom: true,
            hasXRay: true,
            hasUltrasound: true,
            hasInternation: true,
            surgeryRoomsCount: 2
        },
        equipment: ["Anestesia Inalatória", "Monitor Multiparamétrico", "Raio-X Digital", "Hemogasometria"],
        rentalPricePerHour: 150,
        pendingDemand: [
            { specialty: "Ortopedia", count: 2 },
            { specialty: "Dermatologia", count: 5 }
        ],
        isPartner: true,
        rating: 4.8,
        latitude: -28.4744, // Coordenadas aproximadas
        longitude: -49.0166,
        imageUrl: "/clinic-1.png"
    },
    {
        id: "c2",
        name: "Clínica Pet Torres",
        description: "Estrutura nova e moderna no centro de Torres com foco em diagnóstico por imagem.",
        address: "Rua José Bonifácio, 500",
        city: "Torres",
        state: "RS",
        phone: "(51) 3664-0000",
        facilities: {
            hasSurgeryRoom: true,
            hasXRay: true,
            hasUltrasound: true,
            hasInternation: true,
            surgeryRoomsCount: 1
        },
        equipment: ["Anestesia Inalatória", "Bisturi Elétrico", "Ultrassom Doppler"],
        rentalPricePerHour: 100,
        pendingDemand: [
            { specialty: "Cardiologia", count: 3 }
        ],
        isPartner: true,
        rating: 4.5,
        latitude: -29.3364,
        longitude: -49.7278,
        imageUrl: "/clinic-2.png"
    },
    {
        id: "c3",
        name: "Hospital Veterinário Araranguá",
        description: "Centro hospitalar completo para procedimentos de todas as complexidades.",
        address: "Av. 7 de Setembro, 800",
        city: "Araranguá",
        state: "SC",
        phone: "(48) 3524-0000",
        facilities: {
            hasSurgeryRoom: true,
            hasXRay: true,
            hasUltrasound: true,
            hasInternation: true,
            surgeryRoomsCount: 2
        },
        equipment: ["Anestesia Inalatória", "Raio-X Digital", "Laboratório Próprio"],
        rentalPricePerHour: 130,
        isPartner: true,
        rating: 4.6,
        latitude: -28.9355,
        longitude: -49.4927,
        imageUrl: "/clinic-3.png"
    },
    {
        id: "c4",
        name: "Centro Vet Jaguaruna",
        address: "Av. Duque de Caxias, 100",
        city: "Jaguaruna",
        state: "SC",
        phone: "(48) 3624-0000",
        facilities: {
            hasSurgeryRoom: true, // Apenas consultório
            hasXRay: false,
            hasUltrasound: false,
            hasInternation: false,
            surgeryRoomsCount: 0
        },
        isPartner: true,
        rating: 4.2,
        latitude: -28.6146,
        longitude: -49.0264
    }
]

export const getClinicsByCity = (city: string): Clinic[] => {
    return clinics.filter(c => c.city.toLowerCase().includes(city.toLowerCase()))
}

export const getClinicsWithSurgeryRoom = (): Clinic[] => {
    return clinics.filter(c => c.facilities.hasSurgeryRoom)
}
