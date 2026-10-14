import { useEffect, useRef, useState } from 'react'

// Muestra un alert durante `duration` ms (reinicia el contador si se vuelve a mostrar)
export const useTimedAlert = (duration = 3000) => {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const show = () => {
    clearTimeout(timeoutRef.current)
    setVisible(true)
    timeoutRef.current = setTimeout(() => setVisible(false), duration)
  }

  return [visible, show]
}
