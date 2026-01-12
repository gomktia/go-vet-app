const CACHE_NAME = "vetcare-v1"
const urlsToCache = [
  "/",
  "/dashboard",
  "/pets",
  "/chat",
  "/appointments",
  "/offline",
  "/icon-192x192.jpg",
  "/icon-512x512.jpg",
  "/manifest.json",
]

// Install event - cache resources
self.addEventListener("install", (event) => {
  console.log("[SW] Install event")
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Caching app shell")
      return cache.addAll(urlsToCache)
    }),
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      if (response) {
        console.log("[SW] Serving from cache:", event.request.url)
        return response
      }

      return fetch(event.request).catch(() => {
        // If both cache and network fail, show offline page
        if (event.request.destination === "document") {
          return caches.match("/offline")
        }
      })
    }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activate event")
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[SW] Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

// Push notification event
self.addEventListener("push", (event) => {
  console.log("[SW] Push received")

  const options = {
    body: event.data ? event.data.text() : "Nova mensagem do VetCare",
    icon: "/icon-192x192.jpg",
    badge: "/icon-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Ver mensagem",
        icon: "/icon-192x192.jpg",
      },
      {
        action: "close",
        title: "Fechar",
        icon: "/icon-192x192.jpg",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("VetCare", options))
})

// Notification click event
self.addEventListener("notificationclick", (event) => {
  console.log("[SW] Notification click received")

  event.notification.close()

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/chat"))
  }
})

// Background sync event
self.addEventListener("sync", (event) => {
  console.log("[SW] Background sync:", event.tag)

  if (event.tag === "background-sync") {
    event.waitUntil(
      // Sync offline data when connection is restored
      syncOfflineData(),
    )
  }
})

async function syncOfflineData() {
  try {
    // Get offline data from IndexedDB and sync with server
    console.log("[SW] Syncing offline data")
    // Implementation would go here
  } catch (error) {
    console.error("[SW] Sync failed:", error)
  }
}
