import { Button, Col, Row, Container } from "react-bootstrap";
import FormCrud from "../../Dashboard/FormsCRUD/FormCrud";
import { useEffect, useState } from "react";
import PanelProducts from "../PanelProducts/PanelProducts";
import useFetch from "../../../useFetch/useFetch";
import Search from "../../shared/search/Search";

const AbmProducts = () => {
  const [addProduct, setAddProduct] = useState(false);
  const [valueFilter, setValueFilter] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);
  const [errorProducts, setErrorProducts] = useState("");
  const [categories, setCategories] = useState([]);
  const [errorCategories, setErrorCategories] = useState("");

  const { get, isLoading } = useFetch();

  useEffect(() => {
    get("/products", false, setProducts, setErrorProducts);
    get("/categories", false, setCategories, setErrorCategories);
  }, []);

  const handleChangeFilter = (value) => {
    setValueFilter(value);
    setSearchValue("");
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddProduct = (data) => {
    setProducts((prevProduct) => [data, ...prevProduct]);
  };

  const onAddCategories = (data) => {
    setCategories((prevCategories) => [data, ...prevCategories]);
  };

  const onDeleteProduct = (data) => {
    setProducts(data);
  };

  const arrayProducts = () => {
    let filteredItems = products || [];

    if (valueFilter !== "") {
      filteredItems = filteredItems.filter(
        (item) => item.categoriaId === parseInt(valueFilter)
      );
    }

    if (searchValue) {
      filteredItems = filteredItems.filter((item) =>
        item.nombre.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    return filteredItems;
  };

  const itemsToRender = arrayProducts();

  return (
    <Container fluid className="p-3">
      <Row className="mb-3 pb-3 border-bottom align-items-center">
        <Col xs={12} md={8}>
          <h2 className="mb-0 fw-semibold">
            {addProduct ? "Agregar Producto" : "Vista de Productos"}
          </h2>
        </Col>
        <Col xs={12} md={4} className="text-md-end mt-3 mt-md-0">
          <Button
            variant={addProduct ? "secondary" : "success"}
            onClick={() => setAddProduct(!addProduct)}
            className="w-100 w-md-auto"
          >
            {addProduct ? " Regresar" : " Nuevo Producto"}
          </Button>
        </Col>
      </Row>

      {!addProduct && (
        <Row className="mb-3">
          <Col xs={12}>
            <Search
              entity="productos"
              value={searchValue}
              onChange={handleSearch}
              valueFilter={valueFilter}
              onChangeFilter={handleChangeFilter}
              categories={categories}
              isLoading={isLoading}
              errorCategories={errorCategories}
            />
          </Col>
        </Row>
      )}

      {/* Contenido Principal */}
      <Row>
        <Col xs={12}>
          <div className="bg-white p-3 rounded border">
            {addProduct ? (
              <FormCrud
                data={products}
                onAddProduct={onAddProduct}
                onAddCategories={onAddCategories}
              />
            ) : (
              <PanelProducts
                products={itemsToRender}
                onDeleteProduct={onDeleteProduct}
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AbmProducts;
