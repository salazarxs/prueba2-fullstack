import AdminNavbar from '../../components/admin/AdminNavbar.jsx'
import UserTableBody from '../../components/admin/UserTableBody.jsx'
import { getUserList } from '../../utils/users.js'

function Dashboard() {
  const users = getUserList()

  return (
    <div className="vh-100">
      <title>Dashboard | Ecommerce</title>
      <div className="container-fluid p-0 m-0 h-100">
        <div className="row h-100">
          <AdminNavbar />
          <div className="col-10 bg-dark">
            <p className="fs-1 text-light">Hola administrador</p>
            <div className="row">
              <div className="col-6">
                <h3 className="text-light">Ultimos usuarios</h3>
                <table className="table rounded-2 overflow-hidden border-0">
                  <thead className="border-bottom">
                    <tr>
                      <th scope="col" className="fs-7">Nombre</th>
                      <th scope="col" className="fs-7">Telefono</th>
                      <th scope="col" className="fs-7">Dirección</th>
                      <th scope="col" className="fs-7">Correo</th>
                    </tr>
                  </thead>
                  <UserTableBody users={users} />
                </table>
              </div>
              <div className="col-6">
                <h3 className="text-light">Ultimos productos</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
