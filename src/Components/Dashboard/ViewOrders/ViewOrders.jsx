import { useEffect, useState } from "react";
import { Spinner, Container, Row, Col, Badge } from "react-bootstrap";
import OrderButton from "./OrderButton/OrderButton";
import useFetch from "../../../useFetch/useFetch";
import "./ViewOrders.css";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [errorOrders, setErrorOrders] = useState("");
  const { get, isLoading } = useFetch();

  useEffect(() => {
    get(
      "/orders",
      true,
      (data) => {
        setOrders(data);
        console.log("Órdenes cargadas:", data);
      },
      (error) => {
        setErrorOrders(error.message || "Error al cargar las órdenes");
        console.error("Error al cargar órdenes:", error);
      }
    );
  }, []);

  if (isLoading) {
    return (
      <Container className="view-orders-container text-center py-5">
        <Spinner animation="border" role="status" variant="primary" size="lg">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p className="mt-3 text-muted fs-5">Cargando órdenes...</p>
      </Container>
    );
  }

  return (
    <Container fluid className="view-orders-container p-4">
      {/* Header */}
      <div className="orders-header mb-4">
        <Row className="align-items-center">
          <Col>
            <h2 className="orders-title mb-2">
              <i className="bi bi-receipt-cutoff me-2"></i>
              Vista de ordenes
            </h2>
            <p className="orders-subtitle text-muted mb-0">
              Total de órdenes:
              <Badge bg="primary" className="ms-2">
                {orders.length}
              </Badge>
            </p>
          </Col>
        </Row>
      </div>

      <div className="">
        {orders.map((order) => (
          <OrderButton key={order.id} order={order} />
        ))}
      </div>
    </Container>
  );
};

export default ViewOrders;
