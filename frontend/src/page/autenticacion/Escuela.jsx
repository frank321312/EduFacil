import ColForm from "../../components/ColForm";
import LayoutAuth from "./LayoutAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';

export default function RegistroEscuela() {
    const navigate = useNavigate()
    const location = useLocation()
    const { idRol } = location.state || {}

    return (
        <LayoutAuth contenido={"Siguiente"} onNext={() => navigate("/autenticacion/registro", { state: { idRol } })}>
            <h2 className='text-center mb-4'>1. Ingrese los datos de la escuela</h2>
            <ColForm>
                <Form.Label htmlFor="nombre">Nombre</Form.Label>
                <Form.Control type="text" id="nombre" />
            </ColForm>
            <ColForm>
                <Form.Label htmlFor="email">Correo electronico</Form.Label>
                <Form.Control type="text" id="email" />
            </ColForm>
            <ColForm>
                <Form.Label htmlFor="direccion">Dirección</Form.Label>
                <Form.Control type="text" id="direccion" />
            </ColForm>
            <ColForm>
                <Form.Label htmlFor="telefono">Telefono</Form.Label>
                <Form.Control type="number" id="telefono" />
            </ColForm>
        </LayoutAuth>
    );
}