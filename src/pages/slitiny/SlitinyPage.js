import { useState, useEffect } from "react";
import { SlitinySeznam } from "./SlitinySeznam";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { SlitinyAddModal } from "./SlitinyAddModal";
import { Card, Button } from "react-bootstrap";
import { NavbarMenu } from "../../components/NavbarMenu";
import { TbPencilPlus } from "react-icons/tb";

export function SlitinyPage() {
    const [slitiny, setSlitiny] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        const db = getFirestore();
        const unsubscribe = onSnapshot(collection(db, "slitiny"), (snapshot) => {
            const dataFromFirestore = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setSlitiny(dataFromFirestore);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            <NavbarMenu />
            <Card className="mt-4 mx-auto w-50 shadow">
                <Card.Header className="d-flex justify-content-between align-items-center bg-primary">
                    <Card.Title className="text-white fw-bold mb-0">
                        Seznam slitin
                    </Card.Title>
                    <Button variant="outline-light" onClick={handleShow}>
                        <TbPencilPlus className="me-2" />
                        Přidat slitinu
                    </Button>
                </Card.Header>
                <Card.Body>
                    <SlitinyAddModal show={showModal} handleClose={handleClose} />
                    <SlitinySeznam data={slitiny} />
                </Card.Body>
            </Card>
        </>
    );
}
