import ColForm from "../../components/ColForm";
import { Button, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import './auth.css';

export default function LayoutAuth({ children, contenido }) {
    return (
        <Container fluid className="flex justify-center items-center h-screen opcion-animation">
            <Form className="xl: w-[370px] formulario shadow-lg rounded-lg px-9 py-10">
                <Row className="justify-center">
                    { children }
                    <ColForm>
                        <Button color="primary" className="w-full mt-2">{ contenido }</Button>
                    </ColForm>
                </Row>
            </Form>
        </Container>
    );
}