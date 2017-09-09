
export function configureSearchParams(config) {
  const keys = Object.keys(config || {})
  if (keys.length === 0) {
    return ""
  }
  return "?" + keys.map(x => `${x}=${config[x].toString()}`).join("&")
}