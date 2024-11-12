import LayoutHome from "../LayoutHome";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useImmer } from "use-immer";
import { isEqual } from "../../../functions/validations";
import { createRequestGet, createRequestPost, createRequestPut, tokenError } from "../../../functions/configToken";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import InputForm from "../../../components/InputForm";
import axios from "axios";
import CardInfo from "../../../components/CardInfo";

export default function EditarEscuela() {
    const user = useSelector((state) => state.login)
    const [errorMessage, setErrorMessage] = useState("")
    const [errorNumber, setErrorNumber] = useState(0)
    const navigate = useNavigate()
    const [escuela, setEscuela] = useImmer({
        nombre: "",
        email: "",
        direccion: "",
        telefono: "",
        imgUrl: ""
    })
    const imgRef = useRef(null)
    const [defaultImg, setDefaultImg] = useState([])
    const [base, setBase] = useState("")
    // const [response, setResponse] = useState("")
    const [change, setChange] = useState(false)
    const [card, setCard] = useState(false)

    const handleSetEscuelaNombre = (e) => {
        setEscuela(draft => { draft.nombre = e.target.value })
    }
    const handleSetEscuelaEmail = (e) => {
        setEscuela(draft => { draft.email = e.target.value })
    }
    const handleSetEscuelaDireccion = (e) => {
        setEscuela(draft => { draft.direccion = e.target.value })
    }
    const handleSetEscuelaTelefono = (e) => {
        setEscuela(draft => { draft.telefono = e.target.value })
    }

    useEffect(() => {
        if (user.idEscuela) {
            axios.get(`https://edufacil.onrender.com/api/escuela/id/${user.idEscuela}`).then(res => {
                setEscuela(res.data)
                setErrorNumber(0)
                setErrorMessage("")
            }).catch(err => {
                console.log(err)
                const { message, numero } = err.response.data
                setErrorNumber(numero)
                setErrorMessage(message)
            })
        }
    }, [user.idUsuario])

    useEffect(() => {
        if (card) {
            setTimeout(() => {
                setCard(false)
            }, 3000)
        }
    }, [card])

    const requestUpdateEscuela = async (e, response) => {
        e.preventDefault()
        try {
            await createRequestPut("https://edufacil.onrender.com/api/modificar/escuela", {
                idEscuela: user.idEscuela,
                nombre: escuela.nombre,
                email: escuela.email,
                telefono: escuela.telefono,
                direccion: escuela.direccion,
                imgUrl: response.length > 0 ? `https://edufacil.onrender.com/get-imagen/${response}` : undefined
            })
            setErrorNumber("")
            setErrorMessage("")
            if (card) {
                setTimeout(() => {
                    setCard(true)
                }, 3000)
            } else {
                setCard(true)
            }
        } catch (error) {
            const { message, numero } = error.response.data
            setErrorNumber(numero)
            setErrorMessage(message)
            tokenError(error)
        }
    }

    const requestPostImage = async (e) => {
        e.preventDefault()
        try {
            // Si el usuario cargo una imagen change sera true, en caso contrario se verificara que exista un valor en defaultImg, si no existe ningun valor no se crea ninguna imagen
            let response = "";
            if (change) {
                const formData = new FormData()
                formData.append("imagen", defaultImg[0])
                const responseImg = await createRequestPost("https://edufacil.onrender.com/api/upload", formData)
                response = responseImg.data.archivo
            } else if (defaultImg.length > 0) {
                const formData = new FormData()
                formData.append("imagen", defaultImg[0])
                const responseImg = await createRequestPost("https://edufacil.onrender.com/api/upload", formData)
                response = responseImg.data.archivo
            } else {
                response = "";
            }
            await requestUpdateEscuela(e, response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <LayoutHome>
            {
                card &&
                <CardInfo text={"Cambios guardados"} />
            }
            <Container className="mt-20 container-form-responsive">
                <form className="ml-20 form-responsive">
                    <Row className="mb-3">
                        <Col>
                            <h1 className="font-bold text-form">Datos de la escuela</h1>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col className="flex flex-col" xxl={5} xl={5} lg={6} md={7} sm={10} xs={10}>
                            <Form.Label className="font-bold">Nombre:</Form.Label>
                            <InputForm value={escuela.nombre} type={"text"} placeholder={"Nombre"} onSetUsuario={handleSetEscuelaNombre} isEqual={isEqual(errorNumber, 41) || isEqual(errorNumber, 29) ? "error-validation" : ""} />
                            {isEqual(errorNumber, 41) || isEqual(errorNumber, 29) ? <span className="text-error">{errorMessage}</span> : ""}
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col className="flex flex-col" xxl={5} xl={5} lg={6} md={7} sm={10} xs={10}>
                            <Form.Label className="font-bold">Correo eléctronico:</Form.Label>
                            <InputForm type={"text"} placeholder={"Email"} value={escuela.email} onSetUsuario={handleSetEscuelaEmail} isEqual={isEqual(errorNumber, 23) || isEqual(errorNumber, 28) || isEqual(errorNumber, 70) ? "error-validation" : ""} />
                            {isEqual(errorNumber, 23) || isEqual(errorNumber, 28) || isEqual(errorNumber, 70) ? <span className="text-error">{errorMessage}</span> : ""}
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col className="flex flex-col" xxl={5} xl={5} lg={6} md={7} sm={10} xs={10}>
                            <Form.Label className="font-bold">Dirección:</Form.Label>
                            <InputForm value={escuela.direccion} type={"text"} placeholder={"Direccion"} onSetUsuario={handleSetEscuelaDireccion} isEqual={isEqual(errorNumber, 42) ? "error-validation" : ""} />
                            {isEqual(errorNumber, 42) ? <span className="text-error">{errorMessage}</span> : ""}
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col className="flex flex-col" xxl={5} xl={5} lg={6} md={7} sm={10} xs={10}>
                            <Form.Label className="font-bold">Telefono:</Form.Label>
                            <InputForm value={escuela.telefono} type={"text"} placeholder={"Telefono"} onSetUsuario={handleSetEscuelaTelefono} isEqual={isEqual(errorNumber, 43) || isEqual(errorNumber, 44) || isEqual(errorNumber, 30) ? "error-validation" : ""} />
                            {isEqual(errorNumber, 43) || isEqual(errorNumber, 44) || isEqual(errorNumber, 30) ? <span className="text-error">{errorMessage}</span> : ""}
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col className="flex flex-col" xxl={3} xl={4} lg={4} md={7} sm={8} xs={10}>
                            <img src={escuela.imgUrl} ref={imgRef} style={{ width: "100%" }} alt="" />
                            <input type="file" id="imagen" style={{ display: "none" }} onChange={e => {
                                if (e.target.files[0]) {
                                    const reader = new FileReader()
                                    reader.onload = (e) => {
                                        imgRef.current.src = e.target.result
                                        setBase(e.target.result)
                                        setChange(true)
                                    }
                                    reader.readAsDataURL(e.target.files[0])
                                    setDefaultImg(e.target.files)
                                } else {
                                    const reader = new FileReader()
                                    imgRef.current.src = base
                                    reader.readAsDataURL(defaultImg[0])
                                    setChange(false)
                                }
                            }} />
                            <Form.Label htmlFor="imagen" className="p-1 text-center rounded-md mt-4 cursor-pointer" style={{ backgroundColor: "#198754", color: "#fff", width: "150px" }}>Cambiar imagen</Form.Label>
                        </Col>
                    </Row>
                    <div className="span-text-error">
                        {isEqual(errorNumber, 47) || isEqual(errorNumber, 48) ? <span className="text-error mt-4">{errorMessage}</span> : ""}
                    </div>
                    <Row>
                        <Col className="flex gap-4 button-form">
                            <Button variant="dark" onClick={() => navigate("/home")}>Cancelar</Button>
                            <Button type="sumbit" onClick={(e) => {
                                requestPostImage(e)
                            }}>Guardar cambios</Button>
                        </Col>
                    </Row>
                </form>
            </Container>
        </LayoutHome>
    );
}