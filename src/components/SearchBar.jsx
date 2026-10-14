import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/productos?q=${encodeURIComponent(q)}` : '/productos')
  }

  return (
    <form className="d-flex my-2 my-xl-0" role="search" onSubmit={handleSubmit}>
      <input
        className="form-control me-2" type="search" placeholder="Buscar juegos..." aria-label="Buscar"
        value={query} onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-outline-primary" type="submit">Buscar</button>
    </form>
  )
}

export default SearchBar
