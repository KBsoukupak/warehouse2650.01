import React, { useState } from 'react';
import { collection, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { BsPencil, BsTrash, BsArrowRepeat, BsInfoCircle } from 'react-icons/bs';
import { Container, Col, Badge, Row, Table, Button, Modal } from 'react-bootstrap';

export function PrijemData({ data }) {
    const [selectedItem, setSelectedItem] = useState(null);

    // Funkce pro úpravu položky
    const handleEdit = (item) => {
        // implementace úpravy položky
    };

    // Funkce pro odpis položky
    const handleOdpis = (item) => {
        // implementace odpisu položky
    };

    // Funkce pro smazání položky
    const handleDelete = async (item) => {
        try {
            await deleteDoc(collection(db, 'skladPrijem', item.id));
            setSelectedItem(null);
        } catch (error) {
            console.log(error);
        }
    };

    // Funkce pro zavření dialogu
    const handleClose = () => setSelectedItem(null);

    // Funkce pro zobrazení detailu položky
    const handleShow = (item) => setSelectedItem(item);

    return (
        <>
            <Container className="mt-4">
                <Table responsive striped bordered hover>
                    <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Vážný list</th>
                        <th>Dodavatel</th>
                        <th>Druh slitiny</th>
                        <th>Typ šrotu</th>
                        <th>Množství</th>
                        <th>Balení</th>
                        <th>Možnosti</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data &&
                        data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.datum}</td>
                                <td>{item.vaznyList}</td>
                                <td>{item.dodavatel}</td>
                                <td>{item.druhSlitina}</td>
                                <td>{item.typSrotu}</td>
                                <td>{item.mnozstvi}</td>
                                <td>{item.baleni}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        className="mr-2"
                                        onClick={() => handleShow(item)}
                                    >
                                        <BsInfoCircle />
                                    </Button>
                                    <Button
                                        variant="warning"
                                        className="mr-2"
                                        onClick={() => handleEdit(item)}
                                    >
                                        <BsPencil />
                                    </Button>
                                    <Button
                                        variant="info"
                                        className="mr-2"
                                        onClick={() => handleOdpis(item)}
                                    >
                                        <BsArrowRepeat />
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(item)}
                                    >
                                        <BsTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            {/* Detail položky */}
            <Modal show={selectedItem} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detail položky</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={4}>
                            <h6>
                                <Badge variant="secondary">Datum</Badge>
                            </h6>
                        </Col>
                        <Col sm={8}>{selectedItem?.datum}</Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <h6>
                                <Badge variant="secondary">Vážný list</Badge>
                            </h6>
                        </Col>
                        <Col sm={8}>{selectedItem?.vaznyList}</Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <h6>
                                <Badge variant="secondary">Dodavatel</Badge>
                            </h6>
                        </Col>
                        <Col sm={8}>{selectedItem?.dodavatel}</Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <h6>
                                <Badge variant="secondary">Druh slitiny</Badge>
                            </h6>
                        </Col>
                        <Col sm={8}>{selectedItem?.druhSlitina}</Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <h6>
                                <Badge variant="secondary">Typ šrotu</Badge>
                            </h6>
                        </Col>
                        <Col sm={8}>{selectedItem?.typSrotu}</Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <h6>
                                <Badge variant="secondary">Množství</Badge>
                            </h6>
                        </Col>
                        <Col sm={8}>{selectedItem?.mnozstvi}</Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <h6>
                                <Badge variant="secondary">Balení</Badge>
                            </h6>
                        </Col>
                        <Col sm={8}>{selectedItem?.baleni}</Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Zavřít
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}