import { Form } from "react-bootstrap";
import ColForm from "../../components/ColForm";
import LayoutAuth from "./LayoutAuth";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OlvideContrasenaEmail() {
    const emailRef = useRef(null)
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")
    const [errorNumber, setErrorNumber] = useState(0)

    const requestOlvideContrasena = async (e) => {
        e.preventDefault()
        try {
            await axios.put("http://localhost:6008/api/olvidecontrasena/email", { email: emailRef.current.value })
            navigate("/autenticacion/olvidecontraseña/codigo", { state: emailRef.current.value })
        } catch (error) {
            console.log(error)
            const { message, numero } = error.response.data
            setErrorNumber(numero)
            setErrorMessage(message)
        }
    }

    return (
        <LayoutAuth contenido={"Siguiente"} onNext={(e) => requestOlvideContrasena(e)}>
            <h2 className="text-center mb-4">1. Ingrese su email</h2>
            <ColForm>
                <Form.Label htmlFor="email">Email:</Form.Label>
                <Form.Control id="email" type="text" ref={emailRef} className={errorNumber === 23 || errorNumber === 32 ? "error-validation" : ""}/>
                {errorNumber === 23 || errorNumber === 32 ? <span className="text-error">{errorMessage}</span> : ""}
            </ColForm>
        </LayoutAuth>
    );
}