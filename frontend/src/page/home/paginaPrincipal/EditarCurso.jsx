import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"
import InfoCurso from "../../../components/InfoCurso"
import { Col, Container, Row } from "react-bootstrap"
import LayoutHome from "../LayoutHome"

export default function EditarCursos() {
    const usuario = useSelector(state => state.login)
    const [cursos, setCursos] = useState([])
    // const [putCursos, setPutCursos] = useState([])

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
        }
    }, [usuario.idEscuela])

    return (
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
                                <Row className="p-3 cursor-pointer curso-info" key={value.idCurso} style={{ borderBottom: cursos[cursos.length - 1] != value ? "1px solid #d1d5db" : "" }} onClick={() => requestObtenerHorario(value)}>
                                    <Col>{value.anio}</Col>
                                    <Col>{value.division}</Col>
                                    <Col>{value.turno.nombre}</Col>
                                    <Col>Editar</Col>
                                    <Col>Eliminar</Col>
                                </Row>
                            ))
                        }
                    </Container>
                </Container>
            </div>
        </LayoutHome>
    );
}