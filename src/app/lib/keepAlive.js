// lib/keepAlive.js
export const keepAlive = () => {
  setInterval(async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`)
    } catch (_) {}
  }, 14 * 60 * 1000) // every 14 minutes
}