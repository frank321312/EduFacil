import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import DetalleCurso from "../../components/DetalleCurso";

export default function Cursos() {
    const location = useLocation()
    const escuela = location.state
    const [cursos, setCursos] = useState([])
    const navigate = useNavigate()
    const [buscarCurso, setBuscarCurso] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [errorNumber, setErrorNumber] = useState(0)
    const { idEscuela, curso } = useParams()

    useEffect(() => {
        if (escuela === null) {
            navigate("/escuelas")
        }
        if (idEscuela !== undefined && curso !== undefined) {
            axios.get(`https://edufacil.onrender.com/api/obtenercurso/${idEscuela}/${curso}`)
            .then(res => { setCursos([...res.data]) })
            .catch(err => console.log(err))
            setBuscarCurso(curso)
        } else {
            axios.get(`https://edufacil.onrender.com/api/obtenercursos/${escuela.idEscuela}`)
            .then(res => { setCursos([...res.data]) })
            .catch(err => console.log(err))
        }
    }, [])

    const requestSearchCurso = async (e) => {
        e.preventDefault()
        try { 
            const responseCurso = await axios.get(`https://edufacil.onrender.com/api/obtenercurso/${escuela.idEscuela}/${buscarCurso}`)
            console.log(responseCurso)
            setCursos([...responseCurso.data])
            navigate(`/escuela/cursos/${escuela.idEscuela}/${buscarCurso}`, { state: escuela })
        } catch (error) {
            console.log(error)
            const { message, numero } = error.response.data
            setErrorNumber(numero)
            setErrorMessage(message)
        }
    }

    return (
        <>
            <DetalleCurso
                errorMessage={errorMessage} 
                errorNumber={errorNumber} 
                escuela={escuela} 
                onRequestSearchCurso={requestSearchCurso}
                buscarCurso={buscarCurso}
                onSetBuscarCurso={setBuscarCurso}
                cursos={cursos}
            />
            {/* <Container className="mt-6 px-2">
                <Form>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="año-división, ej: 6-7"
                                value={buscarCurso}
                                onChange={(e) => setBuscarCurso(e.target.value)}
                                className={errorNumber === 18 ? "error-validation" : ""} 
                            />
                            {errorNumber === 18 ? <span className="text-error">{errorMessage}</span> : ""}
                        </Col>
                        <Col>
                            <Button type="sumbit" color="primary" onClick={e => requestSearchCurso(e)}>Buscar</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Container className="px-6 mt-4">
                {
                    errorNumber === 17 || errorNumber === 19 ?
                        <h2 className="text-center" style={{ marginTop: "60px" }}>{errorMessage}</h2>
                        :
                        <Table striped responsive hover>
                            <thead>
                                <tr>
                                    <th>Año</th>
                                    <th>División</th>
                                    <th>Turno</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cursos.map(value => (
                                        <tr key={value.idCurso} className="cursor-pointer">
                                            <td>{value.anio}</td>
                                            <td>{value.division}</td>
                                            <td>{value.turno.nombre}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                }
            </Container> */}
        </>
    );
}