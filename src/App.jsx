import { Navigate, Route, Routes } from 'react-router-dom'
import RequireAdmin from './components/RequireAdmin.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import PublicLayout from './layouts/PublicLayout.jsx'
import About from './pages/About.jsx'
import Blog from './pages/Blog.jsx'
import BlogDetail from './pages/BlogDetail.jsx'
import Cart from './pages/Cart.jsx'
import Categories from './pages/Categories.jsx'
import CategoryDetail from './pages/CategoryDetail.jsx'
import Checkout from './pages/Checkout.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import Offers from './pages/Offers.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Products from './pages/Products.jsx'
import PurchaseError from './pages/PurchaseError.jsx'
import PurchaseSuccess from './pages/PurchaseSuccess.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import Profile from './pages/admin/Profile.jsx'
import Reports from './pages/admin/Reports.jsx'
import CategoryEdit from './pages/admin/categories/CategoryEdit.jsx'
import CategoryList from './pages/admin/categories/CategoryList.jsx'
import CategoryNew from './pages/admin/categories/CategoryNew.jsx'
import OrderDetail from './pages/admin/orders/OrderDetail.jsx'
import OrderList from './pages/admin/orders/OrderList.jsx'
import CriticalProducts from './pages/admin/products/CriticalProducts.jsx'
import ProductEdit from './pages/admin/products/ProductEdit.jsx'
import ProductList from './pages/admin/products/ProductList.jsx'
import ProductNew from './pages/admin/products/ProductNew.jsx'
import ProductShow from './pages/admin/products/ProductShow.jsx'
import UserEdit from './pages/admin/users/UserEdit.jsx'
import UserHistory from './pages/admin/users/UserHistory.jsx'
import UserList from './pages/admin/users/UserList.jsx'
import UserNew from './pages/admin/users/UserNew.jsx'
import UserShow from './pages/admin/users/UserShow.jsx'

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/categorias" element={<Categories />} />
        <Route path="/categorias/:id" element={<CategoryDetail />} />
        <Route path="/ofertas" element={<Offers />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/noticias" element={<Navigate to="/blog" replace />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compra/exito/:id" element={<PurchaseSuccess />} />
        <Route path="/compra/error/:id" element={<PurchaseError />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Navigate to="/admin" replace />} />
        <Route path="ordenes" element={<OrderList />} />
        <Route path="ordenes/:id" element={<OrderDetail />} />
        <Route path="productos" element={<ProductList />} />
        <Route path="productos/nuevo" element={<ProductNew />} />
        <Route path="productos/criticos" element={<CriticalProducts />} />
        <Route path="productos/:id" element={<ProductShow />} />
        <Route path="productos/:id/editar" element={<ProductEdit />} />
        <Route path="categorias" element={<CategoryList />} />
        <Route path="categorias/nueva" element={<CategoryNew />} />
        <Route path="categorias/:id/editar" element={<CategoryEdit />} />
        <Route path="usuarios" element={<UserList />} />
        <Route path="usuarios/nuevo" element={<UserNew />} />
        <Route path="usuarios/:id" element={<UserShow />} />
        <Route path="usuarios/:id/editar" element={<UserEdit />} />
        <Route path="usuarios/:id/historial" element={<UserHistory />} />
        <Route path="empleados" element={<Navigate to="/admin/usuarios" replace />} />
        <Route path="reportes" element={<Reports />} />
        <Route path="perfil" element={<Profile />} />
        <Route path="*" element={<NotFound backTo="/admin" backLabel="Volver al dashboard" />} />
      </Route>
    </Routes>
  )
}

export default App
