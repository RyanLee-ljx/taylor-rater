import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function roundToOne(value: number) {
  return Math.round(value * 10) / 10
}

export function roundToTwo(value: number) {
  return Math.round(value * 100) / 100
}

export function formatScore(value: number) {
  return value.toFixed(1)
}

export function createGuestId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `guest-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function pickAvatarColor(seed: string) {
  const colors = ['#d7a4b8', '#d6bd7b', '#9fb7df', '#b7a4df', '#a8d7c7', '#d8c6ee']
  const sum = [...seed].reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[sum % colors.length]
}
