import { useEffect, useState } from "react";
import NavInicio from "../../components/NavInicio";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import EscuelasList from "../../components/EscuelaList";
import { useLocation, useSearchParams } from "react-router-dom";

export default function Escuelas() {
    const [escuelas, setEscuelas] = useState([])
    const location = useLocation()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const busqueda = searchParams.get("busqueda")
        if (busqueda != null) {
            axios.get(`http://localhost:6008/api/escuela?nombre=${busqueda}`).then(
                res => { setEscuelas(res.data);}
            ).catch(err => console.log(err))
        } else {
            axios.get("http://localhost:6008/api/obtenerescuelas").then(
                res => { setEscuelas(res.data); }
            ).catch(err => console.log(err))
        }
    }, [])

    return (
        <>
            <NavInicio isSearch={true} />
            {
                location.state !== null ?
                    <EscuelasList listSchool={location.state} />
                    :
                    <EscuelasList listSchool={escuelas} />
            }
        </>
    );
}