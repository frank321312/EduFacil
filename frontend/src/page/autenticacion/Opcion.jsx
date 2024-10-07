import { Button, Col, Container, Row } from "react-bootstrap";
import './auth.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asignarRol } from "../../redux/authSlice";

export default function ElegirOpcion() {
    const navigate = useNavigate()
    const idRol = useSelector(state => state.auth.value)
    const dispatch = useDispatch()
    const rol = {
        escuela: 1,
        estudiante: 2,
        docente: 3
    }

    return (
        <Container fluid className="h-screen flex justify-center items-center opcion-animation">
            <div className="p-20 rounded-md shadow-2xl contenedor-opcion">
                <Row className="flex justify-center">
                    <Col xxl={12} sm={12} xs={12}>
                        <h2>¿Que tipo de cuenta quiere crear?</h2>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Button color="primary" className="w-full" onClick={() => { navigate("/autenticacion/escuela"); dispatch(asignarRol(rol.escuela)) }}>Para la escuela</Button>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Button color="primary" className="w-full" onClick={() => { navigate("/autenticacion/registro"); dispatch(asignarRol(rol.estudiante)) }}>Estudiante</Button>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Button color="primary" className="w-full" onClick={() => { navigate("/autenticacion/registro"); dispatch(asignarRol(rol.docente)) }}>Docente</Button>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}