import React, { useState, useEffect } from 'react';
import {
    Button,
    Card,
    Container,
    Form,
    FormControl,
    Col,
    Row,
    InputGroup,
} from 'react-bootstrap';
import { MdLocalShipping } from 'react-icons/md';
import { BsCalendar, BsFillPersonLinesFill, BsBoxArrowInUp, BsHash, BsCurrencyDollar } from 'react-icons/bs';
import { FaIndustry, FaCogs } from 'react-icons/fa';
import { db } from '../../firebase';
import { collection, getDocs, getDoc, setDoc, doc } from 'firebase/firestore';
import {NavbarMenu} from "../../components/NavbarMenu";


export function FixacePage() {
    const [date, setDate] = useState('');
    const [fixationId, setFixationId] = useState('');
    const [supplier, setSupplier] = useState('');
    const [alloy, setAlloy] = useState('');
    const [scrapType, setScrapType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [currency, setCurrency] = useState('');
    const [priceMTX, setPriceMTX] = useState('');
    const [pricePCI, setPricePCI] = useState('');

    const [suppliers, setSuppliers] = useState([]);
    const [alloys, setAlloys] = useState([]);
    const [scrapTypes, setScrapTypes] = useState([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            const supplierDocs = await getDocs(collection(db, 'dodavatele'));
            setSuppliers(supplierDocs.docs.map((doc) => doc.data().dodavatel));
        };

        const fetchAlloysAndScrapTypes = async () => {
            const slitinyDoc = await getDoc(doc(db, 'ciselniky', 'slitiny'));
            setAlloys(slitinyDoc.data().slitina);
            setScrapTypes(slitinyDoc.data().typSrotu);
        };

        fetchSuppliers();
        fetchAlloysAndScrapTypes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fixaceRef = doc(collection(db, 'fixace'));

        await setDoc(fixaceRef, {
            datumFixace: date,
            idFixace: fixationId,
            dodavatel: supplier,
            slitina: alloy,
            druhSrotu: scrapType,
            mnozstvi: quantity,
            idMena: currency,
            cenaMTX: priceMTX,
            cenaPCI: pricePCI,
        });
    };

    return (
        <>
            <NavbarMenu />
        <Container className="my-5">
            <Card>
                <Card.Header>
                    <h3>Formulář</h3>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="date">
                                <Form.Label>
                                    <BsCalendar /> Datum fixace
                                </Form.Label>
                                <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="fixationId">
                                <Form.Label>
                                    <BsHash /> ID fixace
                                </Form.Label>
                                <Form.Control type="text" value={fixationId} onChange={(e) => setFixationId(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="supplier">
                                <Form.Label>
                                    <BsFillPersonLinesFill /> Název dodavatele
                                </Form.Label>
                                <Form.Select value={supplier} onChange={(e) => setSupplier(e.target.value)}>
                                    <option disabled selected value="">
                                        Vyberte dodavatele
                                    </option>
                                    {suppliers.map((supplier, index) => (
                                        <option key={index} value={supplier}>
                                            {supplier}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} controlId="alloy">
                                <Form.Label>
                                    <FaCogs /> Slitina
                                </Form.Label>
                                <Form.Select value={alloy} onChange={(e) => setAlloy(e.target.value)}>
                                    <option disabled selected value="">
                                        Vyberte slitinu
                                    </option>
                                    {alloys.map((alloy, index) => (
                                        <option key={index} value={alloy}>
                                            {alloy}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="scrapType">
                                <Form.Label>
                                    <FaIndustry /> Druh šrotu
                                </Form.Label>
                                <Form.Select value={scrapType} onChange={(e) => setScrapType(e.target.value)}>
                                    <option disabled selected value="">
                                        Vyberte druh šrotu
                                    </option>
                                    {scrapTypes.map((scrapType, index) => (
                                        <option key={index} value={scrapType}>
                                            {scrapType}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} controlId="quantity">
                                <Form.Label>
                                    <BsBoxArrowInUp /> Množství
                                </Form.Label>
                                <InputGroup>
                                    <FormControl type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                    <InputGroup.Text>
                                        <MdLocalShipping /> KG
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="currency">
                                <Form.Label>
                                    <BsCurrencyDollar /> ID měny
                                </Form.Label>
                                <Form.Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                                    <option disabled selected
                                            value="">
                                        Vyberte měnu
                                    </option>
                                    <option value="EUR">EUR</option>
                                    <option value="CZK">CZK</option>
                                    <option value="USD">USD</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} controlId="priceMTX">
                                <Form.Label>
                                    <BsCurrencyDollar /> Cena MTX
                                </Form.Label>
                                <Form.Control type="number" value={priceMTX} onChange={(e) => setPriceMTX(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="pricePCI">
                                <Form.Label>
                                    <BsCurrencyDollar /> Cena PCI
                                </Form.Label>
                                <Form.Control type="number" value={pricePCI} onChange={(e) => setPricePCI(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Button variant="primary" type="submit">
                            Odeslat
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        </>
    );
}
