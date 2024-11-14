import { Container } from "react-bootstrap";
import LayoutHome from "../LayoutHome";
import { useState, useRef, useEffect } from "react";
import InputForm from "../../../components/InputForm";
import { Button, Col, Form, Row } from "react-bootstrap";
import { isEqual } from "../../../functions/validations";
import { useLocation, useNavigate } from "react-router-dom";
import { createRequestPost, tokenError } from "../../../functions/configToken";
import { url } from "../../../functions/url";
import { useSelector } from "react-redux";

export default function EnviarEmail() {
    const user = useSelector((state) => state.login)
    const [asunto, setAsunto] = useState("")
    const [contenido, setContenido] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [errorNumber, setErrorNumber] = useState(0)
    const location = useLocation()
    const [fileInfo, setFileInfo] = useState(null)
    const [archivo, setArchivo] = useState(null)
    const navigate = useNavigate()

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setArchivo(event.target.files)
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setFileInfo({
                name: file.name,
                type: file.type,
                url: fileURL
            });
        }
    }

    useEffect(() => {
        if (!location.state) {
            navigate("/ver-usuarios")
        }
    })

    const requestSendArchivo = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("imagen", archivo[0])
            await createRequestPost(`${url}/api/validar-datos`, {
                asunto,
                contenido,
                idUsuarioEmisor: user.idUsuario,
                idUsuarioReceptor: location.state.idUsuario,
            })
            const responseData = await createRequestPost(`${url}/api/upload`, formData)
            await createRequestPost(`${url}/api/enviar-archivo`, {
                asunto,
                contenido,
                archivo: responseData.data.archivo,
                idUsuarioEmisor: user.idUsuario,
                idUsuarioReceptor: location.state.idUsuario,
            })
            setErrorNumber(0)
            setErrorMessage("")
            navigate("/ver-usuarios")
        } catch (error) {
            console.log(error)
            const { message, numero } = error.response.data
            setErrorNumber(numero)
            setErrorMessage(message)
            tokenError(error)
        }
    }

    const handleSetAsunto = (e) => {
        setAsunto(e.target.value)
    }

    return (
        <LayoutHome>
            <Container className="mt-20 container-form-responsive">
                <form className="ml-20 form-responsive">
                    <Row className="mb-4">
                        <Col className="flex flex-col" xxl={5} xl={5} lg={6} md={7} sm={10} xs={10}>
                            <Form.Label className="font-bold">Para:</Form.Label>
                            <Form.Control className="rounded-lg transition-input mode-text-white" value={location.state.email} disabled style={{ padding: "12px 16px", outline: "none" }} />
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col className="flex flex-col" xxl={5} xl={5} lg={6} md={7} sm={10} xs={10}>
                            <Form.Label className="font-bold">Asunto:</Form.Label>
                            <InputForm value={asunto} type={"text"} placeholder={"Asunto"} onSetUsuario={handleSetAsunto} isEqual={isEqual(errorNumber, 40) ? "error-validation" : ""} />
                            {isEqual(errorNumber, 40) ? <span className="text-error">{errorMessage}</span> : ""}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="flex flex-col" xxl={5} xl={5} lg={6} md={7} sm={10} xs={10}>
                            <Form.Control onChange={e => setContenido(e.target.value)} className={`rounded-lg transition-input mode-text-white ${isEqual(errorNumber, 41) ? "error-validation" : ""}`} placeholder="Contenido" style={{ padding: "12px 16px", outline: "none" }} as={"textarea"} rows={10} />
                            {isEqual(errorNumber, 41) ? <span className="text-error">{errorMessage}</span> : ""}
                        </Col>
                    </Row>
                    <Row className="mt-10">
                        <Col className="flex flex-col" xxl={3} xl={4} lg={4} md={7} sm={8} xs={10}>
                            {fileInfo && (
                                <div style={{ marginTop: '30px' }}>
                                    <p><strong>Archivo seleccionado:</strong> {fileInfo.name}</p>
                                    {fileInfo.type.startsWith('image/') ? (
                                        <img src={fileInfo.url} alt="Preview" style={{ width: '100px', height: '100px' }} />
                                    ) : fileInfo.type === 'application/pdf' ? (
                                        <a href={fileInfo.url} target="_blank" rel="noopener noreferrer">
                                        </a>
                                    ) : (
                                        <p>Archivo cargado: {fileInfo.name}</p>
                                    )}
                                </div>
                            )}
                            <input type="file" id="imagen" style={{ display: "none" }} onChange={handleFileChange} />
                            <Form.Label htmlFor="imagen" className="p-1 text-center rounded-md mt-4 cursor-pointer" style={{ backgroundColor: "#198754", color: "#fff", width: "150px" }}>Subir archivo</Form.Label>
                        </Col>
                    </Row>
                    {isEqual(errorNumber, 32) || isEqual(errorNumber, 42) || isEqual(errorNumber, 37) ? <span className="text-error">{errorMessage}</span> : ""}
                    <Row style={{ marginTop: "20px" }}>
                        <Col className="flex gap-4 button-form">
                            <Button variant="dark" onClick={() => navigate("/home/ver-usuarios")}>Cancelar</Button>
                            <Button type="sumbit" onClick={(e) => {
                                requestSendArchivo(e)
                            }}>Enviar</Button>
                        </Col>
                    </Row>
                </form>
            </Container>
        </LayoutHome>
    )
}
