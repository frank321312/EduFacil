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
import NavInicio from '../../components/NavInicio';

export default function PaginaPrincipal() {
    const navigate = useNavigate()

    return (
        <>
            {/* <div onClick={toggleClassDarkMode} className={`cursor-pointer fixed bottom-0 right-0 p-4 m-4 rounded-xl ${document.body.classList.contains("mode-dark") ? "bg-white text-dark" : "bg-dark text-white"}`}>
                <FaMoon fontSize={20} />
            </div>
            <Navbar expand="lg" className="shadow-sm bg-white nav-dark-mode mode-dark-text-white" fixed='top'>
                <Container fluid className='justify-between'>
                    <Navbar.Brand href="#" className='nav-logo pl-6 mode-dark-text-white'>EduFacil</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className='btnToggle' />
                    <Navbar.Collapse id="basic-navbar-nav" className='justify-end pr-6'>
                        <Nav className="gap-4 cotenedor-link">
                            <Nav.Link as={Link} to="/autenticacion/escuelas" className='mode-dark-text-white'>Escuelas</Nav.Link>
                            <Nav.Link as={Link} to="/autenticacion/opcion" className='mode-dark-text-white'>Registrarse</Nav.Link>
                            <Nav.Link as={Link} to="/autenticacion/iniciarsesion" className='mode-dark-text-white'>Iniciar sesión</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}
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
                                <AiFillCodeSandboxSquare color='black' className='mode-dark-text-white' fontSize={24} />
                                <a href="https://google.com" target='_blank' className='mode-dark-text-white' style={{ textDecoration: "none", color: "#000" }}>TailBoos</a>
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