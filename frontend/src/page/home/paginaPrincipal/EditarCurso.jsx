import { useSelector } from "react-redux"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import InfoCurso from "../../../components/InfoCurso"
import { Col, Container, Row } from "react-bootstrap"
import LayoutHome from "../LayoutHome"
import { useImmer } from "use-immer"
import { createRequestDelete, createRequestPut, tokenError } from "../../../functions/configToken"
import CardInfo from "../../../components/CardInfo"

export default function EditarCursos() {
    const usuario = useSelector(state => state.login)
    const [cursos, setCursos] = useImmer([])
    const [turnos, setTurnos] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [errorNumber, setErrorNumber] = useState(0)
    const [card, setCard] = useState(false)
    const listaErrores = [31, 30, 15, 16, 1, 2, 13, 14]

    const handleEditarTurno = (e, curso) => {
        setCursos(draft => {
            const cursoObj = draft.find(x => x.idCurso === curso.idCurso)
            const turnoSelect = turnos.filter(x => x.idTurno == Number(e.target.value))
            if (cursoObj && turnoSelect.length !== 0) {
                cursoObj.turno = turnoSelect[0]
            }
        })
    }

    const handleEditarActive = (curso) => {
        setCursos(draft => {
            const cursoObj = draft.find(x => x.idCurso === curso.idCurso)
            if (cursoObj) {
                cursoObj.editar = !curso.editar
            }
        })
    }

    const handleEditarAnio = (curso, e) => {
        setCursos(draft => {
            const cursoObj = draft.find(x => x.idCurso === curso.idCurso)
            if (cursoObj) {
                cursoObj.anio = e.target.value
            }
        })
    }

    const handleEditarDivision = (curso, e) => {
        setCursos(draft => {
            const cursoObj = draft.find(x => x.idCurso === curso.idCurso)
            if (cursoObj) {
                cursoObj.division = e.target.value
            }
        })
    }

    const handleEliminarCurso = (curso) => {
        setCursos(draft => {
            return draft.filter(x => x.idCurso !== curso.idCurso)
        })
    }

    useEffect(() => {
        if (card) {
            setTimeout(() => {
                setCard(false)
            }, 3000)
        }
    }, [card])

    const requestSaveChange = async (e, curso) => {
        e.preventDefault()
        try {
            await createRequestPut(`http://localhost:6008/api/modificar-curso/${curso.idCurso}`, { anio: curso.anio, division: curso.division, idTurno: curso.turno.idTurno })
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
            if (card) {
                setTimeout(() => {
                    setCard(true)
                }, 3000)
            } else {
                setCard(true)
            }
            tokenError(error)
        }
    }

    const requestDeleteCurso = async (e, curso) => {
        e.preventDefault()
        try {
            await createRequestDelete(`http://localhost:6008/api/eliminar-curso/${curso.idCurso}`)
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
            if (card) {
                setTimeout(() => {
                    setCard(true)
                }, 3000)
            } else {
                setCard(true)
            }
            tokenError(error)            
        }
    }

    useEffect(() => {
        if (usuario.idEscuela !== 0) {
            axios.get(`http://localhost:6008/api/obtenercursos/${usuario.idEscuela}`).then(res => {
                const cursosRes = res.data.map(x => {
                    return {
                        ...x,
                        editar: false
                    }
                })
                setCursos(cursosRes)
            }).catch(err => {
                console.log(err)
            })
            axios.get("http://localhost:6008/api/turnos").then(res => setTurnos(res.data)).catch(err => console.log(err))
        }
    }, [usuario.idEscuela])

    return (
        <>
            {
                card &&
                <CardInfo color={listaErrores.includes(errorNumber) ? "rgb(231, 52, 52)" : "" } text={listaErrores.includes(errorNumber) ? errorMessage : "Cambios guardados"} />
            }
            <LayoutHome>
                <div className="opcion-animation">
                    <Container className="container-responsive mt-10">
                        <h1>Cursos</h1>
                        <Container fluid className="border rounded-lg">
                            <Row className="p-3 header-row-curso" style={{ borderBottom: "1px solid #d1d5db" }}>
                                <Col>
                                    Año
                                </Col>
                                <Col>
                                    División
                                </Col>
                                <Col>
                                    Turno
                                </Col>
                                <Col></Col>
                                <Col></Col>
                            </Row>
                            {
                                cursos.map(value => (
                                    <Row className="p-3 cursor-pointer curso-info" key={value.idCurso} style={{ borderBottom: cursos[cursos.length - 1] != value ? "1px solid #d1d5db" : "" }}>
                                        {
                                            value.editar ?
                                                <>
                                                    <Col>
                                                        <input className={`rounded-lg transition-input`} style={{ padding: "2px 16px", outline: "none" }} type="number" value={value.anio} onChange={e => handleEditarAnio(value, e)} />
                                                    </Col>
                                                    <Col>
                                                        <input className={`rounded-lg transition-input`} style={{ padding: "2px 16px", outline: "none" }} type="text" value={value.division} onChange={e => handleEditarDivision(value, e)} />
                                                    </Col>
                                                    <Col>
                                                        <select onChange={e => handleEditarTurno(e, value)} className={`rounded-lg transition-input`} style={{ padding: "2px 16px", outline: "none" }} name="" id="">
                                                            {
                                                                turnos.map(turno => (
                                                                    <option key={turno.idTurno} value={turno.idTurno}>{turno.nombre}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </Col>
                                                </>
                                                :
                                                <>
                                                    <Col>{value.anio}</Col>
                                                    <Col>{value.division}</Col>
                                                    <Col>{value.turno.nombre}</Col>
                                                </>
                                        }
                                        <Col onClick={() => handleEditarActive(value)}>{value.editar ? "Cancelar" : "Editar"}</Col>
                                        {
                                            value.editar ?
                                                <Col onClick={e => { requestSaveChange(e, value); handleEditarActive(value) }}>Guardar</Col>
                                                :
                                                <Col onClick={(e) => { requestDeleteCurso(e, value); handleEliminarCurso(value) }}>Eliminar</Col>
                                        }
                                    </Row>
                                ))
                            }
                        </Container>
                    </Container>
                </div>
            </LayoutHome>
        </>
    );
}