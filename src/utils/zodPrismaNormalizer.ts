export function WrapUpdateField<T extends any>(value?: T | null) {
  if (value === undefined) return undefined
  return { set: value }
}

export function cleanUndefined(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  )
}