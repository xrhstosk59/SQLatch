import { useEffect, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { useShowdown } from "../modules/Showdown";

export default function IntroModal({ show, onHide }) {
    const useMD = useShowdown();

    const [introMD, setIntroMD] = useState();

    useEffect(() => {
        const setHTML = async () => {
            const html = await useMD.convertMd('Intro/text.md');
            setIntroMD(html);
        }

        setHTML();
    }, [])

    return (
        <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton onClick={onHide}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Καλώς ήρθατε στη SQLatch!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container style={{height: '50vh', overflow: 'auto'}}  dangerouslySetInnerHTML={{ __html: introMD }} />
            </Modal.Body>
            <Modal.Footer>
                No rights were ever reserved
            </Modal.Footer>
        </Modal>
    );
}
