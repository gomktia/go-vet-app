export class NotificationService {
  private static instance: NotificationService

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  async requestPermission(): Promise<boolean> {
    if (!("Notification" in window)) {
      console.log("[Notifications] Not supported")
      return false
    }

    if (Notification.permission === "granted") {
      return true
    }

    if (Notification.permission === "denied") {
      return false
    }

    const permission = await Notification.requestPermission()
    return permission === "granted"
  }

  async subscribeToPush(): Promise<PushSubscription | null> {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.log("[Push] Not supported")
      return null
    }

    try {
      const registration = await navigator.serviceWorker.ready

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          "BEl62iUYgUivxIkv69yViEuiBIa40HI80NqIUHI80NqIUHI80NqIUHI80NqI", // Chave pública VAPID
        ),
      })

      console.log("[Push] Subscription successful")
      return subscription
    } catch (error) {
      console.error("[Push] Subscription failed:", error)
      return null
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  showLocalNotification(title: string, options?: NotificationOptions): void {
    if (Notification.permission === "granted") {
      new Notification(title, {
        icon: "/icon-192x192.jpg",
        badge: "/icon-72x72.png",
        ...options,
      })
    }
  }

  // Notificações específicas do VetCare
  notifyNewMessage(vetName: string, message: string): void {
    this.showLocalNotification(`Nova mensagem de ${vetName}`, {
      body: message,
      tag: "new-message",
      requireInteraction: true,
      actions: [
        { action: "reply", title: "Responder" },
        { action: "view", title: "Ver conversa" },
      ],
    })
  }

  notifyAppointmentReminder(vetName: string, time: string): void {
    this.showLocalNotification("Lembrete de Consulta", {
      body: `Sua consulta com ${vetName} é às ${time}`,
      tag: "appointment-reminder",
      requireInteraction: true,
    })
  }

  notifyEmergencyResponse(): void {
    this.showLocalNotification("Atendimento de Emergência", {
      body: "Um veterinário está disponível para atendê-lo agora",
      tag: "emergency-response",
      requireInteraction: true,
      vibrate: [200, 100, 200, 100, 200],
    })
  }
}

// Offline storage utilities
export class OfflineStorage {
  private dbName = "VetCareDB"
  private version = 1
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create object stores
        if (!db.objectStoreNames.contains("messages")) {
          const messageStore = db.createObjectStore("messages", { keyPath: "id" })
          messageStore.createIndex("conversationId", "conversationId", { unique: false })
        }

        if (!db.objectStoreNames.contains("pets")) {
          db.createObjectStore("pets", { keyPath: "id" })
        }

        if (!db.objectStoreNames.contains("appointments")) {
          db.createObjectStore("appointments", { keyPath: "id" })
        }
      }
    })
  }

  async saveMessage(message: any): Promise<void> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["messages"], "readwrite")
    const store = transaction.objectStore("messages")
    await store.add({ ...message, offline: true })
  }

  async getOfflineMessages(): Promise<any[]> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["messages"], "readonly")
      const store = transaction.objectStore("messages")
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result.filter((msg) => msg.offline))
      request.onerror = () => reject(request.error)
    })
  }

  async clearOfflineData(): Promise<void> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["messages"], "readwrite")
    const store = transaction.objectStore("messages")

    // Remove only offline messages
    const messages = await this.getOfflineMessages()
    for (const message of messages) {
      await store.delete(message.id)
    }
  }
}
