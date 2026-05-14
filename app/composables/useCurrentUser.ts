import type { CurrentUser } from '~/types/rating'
import { STORAGE_KEYS } from '~/lib/constants'
import { createGuestId, pickAvatarColor } from '~/lib/utils'

export function useCurrentUser() {
  const user = useState<CurrentUser | null>('current-user', () => null)
  const ready = useState('current-user-ready', () => false)

  function loadUser() {
    if (!import.meta.client || ready.value) {
      return
    }

    const raw = localStorage.getItem(STORAGE_KEYS.currentUser)
    if (raw) {
      try {
        user.value = JSON.parse(raw) as CurrentUser
      } catch {
        localStorage.removeItem(STORAGE_KEYS.currentUser)
      }
    }

    ready.value = true
  }

  function persistUser(nextUser: CurrentUser) {
    user.value = nextUser

    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(nextUser))
    }

    return nextUser
  }

  function saveUser(nickname: string, overrides: Partial<CurrentUser> = {}) {
    const cleanNickname = nickname.trim().slice(0, 24)
    if (!cleanNickname) {
      throw new Error('Nickname is required.')
    }

    const nextUser: CurrentUser = {
      id: overrides.id || user.value?.id || createGuestId(),
      albumId: overrides.albumId ?? user.value?.albumId,
      authUid: overrides.authUid ?? user.value?.authUid,
      nickname: cleanNickname,
      avatarColor: overrides.avatarColor || user.value?.avatarColor || pickAvatarColor(cleanNickname),
      createdAt: overrides.createdAt || user.value?.createdAt || new Date().toISOString(),
      isRemote: overrides.isRemote ?? user.value?.isRemote,
      remoteProfiles: {
        ...(user.value?.remoteProfiles || {}),
        ...(overrides.remoteProfiles || {})
      }
    }

    return persistUser(nextUser)
  }

  function setUser(nextUser: CurrentUser) {
    return persistUser(nextUser)
  }

  function clearUser() {
    user.value = null
    if (import.meta.client) {
      localStorage.removeItem(STORAGE_KEYS.currentUser)
    }
  }

  onMounted(loadUser)

  return {
    user,
    ready,
    loadUser,
    saveUser,
    setUser,
    clearUser
  }
}
