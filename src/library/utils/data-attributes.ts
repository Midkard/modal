function normalizeData(value: string | undefined | null) {
  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  if (value === Number(value).toString()) {
    return Number(value)
  }

  if (value === '' || value === 'null') {
    return null
  }

  if (typeof value !== 'string') {
    return value
  }

  try {
    return JSON.parse(decodeURIComponent(value))
  } catch {
    return value
  }
}

function normalizeKey(key: string) {
  return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`)
}

export function getDataAttributes<T extends Record<string, ReturnType<typeof normalizeData>>>(
  element: HTMLElement | null,
): Partial<T> {
  if (!element) {
    return {}
  }

  const attributes = {} as T
  const dntKeys = Object.keys(element.dataset).filter(
    (key) => key.startsWith('dnt') && !key.startsWith('dntConfig'),
  )

  for (const key of dntKeys) {
    const withoutPrefix = key.replace(/^dnt/, '')
    const pureKey = (withoutPrefix.charAt(0).toLowerCase() + withoutPrefix.slice(1)) as keyof T
    attributes[pureKey] = normalizeData(element.dataset[key])
  }

  return attributes
}

export function getDataAttribute(element: HTMLElement, key: string) {
  return normalizeData(element.getAttribute(`data-dnt-${normalizeKey(key)}`))
}
