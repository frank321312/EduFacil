import { Col, Row } from "react-bootstrap";

export default function CardInfo({ text, color }) {
    return (
        <Row className="justify-center">
            <Col xs={5} sm={5} md={4} lg={3} xl={2} className=" bg-green-600 h-12 flex justify-center items-center fixed card-animation rounded-sm text-color-mode" style={{ backgroundColor: color }}>
                <span className="">{ text }</span>
            </Col>
        </Row>
    );
}