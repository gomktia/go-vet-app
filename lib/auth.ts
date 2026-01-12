import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export interface User {
  id: string
  email: string
  password: string
  name: string
  role: "tutor" | "veterinarian"
  avatar?: string
  phone?: string
  address?: string
  // Novos campos profissionais
  crmv?: string // Para veterinários
  specialties?: string[] // Especialidades do veterinário
  experience?: number // Anos de experiência
  rating?: number // Avaliação média
  isVerified?: boolean // Verificação profissional
  twoFactorEnabled?: boolean
  emailVerified?: boolean
  createdAt?: string
  lastLogin?: string
}

export const testUsers: User[] = [
  {
    id: "1",
    email: "tutor@vetcare.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password: 123456
    name: "Maria Silva",
    role: "tutor",
    avatar: "/diverse-user-avatars.png",
    phone: "(11) 99999-1234",
    address: "Rua das Flores, 123 - São Paulo, SP",
    emailVerified: true,
    twoFactorEnabled: false,
    createdAt: "2024-01-15",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "2",
    email: "vet@vetcare.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password: 123456
    name: "Dr. João Santos",
    role: "veterinarian",
    avatar: "/caring-vet.png",
    phone: "(11) 99999-5678",
    address: "Clínica VetCare - Av. Paulista, 1000 - São Paulo, SP",
    crmv: "SP-12345",
    specialties: ["Clínica Geral", "Cirurgia", "Dermatologia"],
    experience: 8,
    rating: 4.9,
    isVerified: true,
    emailVerified: true,
    twoFactorEnabled: true,
    createdAt: "2023-06-10",
    lastLogin: new Date().toISOString(),
  },
]

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export const authenticateUser = async (
  email: string,
  password: string,
): Promise<{ user: User; token: string } | null> => {
  const user = testUsers.find((u) => u.email === email)
  if (!user) return null

  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) return null

  // Atualizar último login
  user.lastLogin = new Date().toISOString()

  // Gerar JWT token
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  )

  // Remover senha do objeto retornado
  const { password: _, ...userWithoutPassword } = user

  return { user: userWithoutPassword as User, token }
}

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null

  const token = localStorage.getItem("authToken")
  if (!token) return null

  const decoded = verifyToken(token)
  if (!decoded) {
    localStorage.removeItem("authToken")
    localStorage.removeItem("currentUser")
    return null
  }

  const userData = localStorage.getItem("currentUser")
  return userData ? JSON.parse(userData) : null
}

export const loginUser = (user: User, token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("currentUser", JSON.stringify(user))
    localStorage.setItem("authToken", token)
  }
}

export const logoutUser = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("authToken")
  }
}

export const requestPasswordReset = async (email: string): Promise<boolean> => {
  const user = testUsers.find((u) => u.email === email)
  if (!user) return false

  // Em produção, enviaria email com token de reset
  console.log(`Password reset requested for ${email}`)
  return true
}

export const verifyEmail = async (token: string): Promise<boolean> => {
  // Em produção, verificaria token de email
  console.log(`Email verification requested with token: ${token}`)
  return true
}

export const enable2FA = async (userId: string): Promise<{ secret: string; qrCode: string }> => {
  // Em produção, geraria secret real para 2FA
  return {
    secret: "JBSWY3DPEHPK3PXP",
    qrCode:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
  }
}
