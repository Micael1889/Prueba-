import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  GetLocalStorage,
  deleteItemStorage,
} from "../../../../Views/Menu/MenuData";
import "./Cart.css";
import { useContext, useEffect, useState } from "react";
import { AuthUserContext } from "../../../../Services/AuthUserContext/AuthUserContext";
import { CartContext } from "../../../../Services/Cart/CartContext";

const Cart = ({ show, handleClose, onHandleBuy }) => {
  const [prodCart, setProdCat] = useState([]);

  const { RemoveItemCart, clearCart } = useContext(CartContext);
  const { token } = useContext(AuthUserContext);

  useEffect(() => {
    const prodsInCart = GetLocalStorage();
    setProdCat(prodsInCart);
  }, [show]);

  const onRemoveFromCart = (item) => {
    const prodInCart = prodCart.filter((products) => products.id !== item.id);
    setProdCat(prodInCart);
    deleteItemStorage(item);
    RemoveItemCart(item);
  };

  const OnHandleSubmitBuy = () => {
    onHandleBuy(prodCart, token);
    clearCart();
    localStorage.removeItem("carrito");
    setProdCat([]);
    handleClose();
  };

  const totalPrice = prodCart?.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      backdrop="static"
      keyboard={false}
    >
      {/* Header */}
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="w-100 text-center">
          Carrito de Compras
        </Modal.Title>
      </Modal.Header>

      {/* Body */}
      <Modal.Body className="px-4">
        {prodCart?.length > 0 ? (
          <>
            <p className="text-muted mb-3 pb-2 border-bottom">
              {prodCart.length} producto{prodCart.length !== 1 ? "s" : ""} en tu
              carrito
            </p>

            <div className="cart-items-container">
              {prodCart.map((item) => (
                <div
                  key={item.id}
                  className="cart-item d-flex align-items-center gap-3 p-3 mb-3 bg-light rounded border"
                >
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="cart-item-image rounded"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="flex-grow-1">
                    <h6 className="mb-1 fw-semibold fs-3">{item.nombre}</h6>
                    <div className="d-flex align-items-center gap-3 text-muted small">
                      <span className="fs-5">Cantidad: {item.cantidad}</span>
                      <span>•</span>
                      <span className="text-success fw-semibold fs-4">
                        ${item.precio * item.cantidad}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline-danger"
                    size="md"
                    onClick={() => onRemoveFromCart(item)}
                    className="rounded-1"
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-cart-x fs-1 text-muted d-block mb-3"></i>
            <p className="text-muted mb-0">Tu carrito está vacío</p>
          </div>
        )}
      </Modal.Body>

      {/* Footer */}
      {prodCart?.length > 0 && (
        <Modal.Footer className="border-0 pt-0 flex-column">
          <div className=" w-100 d-flex justify-content-between align-items-center mb-3 p-3 rounded bg-secondary text-white ">
            <span className="fs-3 fw-semibold">Total:</span>

            <span className="fs-2 fw-bold text-white">${totalPrice}</span>
          </div>

          <div className="w-100 d-flex gap-2">
            <Button
              variant="outline-dark"
              onClick={handleClose}
              className="flex-grow-1"
            >
              Seguir comprando
            </Button>
            <Button
              variant="dark"
              onClick={OnHandleSubmitBuy}
              disabled={!prodCart || prodCart.length === 0}
              className="flex-grow-1"
            >
              <i className="bi bi-check-circle me-2"></i>
              Finalizar compra
            </Button>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default Cart;
