export interface MedicalRecord {
  id: string
  petId: string
  vetId: string
  vetName: string
  date: string
  type: "consultation" | "surgery" | "vaccination" | "exam" | "emergency"
  diagnosis: string
  symptoms: string[]
  treatment: string
  medications: Medication[]
  exams: Exam[]
  notes: string
  attachments: string[]
  nextAppointment?: string
  digitalSignature?: string
  status: "draft" | "completed" | "reviewed"
}

export interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
  prescribedBy: string
  prescribedDate: string
}

export interface Exam {
  id: string
  type: string
  result: string
  date: string
  laboratory?: string
  attachments: string[]
  normalRange?: string
  status: "pending" | "completed" | "abnormal"
}

export interface Prescription {
  id: string
  petId: string
  vetId: string
  medications: Medication[]
  date: string
  validUntil: string
  digitalSignature: string
  status: "active" | "expired" | "used"
}

// Dados de exemplo
export const sampleMedicalRecords: MedicalRecord[] = [
  {
    id: "1",
    petId: "1",
    vetId: "2",
    vetName: "Dr. João Santos",
    date: "2024-12-09",
    type: "consultation",
    diagnosis: "Dermatite alérgica",
    symptoms: ["Coceira excessiva", "Vermelhidão na pele", "Perda de pelo localizada"],
    treatment: "Tratamento tópico e medicação oral",
    medications: [
      {
        id: "med1",
        name: "Prednisolona",
        dosage: "5mg",
        frequency: "2x ao dia",
        duration: "7 dias",
        instructions: "Administrar com alimento",
        prescribedBy: "Dr. João Santos",
        prescribedDate: "2024-12-09",
      },
    ],
    exams: [
      {
        id: "exam1",
        type: "Raspado de pele",
        result: "Negativo para ácaros",
        date: "2024-12-09",
        status: "completed",
      },
    ],
    notes: "Pet apresentou melhora significativa após 3 dias de tratamento. Recomendado retorno em 15 dias.",
    attachments: [],
    nextAppointment: "2024-12-24",
    digitalSignature: "Dr. João Santos - CRMV SP-12345",
    status: "completed",
  },
]

export const getMedicalRecords = (petId: string): MedicalRecord[] => {
  return sampleMedicalRecords.filter((record) => record.petId === petId)
}

export const createMedicalRecord = (record: Omit<MedicalRecord, "id">): MedicalRecord => {
  const newRecord: MedicalRecord = {
    ...record,
    id: Date.now().toString(),
  }
  sampleMedicalRecords.push(newRecord)
  return newRecord
}
