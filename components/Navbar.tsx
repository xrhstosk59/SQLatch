import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useBlockly } from '../modules/Blockly/Blockly';

export default function NavBar() {
    const useBL = useBlockly();

    const onClickSaveButton = () => {
        console.log('-- Navbar: Save init --');
        const json = useBL.getWorkspaceJSON();

        const link = document.createElement("a");
        link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
        link.download = "SQLatch-" + Date.now() + ".json";
        link.click();
    }

    return (
        <Navbar style={{ paddingLeft: 20 }} bg="dark">
            <Navbar.Brand href="">SQLatch</Navbar.Brand>
            <Nav>
                <NavDropdown title="Αρχείο" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={onClickSaveButton} href="">Αποθήκευση</NavDropdown.Item>
                    <NavDropdown.Item href="">Φόρτωση</NavDropdown.Item>
                    <NavDropdown.Item href="">Έξοδος</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="">Ρυθμίσεις</Nav.Link>
                <Nav.Link href="">Κοινοποίηση</Nav.Link>
            </Nav>
        </Navbar>
    )
}