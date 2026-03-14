export const keepAlive = (): void => {
  setInterval(async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}`)
    } catch (_) {}
  }, 14 * 60 * 1000)
}