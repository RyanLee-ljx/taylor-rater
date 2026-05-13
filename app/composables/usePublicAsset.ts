export function usePublicAsset(path: string) {
  const config = useRuntimeConfig()
  const baseURL = config.app.baseURL || '/'
  return `${baseURL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}
