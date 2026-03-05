'use client'

import { useEffect } from 'react'
import { keepAlive } from '@/app/lib/keepAlive'

export default function KeepAlive() {
  useEffect(() => { keepAlive() }, [])
  return null
}