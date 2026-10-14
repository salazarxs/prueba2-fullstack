// Único punto de acceso a localStorage: lectura/escritura en JSON
export const readJSON = (key, fallback) => {
  const raw = localStorage.getItem(key)
  return raw ? JSON.parse(raw) : fallback
}

export const writeJSON = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeKey = (key) => {
  localStorage.removeItem(key)
}
