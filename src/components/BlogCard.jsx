import { Link } from 'react-router-dom'
import { formatDate } from '../utils/format.js'

// Reemplaza al antiguo NewsBlock: el botón "Ver" ahora lleva al detalle del blog
function BlogCard({ blog }) {
  return (
    <div className="row text-white bg-secondary p-4 p-lg-5 rounded-2 shadow my-4 mx-0">
      <div className="col-12 col-lg-6 d-flex flex-column justify-content-evenly gap-3">
        <small>{formatDate(blog.fecha)}</small>
        <p className="fs-4 mb-0">{blog.titulo}</p>
        <span>{blog.resumen}</span>
        <Link to={`/blog/${blog.id}`} className="btn btn-outline-light align-self-start">
          Ver <i className="bi bi-arrow-right-short"></i>
        </Link>
      </div>
      <div className="col-12 mt-3 mt-lg-0 col-lg-6">
        <img src={blog.imagen} alt={blog.titulo} className="w-100 h-auto rounded" />
      </div>
    </div>
  )
}

export default BlogCard
