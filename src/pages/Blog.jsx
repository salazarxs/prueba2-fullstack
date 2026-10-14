import BlogCard from '../components/BlogCard.jsx'
import { blogs } from '../data/db.js'

function Blog() {
  return (
    <>
      <title>Blog | GameStore</title>
      <div className="container py-4">
        <h1 className="h2 text-center">Noticias y blog</h1>
        {blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)}
      </div>
    </>
  )
}

export default Blog
