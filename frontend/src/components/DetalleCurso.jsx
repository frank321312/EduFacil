import { Col, Container, Row, Table, Form, Button } from "react-bootstrap";
import EscuelaData from "./EscuelaData";
import NavInicio from "./NavInicio";
import InfoCurso from "./InfoCurso";

export default function DetalleCurso({ escuela, errorNumber, errorMessage, onRequestSearchCurso, buscarCurso, onSetBuscarCurso, cursos }) {

    return (
        <>
            <NavInicio isSearch={true} />
            <EscuelaData escuela={escuela} />
            <Container className="mt-6 px-2">
                <Form>
                    <Row>
                        <Col className="ml-4 col-responsive">
                            <Form.Control
                                type="text"
                                placeholder="año-división, ej: 6-7"
                                value={buscarCurso}
                                onChange={e => onSetBuscarCurso(e.target.value)}
                                className={errorNumber === 18 ? "error-validation" : ""}
                            />
                            {errorNumber === 18 ? <span className="text-error">{errorMessage}</span> : ""}
                        </Col>
                        <Col>
                            <Button type="sumbit" color="primary" onClick={e => onRequestSearchCurso(e)}>Buscar</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Container className="px-6 mt-4">
                {
                    errorNumber === 17 || errorNumber === 19 ?
                        <h2 className="text-center" style={{ marginTop: "60px" }}>{errorMessage}</h2>
                        :
                        <Container className="container-responsive mt-10">
                            <h1>Cursos</h1>
                            <Container fluid className="border rounded-lg">
                                <InfoCurso cursos={cursos} />
                            </Container>
                        </Container>
                }
            </Container>
        </>
    );
}