import { useDispatch, useSelector } from 'react-redux';
import { activeModeDark, deactivateModeDark } from '../redux/darkMode';
import Nav from 'react-bootstrap/Nav';
import { FaMoon } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { IoMenu } from "react-icons/io5";
import { IoSearch } from "react-icons/io5"; import SideBar from './SideBar';
import "./styles/navBar.css";
import axios from 'axios';

export default function NavInicio({ isSearch }) {
    const acitve = useSelector((state) => state.darkMode.active)
    const classModeDark = useSelector((state) => state.darkMode.class)
    const dispatch = useDispatch()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [isSideBar, setIsSideBar] = useState(false)
    const [searchParams] = useSearchParams()
    const [buscarEscuela, setBuscarEscuela] = useState("")
    const [listSearchSchool, setListSearchSchool] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        document.body.style.paddingTop = "55px"
        document.body.style.paddingBottom = "80px"
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        };
        window.addEventListener('resize', handleResize)
        
        setBuscarEscuela(searchParams.get("busqueda") === null ? buscarEscuela : searchParams.get("busqueda"))

        return () => {
            window.removeEventListener('resize', handleResize)
            document.body.style.paddingTop = "0"
            document.body.style.paddingBottom = "0"
        }
    }, [])

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

    const handleSearchEscuela = async (e) => {
        try {
            setBuscarEscuela(e.target.value)
            const response = await axios.get(`http://localhost:6008/api/escuela?nombre=${buscarEscuela}`)
            setListSearchSchool(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSendSearchSchool = (e) => {
        e.preventDefault()
        navigate(`/escuelas?busqueda=${buscarEscuela}`, { state: listSearchSchool })
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
                        isSearch && windowWidth < 668 &&
                        <Col xs={7} sm={9} className='flex justify-end cursor-pointer'>
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
                        windowWidth < 930 ?
                            <Col xs={2} sm={1} onClick={() => setIsSideBar(!isSideBar)}>
                                <IoMenu size={40} />
                            </Col>
                            :
                            <Col className='flex gap-5 justify-end' sm={6} md={5} lg={5} xl={4} xxl={4}>
                                <Nav.Link as={Link} to="/escuelas" className='mode-dark-text-white'>Escuelas</Nav.Link>
                                <Nav.Link as={Link} to="/autenticacion/opcion" className='mode-dark-text-white'>Registrarse</Nav.Link>
                                <Nav.Link as={Link} to="/autenticacion/iniciarsesion" className='mode-dark-text-white'>Iniciar sesión</Nav.Link>
                            </Col>
                    }
                </Row>
            </nav>
            {
                isSideBar && windowWidth < 930 &&
                <SideBar>
                    <Nav.Link className="" style={{ fontSize: "24px", fontWeight: "bold" }} as={Link}>EduFacil</Nav.Link>
                    <hr className='mt-2' />
                    <Nav.Link className="mb-4" style={{ fontSize: "16px" }} as={Link} to="/autenticacion/opcion">Registrarse</Nav.Link>
                    <Nav.Link className="mb-4" style={{ fontSize: "16px" }} as={Link} to="/autenticacion/iniciarsesion">Iniciar sesion</Nav.Link>
                    <Nav.Link className="mb-4" style={{ fontSize: "16px" }} as={Link} to="/escuelas">Buscar escuela</Nav.Link>
                </SideBar>
            }
        </>
    )
}