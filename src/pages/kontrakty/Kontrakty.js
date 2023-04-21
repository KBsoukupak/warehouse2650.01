import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    pdf,
} from "@react-pdf/renderer";
import { Button, Card } from "react-bootstrap";
import { saveAs } from "file-saver";
import { NavbarMenu } from "../../components/NavbarMenu";
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Form } from "react-bootstrap";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#fff",
        padding: "1cm",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    content: {
        fontSize: 12,
        lineHeight: 1.5,
    },
});

export function Kontrakty() {
    const [dodavatel, setDodavatel] = useState("");
    const [druhKovu, setDruhKovu] = useState("");
    const [typSrotu, setTypSrotu] = useState("");
    const [dodavatele, setDodavatele] = useState([]);
    const [slitiny, setSlitiny] = useState({ druhyKovu: [], typySrotu: [] });

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore();
            const dodavateleSnapshot = await getDocs(collection(db, "dodavatele"));
            const slitinySnapshot = await getDocs(collection(db, "slitiny"));

            const fetchedDodavatele = dodavateleSnapshot.docs.map(
                (doc) => doc.data().dodavatel
            );
            const fetchedSlitiny = slitinySnapshot.docs.map((doc) => ({
                druhKovu: doc.data().druhKovu,
                typSrotu: doc.data().typSrotu,
            }));

            const uniqueDruhyKovu = Array.from(
                new Set(fetchedSlitiny.map((slitina) => slitina.druhKovu))
            );
            const uniqueTypySrotu = Array.from(
                new Set(fetchedSlitiny.map((slitina) => slitina.typSrotu))
            );

            setDodavatele([...new Set(fetchedDodavatele)]);
            setSlitiny({ druhyKovu: uniqueDruhyKovu, typySrotu: uniqueTypySrotu });
        };

        fetchData();
    }, []);

    const handleFormSubmit = () => {
        if (!dodavatel || !druhKovu || !typSrotu) {
            alert("Vyplňte prosím všechna pole.");
        } else {
            // Zde můžete zpracovat data z formuláře, například je uložit do databáze.
            alert(
                `Dodavatel: ${dodavatel}\nDruh kovu: ${druhKovu}\nTyp srotu: ${typSrotu}`
            );
        }
    };

    const handleDownloadPDF = async () => {
        const doc = (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View>
                        <Text style={styles.title}>Název smlouvy</Text>
                        <Text style={styles.content}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                            fringilla magna eget nisi sagittis, id elementum elit semper. Sed
                            pulvinar, dolor a blandit pharetra, mi eros pellentesque urna, et
                            rhoncus felis odio eu ipsum.
                        </Text>
                    </View>
                </Page>
            </Document>
        );

        const pdfBlob = await pdf(doc).toBlob();
        saveAs(pdfBlob, "contract.pdf");
    };

    return (
        <>
            <NavbarMenu />
            <Card className="mt-3 mx-3">
                <Card.Body>
                    <Card.Title>Vytvořte nový kontrakt a vygenerujte smlouvu</Card.Title>
                    <Card.Text>
                        Tato funkce ještě není implementována, ale bude možné zde vytvářet
                        PDF smlouvy.
                    </Card.Text>
                    <Form>
                        <Form.Group controlId="dodavatelSelect">
                            <Form.Label>Dodavatel</Form.Label>
                            <Form.Control
                                as="select"
                                value={dodavatel}
                                onChange={(e) => setDodavatel(e.target.value)}
                            >
                                <option value="">Vyberte dodavatele</option>
                                {dodavatele.map((dodavatel) => (
                                    <option key={dodavatel} value={dodavatel}>
                                        {dodavatel}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="druhKovuSelect">
                            <Form.Label>Druh kovu</Form.Label>
                            <Form.Control
                                as="select"
                                value={druhKovu}
                                onChange={(e) => setDruhKovu(e.target.value)}
                            >
                                <option value="">Vyberte druh kovu</option>
                                {slitiny.druhyKovu.map((druhKovu, index) => (
                                    <option key={index} value={druhKovu}>
                                        {druhKovu}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="typSrotuSelect">
                            <Form.Label>Typ srotu</Form.Label>
                            <Form.Control
                                as="select"
                                value={typSrotu}
                                onChange={(e) => setTypSrotu(e.target.value)}
                            >
                                <option value="">Vyberte typ srotu</option>
                                {slitiny.typySrotu.map((typSrotu, index) => (
                                    <option key={index} value={typSrotu}>
                                        {typSrotu}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary" onClick={handleFormSubmit}>
                        Zadat objednávku
                    </Button>
                    <Button variant="warning" onClick={handleDownloadPDF}>
                        Stáhnout PDF
                    </Button>
                </Card.Footer>
            </Card>
        </>
    );
}
