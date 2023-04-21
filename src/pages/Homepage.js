import {useAuth} from "../context/authContext";
import {Navigate} from "react-router-dom";
import {Alert, Button, Card, Container} from "react-bootstrap";
import {auth} from "../firebase";
import {NavbarMenu} from "../components/NavbarMenu";

export function Homepage() {
    const {user, loading} = useAuth();
    console.log(user);

    const handleLogout = () => {
        try {
            auth.signOut();
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) return <Alert variant={"primary"} className="m-auto text-center">Loading, wait please...</Alert>;

    return (
        <>
            <NavbarMenu />
                <Card className="mt-3 w-75 m-auto">
                    <Card.Header>
                        <Card.Title>Vítejte {user.displayName || user.email}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Tohle je stránka pro přihlášené uživatele.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={handleLogout} variant={'danger'}>Odhlásit se</Button>
                    </Card.Footer>
                </Card>
        </>
    );
}