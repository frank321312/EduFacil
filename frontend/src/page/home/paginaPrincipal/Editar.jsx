import LayoutHome from "../LayoutHome";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import InputForm from "../../../components/InputForm";
import "../../../components/styles/edit.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useImmer } from "use-immer";
import { isEqual } from "../../../functions/validations";
import { createRequestGet, createRequestPut, tokenError } from "../../../functions/configToken";
import { useNavigate } from "react-router-dom";
import CardInfo from "../../../components/CardInfo";
import { url } from "../../../functions/url";

export default function EditarCuenta() {
    const user = useSelector((state) => state.login)
    const [errorMessage, setErrorMessage] = useState("")
    const [errorNumber, setErrorNumber] = useState(0)
    const navigate = useNavigate()
    const [usuario, setUsuario] = useImmer({
        nombreUsuario: "",
        nombre: "",
        apellido: "",
        email: "",
        password: ""
    })
    const [card, setCard] = useState(false)

    useEffect(() => {
        if (user.idUsuario) {
            createRequestGet(`${url}/api/obtenerdatos/${user.idUsuario}`).then(res => setUsuario(res.data)).catch(err => {
                tokenError(err)
            })
        }
    }, [user.idUsuario])


    const handleSetUsuarioNombreUsuario = (e) => {
        setUsuario(draft => { draft.nombreUsuario = e.target.value })
    }

    const handleSetUsuarioNombre = (e) => {
        setUsuario(draft => { draft.nombre = e.target.value })
    }

    const handleSetUsuarioApellido = (e) => {
        setUsuario(draft => { draft.apellido = e.target.value })
    }

    const handleSetUsuarioEmail = (e) => {
        setUsuario(draft => { draft.email = e.target.value })
    }

    const handleSetUsuarioPassword = (e) => {
        setUsuario(draft => { draft.password = e.target.value })
    }

    useEffect(() => {
        if (card) {
            setTimeout(() => {
                setCard(false)
            }, 3000)
        }
    }, [card])

    const requestUpdateUser = async (e) => {
        e.preventDefault()
        try {
            await createRequestPut(`${url}/api/editar`, {
                nombreUsuario: usuario.nombreUsuario,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                password: usuario.password,
                idUsuario: user.idUsuario
            })
            setErrorNumber(0)
            setErrorMessage("")
            if (card) {
                setTimeout(() => {
                    setCard(true)
                }, 3000)
            } else {
                setCard(true)
            }
        } catch (error) {
            console.log(error)
            const { message, numero } = error.response.data
            setErrorNumber(numero)
            setErrorMessage(message)
            tokenError(error)
        }
    }

    return (
        <>
            {
                card &&
                <CardInfo text={"Cambios guardados"} />
            }
            <LayoutHome>
                <Container className="mt-20 container-form-responsive">
                    <form className="ml-20 form-responsive">
                        <Row className="mb-3">
                            <Col>
                                <h1 className="font-bold text-form">Tus datos</h1>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col className="flex flex-col" xxl={5} xl={5} lg={6} md={7} sm={10} xs={10}>
                                <Form.Label className="font-bold">Nombre de usuario:</Form.Label>
                                <InputForm value={usuario.nombreUsuario} type={"text"} placeholder={"Usuario"} onSetUsuario={handleSetUsuarioNombreUsuario} isEqual={isEqual(errorNumber, 21) || isEqual(errorNumber, 29) ? "error-validation" : ""} />
                                {isEqual(errorNumber, 21) || isEqual(errorNumber, 29) ? <span className="text-error">{errorMessage}</span> : ""}
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col xxl={5} xl={5} lg={6} md={7} sm={10} xs={10}>
                                <Row>
                                    <Col className="flex flex-col" md={6} sm={6} xs={6}>
                                        <Form.Label className="font-bold">Nombre:</Form.Label>
                                        <InputForm type={"text"} placeholder={"Nombre"} value={usuario.nombre} onSetUsuario={handleSetUsuarioNombre} isEqual={isEqual(errorNumber, 22) ? "error-validation" : ""} />
                                        {isEqual(errorNumber, 22) && <span className="text-error">{errorMessage}</span>}
                                    </Col>
                                    <Col className="flex flex-col" md={6} sm={6} xs={6}>
                                        <Form.Label className="font-bold">Apellido:</Form.Label>
                                        <InputForm type={"text"} placeholder={"Apellido"} value={usuario.apellido} onSetUsuario={handleSetUsuarioApellido} isEqual={isEqual(errorNumber, 38) ? "error-validation" : ""} />
                                        {isEqual(errorNumber, 38) && <span className="text-error">{errorMessage}</span>}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col className="flex flex-col" xxl={5} xl={5} lg={6} md={7} sm={10} xs={10}>
                                <Form.Label className="font-bold">Correo eléctronico:</Form.Label>
                                <InputForm type={"text"} placeholder={"Email"} value={usuario.email} onSetUsuario={handleSetUsuarioEmail} isEqual={isEqual(errorNumber, 23) || isEqual(errorNumber, 28) || isEqual(errorNumber, 70) ? "error-validation" : ""} />
                                {isEqual(errorNumber, 23) || isEqual(errorNumber, 28) || isEqual(errorNumber, 70) ? <span className="text-error">{errorMessage}</span> : ""}
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col className="flex flex-col" xxl={5} xl={5} lg={6} md={7} sm={10} xs={10}>
                                <Form.Label className="font-bold">Contraseña:</Form.Label>
                                <InputForm type={"password"} placeholder={"Contraseña"} value={usuario.password} onSetUsuario={handleSetUsuarioPassword} isEqual={isEqual(errorNumber, 24) ? "error-validation" : ""} />
                                {isEqual(errorNumber, 24) && <span className="text-error">{errorMessage}</span>}
                            </Col>
                        </Row>
                        <div className="span-text-error">
                            {isEqual(errorNumber, 50) && <span className="text-error">{errorMessage}</span>}
                        </div>
                        <Row>
                            <Col className="flex gap-4 button-form">
                                <Button variant="dark" onClick={() => navigate("/home")}>Cancelar</Button>
                                <Button type="sumbit" onClick={requestUpdateUser}>Guardar cambios</Button>
                            </Col>
                        </Row>
                    </form>
                </Container>
            </LayoutHome>
        </>
    );
}