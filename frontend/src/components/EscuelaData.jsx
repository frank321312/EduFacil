import { Col, Row } from "react-bootstrap";

export default function EscuelaData({ escuela }) {
    return (
        <>
            <Row className="justify-center mx-0 cursor-pointer" style={{ marginTop: "40px", marginBottom: "40px" }}>
                <Col xxl={4} xl={4} lg={4} md={4} className="container-image">
                    <div style={{ height: "200px", width: "200px", objectFit: "cover" }}>
                        <img src={escuela.imgUrl} style={{ width: "100%", height: "100%" }} alt="Escuela" />
                    </div>
                </Col>
                <Col xxl={4} xl={4} lg={4} md={4} sm={7} xs={6} className="container-data">
                    <span className="block mb-3"> <b>Escuela:</b> {escuela.nombre}</span>
                    <span className="block mb-3"> <b>Correo electronico:</b> {escuela.email}</span>
                    <span className="block mb-3"> <b>Telefono:</b> {escuela.telefono}</span>
                    <span className="block mb-3"> <b>Dirección</b> {escuela.direccion}</span>
                </Col>
            </Row>
            <Row className="justify-center mx-0">
                <Col xxl={10} lg={10} md={10} sm={10} xs={10}>
                    <hr className="opacity-100" />
                </Col>
            </Row>
        </>
    );
}