import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from "react-router-dom";
import './auth.css';
import LayoutAuth from "./LayoutAuth";
import ColForm from "../../components/ColForm";
import { useEffect } from 'react';

export default function Registro() {
    const location = useLocation()
    const navigate = useNavigate()
    const { idRol } = location.state || {}
    
    useEffect(() => {
        if (idRol === undefined) {
            navigate("/");
        }
    }, [])

    return (
        <>
            <LayoutAuth contenido={"Siguiente"}>
                <h2 className='text-center mb-4'>1. Ingrese sus datos</h2>
                <ColForm>
                    <Form.Label htmlFor="nombre-usuario">Nombre de usuario</Form.Label>
                    <Form.Control type="text" id="nombre-usuario" />
                </ColForm>
                <ColForm>
                    <Form.Label htmlFor="nombre">Nombre</Form.Label>
                    <Form.Control type="text" id="nombre" />
                </ColForm>
                <ColForm>
                    <Form.Label htmlFor="apellido">Apellido</Form.Label>
                    <Form.Control type="text" id="apellido" />
                </ColForm>
                <ColForm>
                    <Form.Label htmlFor="email">Correo electronico</Form.Label>
                    <Form.Control type="text" id="email" />
                </ColForm>
                <ColForm>
                    <Form.Label htmlFor="pass">Contraseña</Form.Label>
                    <Form.Control type="password" id="pass" />
                </ColForm>
            </LayoutAuth>

        </>
    );
}