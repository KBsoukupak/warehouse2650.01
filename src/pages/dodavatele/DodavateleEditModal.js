import { useState, useEffect } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const DodavateleEditModal = ({ show, onHide, supplier }) => {
    const [editedSupplier, setEditedSupplier] = useState(null);

    useEffect(() => {
        if (supplier) {
            setEditedSupplier(supplier);
        } else {
            setEditedSupplier(null);
        }
    }, [supplier]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setEditedSupplier((prevSupplier) => {
            if (name === "splatnost" && value === "") {
                return {
                    ...prevSupplier,
                    [name]: ""
                };
            }
            return {
                ...prevSupplier,
                [name]: value
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            editedSupplier.dodavatel &&
            editedSupplier.adresa &&
            editedSupplier.telefon &&
            editedSupplier.email &&
            editedSupplier.kontakt &&
            editedSupplier.ico &&
            editedSupplier.dic &&
            editedSupplier.splatnost
        ) {
            updateDoc(
                doc(collection(db, "dodavatele"), editedSupplier.id),
                editedSupplier
            )
                .then(() => {
                    onHide(); // Zde přidáváme zavření modálního okna
                })
                .catch((error) => {
                    console.error("Error updating supplier: ", error);
                });
        } else if (
            !editedSupplier.dodavatel &&
            !editedSupplier.adresa &&
            !editedSupplier.telefon &&
            !editedSupplier.email &&
            !editedSupplier.kontakt &&
            !editedSupplier.ico &&
            !editedSupplier.dic &&
            !editedSupplier.splatnost
        ) {
            onHide(); // Zde také přidáváme zavření modálního okna
        } else {
            setEditedSupplier({
                ...editedSupplier,
                dodavatel: "",
                adresa: "",
                telefon: "",
                email: "",
                kontakt: "",
                ico: "",
                dic: "",
                splatnost: ""
            });
        }
    };

    if (!editedSupplier) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Upravit dodavatele</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formCompany">
                                <Form.Label>Název společnosti</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="dodavatel"
                                    value={editedSupplier.dodavatel || ""}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formAdress">
                                <Form.Label>Adresa</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="adresa"
                                    value={editedSupplier.adresa || ""}
                                    onChange={handleInputChange}
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
                                    value={editedSupplier.telefon || ""}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={editedSupplier.email || ""}
                                    onChange={handleInputChange}
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
                                    value={editedSupplier.kontakt || ""}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formIcoNumber">
                                <Form.Label>IČO</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="ico"
                                    value={editedSupplier.ico || ""}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formDicNumber">
                                <Form.Label>DIČ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="dic"
                                    value={editedSupplier.dic || ""}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBankAccount">
                                <Form.Label>Splatnost</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="splatnost"
                                    value={editedSupplier.splatnost || ""}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col></Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Zavřít
                    </Button>
                    <Button variant="primary" type="submit">
                        Uložit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
