
export function loadImg (path: string) {
  return new URL(path, import.meta.url).href
}
