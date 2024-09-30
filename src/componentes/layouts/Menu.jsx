import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import { Image } from 'react-bootstrap';
import logoTrab from '../../assets/images/logoTrab.webp';

export default function Menu(props) {

    function handleLogout() {
        if (window.confirm("Deseja realmente sair da aplicação?")) {
            window.location.href = "https://www.google.com";
        };
    }

    //método render
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/" as={Link} to="/">Menu</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home"></Nav.Link>
                            <Nav.Link href="#link"></Nav.Link>
                            <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#" as={Link} to="/cliente">Clientes</NavDropdown.Item>
                                <NavDropdown.Item href="#" as={Link} to="/fornecedor">Fornecedores</NavDropdown.Item>
                                <NavDropdown.Item href="#" as={Link} to="/produto">Produtos</NavDropdown.Item>
                                <NavDropdown.Item href="#" as={Link} to="/categoria">Categorias</NavDropdown.Item>
                                <NavDropdown.Item href="#" as={Link} to="/usuario">Usuários</NavDropdown.Item>
                                <NavDropdown.Item href="#" as={Link} to="/entregador">Entregadores</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Operações" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Compra</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.1">Venda</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Relatórios" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Clientes</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.1">Fornecedores</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.1">Estoque</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.1">Vendas</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.1">Compras</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>
                            <Nav.Link onClick={handleLogout} href="#link">Sair</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1663970206579-c157cba7edda?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFwZWwlMjBkZSUyMHBhcmVkZSUyMHBhcmElMjBwY3xlbnwwfHwwfHx8MA%3D%3D')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '65vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                overflow: 'hidden',  // Adicionar para evitar barra de rolagem
            }}>
                <div>
                    <Image
                        width={450}
                        height={400}
                        src={logoTrab}
                        alt="logo da empresa"
                        style={{ maxWidth: '100%', height: 'auto' }}  // Tornando a imagem responsiva
                    />
                </div>
            </div>
        </>
    );
}
