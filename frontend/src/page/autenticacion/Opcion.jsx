import { Button, Col, Container, Row } from "react-bootstrap";
import './auth.css';
import { useNavigate } from "react-router-dom";

export default function ElegirOpcion() {
    const navigate = useNavigate()
    const rol = {
        escuela: 1,
        estudiante: 2,
        docente: 3
    }

    return (
        <Container fluid className="h-screen flex justify-center items-center opcion-animation">
            <div className="p-20 rounded-md shadow-2xl contenedor-opcion layout-auth">
                <Row className="flex justify-center">
                    <Col xxl={12} sm={12} xs={12}>
                        <h2>¿Que tipo de cuenta quiere crear?</h2>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Button color="primary" className="w-full btn-dark-mode" onClick={() => { navigate("/autenticacion/escuela", { state: { idRol: rol.escuela } }) }}>Para la escuela</Button>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Button color="primary" className="w-full btn-dark-mode" onClick={() => { navigate("/autenticacion/registro", { state: { idRol: rol.estudiante } }) }}>Estudiante</Button>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Button color="primary" className="w-full btn-dark-mode" onClick={() => { navigate("/autenticacion/registro", { state: { idRol: rol.docente } }) }}>Docente</Button>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}