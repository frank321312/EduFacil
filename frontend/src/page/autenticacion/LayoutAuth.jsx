import ColForm from "../../components/ColForm";
import { Button, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import './auth.css';
import { Outlet } from "react-router-dom";

export default function LayoutAuth({ children, contenido, onNext }) {
    return (
        <Container fluid className="flex justify-center items-center h-screen opcion-animation">
            <Form noValidate className="xl: w-[370px] formulario shadow-lg rounded-lg px-9 py-10 form-mode-dark layout-auth">
                <Row className="justify-center">
                    { children }
                    <ColForm>
                        <Button color="primary" className="w-full mt-2 btn-dark-mode" onClick={onNext}>{ contenido }</Button>
                    </ColForm>
                </Row>
            </Form>
        </Container>
    );
}