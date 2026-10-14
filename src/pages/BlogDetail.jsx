import { Link, useParams } from 'react-router-dom'
import { blogs } from '../data/db.js'
import { formatDate } from '../utils/format.js'
import NotFound from './NotFound.jsx'

function BlogDetail() {
  const { id } = useParams()
  const blog = blogs.find(current => current.id === Number(id))

  if (!blog) return <NotFound />

  return (
    <>
      <title>{`${blog.titulo} | GameStore`}</title>
      <article className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <Link to="/blog" className="d-inline-block mb-3"><i className="bi bi-arrow-left"></i> Volver al blog</Link>
            <h1 className="h2">{blog.titulo}</h1>
            <p className="text-muted">{formatDate(blog.fecha)}</p>
            <img src={blog.imagen} alt={blog.titulo} className="w-100 h-auto rounded mb-4" />
            {blog.contenido.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          </div>
        </div>
      </article>
    </>
  )
}

export default BlogDetail
