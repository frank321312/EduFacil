import { useNavigate, useLocation } from "react-router-dom";
import "./auth.css";
import LayoutAuth from "./LayoutAuth";
import ColForm from "../../components/ColForm";
import { Form } from "react-bootstrap";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { decodeToken } from "../../functions/decodeToken";
import { autenticar } from "../../redux/loginSlice";
import { Container } from 'react-bootstrap';

export default function AuthCodigo() {
    const [errorMessage, setErrorMessage] = useState("")
    const [errorNumber, setErrorNumber] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const codigoRef = useRef(null)
    const codigoEscuelaRef = useRef(null)
    const [user, setUser] = useState({
        idRol: null,
        idUsuarionv: null,
        email: "",
        nombreUsuario: "",
        idEscuelaNV: 0,
        idEscuela: 0,
        emailEscuela: ""
    })
    console.log(location.state)

    useEffect(() => {
        if (location.state.idRol == null) {
            // console.log(location.state)
            navigate("/autenticacion/opcion")
        } else {
            if (typeof location.state.idRol === "object") {
                setUser({ ...location.state, idRol: location.state.idRol.idRol })
            } else {
                setUser({ ...location.state })
            }
        }
    }, [])

    const handleSendRegister = async (e) => {
        try {
            e.preventDefault()
            const cookies = new Cookies()
            if (user.idRol == 1) {
                const dataSchool = {
                    idEscuelaNV: user.idEscuelaNV,
                    codigoEscuela: codigoEscuelaRef.current.value == null ? "" : codigoEscuelaRef.current.value,
                    idUsuarioNV: user.idUsuarionv,
                    codigo: codigoRef.current.value,
                    idRol: user.idRol,
                }

                const responseSchool = await axios.post("https://edufacil.onrender.com/api/escuela", dataSchool)
                const dataUser = {
                    ...dataSchool,
                    usuario: {
                        nombreUsuario: user.nombreUsuario,
                        email: user.email
                    },
                    idEscuela: responseSchool.data
                }

                const responseUser = await axios.post("https://edufacil.onrender.com/api/usuario", dataUser)
                cookies.set("jwt", responseUser.data, {
                    path: "/"
                })
                const usuario = decodeToken(responseUser.data)
                dispatch(autenticar(usuario))
                navigate("/home")
            } else if (user.idRol == 3) {
                const data = {
                    codigo: codigoRef.current.value,
                    codigoEscuela: codigoEscuelaRef.current.value,
                    idUsuarioNV: user.idUsuarionv,
                    usuario: {
                        nombreUsuario: user.nombreUsuario,
                        email: user.email
                    },
                    idEscuela: user.idEscuela,
                    idEscuelaNV: 0
                }
                const response = await axios.post("https://edufacil.onrender.com/api/usuario", data)
                cookies.set("jwt", response.data, {
                    path: "/"
                })
                const usuario = decodeToken(response.data)
                dispatch(autenticar(usuario))
                navigate("/home")
            } else {
                const data = {
                    codigo: codigoRef.current.value,
                    codigoEscuela: "",
                    idUsuarioNV: user.idUsuarionv,
                    usuario: {
                        nombreUsuario: user.nombreUsuario,
                        email: user.email
                    },
                    idEscuela: user.idEscuela,
                    idEscuelaNV: 0
                }
                const response = await axios.post("https://edufacil.onrender.com/api/usuario", data)
                cookies.set("jwt", response.data, {
                    path: "/"
                })
                const usuario = decodeToken(response.data)
                dispatch(autenticar(usuario))
                navigate("/home")
            }
        } catch (error) {
            console.log(error)
            const { message, numero } = error.response.data
            setErrorNumber(numero)
            setErrorMessage(message)
        }
    }
    console.log(user)
    const requestReenviarCodigoEscuela = async () => {
        await axios.put("https://edufacil.onrender.com/api/reenviarcodigo/escuela", { idEscuelaNV: user.idEscuelaNV }).then(() => {
            setErrorNumber(0)
            setErrorMessage("")
        })
        .catch(err => { 
            const { message, numero } = err.response.data
            setErrorNumber(numero)
            setErrorMessage(message)
         })
    }

    const requestReenviarCodigoUsuario = async () => {
        await axios.put("https://edufacil.onrender.com/api/reenviarcodigo/usuario", { email: user.email, isUserNV: true }).then(() => {
            setErrorNumber(0)
            setErrorMessage("")
        })
        .catch(err => { 
            const { message, numero } = err.response.data
            setErrorNumber(numero)
            setErrorMessage(message)
         })
    }

    return (
        <LayoutAuth contenido={"Confirmar"} onNext={(e) => handleSendRegister(e)}>
            <h2 className='text-center mb-4'>{user.idEscuelaNV !== 0 ? "3. Ingrese el codigo" : "2. Ingrese el codigo"}</h2>
            <p className="text-center">Se ha enviado un codigo a <b>{user.email}</b></p>
            {
                user.idRol === 2 ?
                    <>
                        <ColForm>
                            <Form.Label htmlFor="codigo">Codigo del usuario:</Form.Label>
                            <Form.Control id="codigo" type="number" ref={codigoRef} className={errorNumber === 28 ? "error-validation" : ""} />
                            {errorNumber === 28 || errorNumber === 32 ? <span className="text-error">{errorMessage}</span> : ""}
                            <ColForm>
                            <Container fluid className="flex justify-between px-0">
                                <p className="cursor-pointer" style={{ fontSize: "14px", marginBottom: "0" }} onClick={requestReenviarCodigoUsuario}>¿Reenviar codigo usuario?</p>
                            </Container>
                        </ColForm>
                        </ColForm>
                    </>
                    :
                    <>
                        {user.idRol === 1 ? <p className="text-center">Se ha enviado un codigo a <b>{user.emailEscuela}</b></p> : <p className="text-center">Debe pedir el codigo a su escuela</p>}
                        <ColForm>
                            <Form.Label htmlFor="codigo">Codigo de la escuela:</Form.Label>
                            <Form.Control type="number" id="codigo" ref={codigoEscuelaRef} />
                        </ColForm>
                        <ColForm>
                            <Form.Label htmlFor="codigo-school">Codigo del usuario:</Form.Label>
                            <Form.Control type="number" id="codigo-school" ref={codigoRef} />
                        </ColForm>
                        <ColForm>
                            {errorNumber === 46 || errorNumber === 32 ? <span className="text-error">{errorMessage}</span> : ""}
                        </ColForm>
                        <ColForm>
                            <Container fluid className="flex justify-between px-0">
                                <p className="cursor-pointer" style={{ fontSize: "14px", marginBottom: "0" }} onClick={requestReenviarCodigoEscuela}>¿Reenviar codigo escuela?</p>
                                <p className="cursor-pointer" style={{ fontSize: "14px", marginBottom: "0" }} onClick={requestReenviarCodigoUsuario}>¿Reenviar codigo usuario?</p>
                            </Container>
                        </ColForm>
                    </>
            }
        </LayoutAuth>
    );
}