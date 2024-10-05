import { Col } from "react-bootstrap";

export default function ColForm({ children }) {
    return (
        <Col xxl={12} lg={12} xs={10}>
            { children }
        </Col>
    );
}