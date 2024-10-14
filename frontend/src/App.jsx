import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import PaginaPrincipal from './page/inicio/Inicio'
import Registro from './page/autenticacion/Registro'
import ElegirOpcion from './page/autenticacion/Opcion'
import IniciarSesion from './page/autenticacion/IniciarSesion'
import RegistroEscuela from './page/autenticacion/Escuela'
import LayoutHome from './page/home/LayoutHome'
import { ProtectedRoute } from './components/ProtectedRoute'
import Home from './page/home/paginaPrincipal/Home'
import Cookies from 'universal-cookie'
import { autenticar } from './redux/loginSlice'
import { decodeToken } from './functions/decodeToken'
import AuthCodigo from './page/autenticacion/Codigo'

function App() {
  const data = useSelector(state => state.login)
  const dispatch = useDispatch()
  const cookies = new Cookies()

  useEffect(() => {
    const token = cookies.get("jwt")
    if (token !== undefined) {
      dispatch(autenticar(decodeToken(token)))
    }
  }, [])

  return (

    <Router>
      <Routes>
        {/* <Route element={<ProtectedRoute isAllowed={idRol !== 0 ? true : false} />}>
          <Route path="/autenticacion/escuela" element={<RegistroEscuela />} />
          <Route path="/autenticacion/registro" element={<Registro />} />
        </Route> */}
        <Route path="/autenticacion/escuela" element={<RegistroEscuela />} />
        <Route path="/autenticacion/registro" element={<Registro />} />
        <Route path="/autenticacion/opcion" element={<ElegirOpcion />} />
        <Route path="/autenticacion/codigo" element={<AuthCodigo />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/autenticacion/iniciarsesion" element={<IniciarSesion />} />
        {/* <Route element={<ProtectedRoute isAllowed={count === 0 ? false : true}/>}>
          <Route path="/autenticacion/iniciarsesion" element={<IniciarSesion />} />
        </Route> */}
      </Routes>
    </Router>
  )
}

export default App
