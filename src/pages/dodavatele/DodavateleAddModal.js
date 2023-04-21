import { useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

export function DodavateleAddModal({ show, onHide }) {
    const [newCompany, setNewCompany] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newName, setNewName] = useState("");
    const [newIcoNumber, setNewIcoNumber] = useState("");
    const [newDicNumber, setNewDicNumber] = useState("");
    const [newDuePayment, setNewDuePayment] = useState("");

    const handleDodavateleAddModalClose = () => {
        onHide();
    };

    const handleDodavateleAddModalSubmit = async (e) => {
        e.preventDefault();

        const supplierData = {
            dodavatel: newCompany,
            adresa: newAddress,
            telefon: newPhone,
            email: newEmail,
            kontakt: newName,
            ico: newIcoNumber,
            dic: newDicNumber,
            splatnost: newDuePayment
        };

        try {
            await addDoc(collection(db, "dodavatele"), supplierData);
            setNewCompany("");
            setNewAddress("");
            setNewPhone("");
            setNewEmail("");
            setNewName("");
            setNewIcoNumber("");
            setNewDicNumber("");
            setNewDuePayment("");
        } catch (error) {
            console.error("Error adding supplier: ", error);
        }
        handleDodavateleAddModalClose();
    };
    return (
        <>
            <Modal size={"lg"} show={show} onHide={handleDodavateleAddModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Zadat nového dodavatele</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formCompany">
                                    <Form.Label>Název společnosti</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="dodavatel"
                                        value={newCompany}
                                        onChange={(e) => setNewCompany(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formAddress">
                                    <Form.Label>Adresa</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="adresa"
                                        value={newAddress}
                                        onChange={(e) => setNewAddress(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formPhone">
                                    <Form.Label>Telefon</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="telefon"
                                        value={newPhone}
                                        onChange={(e) => setNewPhone(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Kontakt</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="kontakt"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Label>IČO</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="ico"
                                    value={newIcoNumber}
                                    onChange={(e) => setNewIcoNumber(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>DIČ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="dic"
                                        value={newDicNumber}
                                        onChange={(e) => setNewDicNumber(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formDuePayment">
                                    <Form.Label>Splatnost</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="splatnost"
                                        value={newDuePayment}
                                        onChange={(e) => setNewDuePayment(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDodavateleAddModalClose}>
                        Zavřít
                    </Button>
                    <Button variant="primary" onClick={handleDodavateleAddModalSubmit}>
                        Uložit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
