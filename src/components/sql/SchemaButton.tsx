import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import SchemaModal from "../modals/SchemaModal";
import convertSchema, { DatabaseConfig } from "../../modules/SchemaGenerator";
import { useSQLite } from "../../contexts/SQLiteContext";
import styles from "../../styles/runtimeControl.module.css";

export default function SchemaButton() {
  const useDB = useSQLite();
  const [schemaShow, setSchemaShow] = useState(false);
  const [currentDatabase, setCurrentDatabase] = useState<DatabaseConfig>({
    tables: [],
    edgeConfigs: [],
    schemaColors: {},
    tablePositions: {},
  });

  const handleShowSchema = () => {
    setCurrentDatabase(convertSchema(useDB));
    setSchemaShow(true);
  };

  return (
    <>
      <Container
        fluid
        style={{ paddingLeft: 0, paddingRight: 0 }}
        className={styles.container}
      >
        <Button variant="primary" onClick={handleShowSchema}>
          Σχήμα Βάσης
        </Button>
      </Container>
      <SchemaModal
        show={schemaShow}
        onHide={() => setSchemaShow(false)}
        db={currentDatabase}
      />
    </>
  );
}
