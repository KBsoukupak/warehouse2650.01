import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import {
    Container,
    Form,
    Button,
    Card,
} from "react-bootstrap";

export function LoginPage() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();

    const handleChange = ({ target: { name, value } }) =>
        setUser({ ...user, [name]: value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(user.email, user.password);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            {error && <Alert message={error} />}
            <Card className="mt-5 shadow-lg">
                <Form onSubmit={handleSubmit}>
                    <Card.Header className="text-center" style={{ backgroundColor: "#0d6efd", color: "white" }}>
                        <Card.Title>Skladová evidence - šrotové hospodářství</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Emailová adresa</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Zadejte email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-muted">
                                Zadejte email, který vám byl při registraci přidělen.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Heslo</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Zadejte heslo"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-muted">
                                Zadejte heslo, které vám bylo při registraci přiděleno.
                            </Form.Text>
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-center" style={{ backgroundColor: "#ededed" }}>
                        <Button
                            variant="primary"
                            type="submit"
                            className="align-content-lg-between w-100"
                        >
                            Přihlásit se
                        </Button>
                    </Card.Footer>
                </Form>
                <Card.Footer className="text-center" style={{ backgroundColor: "#f8f9fa" }}>
                    <small>
                        Máte dotaz nebo potřebujete vytvořit profil? Kontaktujte nás na{" "}
                        <a href="mailto:info@example.com">info@example.com</a>.
                    </small>
                </Card.Footer>
            </Card>
        </Container>
    );
}