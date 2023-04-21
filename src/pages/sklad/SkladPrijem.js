import { useState } from "react";
import {
    Button,
    Modal,
    Form,
    InputGroup,
    Row,
    Col,
} from "react-bootstrap";
import {
    BsSave,
    BsCalendar,
    BsPerson,
    BsFillPersonLinesFill,
    BsInfoCircle,
} from "react-icons/bs";

export function SkladPrijem() {
    const [showModal, setShowModal] = useState(false);
    const [datum, setDatum] = useState("");
    const [vaznyList, setVaznyList] = useState(0);
    const [dodavatel, setDodavatel] = useState("");
    const [druhSrotu, setDruhSrotu] = useState("");
    const [mnozstvi, setMnozstvi] = useState(0);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // uložení dat do databáze Firestore
        handleCloseModal();
    };

    return (
        <>
            <Button
                variant="primary"
                onClick={handleOpenModal}
                className="mb-3"
            >
                <BsSave className="me-2" /> Přidat příjem
            </Button>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Přidat příjem materiálu na sklad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>

                        {/* Pole pro zadání data */}
                        <Form.Group className="mb-3">
                            <InputGroup>
                                <InputGroup.Text><BsCalendar /></InputGroup.Text>
                                <Form.Control
                                    type="date"
                                    value={datum}
                                    onChange={(e) => setDatum(e.target.value)}
                                    required
                                    placeholder="Datum"
                                />
                            </InputGroup>
                        </Form.Group>

                        {/* Pole pro zadání vážného listu */}
                        <Form.Group className="mb-3">
                            <InputGroup>
                                <InputGroup.Text><BsInfoCircle /></InputGroup.Text>
                                <Form.Control
                                    type="number"
                                    value={vaznyList}
                                    onChange={(e) => setVaznyList(e.target.value)}
                                    required
                                    placeholder="Vážný list"
                                />
                            </InputGroup>
                        </Form.Group>

                        {/* Pole pro zadání dodavatele */}
                        <Form.Group className="mb-3">
                            <InputGroup>
                                <InputGroup.Text><BsPerson /></InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    value={dodavatel}
                                    onChange={(e) => setDodavatel(e.target.value)}
                                    required
                                    placeholder="Dodavatel"
                                />
                            </InputGroup>
                        </Form.Group>

                        {/* Pole pro zadání druhu šrotu */}
                        <Form.Group className="mb-3">
                            <InputGroup>
                                <InputGroup.Text><BsFillPersonLinesFill /></InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    value={druhSrotu}
                                    onChange={(e) => setDruhSrotu(e.target.value)}
                                    required
                                    placeholder="Druh šrotu"
                                />
                            </InputGroup>
                        </Form.Group>

                        {/* Pole pro zadání množství */}
                        <Form.Group className="mb-3">
                            <InputGroup>
                                <InputGroup.Text><BsInfoCircle /></InputGroup.Text>
                                <Form.Control
                                    type="number"
                                    value={mnozstvi}
                                    onChange={(e) => setMnozstvi(e.target.value)}
                                    required
                                    placeholder="Množství"
                                />
                            </InputGroup>
                        </Form.Group>

                        {/* Tlačítka pro odeslání a zavření modálního okna */}
                        <Row className="justify-content-end">
                            <Col xs={12} sm={6} className="mb-2 mb-sm-0">
                                <Button
                                    variant="secondary"
                                    onClick={handleCloseModal}
                                    className="w-100"
                                >
                                    Zavřít
                                </Button>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-100"
                                >
                                    Uložit
                                </Button>
                            </Col>
                        </Row>

                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}