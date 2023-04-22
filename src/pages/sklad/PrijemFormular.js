import React, {useEffect, useState} from "react";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {BsCalendar, BsCardList, BsPerson, BsSave} from "react-icons/bs";
import {GiMetalBar} from "react-icons/gi";
import {BiCustomize} from "react-icons/bi";
import {GoPackage} from "react-icons/go";
import {getFirestore, collection, getDocs, addDoc, doc} from "firebase/firestore";



export const PrijemFormular = () => {
    const [slitiny, setSlitiny] = useState([]);
    const [dodavatele, setDodavatele] = useState([]);
    const [typSrotu, setTypSrotu] = useState([]);
    const [selectedTypSrotu, setSelectedTypSrotu] = useState([]);
    const [datum, setDatum] = useState("");
    const [dodavatel, setDodavatel] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [vaznyList, setVaznyList] = useState('');
    const [druhSlitina, setDruhSlitina] = useState('');
    const [mnozstvi, setMnozstvi] = useState('');
    const [baleni, setBaleni] = useState('');
    const [prijemId, setPrijemId] = useState('');
    const [prijem, setPrijem] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore();
            const slitinyData = collection(db, "slitiny");
            const querySnapshotSlitiny = await getDocs(slitinyData);
            const fetchedSlitiny = querySnapshotSlitiny.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const dodavateleData = collection(db, "dodavatele");
            const querySnapshotDodavatele = await getDocs(dodavateleData);
            const fetchedDodavatele = querySnapshotDodavatele.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            const uniqueTypSrotu = fetchedSlitiny.reduce((accumulator, current) => {
                if (!accumulator.find((item) => item.typSrotu === current.typSrotu)) {
                    accumulator.push(current);
                }
                return accumulator;
            }, []);

            setSlitiny(fetchedSlitiny);
            setDodavatele(fetchedDodavatele);
            setTypSrotu(uniqueTypSrotu);
        };
        fetchData([]);
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const db = getFirestore();
        const zaznamPrijem = collection(db, "skladPrijem");
        const prijemZasoba = collection(db, "skladZasoba");

        const newPrijem = {
            datum: datum,
            dodavatel: dodavatel,
            vaznyList: vaznyList,
            druhSlitina: druhSlitina,
            mnozstvi: mnozstvi,
            baleni: baleni,
        };

        const newPrijemZasoba = {
            druhSlitina: druhSlitina,
            mnozstvi: mnozstvi,
            baleni: baleni,
        };

        const docRef = await addDoc(zaznamPrijem, newPrijem);
        const docRefZasoba = await addDoc(prijemZasoba, newPrijemZasoba);

        setVaznyList("");
        setDruhSlitina("");
        setMnozstvi("");
        setBaleni("");
        setDatum("");
        setDodavatel("");

        setShowModal(false);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="datum">
                <Form.Label>Datum</Form.Label>
                <InputGroup>
                    <InputGroup.Text>
                        <BsCalendar />
                    </InputGroup.Text>
                    <Form.Control
                        type="date"
                        value={datum}
                        onChange={(e) => setDatum(e.target.value)}
                        required
                    />
                </InputGroup>
            </Form.Group>
            <Form.Group controlId="vaznyList">
                <Form.Label>Vážní list</Form.Label>
                <InputGroup>
                    <InputGroup.Text>
                        <BsSave />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        value={vaznyList}
                        onChange={(e) => setVaznyList(e.target.value)}
                        required
                    />
                </InputGroup>
            </Form.Group>
            <Form.Group controlId="dodavatel">
                <Form.Label>Dodavatel</Form.Label>
                <InputGroup>
                    <InputGroup.Text>
                        <BsPerson />
                    </InputGroup.Text>
                    <Form.Control
                        as="select"
                        value={dodavatel}
                        onChange={(e) => setDodavatel(e.target.value)}
                        required
                    >
                        <option value="">--Vyberte dodavatele--</option>
                        {dodavatele.map((dodavatel) => (
                            <option key={dodavatel.id} value={dodavatel.dodavatel}>
                                {dodavatel.dodavatel}
                            </option>
                        ))}
                    </Form.Control>
                </InputGroup>
            </Form.Group>

            <Form.Group controlId="druhSlitina">
                <Form.Label>Druh slitiny</Form.Label>
                <InputGroup>
                    <InputGroup.Text>
                        <GiMetalBar />
                    </InputGroup.Text>
                    <Form.Control
                        as="select"
                        value={druhSlitina}
                        onChange={(e) => setDruhSlitina(e.target.value)}
                        required
                    >
                        <option value="">--Vyberte druh slitiny--</option>
                        {slitiny.map((slitina) => (
                            <option key={slitina.id} value={slitina.druhKovu}>
                                {slitina.druhKovu}
                            </option>
                        ))}
                    </Form.Control>
                </InputGroup>
            </Form.Group>
            <Form.Group controlId="typSrotu">
                <Form.Label>Typ šrotu</Form.Label>
                <InputGroup>
                    <InputGroup.Text>
                        <BiCustomize />
                    </InputGroup.Text>
                    <Form.Control
                        as="select"
                        value={selectedTypSrotu}
                        onChange={(e) => setSelectedTypSrotu(e.target.value)}
                        required
                    >
                        <option value="">--Vyberte typ šrotu--</option>
                        {typSrotu.map((typ) => (
                            <option key={typ.id} value={typ.typSrotu}>
                                {typ.typSrotu}
                            </option>
                        ))}
                    </Form.Control>
                </InputGroup>
            </Form.Group>

            <Form.Group controlId="mnozstvi">
                <Form.Label>Množství</Form.Label>
                <InputGroup>
                    <InputGroup.Text>
                        <BsCardList />
                    </InputGroup.Text>
                    <Form.Control
                        type="number"
                        step="0.001"
                        min="0"
                        value={mnozstvi}
                        onChange={(e) => setMnozstvi(e.target.value)}
                        required
                    />
                </InputGroup>
            </Form.Group>
            <Form.Group controlId="baleni">
                <Form.Label>Balení</Form.Label>
                <InputGroup>
                    <InputGroup.Text>
                        <GoPackage />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        value={baleni}
                        onChange={(e) => setBaleni(e.target.value)}
                        required
                    />
                </InputGroup>
            </Form.Group>
            <Row className="mt-3">
                <Col>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Zrušit
                    </Button>
                </Col>
                <Col className="text-right">
                    <Button type="submit" variant="primary">
                        Přidat
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};
