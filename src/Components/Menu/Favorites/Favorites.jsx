import { useEffect, useState, useContext } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Products from "../Products/Products";
import Nofavorites from "../../../assets/brown-broken-heart-icon.png";
import { AuthUserContext } from "../../../Services/AuthUserContext/AuthUserContext";
import useFetch from "../../../useFetch/useFetch";

const Favorites = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthUserContext);

  const { get } = useFetch();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    get(
      "/favorites",
      true, // es privada
      (data) => {
        setProducts(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        console.error("Error al obtener favoritos:", err);
        setLoading(false);
      }
    );
  }, []);

  return (
    <>
      <Row>
        <h1>Favoritos</h1>
      </Row>
      <Row className="d-flex justify-content-center align-items-center flex-wrap SeccionProd">
        {products.length > 0 ? (
          products.map((item) => (
            <Products
              key={item.id}
              title={item.nombre}
              subTitle={item.descripcion}
              imageUrl={item.imagen}
              price={item.precio}
              itemCart={item}
            />
          ))
        ) : (
          <Col className="text-center">
            <Image src={Nofavorites} rounded />
            <h2>No tenes favoritos</h2>
          </Col>
        )}
      </Row>
    </>
  );
};

export default Favorites;
