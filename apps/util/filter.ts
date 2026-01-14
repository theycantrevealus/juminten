export function hasSameKeys(a, b) {
  return (
    Object.keys(a).length === Object.keys(b).length &&
    Object.keys(a).every((k) => b.hasOwnProperty(k))
  )
}
