import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './inicio.css';
import { Col, Row } from 'react-bootstrap';
import { FaFacebook, FaInstagramSquare, FaMoon } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io";
import { AiFillCodeSandboxSquare } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeModeDark, deactivateModeDark } from '../../redux/darkMode';

export default function PaginaPrincipal() {
    const navigate = useNavigate()
    const navBarRef = useRef(null)
    // const [active, setActive] = useState(false);
    const acitve = useSelector((state) => state.darkMode.active)
    const classModeDark = useSelector((state) => state.darkMode.class)
    const dispatch = useDispatch()
    console.log(classModeDark);
    console.log(acitve);
    
    const toggleClassDarkMode = () => {
        document.body.classList = ""
        if (!acitve) {
            dispatch(activeModeDark())
            document.body.classList.add(classModeDark)
        } else {
            dispatch(deactivateModeDark())
            document.body.classList.add(classModeDark)
        }
    }

    return (
        <>
            <header>
                <Navbar expand="lg" className="shadow-sm bg-white nav-dark-mode" ref={navBarRef} fixed='top'>
                    <Container fluid className='justify-between'>
                        <Navbar.Brand href="#" className='nav-logo pl-6'>EduFacil</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className='justify-end pr-6'>
                            <Nav className="gap-4 cotenedor-link">
                                <Nav.Link as={Link} to="/autenticacion/opcion">Registrarse</Nav.Link>
                                <Nav.Link as={Link} to="/autenticacion/iniciarsesion">Iniciar sesión</Nav.Link>
                                <Nav.Item className='flex justify-center flex-col cursor-pointer'>
                                    <FaMoon fontSize={20} onClick={toggleClassDarkMode} />
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <Container fluid className='pt-52'>
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
                            <img src="https://www.ttisuccessinsights.es/wp-content/uploads/2024/01/claves-para-el-desarrollo-y-crecimiento-de-equipos-de-trabajo-1024x536.png" alt="" />
                        </div>
                    </Col>
                </Row>
                <Row className='justify-around section-two section-one'>
                    <Col xxl={5} md={6} sm={12}>
                        <div className='contenedor-img'>
                            <img src="https://www.ttisuccessinsights.es/wp-content/uploads/2024/01/claves-para-el-desarrollo-y-crecimiento-de-equipos-de-trabajo-1024x536.png" alt="" />
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
            <Container fluid className=' border-t mt-20 p-4'>
                <Row className='justify-evenly'>
                    <Col xxl={5} sm={5} className='flex justify-center'>
                        <div>
                            <b>Contactanos y siguenos en:</b>
                            <div className='flex gap-3 mt-2 cursor-pointer'>
                                <FaFacebook fontSize={24} />
                                <p className='mb-2'>Facebook</p>
                            </div>
                            <div className='flex gap-3 mt-2 cursor-pointer'>
                                <FaSquareXTwitter fontSize={24} />
                                <p>Twitter</p>
                            </div>
                            <div className='flex gap-3 cursor-pointer'>
                                <FaInstagramSquare fontSize={24} />
                                <p>Instagram</p>
                            </div>
                            <div className='flex gap-3 cursor-pointer'>
                                <IoLogoLinkedin fontSize={24} />
                                <p>Linkedin</p>
                            </div>
                        </div>
                    </Col>
                    <Col xxl={5} sm={5} className='flex justify-center'>
                        <div className='contenedor-pagina-oficial'>
                            <p className='mb-2'><b>Nuestra pagina oficial</b></p>
                            <div className='flex gap-3 cursor-pointer'>
                                <AiFillCodeSandboxSquare color='black' fontSize={24} />
                                <a href="https://google.com" target='_blank' style={{ textDecoration: "none", color: "#000" }}>TailBoos</a>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className='justify-center mt-4'>
                    <Col xxl={9}>
                        <p>
                            © 2024 EduFacil. Todos los derechos reservados. Este sitio web y su contenido están protegidos por derechos de autor. Queda prohibida la reproducción total o parcial sin autorización expresa.
                        </p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}