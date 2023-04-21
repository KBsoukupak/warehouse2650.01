import { useEffect, useState } from "react";
import {
    Accordion,
    Button,
    Card,
    Form,
    InputGroup,
    Row,
    Col,
} from "react-bootstrap";
import { db } from "../../firebase";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { DodavateleEditModal } from "./DodavateleEditModal";
import { MdPersonSearch } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";

function InfoDodavatel({ supplier, onEdit, onDelete }) {
    return (
        <Accordion.Item key={supplier.id} eventKey={supplier.id}>
            <Accordion.Header className="">
                <span className="fw-bold">{supplier.dodavatel}</span>
            </Accordion.Header>
            <Accordion.Body>
                <Card className={"m-auto"}>
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <p>
                                    <strong>Adresa:</strong> {supplier.adresa}
                                </p>
                                <p>
                                    <strong>Telefon:</strong> {supplier.telefon}
                                </p>
                                <p>
                                    <strong>Email:</strong> {supplier.email}
                                </p>
                            </Col>
                            <Col md={6}>
                                <p>
                                    <strong>Kontakt:</strong> {supplier.kontakt}
                                </p>
                                <p>
                                    <strong>IČO:</strong> {supplier.ico}
                                </p>
                                <p>
                                    <strong>DIČ:</strong> {supplier.dic}
                                </p>
                                <p>
                                    <strong>Splatnost:</strong> {supplier.splatnost} dní
                                </p>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className={"text-center"}>
                        <Button
                            variant="primary"
                            className={"my-1 me-2"}
                            onClick={() => onEdit(supplier)}
                        >
                            <FaEdit /> Upravit
                        </Button>
                        <Button
                            variant="danger"
                            className={"my-1 mx-2"}
                            onClick={() => onDelete(supplier)}
                        >
                            <FaTrash /> Smazat
                        </Button>
                    </Card.Footer>
                </Card>
            </Accordion.Body>
        </Accordion.Item>
    );
}


export function DodavateleSeznam() {
    const [showModal, setShowModal] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [dodavatele, setDodavatele] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

     useEffect(() => {
         const unsubscribe = onSnapshot(collection(db, "dodavatele"), (snapshot) => {
             const fetchedDodavatele = snapshot.docs.map((doc) => ({
                 id: doc.id,
                 ...doc.data(),
             }));
             setDodavatele(fetchedDodavatele);
             setLoading(false);
         });

         return () => {
             unsubscribe();
         };
        }, []);


    const handleDelete = async (supplier) => {
        if (window.confirm("Opravdu chcete odstranit tohoto dodavatele?")) {
            try {
                await deleteDoc(doc(db, "dodavatele", supplier.id));
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleEdit = (supplier) => {
        setSelectedSupplier(supplier);
        setShowModal(true);
    };

    const filteredDodavatele = dodavatele.filter((supplier) => {
        return (
            supplier.dodavatel &&
            supplier.dodavatel.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <Card className="m-2 border-dark text-black">
                <InputGroup size="lg">
                    <InputGroup.Text>
                        <MdPersonSearch />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Zde můžete vyhledat dodavatele, když zadáte název dodavatele..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="text-black border-start-0"
                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    />
                </InputGroup>
            </Card>

            <Card className="">
                <Accordion eventKey="0">
                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        filteredDodavatele.map((supplier) => (
                            <InfoDodavatel
                                key={supplier.id}
                                supplier={supplier}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />
                        ))
                    )}
                </Accordion>
                <DodavateleEditModal
                    supplier={selectedSupplier}
                    show={showModal}
                    onHide={() => setShowModal(false)}
                />
            </Card>
        </>
    );
}
