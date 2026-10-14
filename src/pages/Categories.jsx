import CategoryCard from '../components/CategoryCard.jsx'
import { getCategories } from '../data/categories.js'
import { getProductsByCategory } from '../data/products.js'

function Categories() {
  const categories = getCategories()

  return (
    <>
      <title>Categorías | GameStore</title>
      <div className="container py-4">
        <h1 className="h2 mb-4">Categorías</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
          {categories.map(category => (
            <div key={category.id} className="col">
              <CategoryCard category={category} productCount={getProductsByCategory(category.id).length} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Categories
