import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavBar() {
    return (
        <Navbar style={{padding: '10px'}} sticky="top" bg="light" data-bs-theme="light">
            <Navbar.Brand href="">SQLatch</Navbar.Brand>
            <Nav>
                <NavDropdown title="Αρχείο" id="basic-nav-dropdown">
                    <NavDropdown.Item href="">Αποθήκευση</NavDropdown.Item>
                    <NavDropdown.Item href="">Φόρτωση</NavDropdown.Item>
                    <NavDropdown.Item href="">Έξοδος</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="">Ρυθμίσεις</Nav.Link>
                <Nav.Link href="">Κοινοποίηση</Nav.Link>
            </Nav>
        </Navbar>
    )
}