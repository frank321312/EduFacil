import { useNavigate, useLocation } from "react-router-dom";
import "./auth.css";
import LayoutAuth from "./LayoutAuth";
import ColForm from "../../components/ColForm";
import { Form } from "react-bootstrap";
import { useRef, useState, useEffect } from "react";
import axios from "axios";


export default function AuthCodigo() {
    const [errorMessage, setErrorMessage] = useState("")
    const [errorNumber, setErrorNumber] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()
    const codigoRef = useRef(null)
    const codigoEscuelaRef = useRef(null)
    const [user, setUser] = useState({
        idRol: null,
        idUsuarionv: null,
        emaill: "",
        nombreUsuario: "",
        idEscuelaNV: 0,
        idEscuela: 0
    })
    useEffect(() => {
        if (user.idRol == null) {
            console.log(location.state)
            navigate("/autenticacion/opcion")
        } else {
            setUser({ ...location.state })
        }
    }, [])
    console.log(user)
    const handleSendRegister = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post("http://localhost:6008/api/")

        } catch (error) {
            console.log(error)
            const { message, numero } = error.response.data
            setErrorNumber(numero)
            setErrorMessage(message)
        }
    }

    return (
        <LayoutAuth contenido={"Confirmar"} onNext={(e) => handleSendRegister(e)}>
            <h2 className='text-center mb-4'>{user.idEscuelaNV !== 0 ? "3. Ingrese el codigo" : "2. Ingrese el codigo"}</h2>
            {
                user.idRol === 2 ?
                    <>
                        <p>Se ha enviado un codigo a {user.emaill}</p>
                        <ColForm>
                            <Form.Label>Codigo del usuario</Form.Label>
                            <Form.Control type="number" ref={codigoRef} />
                        </ColForm>
                    </>
                    :
                    <>
                        <ColForm>
                            <Form.Label>Codigo de la escuela</Form.Label>
                            <Form.Control type="number" ref={codigoEscuelaRef} />
                        </ColForm>
                        <ColForm>
                            <Form.Label>Codigo del usuario</Form.Label>
                            <Form.Control type="number" ref={codigoRef} />
                        </ColForm>
                    </>
            }
        </LayoutAuth>
    );
}