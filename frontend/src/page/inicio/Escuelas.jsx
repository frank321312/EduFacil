import { useEffect, useState } from "react";
import NavInicio from "../../components/NavInicio";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import EscuelasList from "../../components/EscuelaList";
import { useLocation, useSearchParams } from "react-router-dom";
import { url } from "../../functions/url";

export default function Escuelas() {
    const [escuelas, setEscuelas] = useState([])
    const location = useLocation()
    console.log(location)
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const busqueda = searchParams.get("busqueda")
        if (busqueda != null) {
            axios.get(`${url}/api/escuela?nombre=${busqueda}`).then(
                res => { setEscuelas(res.data);}
            ).catch(err => console.log(err))
        } else {
            axios.get(`${url}/api/obtenerescuelas`).then(
                res => { setEscuelas(res.data) }
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