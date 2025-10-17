import { useState, useEffect } from "react";
import { Col, Row, Container, Form, Button, Card } from "react-bootstrap";
import DeleteModal from "../../shared/deleteModal/DeleteModal";
import {
  successToast,
  errorToast,
} from "../../shared/notifications/notification";
import useFetch from "../../../useFetch/useFetch";

const ViewPost = () => {
  const [urlInput, setUrlInput] = useState("");
  const [previewAvisos, setPreviewAvisos] = useState([]);
  const { get, post, del } = useFetch();

  useEffect(() => {
    get(
      "/offers",
      true,
      (data) => {
        setPreviewAvisos(data);
        console.log("Ofertas cargadas:", data);
      },
      (err) => {
        console.error("Error al cargar ofertas:", err);
        errorToast(err.message || "Error al cargar ofertas");
      }
    );
  }, []);

  const handleAddImage = (e) => {
    e.preventDefault();

    if (!urlInput.trim()) {
      return;
    }

    const newAviso = {
      imagen: urlInput, // ✅ Cambio aquí: "imagen" en vez de "imageUrl"
    };

    post(
      "/offers",
      true,
      newAviso,
      (data) => {
        setPreviewAvisos([...previewAvisos, data]);
        successToast("Aviso agregado con éxito");
        setUrlInput("");
        console.log("Aviso creado:", data);
      },
      (err) => {
        console.error("Error al agregar aviso:", err);
        errorToast(err.message || "Error al agregar el aviso");
      }
    );
  };

  const handleDeleteAviso = (aviso) => {
    del(
      `/offers/${aviso.id}`,
      true,
      (data) => {
        successToast("Aviso eliminado con éxito");
        setPreviewAvisos(previewAvisos.filter((a) => a.id !== aviso.id));
        console.log("Aviso eliminado:", data);
      },
      (err) => {
        console.error("Error al eliminar:", err);
        errorToast(err.message || "Error al eliminar el aviso");
      }
    );
  };

  return (
    <Container fluid className="p-4">
      <Row className="g-4">
        {/* Columna del Formulario */}
        <Col lg={4}>
          <Card className="border shadow-sm">
            <Card.Header className="bg-secondary text-white">
              <h4 className="mb-0">Agregar Aviso</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAddImage}>
                <Form.Group className="mb-3">
                  <Form.Label>URL de la imagen</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="success" type="submit">
                    <i className="bi bi-plus-lg me-2"></i>
                    Agregar al carrusel
                  </Button>
                </div>
              </Form>

              <hr className="my-4" />

              <div className="info-section">
                <h6 className="text-muted mb-2">
                  <i className="bi bi-info-circle me-2"></i>
                  Información
                </h6>
                <p className="small text-muted mb-1">
                  Total de avisos: <strong>{previewAvisos.length}</strong>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Columna de Previsualización */}
        <Col lg={8}>
          <Card className="border shadow-sm">
            <Card.Header className="bg-light">
              <h4 className="mb-0">
                <i className="bi bi-eye me-2"></i>
                Previsualización
              </h4>
            </Card.Header>
            <Card.Body className="p-4">
              {previewAvisos.length > 0 ? (
                <div className="d-flex flex-wrap justify-content-start gap-3">
                  {previewAvisos.map((aviso, index) => (
                    <div
                      key={aviso.id || index}
                      className="border rounded p-3 shadow-sm bg-light"
                      style={{ width: "300px" }}
                    >
                      <div
                        className="position-relative mb-3"
                        style={{
                          width: "100%",
                          height: "200px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={aviso.imagen}
                          alt="Aviso"
                          className="rounded"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      <DeleteModal
                        onDelete={() => handleDeleteAviso(aviso)}
                        item={aviso}
                        buttonLabel="Eliminar aviso"
                        elemento="aviso"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <i className="bi bi-images fs-1 text-muted d-block mb-3"></i>
                  <p className="text-muted mb-0">
                    No hay avisos para mostrar. Agregá al menos uno para ver el
                    carrusel.
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewPost;
