import { Row, Table, Col } from "react-bootstrap"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CardInfo from "./CardInfo";
// style={{ backgroundColor: "#1C2126" }}
export default function InfoCurso({ cursos }) {
    const navigate = useNavigate()
    const [card, setCard] = useState(false)

    useEffect(() => {
        if (card) {
            setTimeout(() => {
                setCard(false)
            }, 3000)
        }
    }, [card])

    const requestObtenerHorario = async (fila) => {
        try {
            const response = await axios.get(`https://edufacil.onrender.com/api/obtener-horario/${fila.idCurso}`)
            if (response.data.length == 0) {
                if (card) {
                    setTimeout(() => {
                        setCard(true)
                    }, 3000)
                } else {
                    setCard(true)
                }
            } else {
                navigate("/horario", { state: { fila, horario: response.data } })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {
                card && 
                <CardInfo text={"Este curso no tiene horario"} color={"rgb(231, 52, 52)"}/>
            }
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
            </Row>
            {
                cursos.map(value => (
                    <Row className="p-3 cursor-pointer curso-info" key={value.idCurso} style={{ borderBottom: cursos[cursos.length - 1] != value ? "1px solid #d1d5db" : "" }} onClick={() => requestObtenerHorario(value)}>
                        <Col>{value.anio}</Col>
                        <Col>{value.division}</Col>
                        <Col>{value.turno.nombre}</Col>
                    </Row>
                ))
            }
        </>
    )
}