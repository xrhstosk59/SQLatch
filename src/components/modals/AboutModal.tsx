import { Button, Container, Modal } from "react-bootstrap";

interface AboutModalProps {
  show: boolean;
  onHide: () => void;
}

export default function AboutModal({ show, onHide }: AboutModalProps) {
  return (
    <Modal
      style={{ color: "white" }}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        style={{ color: "white", background: "#0d6efd" }}
        data-bs-theme="dark"
        closeButton
        onClick={onHide}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Η ομάδα μας
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-center" data-bs-theme="dark">
        <Container style={{ overflow: "auto" }}>
          <div>
            <h3>Προγραμματιστές</h3>
            <p>
              Μιχαήλ Σελβεσάκης{" "}
              <a
                href="https://www.linkedin.com/in/michael-selvesakis-010b65242/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white ms-2"
              >
                <i className="bi bi-linkedin text-white"></i>
              </a>
              <a
                href="mailto:michaelselvesakis@gmail.com"
                className="text-white ms-2"
              >
                <i className="bi bi-envelope-at-fill text-white"></i>
              </a>
              <br />
              Βασίλειος Χριστόφας{" "}
              <a
                href="https://www.linkedin.com/in/vasileios-christofas-280a23267/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white ms-2"
              >
                <i className="bi bi-linkedin text-white"></i>
              </a>
              <a href="mailto:vaceris@cs.ihu.gr" className="text-white ms-2">
                <i className="bi bi-envelope-at-fill text-white"></i>
              </a>
              <br />
              Δημήτριος Μάνος{" "}
              <a
                href="mailto:jimman2003@hotmail.com"
                className="text-white ms-2"
              >
                <i className="bi bi-envelope-at-fill text-white"></i>
              </a>
              <br />
            </p>
            <h3>Προγραμματισμός & Εκπαιδευτικά Σενάρια</h3>
            <p>
              Χρήστος Κέριγκας{" "}
              <a
                href="https://www.linkedin.com/in/christoskerigkas/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white ms-2"
              >
                <i className="bi bi-linkedin text-white"></i>
              </a>
              <a
                href="https://github.com/xrhstosk59"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white ms-2"
              >
                <i className="bi bi-github text-white"></i>
              </a>
              <a href="mailto:chrkeri@cs.ihu.gr" className="text-white ms-2">
                <i className="bi bi-envelope-at-fill text-white"></i>
              </a>
              <br />
            </p>
            <h3>Εκπαιδευτικά Σενάρια - Θεωρία</h3>
            <p>
              {" "}
              Γεράσιμος Χαριζάνης{" "}
              <a
                href="mailto:gerasimoshari@gmail.com"
                className="text-white ms-2"
              >
                <i className="bi bi-envelope-at-fill text-white"></i>
              </a>
              <br />
            </p>
            <hr></hr>
            <div>
              <small>
                Η Εφαρμογή δημιουργήθηκε στα πλαίσια του μαθήματος <br />
                <strong>
                  &apos;Διδακτική και Εφαρμογές στην Πληροφορική&apos;
                </strong>
              </small>
              <br />
            </div>
            <div
              className="row"
              style={{
                marginLeft: "5%",
                marginRight: "5%",
                marginTop: "3%",
                marginBottom: "0%",
              }}
            >
              <div className="col-md-6">
                <img src="/Duth_Logo.png" alt="DUTH Logo" />
              </div>
              <div className="col-md-6">
                <img
                  src="/SQLatchLogo.png"
                  width="70%"
                  height="65%"
                  alt="SQLatch Logo"
                />
                <br />
                <small>Λογότυπο: Βασιλική Κόνου</small>
              </div>
            </div>

            <p style={{ marginTop: "2%", marginBottom: "0%" }}>
              <strong>
                © 2023{" "}
                <a href="https://sqlatch.michaelselvesakis.com">SQLatch</a>
              </strong>
            </p>
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer className="bg-dark" data-bs-theme="dark">
        <Button variant="danger" onClick={onHide}>
          Κλείσιμο
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
