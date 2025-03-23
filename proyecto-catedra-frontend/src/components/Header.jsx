"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { Navbar, Nav, Container,Dropdown} from "react-bootstrap";
import Image from "next/image";
import { logout } from "@/service/LoginService";
import { useRouter } from "next/navigation";

const Header = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem("user");
        setUser(user);
    }, []);

    const handleLogout = async( e) => {
        e.preventDefault();
        await logout();
        router.push("/");
    }

    const handleChangeScreen = async(e, link) => {
        e.preventDefault();       
        router.push(link);
    }

    return (
        <div style={{height: "50px"}}>
            <Navbar variant="dark" expand="lg" className="header" collapseOnSelect>
                <Container>
                    <Navbar.Brand>
                        <Link href="/dashboard">
                            <Image 
                            src="/img/logos/nombreSolo_blanco.png" 
                            alt="Logo Ping Pong"
                            width={200} 
                            height={30}
                            className="p-2 h-50"
                            />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto text-light">
                            <Nav.Link href="/dashboard/jugador" className="text-white" onClick={(e) => handleChangeScreen(e, '/dashboard/jugador')}>Jugadores</Nav.Link>
                            <Nav.Link href="/dashboard/torneo" className="text-white" onClick={ (e) => handleChangeScreen(e, '/dashboard/torneo')}>Torneos</Nav.Link>
                            <Nav.Link href="" className="text-white" >Estadisticas</Nav.Link>
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
                                    <span className="ms-2 text-white">{user}</span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item className="text-white">Ver Perfil</Dropdown.Item>
                                    <Dropdown.Item className="text-white" onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
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