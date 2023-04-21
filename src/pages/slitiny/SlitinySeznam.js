import React from "react";
import { Button, ListGroup, Card, Row, Col } from "react-bootstrap";

export const SlitinySeznam = ({ data }) => {
    return (
        <ListGroup className="mt-3">
            {data.map((item, index) => (
                <ListGroup.Item key={index}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Row>
                                <Col xs={8} md={9}>
                                    <Card.Title>
                                        <strong>Druh kovu:</strong> {item.druhKovu}
                                    </Card.Title>
                                    <Card.Subtitle className="mb-2">
                                        <strong>Typ šrotu:</strong> {item.typSrotu}
                                    </Card.Subtitle>
                                    <Card.Text>
                                        <strong>Kov:</strong>{" "}
                                        {item.mosaz ? "Mosaz" : item.med ? "Měď" : "Ne"}
                                    </Card.Text>
                                </Col>
                                <Col xs={4} md={3} className="d-flex align-items-center">
                                    <Button variant="danger" size="sm" className="ms-auto">
                                        Odstranit
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};
