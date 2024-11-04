import { Col, Container, Row } from "react-bootstrap";
import "./styles/escuela.css";
import { useNavigate } from "react-router-dom";
import EscuelaData from "./EscuelaData";

export default function EscuelasList({ listSchool }) {
    const navigate = useNavigate()

    const handleViewSchool = (escuela) => {
        navigate("/escuela/cursos", { state: escuela })
    }
    
    return (
        <>
            {
                listSchool.length === 0 ?
                    <Container fluid className="mt-14 flex justify-center">
                        <h1 className="text-center">Escuela no encontrada</h1>
                    </Container>
                    :
                    listSchool.map(value => (
                        <Container fluid key={value.idEscuela} className="opcion-animation container-schoo" onClick={() => handleViewSchool(value)}>
                            <EscuelaData escuela={value}/>
                        </Container>
                    ))
            }
        </>
    );
}