export function isUndef (s: any): boolean {
  return s === undefined
}

type NonUndefined<T> = T extends undefined ? never : T

export function isDef<A> (s: A): s is NonUndefined<A> {
  return s !== undefined
}

export function isNumOrStr (s: any): s is (string | number) {
  return typeof s === 'string' || typeof s === 'number'
}