import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {AiOutlinePlus} from "react-icons/ai";

export function SlitinyAddModal({ show, handleClose }) {
    const [druhKovu, setDruhKovu] = useState("");
    const [typSrotu, setTypSrotu] = useState("");
    const [mosaz, setMosaz] = useState(false);
    const [med, setMed] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const db = getFirestore();
        await addDoc(collection(db, "slitiny"), {
            druhKovu,
            typSrotu,
            mosaz,
            med,
        });
        setDruhKovu("");
        setTypSrotu("");
        setMosaz(false);
        setMed(false);
        handleClose();
    };

     return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Přidat slitinu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className="text-left">
                    <Form.Group controlId="formDruhKovu">
                        <Form.Label>
                            <strong>Druh kovu</strong>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Zadejte druh kovu"
                            value={druhKovu}
                            onChange={(e) => setDruhKovu(e.target.value)}
                            className="rounded shadow-sm"
                        />
                    </Form.Group>

                    <Form.Group controlId="formTypSrotu" className="mt-3">
                        <Form.Label>
                            <strong>Typ šrotu</strong>
                        </Form.Label>
                        <Form.Control
                            as="select"
                            value={typSrotu}
                            onChange={(e) => setTypSrotu(e.target.value)}
                            className="rounded shadow-sm"
                        >
                            <option value="">Vyberte typ šrotu</option>
                            <option value="kusový">Kusový</option>
                            <option value="drobný">Drobný</option>
                            <option value="třísky">Třísky</option>
                            <option value="granulat">Granulát</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>
                            <strong>Kov</strong>
                        </Form.Label>
                        <div>
                            <Form.Check
                                type="checkbox"
                                label="Mosaz"
                                checked={mosaz}
                                onChange={(e) => setMosaz(e.target.checked)}
                                className="mt-2"
                            />
                            <Form.Check
                                type="checkbox"
                                label="Měď"
                                checked={med}
                                onChange={(e) => setMed(e.target.checked)}
                                className="mt-2"
                            />
                        </div>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3 shadow-sm">
                        <AiOutlinePlus size="1.2em" className="align-text-bottom" /> Přidat
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
