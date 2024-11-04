import { Col, Container, Row } from "react-bootstrap";
import "../components/styles/escuela.css"

export function SeperadoHR() {
    return (
        <Row className="justify-center mx-0">
            <Col xxl={10} lg={10} md={10} sm={10} xs={10}>
                <hr className="opacity-100" />
            </Col>
        </Row>
    );
}

export default function InfoEscuela({ escuela }) {
    return (
        <Container fluid>
            <Row className="justify-center">
                <Col xxl={4} xl={4} lg={4} md={4} className="container-image" style={{ marginTop: "40px", marginBottom: "40px" }}>
                    <img src={escuela.imgUrl} alt="Escuela" />
                </Col>
                <Col xxl={4} xl={4} lg={4} md={4} className="container-data-info flex items-center">
                    <h1>{escuela.nombre}</h1>
                </Col>
            </Row>
            <SeperadoHR />
            <Row className="justify-center container-data-info">
                <Col xxl={3} xl={3} lg={3} md={3} sm={4} xs={5}>
                    <h5>Dirección</h5>
                    <span>{escuela.direccion}</span>
                </Col>
                <Col xxl={3} xl={3} lg={3} md={3} sm={4} xs={5}>
                    <h5>Email</h5>
                    <span>{escuela.email}</span>
                </Col>
                <Col xxl={3} xl={3} lg={3} md={3} sm={4} xs={5}>
                    <h5>Telefono</h5>
                    <span>{escuela.telefono}</span>
                </Col>
            </Row>
        </Container>
    );
}