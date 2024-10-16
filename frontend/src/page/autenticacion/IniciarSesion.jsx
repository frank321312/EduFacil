import { Form } from "react-bootstrap";
import ColForm from "../../components/ColForm";
import LayoutAuth from "./LayoutAuth";
import { useRef, useState } from "react";
import axios from 'axios';
import './auth.css';
import Cookies from 'universal-cookie';
import { useDispatch } from "react-redux";
import { autenticar } from "../../redux/loginSlice";
import { decodeToken } from "../../functions/decodeToken";
import { useNavigate } from "react-router-dom";

export default function IniciarSesion() {
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [errorNumber, setErrorNumber] = useState(0)
    const numberErrors = [32, 33]
    const cookies = new Cookies()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginAxios = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post("http://localhost:6008/api/login", { emailUsername: usernameRef.current.value, password: passwordRef.current.value })
            setErrorMessage("")
            setErrorNumber(0)
            cookies.set("jwt", response.data.token)
            const decode = decodeToken(response.data.token)
            dispatch(autenticar(decode))
            navigate("/home")
        } catch (error) {
            console.log(error.response.data);
            const { message, numero } = error.response.data
            setErrorMessage(message)
            setErrorNumber(numero)
        }
    }

    return (
        <LayoutAuth contenido={"Iniciar sesion"} onNext={loginAxios}>
            <h2 className="text-center mb-3">Inicie sesión</h2>
            <ColForm>
                <Form.Label>Nombre de usuario o email</Form.Label>
                <Form.Control ref={usernameRef} type="text" required className={numberErrors.includes(errorNumber) && "error-validation"} />
                { numberErrors.includes(errorNumber) && <span className="text-error">{ errorMessage }</span> } 
            </ColForm>
            <ColForm>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control ref={passwordRef} type="password" className={errorNumber === 31 && "error-validation"}/>
                { errorNumber === 31 && <span className="text-error">{ errorMessage }</span> } 
            </ColForm>
        </LayoutAuth>
    );
}