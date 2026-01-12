export interface Pet {
  id: string
  name: string
  species: string
  breed: string
  age: number
  weight: number
  color: string
  gender: "male" | "female"
  ownerId: string
  ownerName: string
  ownerPhone: string
  ownerEmail: string
  microchip?: string
  birthDate: string
  registrationDate: string
  avatar?: string
  medicalConditions?: string[]
  allergies?: string[]
  isActive: boolean
}

export const pets: Pet[] = [
  {
    id: "1",
    name: "Max",
    species: "Cão",
    breed: "Golden Retriever",
    age: 3,
    weight: 28.5,
    color: "Dourado",
    gender: "male",
    ownerId: "1",
    ownerName: "Maria Silva",
    ownerPhone: "(11) 99999-1234",
    ownerEmail: "maria@email.com",
    microchip: "982000123456789",
    birthDate: "2021-03-15",
    registrationDate: "2021-04-10",
    avatar: "/golden-retriever.png",
    medicalConditions: ["Displasia de quadril leve"],
    allergies: ["Frango"],
    isActive: true,
  },
  {
    id: "2",
    name: "Luna",
    species: "Gato",
    breed: "Persa",
    age: 2,
    weight: 4.2,
    color: "Branco",
    gender: "female",
    ownerId: "2",
    ownerName: "João Santos",
    ownerPhone: "(11) 99999-5678",
    ownerEmail: "joao@email.com",
    microchip: "982000987654321",
    birthDate: "2022-01-20",
    registrationDate: "2022-02-15",
    avatar: "/white-persian-cat.jpg",
    medicalConditions: [],
    allergies: ["Peixe"],
    isActive: true,
  },
  {
    id: "3",
    name: "Rex",
    species: "Cão",
    breed: "Pastor Alemão",
    age: 5,
    weight: 35.0,
    color: "Preto e marrom",
    gender: "male",
    ownerId: "3",
    ownerName: "Ana Costa",
    ownerPhone: "(11) 99999-9012",
    ownerEmail: "ana@email.com",
    microchip: "982000456789123",
    birthDate: "2019-08-10",
    registrationDate: "2019-09-05",
    avatar: "/german-shepherd.png",
    medicalConditions: ["Artrite"],
    allergies: [],
    isActive: true,
  },
  {
    id: "4",
    name: "Mimi",
    species: "Gato",
    breed: "Siamês",
    age: 1,
    weight: 3.8,
    color: "Creme com pontas escuras",
    gender: "female",
    ownerId: "4",
    ownerName: "Carlos Lima",
    ownerPhone: "(11) 99999-3456",
    ownerEmail: "carlos@email.com",
    microchip: "982000789123456",
    birthDate: "2023-05-12",
    registrationDate: "2023-06-20",
    avatar: "/siamese-cat.png",
    medicalConditions: [],
    allergies: [],
    isActive: true,
  },
  {
    id: "5",
    name: "Buddy",
    species: "Cão",
    breed: "Labrador",
    age: 4,
    weight: 30.2,
    color: "Chocolate",
    gender: "male",
    ownerId: "5",
    ownerName: "Patricia Oliveira",
    ownerPhone: "(11) 99999-7890",
    ownerEmail: "patricia@email.com",
    microchip: "982000321654987",
    birthDate: "2020-11-03",
    registrationDate: "2020-12-01",
    avatar: "/chocolate-labrador-dog.jpg",
    medicalConditions: ["Obesidade leve"],
    allergies: ["Milho"],
    isActive: true,
  },
  {
    id: "6",
    name: "Whiskers",
    species: "Gato",
    breed: "Maine Coon",
    age: 6,
    weight: 7.5,
    color: "Cinza tigrado",
    gender: "male",
    ownerId: "6",
    ownerName: "Roberto Ferreira",
    ownerPhone: "(11) 99999-2468",
    ownerEmail: "roberto@email.com",
    microchip: "982000654321789",
    birthDate: "2018-07-25",
    registrationDate: "2018-08-15",
    avatar: "/maine-coon-gray-cat.jpg",
    medicalConditions: ["Cardiomiopatia hipertrófica"],
    allergies: [],
    isActive: true,
  },
]

export const getPetById = (id: string): Pet | undefined => {
  return pets.find((pet) => pet.id === id)
}

export const getPetsByOwner = (ownerId: string): Pet[] => {
  return pets.filter((pet) => pet.ownerId === ownerId)
}

export const getActivePets = (): Pet[] => {
  return pets.filter((pet) => pet.isActive)
}

export const searchPets = (query: string): Pet[] => {
  const lowercaseQuery = query.toLowerCase()
  return pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(lowercaseQuery) ||
      pet.species.toLowerCase().includes(lowercaseQuery) ||
      pet.breed.toLowerCase().includes(lowercaseQuery) ||
      pet.ownerName.toLowerCase().includes(lowercaseQuery),
  )
}
