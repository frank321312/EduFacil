import ColForm from "../../components/ColForm";
import LayoutAuth from "./LayoutAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import './auth.css';

export default function RegistroEscuela() {
    const navigate = useNavigate()
    const location = useLocation()
    const [errorMessage, setErrorMessage] = useState("")
    const [errorNumber, setErrorNumber] = useState(0)
    const idRol = location.state
    const nombreRef = useRef(null)
    const emailRef = useRef(null)
    const direccionRef = useRef(null)
    const telefonoRef = useRef(null)

    useEffect(() => {
        if (idRol == null) {
            navigate("/autenticacion/opcion")
        }
    }, [])

    const handleSendRegisterSchool = async (e) => {
        try {
            e.preventDefault()
            const data = {
                nombre: nombreRef.current.value,
                direccion: direccionRef.current.value,
                email: emailRef.current.value,
                telefono: telefonoRef.current.value
            }
            const response = await axios.post("http://localhost:6008/api/escuelanv", data)
            console.log(response)
            navigate("/autenticacion/registro", { state: { idRol: idRol, idEscuelaNV: response.data.escuela } })
        } catch (error) {
            console.log(error)
            const { message, numero } = error.response.data
            setErrorNumber(numero)
            setErrorMessage(message)
        }
    }

    return (
        <LayoutAuth contenido={"Siguiente"} onNext={e => handleSendRegisterSchool(e)}>
            <h2 className='text-center mb-4'>1. Ingrese los datos de la escuela</h2>
            <ColForm>
                <Form.Label htmlFor="nombre">Nombre</Form.Label>
                <Form.Control type="text" id="nombre" ref={nombreRef} className={errorNumber === 41 || errorNumber === 29 ? "error-validation" : ""} />
                {errorNumber === 41 || errorNumber === 29 ? <span className="text-error">{errorMessage}</span> : ""}
            </ColForm>
            <ColForm>
                <Form.Label htmlFor="email">Correo electronico</Form.Label>
                <Form.Control type="text" id="email" ref={emailRef} className={errorNumber === 23 || errorNumber === 28 ? "error-validation" : ""} />
                {errorNumber === 23 || errorNumber === 28 ? <span className="text-error">{errorMessage}</span> : ""}
            </ColForm>
            <ColForm>
                <Form.Label htmlFor="direccion">Dirección</Form.Label>
                <Form.Control type="text" id="direccion" ref={direccionRef} className={errorNumber === 42 ? "error-validation" : ""} />
                { errorNumber === 42 ? <span className="text-error">{errorMessage}</span> : ""}
            </ColForm>
            <ColForm>
                <Form.Label htmlFor="telefono">Telefono</Form.Label>
                <Form.Control type="number" id="telefono" ref={telefonoRef} className={errorNumber === 43 || errorNumber === 44 || errorNumber === 30 ? "error-validation" : ""} />
                {errorNumber === 43 || errorNumber === 44 || errorNumber === 30 ? <span className="text-error">{errorMessage}</span> : ""}
            </ColForm>
        </LayoutAuth>
    );
}