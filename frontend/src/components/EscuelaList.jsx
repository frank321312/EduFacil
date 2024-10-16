import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function EscuelasList() {
    const [escuelas, setEscuelas] = useState([])

    useEffect(() => {
        async () => {
            const resEscuelas = await axios.get("http://localhost:6008/obtenerescuelas")
            setEscuelas(resEscuelas.data);
        }
    }, [])

    return (
        <Table striped bordered hover>
            <thead>
                {
                    escuelas.map(value => (
                        <>
                            <tr>{value.nombre}</tr>
                            <tr>{value.direccion}</tr>
                            <tr>{value.email}</tr>
                        </>
                        // <tr>{ value.nombre }</tr>
                    ))
                }
            </thead>
        </Table>
    );
}