import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome, AiOutlineUser, AiOutlineSetting, AiOutlineStock, AiFillFileText } from 'react-icons/ai';
import { Navbar, Nav, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdOutlineWarehouse } from 'react-icons/md';
import { auth } from '../firebase';
import { TbTruck } from 'react-icons/tb';

export function NavbarMenu() {

    const handleLogout = () => {
        try {
            auth.signOut();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={NavLink} to="/" className="m-auto d-flex align-items-center">
                <TbTruck style={{ fontSize: '1.5em' }} className="ms-2" />
                <span className="ms-2">Warehouse2650</span>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto ms-3">
                    <Nav.Item className="me-3">
                        <Nav.Link as={NavLink} exact to="/">
                            <AiOutlineHome />
                            <span className="ms-2">Home</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="me-3">
                        <Nav.Link as={NavLink} to="/dodavatele">
                            <AiOutlineUser />
                            <span className="ms-2">Dodavatelé</span>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="me-3">
                        <Nav.Link as={NavLink} to="/sklad">
                            <MdOutlineWarehouse />
                            <span className="ms-2">Sklad</span>
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item className="me-3">
                        <Nav.Link as={NavLink} to="/fixace">
                            <AiOutlineStock />
                            <span className="ms-2">Fixace</span>
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item className="me-3">
                        <Nav.Link as={NavLink} to="/kontrakty">
                            <AiFillFileText />
                            <span className="ms-2">Kontrakty</span>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                <Nav className="me-3">
                    <DropdownButton
                        as={Nav.Item}
                        title={
                            <>
                                <AiOutlineSetting />
                                <span className="ms-2">Nastavení</span>
                            </>
                        }
                        id="light-nav-dropdown"
                        className="me-3">

                        <Dropdown.Item as={NavLink} to="/profil">
                            Můj profil
                        </Dropdown.Item>

                        <Dropdown.Item as={NavLink} to="/slitiny">
                            Slitiny
                        </Dropdown.Item>

                        <Dropdown.Item as={NavLink} to="/fixace">
                            Nákupní fixace
                        </Dropdown.Item>

                        <Dropdown.Item as={NavLink} to="/users">
                            Uživatelé
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as={NavLink} to="/login">
                            <Button variant={"danger"} onClick={handleLogout}>
                            Odhlásit se
                            </Button>
                        </Dropdown.Item>
                    </DropdownButton>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
