import { Container } from "react-bootstrap";
import Footer from "./Footer";
import NavInicio from "./NavInicio";

export default function NotFound() {
    return (
        <>
            <Container fluid className="px-0 flex flex-col justify-between" style={{ height: "95vh" }}>
                <NavInicio isSearch={false} />
                <Container className="mt-20">
                    <h1 className="text-center">Pagina no encontrada</h1>
                </Container>
                <Footer/>
            </Container>
        </>
    );
}