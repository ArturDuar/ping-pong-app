import { Navbar, Nav, Container, Dropdown, Image, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as LoginService from "../services/LoginService";

const Header = () => {
    const [user, setUser] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setUser(localStorage.getItem("user"));
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        LoginService.logout();
    };

    return (
        <Navbar
            variant="dark"
            expand="lg"
            className="vw-100 navbar-color"
            collapseOnSelect
        >
            <Container>
                <Navbar.Brand>
                    <Link to={"/"}>
                        <Image
                            src="/img/logos/nombreSolo_blanco.png"
                            alt="Logo Ping Pong"
                            width={200}
                        />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="gap-lg-5 text-light text-start">
                        <NavDropdown
                            title="Jugadores"
                            id="nav-dropdown-jugadores"
                            className="text-white"
                        >
                            <NavDropdown.Item href="/jugadores">Ver todos</NavDropdown.Item>
                            <NavDropdown.Item href="/jugadores/crear-jugador">
                                Crear nuevo
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown
                            title="Torneos"
                            id="nav-dropdown-torneos"
                            className="text-white"
                        >
                            <NavDropdown.Item href="/torneos">Ver todos</NavDropdown.Item>
                            <NavDropdown.Item href="/torneos/crear-torneo">
                                Crear nuevo
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#" className="text-start">
                            Estadísticas
                        </Nav.Link>
                    </Nav>

                    <Nav className="ms-auto">
                        <Dropdown
                            align="end"
                            className="custom-nav-dropdown p-0 border-0 w-100"
                        >
                            <Dropdown.Toggle
                                id="dropdown-custom-components"
                                className="w-100 text-start"
                            >
                                <Image src="/img/icono.png" alt="Avatar" width={40} />
                                <span className="ms-2 text-white text-decoration-none">
                                    {user}
                                </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item
                                    className="text-white"
                                    onClick={() => navigate("/perfil")}
                                >
                                    Ver Perfil
                                </Dropdown.Item>
                                <Dropdown.Item className="text-white" onClick={handleLogout}>
                                    Cerrar sesión
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
