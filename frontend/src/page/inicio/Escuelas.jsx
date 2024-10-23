import { useEffect, useState } from "react";
import NavInicio from "../../components/NavInicio";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import EscuelasList from "../../components/EscuelaList";
import { useLocation } from "react-router-dom";

export default function Escuelas() {
    const [escuelas, setEscuelas] = useState([])
    const [listSchoolSearch, setListSchoolSearch] = useState([])
    const location = useLocation()

    useEffect(() => {
        axios.get("http://localhost:6008/api/obtenerescuelas").then(
            res => { setEscuelas(res.data); console.log(escuelas) }
        ).catch(err => console.log(err))

    }, [listSchoolSearch])

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