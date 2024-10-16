import { useDispatch, useSelector } from 'react-redux';
import { activeModeDark, deactivateModeDark } from '../redux/darkMode';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaMoon } from "react-icons/fa";
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

export default function NavInicio() {
    const acitve = useSelector((state) => state.darkMode.active)
    const classModeDark = useSelector((state) => state.darkMode.class)
    const dispatch = useDispatch()

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
            <div onClick={toggleClassDarkMode} className={`cursor-pointer fixed bottom-0 right-0 p-4 m-4 rounded-xl ${document.body.classList.contains("mode-dark") ? "bg-white text-dark" : "bg-dark text-white"}`}>
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
            </Navbar>
        </>
    )
}