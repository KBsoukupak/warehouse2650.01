import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { BiUserPlus } from "react-icons/bi";
import { NavbarMenu } from "../../components/NavbarMenu";
import { DodavateleAddModal } from "./DodavateleAddModal";
import { useState } from "react";
import { DodavateleSeznam } from "./DodavateleSeznam";

export function DodavatelePage() {
    const [showDodavateleAddModal, setShowDodavateleAddModal] = useState(false);
    const handleDodavateleAddModalClose = () => setShowDodavateleAddModal(false);
    const handleDodavateleAddModalShow = () => setShowDodavateleAddModal(true);

    return (
        <>
            <NavbarMenu />
            <Card className="shadow w-75 m-auto mt-3">
                <Card.Header className="bg-primary text-white border-0 py-3">
                    <Container fluid>
                        <Row className="align-items-center">
                            <Col>
                                <Card.Title className="fw-bold mb-0">
                                    Evidence dodavatelů
                                </Card.Title>
                            </Col>
                            <Col xs="auto">
                                <Button
                                    onClick={handleDodavateleAddModalShow}
                                    variant="outline-light"
                                >
                                    <BiUserPlus className="me-2" />
                                    Přidat dodavatele
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Card.Header>
                <Card.Body>
                    <DodavateleSeznam />
                </Card.Body>
                <DodavateleAddModal
                    show={showDodavateleAddModal}
                    onHide={handleDodavateleAddModalClose}
                />
            </Card>
        </>
    );
}
