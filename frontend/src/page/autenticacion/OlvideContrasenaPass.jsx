import axios from "axios";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LayoutAuth from "./LayoutAuth";
import ColForm from "../../components/ColForm";
import { Form } from "react-bootstrap";

export default function OlvideContrasena() {
    const location = useLocation()
    const { idUsuario, codigo } = location.state
    const passwordRef = useRef(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [errorNumber, setErrorNumber] = useState(0)
    const navigate = useNavigate()
    
    const requestOlvideContrasena = async (e) => {
        e.preventDefault()
        try {
            await axios.put("http://localhost:6008/api/olvidecontrasena/passowrd", { idUsuario, codigo, password: passwordRef.current.value })
            navigate("/autenticacion/iniciarsesion")
        } catch (error) {
            console.log(error)
            const { message, numero } = error.response.data
            setErrorNumber(numero)
            setErrorMessage(message)
        }
    }

    return (
        <LayoutAuth contenido={"Confirmar"} onNext={e => requestOlvideContrasena(e)}>
            <h4 className="text-center mb-4">3. Cambiar contraseña</h4>
            <ColForm>
                <Form.Label htmlFor="pass">Contraseña:</Form.Label>
                <Form.Control id="pass" type="password" ref={passwordRef} className={errorNumber === 67 || errorNumber === 24 ? "error-validation" : ""} />
                {errorNumber === 67 || errorNumber === 24 ? <span className="text-error">{errorMessage}</span> : ""}
            </ColForm>
        </LayoutAuth>
    );
}