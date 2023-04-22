import { useState, useEffect } from "react";
import { Button, Modal, Form, InputGroup, Row, Col } from "react-bootstrap";
import {
    BsSave,
    BsCalendar,
    BsPerson,
    BsCardList,
} from "react-icons/bs";
import { BiCustomize } from "react-icons/bi";
import { GiMetalBar } from "react-icons/gi";
import { GoPackage } from "react-icons/go";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import {PrijemFormular} from "./PrijemFormular";

export function SkladPrijem() {
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
            vaznyList: vaznyList,
            dodavatel: dodavatel,
            druhSlitina: druhSlitina,
            typSrotu: selectedTypSrotu,
            mnozstvi: mnozstvi,
            baleni: baleni,
        };
        await addDoc(zaznamPrijem, newPrijem);

        const querySnapshotZasoba = await getDocs(prijemZasoba);
        const zasobaData = querySnapshotZasoba.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        const foundZasoba = zasobaData.find(
            (item) =>
                item.druhSlitina === druhSlitina && item.typSrotu === selectedTypSrotu
        );

        if (foundZasoba) {
            const newMnozstvi = parseFloat(foundZasoba.mnozstvi) + parseFloat(mnozstvi);
            await updateDoc(doc(db, "skladZasoba", foundZasoba.id), {
                mnozstvi: newMnozstvi,
            });
        } else {
            await addDoc(prijemZasoba, {
                druhSlitina: druhSlitina,
                typSrotu: typSrotu,
                mnozstvi: mnozstvi,
                baleni: baleni,
            });
        }

        setDodavatel("");
        setMnozstvi("");
        setBaleni("");
        setDatum("");
        setVaznyList("");
        setDruhSlitina("");
        setSelectedTypSrotu([]);
        setShowModal(false);
    };

    return (
        <>
            <Button onClick={handleOpenModal}>Přidat záznam</Button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Přidat záznam</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PrijemFormular />
                </Modal.Body>
            </Modal>
        </>
);
}