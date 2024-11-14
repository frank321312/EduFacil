import { Button, Col, Container, Row } from "react-bootstrap";
import LayoutHome from "../LayoutHome";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { url } from "../../../functions/url";
import { formatoFecha } from "../../../functions/FormatearFecha";
import { Table } from 'react-bootstrap';
import InputForm from "../../../components/InputForm";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VerUsuarios() {
    const user = useSelector((state) => state.login)
    const [usuarios, setUsuarios] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [errorNumber, setErrorNumber] = useState(0)
    const [searchParams] = useSearchParams()
    const [result, setResult] = useState([])
    const navigate = useNavigate()
    const [buscar, setBuscar] = useState("")

    useEffect(() => {
        if (user.idEscuela != 0) {
            const existeBusqueda = searchParams.get("busqueda")
            if (existeBusqueda) {
                setBuscar(existeBusqueda)
                axios.get(`${url}/api/buscar-usuario?escuela=${user.idEscuela}&username=${existeBusqueda}`)
                .then(res => {
                    setUsuarios(res.data)
                    }).catch(err => {
                        console.log(err)
                    })
            } else {
                axios.get(`${url}/api/obtenerusuarios/${user.idEscuela}`)
                    .then(res => {
                        setUsuarios(res.data)
                    }).catch(err => {
                        console.log(err)
                        const { message, numero } = err.response.data
                        setErrorNumber(numero)
                        setErrorMessage(message)
                    })
            }
        }
    }, [user.idEscuela])

    const requestSearchUsuario = async (e) => {
        setBuscar(e.target.value)
        axios.get(`${url}/api/obtenerusuario?escuela=${user.idEscuela}&username=${e.target.value}`)
            .then(res => {
                setResult(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    const requestGetUsuario = (e) => {
        e.preventDefault()
        axios.get(`${url}/api/buscar-usuario?escuela=${user.idEscuela}&username=${buscar}`)
            .then(res => {
                console.log(res.data)
                setUsuarios(res.data)
            }).catch(err => {
                console.log(err)
            })
        navigate(`/home/ver-usuarios?busqueda=${buscar}`)
    }

    const handleSendEmail = (e, value) => {
        e.preventDefault()
        navigate("/home/enviar-email", { state: value })
    }

    // Autorizo a mi hijo o hija segun corresponda de sexto año septima division a concurrir a la salida didactica eldia 14  de noviembre en el horario de 14 a 17 en el centro 

    return (
        <LayoutHome>
            <Container className="mt-20">
                <form>
                    <Row className="mb-4">
                        <Col xxl={4} xl={4} lg={4} md={5} sm={6} xs={7}>
                            <input type="text" onChange={requestSearchUsuario}
                                value={buscar}
                                className={`rounded-lg transition-input`} style={{ padding: "12px 16px", outline: "none", width: "100%" }}
                                placeholder="Buscar usuario"
                                list="usuarios"
                            />
                            <datalist id="usuarios" style={{ width: "100%" }}>
                                {
                                    result.map(value => (
                                        <option key={value.idUsuario}>{value.nombre} {value.apellido} {value.email}</option>
                                    ))
                                }
                            </datalist>
                        </Col>
                        <Col xxl={3} xl={3} lg={3} md={4} sm={3} xs={4}>
                            <Button type="submit" variant="primary" onClick={requestGetUsuario} style={{ padding: "12px 18px" }}>Buscar</Button>
                        </Col>
                    </Row>
                </form>
            </Container>
            {
                errorNumber === 34 || errorNumber === 35 || errorNumber === 36 || errorNumber === 37 && <h2 className="mt-32 text-center" style={{ marginBottom: "365px" }}>{errorMessage}</h2>
            }
            {
                usuarios.length == 0 ?
                    <h2 className="mt-32 text-center" style={{ marginBottom: "365px" }}>No hay usuarios</h2>
                    :
                    <>
                        <Container className="mt-12">
                            <Table responsive bordered hover>
                                <thead>
                                    <tr>
                                        <th>Nombre de usuario</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Email</th>
                                        <th>Fecha de ingreso</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((value) => (
                                        <tr key={value.idUsuario} className="cursor-pointer" onClick={(e) => handleSendEmail(e, value)}>
                                            <td>{value.nombreUsuario}</td>
                                            <td>{value.nombre}</td>
                                            <td>{value.apellido}</td>
                                            <td>{value.email}</td>
                                            <td>{formatoFecha(value.fechaIngreso)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Container>
                    </>
            }
        </LayoutHome>
    );
}