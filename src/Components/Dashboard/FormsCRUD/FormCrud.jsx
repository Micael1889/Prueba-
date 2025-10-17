import { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { initFormData } from "./FormData";
import useFetch from "../../../useFetch/useFetch";
import { AuthUserContext } from "../../../Services/AuthUserContext/AuthUserContext";
import {
  errorToast,
  successToast,
} from "./../../shared/notifications/notification.js";

const FormCrud = ({ onAddProduct, onAddCategories }) => {
  const [dataProduct, setDataProduct] = useState(initFormData);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [categories, setCategories] = useState([]);
  const [errorCategories, setErrorCategories] = useState(null);

  const { token } = useContext(AuthUserContext);

  const { get, post, isLoading } = useFetch();

  useEffect(() => {
    get(
      "/categories",
      false,
      (data) => setCategories(data),
      (err) => setErrorCategories(err)
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "number") {
      setDataProduct({
        ...dataProduct,
        [name]: value ? parseFloat(value) : "",
      });
    } else {
      setDataProduct({
        ...dataProduct,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const controlErrors = () => {
    if (
      !dataProduct.nombre ||
      !dataProduct.precio ||
      !dataProduct.descripcion ||
      !dataProduct.imagen
    ) {
      errorToast("Llene todos los campos requeridos.");
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (controlErrors()) {
      return;
    }

    const payload = {
      ...dataProduct,
      categoria:
        dataProduct.categoria === "otra"
          ? nuevaCategoria
          : dataProduct.categoria,
    };

    post(
      "/products",
      true, // privada porque necesita token
      payload,
      (data) => {
        successToast(`El producto ${data.nombre} fue agregado con éxito.`);
        console.log("Respuesta backend:", data);
        onAddProduct(payload);
        if (dataProduct.categoria === "otra") {
          onAddCategories(payload.categoria);
        }
      },
      (err) => {
        console.error("Error al enviar:", err);
        errorToast("Hubo un error al crear el producto.");
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit} className="container my-5 w-50 ">
      <fieldset>
        <div className="card shadow-lg rounded-4 p-5 bg-white border-0">
          <h4 className="mb-4 text-center text-primary fw-semibold">
            Formulario nuevo producto
          </h4>

          {/* Nombre */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">
              Producto <span className="text-danger">*</span> :
            </Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Ingrese el nombre..."
              className="form-control rounded-3 shadow-sm"
              onChange={handleInputChange}
              value={dataProduct.nombre}
            />
          </Form.Group>

          {/* Categoría */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">
              Categorías <span className="text-danger">*</span> :
            </Form.Label>
            <Form.Select
              name="categoria"
              className="form-control rounded-3 shadow-sm"
              onChange={handleInputChange}
              value={dataProduct.categoria}
            >
              <option value="">Seleccione una categoría</option>
              {isLoading ? (
                <option disabled>Cargando categorías...</option>
              ) : errorCategories ? (
                <option disabled>Error al cargar categorías</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.nombre}>
                    {cat.nombre}
                  </option>
                ))
              )}
              <option value="otra">Otra categoría</option>
            </Form.Select>
          </Form.Group>

          {/* Nueva categoría */}
          <Form.Group
            className={
              dataProduct.categoria === "otra" ? "mb-4 d-block" : "d-none"
            }
          >
            <Form.Label className="mt-4 fw-bold ">
              Ingrese la categoría <span className="text-danger">*</span> :
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la categoría/tipo..."
              className="form-control rounded-3 shadow-sm mt-2"
              onChange={(e) => setNuevaCategoria(e.target.value)}
              value={nuevaCategoria}
            />
          </Form.Group>

          {/* Descripción */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">
              Descripción <span className="text-danger">*</span>:
            </Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              placeholder="Ingrese la descripción..."
              className="form-control rounded-3 shadow-sm"
              onChange={handleInputChange}
              value={dataProduct.descripcion}
            />
          </Form.Group>

          {/* Imagen */}
          <Form.Group controlId="" className="mb-3">
            <Form.Label>
              Url imagen <span className="text-danger">*</span>:
            </Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              placeholder="Ingrese la URL de la imagen..."
              onChange={handleInputChange}
              value={dataProduct.imagen}
            />
          </Form.Group>

          {/* Precio */}
          <Form.Label className="mt-4 fw-bold">
            Ingrese el precio <span className="text-danger">*</span>:
          </Form.Label>
          <Form.Control
            type="number"
            name="precio"
            placeholder="Ingrese el precio ..."
            className="form-control rounded-3 shadow-sm"
            onChange={handleInputChange}
            value={dataProduct.precio}
          />

          {/* Disponible */}
          <Form.Check
            type="switch"
            name="disponible"
            className="form-check form-switch my-4 fs-5"
            label="¿Disponible?"
            checked={dataProduct.disponible}
            onChange={handleInputChange}
          />

          <div className="d-grid">
            <Button
              type="submit"
              className="btn btn-primary btn-lg rounded-pill"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </div>
      </fieldset>
    </Form>
  );
};

export default FormCrud;
