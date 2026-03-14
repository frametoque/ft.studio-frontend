'use client'

import { useEffect } from 'react'
import { keepAlive } from '@/lib/keepAlive'

export default function KeepAlive() {
  useEffect(() => {
    keepAlive()
  }, [])

  return null
}