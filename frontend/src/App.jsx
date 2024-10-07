import { decrementar, incrementar, incrementarPorCantidad } from './redux/counterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRef } from 'react'
import PaginaPrincipal from './page/inicio/Inicio'
import Registro from './page/autenticacion/Registro'
import ElegirOpcion from './page/autenticacion/Opcion'
import IniciarSesion from './page/autenticacion/IniciarSesion'
import RegistroEscuela from './page/autenticacion/Escuela'
import LayoutHome from './page/home/LayoutHome'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  const idRol = useSelector((estado) => estado.auth.value)
  // const inputRef = useRef(null)
  // const dispatch = useDispatch()
  console.log(idRol);

  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute isAllowed={idRol !== 0 ? true : false} />}>
          <Route path="/autenticacion/escuela" element={<RegistroEscuela />} />
          <Route path="/autenticacion/registro" element={<Registro />} />
        </Route>
        <Route path="/autenticacion/opcion" element={<ElegirOpcion />} />
        <Route path="/home" element={<LayoutHome />} />
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
