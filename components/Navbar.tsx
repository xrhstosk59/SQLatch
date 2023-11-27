import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useBlockly } from '../modules/Blockly/Blockly';
import ShareURLModal from './ShareURLModal';
import { useState } from 'react';

export default function NavBar() {
    const [modalShow, setModalShow] = useState(false);
    const useBL = useBlockly();
    const [URL, setURL] = useState("");

    const onClickShareButton = () => {
        console.log('-- Navbar: Sharing link --');
        const encBL = btoa(JSON.stringify(useBL.getWorkspaceState()));
        const host = window.location.host;
        const URL = 'http://' + host + '/?bl=' + encBL;
        setURL(URL);
        setModalShow(true);
    }

    const onClickSaveButton = () => {
        console.log('-- Navbar: Save init --');
        const json = useBL.getWorkspaceState();

        const link = document.createElement("a");
        link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
        link.download = "SQLatch-" + Date.now() + ".json";
        link.click();
    }

    const onClickLoadButton = () => {
        var fileInput = document.createElement('input');
        fileInput.type = 'file';

        fileInput.onchange = e => {
            if (fileInput.files.length > 0) {
                var file = fileInput.files[0];

                var reader = new FileReader();
                reader.readAsText(file);

                reader.onload = function (e) {
                    var fileContent = JSON.parse(e.target.result as string);
                    useBL.loadWorkspaceState(fileContent);
                };
            }
        }

        fileInput.click();
    }

    return (
        <>
            <Navbar style={{ paddingLeft: 20, minHeight: '6svh' }} bg="dark">
                <Navbar.Brand href="">SQLatch</Navbar.Brand>
                <Nav>
                    <NavDropdown title="Αρχείο" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={onClickSaveButton} href="">Αποθήκευση</NavDropdown.Item>
                        <NavDropdown.Item onClick={onClickLoadButton} href="">Φόρτωση</NavDropdown.Item>
                        <NavDropdown.Item href="">Έξοδος</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="">Ρυθμίσεις</Nav.Link>
                    <Nav.Link onClick={onClickShareButton} href="">Κοινοποίηση</Nav.Link>

                </Nav>
                <input type="file" id="fileInput" hidden />
            </Navbar>
            <ShareURLModal
                show={modalShow}
                output={URL}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

function setModalShow(arg0: boolean) {
    throw new Error('Function not implemented.');
}
