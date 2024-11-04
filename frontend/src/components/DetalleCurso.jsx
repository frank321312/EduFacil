import { Col, Container, Row, Table, Form, Button } from "react-bootstrap";
import EscuelaData from "./EscuelaData";
import NavInicio from "./NavInicio";

export default function DetalleCurso({ escuela, errorNumber, errorMessage, onRequestSearchCurso, buscarCurso, onSetBuscarCurso, cursos }) {

    return (
        <>
            <NavInicio isSearch={true} />
            <EscuelaData escuela={escuela} />
            <Container className="mt-6 px-2">
                <Form>
                    <Row>
                        <Col>
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
                        <Table striped responsive hover>
                            <thead>
                                <tr>
                                    <th>Año</th>
                                    <th>División</th>
                                    <th>Turno</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cursos.map(value => (
                                        <tr key={value.idCurso} className="cursor-pointer">
                                            <td>{value.anio}</td>
                                            <td>{value.division}</td>
                                            <td>{value.turno.nombre}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                }
            </Container>
        </>
    );
}