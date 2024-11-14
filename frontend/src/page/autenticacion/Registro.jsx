import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from "react-router-dom";
import './auth.css';
import LayoutAuth from "./LayoutAuth";
import ColForm from "../../components/ColForm";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { url } from '../../functions/url';

export default function Registro() {
    const navigate = useNavigate()
    const location = useLocation()
    const idRol = location.state.idRol
    const idEscuelaNV = location.state.idEscuelaNV
    const emailEscuela = location.state.emailEscuela
    const [escuelas, setEscuelas] = useState([])
    const [escuela, setEscuela] = useState("")
    const nombreRef = useRef(null)
    const apellidoRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const nombreUsuarioRef = useRef(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [errorNumber, setErrorNumber] = useState(0)

    useEffect(() => {
        if (idRol == null) {
            navigate("/autenticacion/opcion")
        }
    }, [])

    const handleOnChangeEscuela = (e) => {
        setEscuela(e.target.value)
    }

    const handleSearchEscuela = async (e) => {
        try {
            const response = await axios.get(`${url}/api/escuela?nombre=${e.target.value}`)
            setEscuelas([...response.data])
        } catch (error) {
            console.log(error);
        }
    }
    console.log(location.state)

    const handleSendRegister = async (e) => {
        try {
            e.preventDefault()
            const id = escuelas.filter(x => x.nombre === escuela)
            const data = {
                nombreUsuario: nombreUsuarioRef.current.value,
                nombre: nombreRef.current.value,
                apellido: apellidoRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                idEscuela: idEscuelaNV !== undefined ? idEscuelaNV : id[0] == null ? 0 : id[0].idEscuela,
                idRol: typeof idRol === "object" ? idRol.idRol : idRol
            }
            const response = await axios.post(`${url}/api/usuarionv`, data)
            // console.log(response)
            setErrorMessage("")
            setErrorNumber(0)
            navigate("/autenticacion/codigo", {
                state: {
                    idRol,
                    idUsuarionv: response.data.idUsuarionv,
                    email: emailRef.current.value,
                    nombreUsuario: nombreUsuarioRef.current.value,
                    idEscuelaNV: idEscuelaNV == undefined ? 0 : idEscuelaNV,
                    idEscuela: id[0] == null ? 0 : id[0].idEscuela,
                    emailEscuela
                }
            })
        } catch (error) {
            console.log(error)
            const { message, numero } = error.response.data
            setErrorNumber(numero)
            setErrorMessage(message)
        }
    }

    return (
        <>
            <LayoutAuth contenido={"Siguiente"} onNext={e => handleSendRegister(e)}>
                <h2 className='text-center mb-4'>{idRol.idRol === 1 ? "2. Ingrese sus datos" : "1. Ingrese sus datos"}</h2>
                <ColForm>
                    <Form.Label htmlFor="nombre-usuario" >Nombre de usuario:</Form.Label>
                    <Form.Control type="text" id="nombre-usuario" ref={nombreUsuarioRef} className={errorNumber === 21 || errorNumber === 29 ? "error-validation" : ""} />
                    {errorNumber === 21 || errorNumber === 29 ? <span className="text-error">{errorMessage}</span> : ""}
                </ColForm>
                <ColForm>
                    <Form.Label htmlFor="nombre">Nombre:</Form.Label>
                    <Form.Control type="text" id="nombre" ref={nombreRef} className={errorNumber === 22 ? "error-validation" : ""} />
                    {errorNumber === 22 && <span className="text-error">{errorMessage}</span>}
                </ColForm>
                <ColForm>
                    <Form.Label htmlFor="apellido">Apellido:</Form.Label>
                    <Form.Control type="text" id="apellido" ref={apellidoRef} className={errorNumber === 38 ? "error-validation" : ""} />
                    {errorNumber === 38 && <span className="text-error">{errorMessage}</span>}
                </ColForm>
                <ColForm>
                    <Form.Label htmlFor="email">Correo eléctronico:</Form.Label>
                    <Form.Control type="text" id="email" ref={emailRef} className={errorNumber === 23 || errorNumber === 28 ? "error-validation" : ""} />
                    {errorNumber === 23 || errorNumber === 28 ? <span className="text-error">{errorMessage}</span> : ""}
                </ColForm>
                <ColForm>
                    <Form.Label htmlFor="pass">Contraseña:</Form.Label>
                    <Form.Control type="password" id="pass" ref={passwordRef} className={errorNumber === 24 ? "error-validation" : ""} />
                    {errorNumber === 24 && <span className="text-error">{errorMessage}</span>}
                </ColForm>
                {
                    idRol.idRol !== 1 &&
                    <ColForm>
                        <Form.Label htmlFor='escuela'>Escuela:</Form.Label>
                        <Form.Control type="text" id="escuela" list='escuelas' value={escuela}
                            onChange={(e) => { handleSearchEscuela(e); handleOnChangeEscuela(e) }}
                            className={errorNumber === 25 && "error-validation"}
                        />
                        {errorNumber === 25 && <span className="text-error">{errorMessage}</span>}
                        <datalist id='escuelas'>
                            {
                                escuelas.map(value => (
                                    <option key={value.idEscuela} value={value.nombre} />
                                ))
                            }
                        </datalist>
                    </ColForm>
                }
            </LayoutAuth>
        </>
    );
}