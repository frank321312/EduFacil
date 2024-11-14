import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './inicio.css';
import { Col, Row } from 'react-bootstrap';
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io";
import { AiFillCodeSandboxSquare } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import NavInicio from '../../components/NavInicio';
import Footer from '../../components/Footer';
import { url } from '../../functions/url';

export default function PaginaPrincipal() {
    const navigate = useNavigate()

    return (
        <>
            <NavInicio isSearch={false}/>
            <Container fluid className='pt-48'>
                <Row className='justify-center'>
                    <Col xxl={6} lg={8} sm={8} xs={9}>
                        <p className='text-2xl parrafo-repsonsive'>
                            En el mundo actual, donde la tecnología transforma constantemente la forma en que interactuamos y gestionamos nuestras actividades diarias, surge la necesidad de modernizar los procesos educativos. Nuestra aplicación web es una solución innovadora diseñada para facilitar la gestión escolar, no solo para una institución específica, sino para cualquier escuela que busque optimizar sus operaciones.
                        </p>
                    </Col>
                </Row>
                <Row className='justify-around section-one' style={{ marginTop: "100px" }}>
                    <Col xxl={5} md={6} lg={6} sm={12} className='contenedor-parrafo'>
                        <div className='p-8 text-lg'>
                            <h3><b>1. Creacion de horario</b></h3>
                            <p>La aplicación ofrece la funcionalidad de crear horarios de manera rapida y dinamica, cualquier usuario podra ver dicho horario sea alumno o un futuro estudainte que quiera saber los horarios y que materias puede tener a lo largo del ciclo lectivo escolar.</p>
                        </div>
                    </Col>
                    <Col xxl={5} md={6} sm={12}>
                        <div className='contenedor-img'>
                            <img src={`${url}/get-imagen/image.png`} alt="" />
                        </div>
                    </Col>
                </Row>
                <Row className='justify-around section-two section-one'>
                    <Col xxl={5} md={6} sm={12}>
                        <div className='contenedor-img'>
                            <img src={`${url}/get-imagen/email-envio.PNG`} alt="" />
                        </div>
                    </Col>
                    <Col xxl={5} md={6} lg={6} sm={12} className='contenedor-parrafo'>
                        <div className='p-8 text-lg'>
                            <h3><b>2. Envio de boletines</b></h3>
                            <p>Otras de la funcionalidades que ofrece la aplicación es la posibilidad de enviar boletines a los alumnos solo si estan registrados.</p>
                        </div>
                    </Col>
                </Row>
                <Row className='justify-around section-one'>
                    <Col xxl={5} md={6} lg={6} sm={12} className='contenedor-parrafo'>
                        <div className='p-8 text-lg'>
                            <h3><b>3. Envio de notifaciones sobre eventos escolares</b></h3>
                            <p>Si un alumno esta registrado puede recibir notificaicones sobre eventos que suceden en su escuela.</p>
                        </div>
                    </Col>
                    <Col xxl={5} md={6} sm={12}>
                        <div className='contenedor-img'>
                            <img src="https://www.ttisuccessinsights.es/wp-content/uploads/2024/01/claves-para-el-desarrollo-y-crecimiento-de-equipos-de-trabajo-1024x536.png" alt="" />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}