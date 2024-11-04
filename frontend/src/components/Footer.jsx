import Container from 'react-bootstrap/Container';
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io";
import { AiFillCodeSandboxSquare } from "react-icons/ai";
import { Col, Row } from 'react-bootstrap';

export default function Footer() {
    return (
        <Container fluid className="border-t mt-20 p-4">
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
    );
} 