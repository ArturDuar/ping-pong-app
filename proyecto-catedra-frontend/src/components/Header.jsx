
import Link from "next/link";
import { useState } from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { Navbar, Nav, Container, NavDropdown, Dropdown} from "react-bootstrap";
import Image from "next/image";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  
    return (
        <div style={{height: "50px"}}>
            <Navbar variant="dark" expand="lg" className="header" >
                <Container>
                    <Navbar.Brand href="/dashboard">
                        <Image 
                        src="/img/logos/nombreSolo_blanco.png" 
                        alt="Logo Ping Pong"
                        width={200} 
                        height={30}
                        className="p-2 h-50"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto text-light">
                            <Nav.Link href="/dashboard/jugador" className="text-white">Jugadores</Nav.Link>
                            <Nav.Link href="/dashboard/torneo" className="text-white">Torneos</Nav.Link>
                            <Nav.Link href="" className="text-white">Estadisticas</Nav.Link>
                        </Nav>
                        <Nav className="">
                            <Dropdown align="end" className="custom-nav-dropdown p-0 border-0 w-100">
                                <Dropdown.Toggle variant="link" id="dropdown-custom-components p-0">
                                    <Image 
                                    src="/img/icono.png" 
                                    alt="Avatar" 
                                    width={30} 
                                    height={30} 
                                    className="rounded-circle" 
                                    />
                                    <span className="ms-2 text-white">Usuario</span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/profile" className="text-white">Ver Perfil</Dropdown.Item>
                                    <Dropdown.Item href="/logout" className="text-white">Cerrar sesión</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>  
    );
  };

export default Header;