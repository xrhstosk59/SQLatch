import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
                    <NavDropdown title={<span><i className="bi bi-file-earmark"></i> Αρχείο</span>} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={onClickSaveButton} href="">
                            <i className="bi bi-floppy"></i> Αποθήκευση
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={onClickLoadButton} href="">
                            <i className="bi bi-cloud-upload"></i> Φόρτωση
                        </NavDropdown.Item>
                        <NavDropdown.Item href="">
                            <i className="bi bi-trash"></i> Καθαρισμός
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="">
                        <i className="bi bi-gear"></i> Ρυθμίσεις
                    </Nav.Link>
                    <Nav.Link onClick={onClickShareButton} href="">
                        <i className="bi bi-share"></i> Κοινοποίηση
                    </Nav.Link>
                </Nav>
                <input type="file" id="fileInput" hidden />
            </Navbar>
            <ShareURLModal
                show={modalShow}
                output={URL}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};


function setModalShow(arg0: boolean) {
    throw new Error('Function not implemented.');
}
