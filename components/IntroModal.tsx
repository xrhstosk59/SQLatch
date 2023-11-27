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
        <Modal style={{color: 'white'}} show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header className='bg-dark' data-bs-theme="dark" closeButton onClick={onHide}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Καλώς ήρθατε στη SQLatch!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-dark' data-bs-theme="dark">
                <Container style={{height: '50vh', overflow: 'auto'}}  dangerouslySetInnerHTML={{ __html: introMD }} />
            </Modal.Body>
            <Modal.Footer className='bg-dark' data-bs-theme="dark">
                No rights were ever reserved
            </Modal.Footer>
        </Modal>
    );
}
