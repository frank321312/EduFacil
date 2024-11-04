import { Row, Table, Col } from "react-bootstrap"
// style={{ backgroundColor: "#1C2126" }}
export default function InfoCurso({ cursos }) {
    return (
        <>
            <Row className="p-3" style={{ borderBottom: "1px solid #d1d5db" }}>
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
                    <Row className="p-3 cursor-pointer curso-info" key={value.idCurso} style={{ borderBottom: cursos[cursos.length - 1] != value ? "1px solid #d1d5db" : "" }}>
                        <Col>{ value.anio }</Col>
                        <Col>{ value.division }</Col>
                        <Col>{ value.turno.nombre }</Col>
                    </Row>
                ))
            }
        </>
    )
}