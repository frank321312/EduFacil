import LayoutHome from "../LayoutHome";
import InputForm from "../../../components/InputForm";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { isEqual } from "../../../functions/validations";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { createRequestPost, tokenError } from "../../../functions/configToken";

export default function CrearCurso() {
    const user = useSelector((state) => state.login)
    const navigate = useNavigate()
    const [anio, setAnio] = useState("")
    const [division, setDivisión] = useState("")
    const [turnos, setTurnos] = useState([])
    const turnoRef = useRef(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [errorNumber, setErrorNumber] = useState(0)

    useEffect(() => {
        if (user.idUsuario) {
            axios.get("http://localhost:6008/api/turnos").then(res => setTurnos(res.data)).catch(err => console.log(err))
        }
    }, [user.idEscuela])

    const requestCreateCurso = async (e) => {
        e.preventDefault()
        try {
            await createRequestPost("http://localhost:6008/api/crearcurso", { anio, division, idEscuela: user.idEscuela, idTurno: turnoRef.current.value })
            setErrorNumber(0)
            setErrorMessage("")
        } catch (error) {
            console.log(error)
            const { message, numero } = error.response.data
            setErrorNumber(numero)
            setErrorMessage(message)     
            tokenError(error)
        }
    }

    return (
        <LayoutHome>
            <Container className="mt-20 container-form-responsive">
                <form className="ml-20 form-responsive">
                    <Row className="mb-3">
                        <Col>
                            <h1 className="font-bold text-form">Crear curso</h1>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col className="flex flex-col" xxl={5} xl={5} lg={6} md={7} sm={10} xs={10}>
                            <Form.Label className="font-bold">Año:</Form.Label>
                            <InputForm value={anio} type={"text"} placeholder={"Año"} onSetUsuario={(e) => setAnio(e.target.value)} isEqual={isEqual(errorNumber, 70) || isEqual(errorNumber, 11) || isEqual(errorNumber, 1) ? "error-validation" : ""}/>
                            {isEqual(errorNumber, 70) || isEqual(errorNumber, 11) || isEqual(errorNumber, 1)? <span className="text-error">{errorMessage}</span> : ""}
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col className="flex flex-col" xxl={5} xl={5} lg={6} md={7} sm={10} xs={10}>
                            <Form.Label className="font-bold">División:</Form.Label>
                            <InputForm type={"text"} placeholder={"División"} onSetUsuario={(e) => setDivisión(e.target.value)} isEqual={isEqual(errorNumber, 71) || isEqual(errorNumber, 5) || isEqual(errorNumber, 3) || isEqual(errorNumber, 2) || isEqual(errorNumber, 20) || isEqual(errorNumber, 4) ? "error-validation" : ""}/>
                            {isEqual(errorNumber, 71) || isEqual(errorNumber, 5) || isEqual(errorNumber, 3) || isEqual(errorNumber, 2) || isEqual(errorNumber, 20) || isEqual(errorNumber, 4) ? <span className="text-error">{errorMessage}</span> : ""}
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col className="flex flex-col" xxl={5} xl={5} lg={6} md={7} sm={10} xs={10}>
                            <Form.Label className="font-bold">Turno:</Form.Label>
                            <select ref={turnoRef} className={`rounded-lg transition-input ${isEqual}`} style={{ padding: "12px 16px", outline: "none" }}>
                                {
                                    turnos.map(value => (
                                        <option key={value.idTurno} value={value.idTurno}>{value.nombre}</option>
                                    ))
                                }
                            </select>
                        </Col>
                    </Row>
                    <div className="span-text-error">
                        {isEqual(errorNumber, 12) || isEqual(errorNumber, 10) || isEqual(errorNumber, 6) ? <span className="text-error mt-20">{errorMessage}</span> : ""}
                    </div>
                    <Row>
                        <Col className="flex gap-4 button-form">
                            <Button variant="dark" onClick={() => navigate("/home")}>Cancelar</Button>
                            <Button type="sumbit" onClick={requestCreateCurso}>Guardar cambios</Button>
                        </Col>
                    </Row>
                    <div>
                        <h3 className="mt-20">Crea cursos de manera rapida</h3>
                        <p>Primero ingreso el año, luego ingrese las divisiones que pertecen a un turno especifico. <br />
                            Cada división puede tener como maximo dos caracteres. <br />
                            <b>Año:</b> 6 <br />
                            <b>Divsión:</b> 1-2-3-4-5-6-7-8 <br />
                            <b>Turno:</b> Tarde <br />
                        </p>

                    </div>
                </form>
            </Container>
        </LayoutHome>
    );
}