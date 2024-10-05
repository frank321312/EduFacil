import { decrementar, incrementar, incrementarPorCantidad } from './redux/counterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRef } from 'react'
import PaginaPrincipal from './page/inicio/inicio'
import Registro from './page/autenticacion/Registro'
import ElegirOpcion from './page/autenticacion/Opcion'
import IniciarSesion from './page/autenticacion/IniciarSesion'

function App() {
  const count = useSelector((estado) => estado.counter.value)
  // const inputRef = useRef(null)
  // const dispatch = useDispatch()

  return (
    // <>
    //   <h1>Practica con Redux</h1>
    //   <button className='btn btn-dark m-4' aria-label='Increment value' onClick={() => dispatch(incrementar())}>
    //     Incrementar +1
    //   </button>
    //   <h3 className='h3'>{ count }</h3>
    //   <button className='btn btn-dark m-4' aria-label='Decrement value' onClick={() => dispatch(decrementar())}>
    //     Decrementar -1
    //   </button>
    //   <input type="text" ref={inputRef} className='form-control mb-4'/>
    //   <button className='btn btn-dark' onClick={(e) => { dispatch(incrementarPorCantidad(Number(inputRef.current.value))); inputRef.current.value = "" }}>Confirmar</button>
    // </>
    <Router>
      <Routes>
        {/* <Route path="/autenticacion/registro" element={<Registro />} />
        <Route path="/autenticacion/login" element={<Login />} />
        <Route path="/autenticacion/codigo" element={<Codigo />} />
        <Route path="/autenticacion/codigorecuperar" element={<CodigoRecuperacion />} />
        <Route
          path="/autenticacion/olvideContraseña"
          element={<OlvideContraseña />}
        />
        <Route path="/autenticacion/cambiarpass" element={<CambiarPass />} /> */}
        <Route path="/iniciarsesion" element={<IniciarSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/opcion" element={<ElegirOpcion />} />
        <Route path="/" element={<PaginaPrincipal />} />
      </Routes>
    </Router>
  )
}

export default App
