import { Row, Col, Image } from "react-bootstrap";
import Products from "../Products/Products";
import Post from "../Post/Post";
import { useEffect, useState } from "react";
import useFetch from "../../../useFetch/useFetch";
import "./MenuBody.css";
import NoProducts from "../../../assets/i_need_coffee.png";
import LoadingProducts from "../../../assets/pagina.PNG";
import Search from "../../shared/search/Search";
import { errorToast } from "../../shared/notifications/notification";

const MenuBody = () => {
  const [products, setProducts] = useState([]);
  const [errorProducts, setErrorProducts] = useState("");
  const [categories, setCategories] = useState([]);
  const [errorCategories, setErrorCategories] = useState("");
  const [avisos, setAvisos] = useState([]);

  const { get, isLoading } = useFetch();

  useEffect(() => {
    get(
      "/products",
      false,
      (data) => setProducts(data),
      (error) => setErrorProducts(error)
    );
    get(
      "/categories",
      false,
      (data) => setCategories(data),
      (error) => setErrorCategories(error)
    );
    get(
      "/offers",
      true,
      (data) => {
        setAvisos(data);
        console.log("Ofertas cargadas:", data);
      },
      (err) => {
        console.error("Error al cargar ofertas:", err);
        errorToast(err.message || "Error al cargar ofertas");
      }
    );
  }, []);

  const [valueFilter, setValueFilter] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleChangeFilter = (value) => {
    setValueFilter(value);
    setSearchValue("");
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    setValueFilter("");
  };

  const arrayProducts = () => {
    let filteredItems = products.filter((item) => item.disponible) || [];

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
    <>
      <Row className="fondDiv">
        <Col className="filterDiv d-flex justify-content-center align-items-center py-5">
          {avisos.length > 0 ? (
            <Post avisos={avisos} />
          ) : (
            <div className="text-center text-muted py-5">
              <p>No hay ofertas disponibles</p>
            </div>
          )}
        </Col>
      </Row>
      <div className="products-header mb-4">
        <h2 className="products-title">Nuestros Productos</h2>
        <p className="products-subtitle text-muted">
          Descubrí nuestra selección de cafés y productos especiales
        </p>
      </div>
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

      <Row className="d-flex justify-content-center align-items-center flex-wrap SeccionProd">
        {isLoading && <h2>Cargando los productos ...</h2>}
        {errorProducts && (
          <Col className="text-center">
            <Image className="w-25 h-25" src={LoadingProducts} rounded />
            <h2>Error al cargar los productos ...</h2>
          </Col>
        )}
        {!isLoading && !errorProducts && itemsToRender.length > 0
          ? itemsToRender.map((item) => (
              <Products
                key={item.id}
                title={item.nombre}
                subTitle={item.descripcion}
                imageUrl={item.imagen}
                price={item.precio}
                itemCart={item}
              />
            ))
          : !isLoading &&
            !errorProducts &&
            itemsToRender.length === 0 && (
              <Col className="text-center">
                <Image className="w-25 h-25" src={NoProducts} rounded />
                <h2>No hay productos cargados...</h2>
              </Col>
            )}
      </Row>
    </>
  );
};

export default MenuBody;
