import { Form, Row, Col } from "react-bootstrap";

const Search = ({
  entity = "productos",
  type = "text",
  value,
  onChange,
  valueFilter,
  onChangeFilter,
  categories = [],
  isLoading = false,
  errorCategories = "",
}) => {
  return (
    <Row className="menu-filters-container shadow p-3 mb-5 rounded d-flex justify-content-around align-items-center">
      {/* SELECT DE CATEGORÍAS */}
      <Col xs={12} md={6} lg={4} className="mb-3">
        <Form.Group controlId="formCategorySelect">
          <Form.Label className="fw-bold text-primary fs-4">
            Categoría
          </Form.Label>
          <Form.Select
            className="form-select-lg fs-4"
            onChange={(e) => onChangeFilter(e.target.value)}
            value={valueFilter}
          >
            <option value="">Todas las categorías</option>
            {isLoading ? (
              <option disabled>Cargando...</option>
            ) : (
              !errorCategories &&
              categories &&
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))
            )}
          </Form.Select>
        </Form.Group>
      </Col>

      {/* INPUT DE BÚSQUEDA */}
      <Col xs={12} md={6} lg={4} className="mb-3">
        <Form.Group controlId="formSearchInput">
          <Form.Label className="fw-bold fs-4">Buscador</Form.Label>
          <Form.Control
            type={type}
            placeholder={`Buscar ${entity}...`}
            className="form-control-lg border-primary fs-4"
            onChange={onChange}
            value={value}
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

export default Search;
