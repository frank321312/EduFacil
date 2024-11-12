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
import Escuelas from './page/inicio/Escuelas'
import Cursos from './page/inicio/Cursos'
import URLInvalido from './components/URLInvalido'
import OlvideContrasenaEmail from './page/autenticacion/OlvideContraseñaEmail'
import OlvideContrasenaCodigo from './page/autenticacion/OlvideContraseñaCodigo'
import OlvideContrasena from './page/autenticacion/OlvideContrasenaPass'
import EditarCuenta from './page/home/paginaPrincipal/Editar'
import EditarEscuela from './page/home/paginaPrincipal/EditarEscuela'
import CrearCurso from './page/home/paginaPrincipal/CrearCurso'
import NotFound from './components/NotFound'
import Horario from './page/home/paginaPrincipal/Horario'
import VerHorario from './page/home/paginaPrincipal/VerHorario'
import BuscadorMovil from './page/inicio/BuscarMovil'
import EditarHorario from './page/home/paginaPrincipal/EditarHorario'
import EditarCursos from './page/home/paginaPrincipal/EditarCurso'

function App() {
  const data = useSelector(state => state.login)
  const dispatch = useDispatch()
  const cookies = new Cookies()

  useEffect(() => {
    const token = cookies.get("jwt")
    const modo = cookies.get("modo")
    if (token !== undefined) {
      const usuario = decodeToken(token)
      dispatch(autenticar(usuario))
    }
    if (modo !== undefined) {
      document.body.classList.add(modo)
    }
  }, [])

  return (

    <Router>
      <Routes>
        {/* <Route element={<ProtectedRoute isAllowed={idRol !== 0 ? true : false} />}>
          <Route path="/autenticacion/escuela" element={<RegistroEscuela />} />
          <Route path="/autenticacion/registro" element={<Registro />} />
        </Route> */}

        {/* Rutas para autenticacion de usuario */}
        <Route path="/autenticacion/escuela" element={<RegistroEscuela />} />
        <Route path="/autenticacion/opcion" element={<ElegirOpcion />} />
        <Route path="/autenticacion/registro" element={<Registro />} />
        <Route path="/autenticacion/codigo" element={<AuthCodigo />} />
        <Route path="/autenticacion/iniciarsesion" element={<IniciarSesion />} />
        <Route path="/autenticacion/olvidecontraseña/email" element={<OlvideContrasenaEmail />} />
        <Route path="/autenticacion/olvidecontraseña/codigo" element={<OlvideContrasenaCodigo />} />
        <Route path="/autenticacion/olvidecontraseña/contrasena" element={<OlvideContrasena />} />

        {/* Rutas que pueden ser accedidas por cualquier usuario */}
        <Route path="/escuelas" element={<Escuelas />} />
        <Route path="/escuela/cursos" element={<Cursos />} />
        <Route path="/escuela/cursos/:idEscuela/:curso" element={<Cursos />} />
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/horario" element={<VerHorario />} />
        <Route path="/buscar" element={<BuscadorMovil />} />

        {/* Rutas que solo pueden acceder usuarios registrados y logueados */}
        <Route path="/home" element={<Home />} />
        <Route path="/home/editar" element={<EditarCuenta />} />
        <Route path="/home/editar/escuela" element={<EditarEscuela />} />
        <Route path="/home/crear-curso" element={<CrearCurso />} />
        <Route path="/home/crear-horario" element={<Horario />} />
        <Route path="/home/editar-horario" element={<EditarHorario />} />
        <Route path="/home/editar-cursos" element={<EditarCursos />} />

        {/* <Route element={<ProtectedRoute isAllowed={count === 0 ? false : true}/>}>
          <Route path="/autenticacion/iniciarsesion" element={<IniciarSesion />} />
        </Route> */}
        {/* Ruta no encontrada */}
        <Route path='*' element={<NotFound />} />
        <Route path='/url-invalido' element={<URLInvalido />} />
      </Routes>
    </Router>
  )
}

export default App
