import { Form } from "react-bootstrap";
import ColForm from "../../components/ColForm";
import LayoutAuth from "./LayoutAuth";

export default function IniciarSesion() {
    return (
        <LayoutAuth contenido={"Iniciar sesion"}>
            <h2 className="text-center mb-3">Inicie sesión</h2>
            <ColForm>
                <Form.Label>Nombre de usuario o email</Form.Label>
                <Form.Control type="text" />
            </ColForm>
            <ColForm>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" />
            </ColForm>
        </LayoutAuth>
    );
}