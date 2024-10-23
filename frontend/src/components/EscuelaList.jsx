import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import "./styles/escuela.css";

export default function EscuelasList({ listSchool }) {
    return (
        <>
            {
                listSchool.length === 0 ?
                    <Container fluid className="mt-14 flex justify-center">
                        <h1 className="text-center">Escuela no encontrada</h1>
                    </Container>
                    :
                    listSchool.map(value => (
                        <Container fluid key={value.idEscuela} className="opcion-animation container-school">
                            <Row className="justify-center mx-0 cursor-pointer" style={{ marginTop: "40px", marginBottom: "40px" }}>
                                <Col xxl={4} xl={4} lg={4} md={4} className="container-image">
                                    <img src={value.imgUrl} alt="Imagen de la escuela" />
                                </Col>
                                <Col xxl={4} xl={4} lg={4} md={4} sm={7} xs={6} className="container-data">
                                    <span className="block mb-3"> <b>Escuela:</b> {value.nombre}</span>
                                    <span className="block mb-3"> <b>Correo electronico:</b> {value.email}</span>
                                    <span className="block mb-3"> <b>Telefono:</b> {value.telefono}</span>
                                    <span className="block mb-3"> <b>Dirección</b> {value.direccion}</span>
                                </Col>
                            </Row>
                            <Row className="justify-center mx-0">
                                <Col xxl={10} lg={10} md={10} sm={10} xs={10}>
                                    <hr className="opacity-100" />
                                </Col>
                            </Row>
                        </Container>
                    ))
            }
        </>
    );
}