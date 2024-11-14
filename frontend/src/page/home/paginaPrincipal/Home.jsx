import { useSelector } from "react-redux"
import InfoEscuela from "../../../components/InfoEscuela"
import { useEffect, useState } from "react"
import axios from "axios"
import InfoCurso from "../../../components/InfoCurso"
import { Container } from "react-bootstrap"
import LayoutHome from "../LayoutHome"
import { url } from "../../../functions/url"

export default function Home() {
    const usuario = useSelector(state => state.login)
    const [cursos, setCursos] = useState([])
    const [escuela, setEscuela] = useState({
        nombre: "",
        direccion: "",
        email: "",
        imgUrl: "",
        telefono: ""
    })
    useEffect(() => {
        if (usuario.idEscuela !== 0) {
            axios.get(`${url}/api/escuela/id/${usuario.idEscuela}`)
                .then(res => {
                    setEscuela(res.data)
                })
                .catch(err => {
                    console.log(err)
                })

            axios.get(`${url}/api/obtenercursos/${usuario.idEscuela}`).then(res => {
                setCursos(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [usuario.idEscuela])

    return (
        <LayoutHome>
            <div className="opcion-animation">
                <InfoEscuela escuela={escuela} />
                <Container className="container-responsive mt-10">
                    <h1>Cursos</h1>
                    <Container fluid className="border rounded-lg">
                        <InfoCurso cursos={cursos} />
                    </Container>
                </Container>
            </div>
        </LayoutHome>
    )
}