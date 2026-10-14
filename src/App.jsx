import { Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import News from './pages/News.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import Employees from './pages/admin/Employees.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/noticias" element={<News />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/empleados" element={<Employees />} />
    </Routes>
  )
}

export default App
