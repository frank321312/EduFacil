import { useDispatch, useSelector } from 'react-redux';
import { activeModeDark, deactivateModeDark } from '../redux/darkMode';
import Nav from 'react-bootstrap/Nav';
import { FaMoon } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useState, useEffect, useRef, act } from 'react';
import { IoMenu } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import "./styles/navBar.css";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { requestVerifyToken } from '../functions/verifyToken';
import { FaRegUserCircle } from "react-icons/fa";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { url } from '../functions/url';

export default function NavInicio({ isSearch }) {
    const acitve = useSelector((state) => state.darkMode.active)
    const login = useSelector((state) => state.login)
    const classModeDark = useSelector((state) => state.darkMode.class)
    const dispatch = useDispatch()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [searchParams] = useSearchParams()
    const [buscarEscuela, setBuscarEscuela] = useState("")
    const [listSearchSchool, setListSearchSchool] = useState([])
    const navigate = useNavigate()
    const cookies = new Cookies()
    const [isLogin, setIsLogin] = useState(true)
    const [dropdown, setDropdown] = useState(false)
    const menuRef = useRef(null)
    const buttonRef = useRef(null)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        document.body.style.paddingTop = "55px"
        document.body.style.paddingBottom = "60px"
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        };
        window.addEventListener('resize', handleResize)

        setBuscarEscuela(searchParams.get("busqueda") === null ? buscarEscuela : searchParams.get("busqueda"))
        const token = cookies.get("jwt")
        if (!token) {
            setIsLogin(false)
        } else {
            requestVerifyToken(token).then((res) => setIsLogin(res)).catch(err => setIsLogin(err))
        }

        return () => {
            window.removeEventListener('resize', handleResize)
            document.body.style.paddingTop = "0"
            document.body.style.paddingBottom = "0"
        }
    }, [])

    const toggleDropdown = (e) => {
        setDropdown(!dropdown)
    }

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
            setDropdown(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        };
    }, [])

    const toggleClassDarkMode = () => {
        document.body.classList = ""
        if (!acitve) {
            dispatch(activeModeDark())
            document.body.classList.add(classModeDark)
            cookies.remove("modo")
            cookies.set("modo", classModeDark)
        } else {
            dispatch(deactivateModeDark())
            document.body.classList.add(classModeDark)
            cookies.remove("modo")
            cookies.set("modo", classModeDark)
        }
    }

    const handleSearchEscuela = async (e) => {
        try {
            setBuscarEscuela(e.target.value)
            const response = await axios.get(`${url}/api/escuela?nombre=${buscarEscuela}`)
            setListSearchSchool(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSendSearchSchool = (e) => {
        e.preventDefault()
        navigate(`/escuelas?busqueda=${buscarEscuela}`, { state: listSearchSchool })
    }

    const handleDeleteToken = () => {
        cookies.remove("jwt")
        navigate("/")
    }

    return (
        <>
            <div onClick={toggleClassDarkMode} className={`cursor-pointer fixed bottom-0 right-0 p-4 m-4 rounded-xl ${document.body.classList.contains("mode-dark") ? "bg-white text-dark" : "bg-dark text-white"}`}>
                <FaMoon fontSize={20} />
            </div>
            <nav className="shadow-sm bg-white nav-bar-responsive nav-dark-mode mode-dark-text-white fixed w-screen" style={{ height: "55px", top: "0" }}>
                <Row className='justify-between h-full items-center px-9 m-0 relative'>
                    <Col xs={3} md={2} sm={2} xl={2} className='flex'>
                        <Nav.Link as={Link} to="/" style={{ fontWeight: "bold" }} className='nav-logo pl-6 mode-dark-text-white'>EduFacil</Nav.Link>
                    </Col>
                    {
                        windowWidth <= 1199 &&
                        <Col xs={7} sm={9} className='flex justify-end cursor-pointer' onClick={() => navigate("/buscar")}>
                            <IoSearch size={24} />
                        </Col>
                    }
                    {
                        isSearch && windowWidth > 668 &&
                        <Col>
                            <Form onSubmit={handleSendSearchSchool}>
                                <Row className='justify-center'>
                                    <Col xxl={10} xl={10} lg={10} md={10} sm={8} className='relative'>
                                        <Form.Control type='text' list='escuelas' value={buscarEscuela} placeholder='Buscar escuela' onChange={handleSearchEscuela} />
                                        <datalist id='escuelas' style={{ width: "100%" }}>
                                            {
                                                listSearchSchool.map(value => (
                                                    <option key={value.idEscuela}>{value.nombre}</option>
                                                ))
                                            }
                                        </datalist>
                                    </Col>
                                    <Col xxl={1} xl={2} lg={2} md={2} sm={2} xs={2}>
                                        <Button color='primary' onClick={handleSendSearchSchool}>Buscar</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>

                    }
                    {
                        windowWidth < 1200 ?
                            <Col xs={2} sm={1} role='button' onClick={handleShow}>
                                <IoMenu size={40} />
                            </Col>
                            :
                            isLogin ?
                                <Col className='flex gap-5 justify-end relative' sm={7} md={7} lg={7} xl={6} xxl={5}>
                                    <Nav.Link as={Link} to="/escuelas" className='mode-dark-text-white' onClick={() => setBuscarEscuela("")}>Escuelas</Nav.Link>
                                    {
                                        login.idRol != 2 &&
                                        <>
                                            <Nav.Link as={Link} to="/home/crear-curso" className='mode-dark-text-white'>Crear curso</Nav.Link>
                                            <Nav.Link as={Link} to="/home/crear-horario" className='mode-dark-text-white'>Crear horario</Nav.Link>
                                        </>
                                    }
                                    <Nav.Link as={Link} to="/home" className='mode-dark-text-white'>Panel</Nav.Link>
                                    <div className='flex items-center gap-2 cursor-pointer' ref={buttonRef} onClick={toggleDropdown}>
                                        <span><b>{login.nombreUsuario}</b></span>
                                        <FaRegUserCircle size={20} />
                                    </div>
                                    {
                                        dropdown &&
                                        <div ref={menuRef} className='absolute text-center py-2 rounded-md dropdown-div' style={{ width: "150px", marginTop: "35px", right: "-20px" }}>
                                            <Nav.Link as={Link} to="/home/usuario" className='mode-dark-text-white py-2 animation-link'>Configuraciones</Nav.Link>
                                            <Nav.Link as={Link} to="/home/editar" className='mode-dark-text-white py-2 animation-link'>Editar cuenta</Nav.Link>
                                            {
                                                login.idRol === 1 &&
                                                <Nav.Link as={Link} to="/home/editar/escuela" className='mode-dark-text-white py-2 animation-link'>Editar escuela</Nav.Link>
                                            }
                                            {
                                                login.idRol !== 2 &&
                                                <>
                                                    <Nav.Link as={Link} to="/home/editar-horario" className='mode-dark-text-white py-2 animation-link'>Editar horario</Nav.Link>
                                                    <Nav.Link as={Link} to="/home/editar-cursos" className='mode-dark-text-white py-2 animation-link'>Editar cursos</Nav.Link>
                                                    <Nav.Link as={Link} to="/home/ver-usuarios" className='mode-dark-text-white py-2 animation-link'>Ver usuarios</Nav.Link>
                                                </>
                                            }
                                            <Nav.Link className='mode-dark-text-white py-2 animation-link' onClick={handleDeleteToken}>Cerrar sesión</Nav.Link>
                                        </div>
                                    }
                                </Col>
                                :
                                <Col className='flex gap-5 justify-end' sm={6} md={5} lg={5} xl={4} xxl={4}>
                                    <Nav.Link as={Link} to="/escuelas" className='mode-dark-text-white' onClick={() => setBuscarEscuela("")}>Escuelas</Nav.Link>
                                    <Nav.Link as={Link} to="/autenticacion/opcion" className='mode-dark-text-white'>Registrarse</Nav.Link>
                                    <Nav.Link as={Link} to="/autenticacion/iniciarsesion" className='mode-dark-text-white'>Iniciar sesión</Nav.Link>
                                </Col>
                    }
                </Row>
            </nav>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='font-extrabold' style={{ fontSize: "28px", fontWeight: "bold", paddingLeft: "13px" }} >EduFacil</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{ paddingLeft: "30px" }}>
                    {
                        isLogin ?
                            <Container fluid className='px-0'>
                                <div className='flex gap-3 mb-3'>
                                    <FaRegUserCircle size={28} />
                                    <span style={{ fontSize: "18px" }}><b>{login.nombreUsuario}</b></span>
                                </div>
                                <Nav.Link as={Link} to="/home" className='mode-dark-text-white py-2 animation-link'>Panel</Nav.Link>
                                <Nav.Link as={Link} to="/home/usuario" className='mode-dark-text-white py-2 animation-link'>Configuraciones</Nav.Link>
                                <Nav.Link as={Link} to="/home/editar" className='mode-dark-text-white py-2 animation-link'>Editar cuenta</Nav.Link>
                                {
                                    login.idRol === 1 &&
                                    <Nav.Link as={Link} to="/home/editar/escuela" className='mode-dark-text-white py-2 animation-link'>Editar escuela</Nav.Link>
                                }
                                {
                                    login.idRol !== 2 &&
                                    <>
                                        <Nav.Link as={Link} to="/home/crear-cursos" className='mode-dark-text-white py-2 animation-link'>Editar cursos</Nav.Link>
                                        <Nav.Link as={Link} to="/home/crear-curso" className='mode-dark-text-white py-2 animation-link'>Crear curso</Nav.Link>
                                        <Nav.Link as={Link} to="/home/crear-horario" className='mode-dark-text-white py-2 animation-link'>Crear horario</Nav.Link>
                                        <Nav.Link as={Link} to="/home/ver-usuarios" className='mode-dark-text-white py-2 animation-link'>Ver usuarios</Nav.Link>
                                    </>
                                }
                                <Nav.Link className="py-2 animation-link" style={{ fontSize: "16px" }} as={Link} to="/escuelas">Buscar escuela</Nav.Link>
                                <Nav.Link className='mode-dark-text-white py-2 animation-link' onClick={handleDeleteToken}>Cerrar sesión</Nav.Link>
                            </Container>
                            :
                            <>
                                <Nav.Link className="mb-4 py-2 animation-link" style={{ fontSize: "16px" }} as={Link} to="/autenticacion/opcion">Registrarse</Nav.Link>
                                <Nav.Link className="mb-4 py-2 animation-link" style={{ fontSize: "16px" }} as={Link} to="/autenticacion/iniciarsesion">Iniciar sesion</Nav.Link>
                                <Nav.Link className="mb-4 py-2 animation-link" style={{ fontSize: "16px" }} as={Link} to="/escuelas">Buscar escuela</Nav.Link>
                            </>
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}