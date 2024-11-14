import axios from "axios";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LayoutAuth from "./LayoutAuth";
import ColForm from "../../components/ColForm";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { url } from "../../functions/url";

export default function OlvideContrasenaCodigo() {
    const codigoRef = useRef(null)
    const location = useLocation()
    const navigate = useNavigate()
    const email = location.state
    const [errorMessage, setErrorMessage] = useState("")
    const [errorNumber, setErrorNumber] = useState(0)

    const requestOlvideContrasena = async (e) => {
        e.preventDefault()
        try {
            const codigo = codigoRef.current.value
            const response = await axios.put(`${url}/api/olvidecontrasena/codigo`, { email, codigo })
            navigate("/autenticacion/olvidecontraseña/contrasena", { state: { idUsuario: response.data, codigo } })
        } catch (error) {
            console.log(error)
            const { message, numero } = error.response.data
            setErrorNumber(numero)
            setErrorMessage(message)
        }
    }

    const requestReenviarCodigo = async () => {
        await axios.put(`${url}/api/reenviarcodigo/usuario`, { email, isUserNV: false }).catch(err => { 
            const { message, numero } = err.response.data
            setErrorNumber(numero)
            setErrorMessage(message)
         })
    }

    return (
        <LayoutAuth contenido={"Siguiente"} onNext={e => requestOlvideContrasena(e)}>
            <h2 className="text-center mb-4">2. Codigo de verifiación</h2>
            <p className="text-center">Se ha enviado un codigo a <b>{email}</b></p>
            <ColForm>
                <Form.Label htmlFor="codigo">Codigo:</Form.Label>
                <Form.Control id="codigo" type="text" ref={codigoRef} className={errorNumber === 67 || errorNumber === 32 ? "error-validation" : ""} />
                {errorNumber === 67 || errorNumber === 32 ? <span className="text-error">{errorMessage}</span> : ""}
            </ColForm>
            <ColForm>
                <Container fluid className="flex justify-between px-0">
                    <p className="cursor-pointer" style={{ fontSize: "14px", marginBottom: "0" }} onClick={requestReenviarCodigo}>¿Reenviar codigo?</p>
                </Container>
            </ColForm>
        </LayoutAuth>
    );
}