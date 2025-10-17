import { useState } from "react";
import { initFormData } from "../../Dashboard/FormsCRUD/FormData";
import ProductRow from "./ProductRow/ProductRow";
import { Card } from "react-bootstrap";
import "./PanelProducts.css";
import {
  EditToast,
  errorToast,
  successToast,
} from "../../shared/notifications/notification";
import useFetch from "../../../useFetch/useFetch";

const PanelProducts = ({ products, onDeleteProduct }) => {
  const [editingId, setEditingId] = useState(null);
  const [dataProduct, setDataProduct] = useState(initFormData);

  const { put, del } = useFetch();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDataProduct({
      ...dataProduct,
      [name]:
        type === "number"
          ? value
            ? parseFloat(value)
            : ""
          : type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setDataProduct(item);
  };

  const handleConfirm = (item) => {
    put(
      `/products/${item.id}`,
      true,
      dataProduct,
      (data) => {
        EditToast(`El producto ${data.nombre} fue editado con éxito.`);
        console.log("Respuesta backend:", data); 

        const updatedProducts = products.map((p) =>
          p.id === data.id ? data : p
        ); 
        onDeleteProduct(updatedProducts); 

        setEditingId(null);
      },
      (err) => {
        console.error("Error en edición:", err);
        errorToast(err.message);
        setEditingId(null); // También sal del modo edición en caso de error
      }
    ); 
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (item) => {
    del(
      `/products/${item.id}`,
      true,
      (data) => {
        successToast(`El producto ${data.nombre} fue eliminado con éxito.`);
        console.log("Eliminado:", data);
        const NewDataProducts = products.filter(
          (product) => product.id != item.id
        );
        onDeleteProduct(NewDataProducts);
      },
      (err) => {
        console.error("Error al eliminar:", err);
        errorToast(err.message);
      }
    );
  };

  return (
    <>
      <h2 className="text-center mb-4 text-primary">Lista de Productos</h2>
      <Card className="productos-card table-responsive rounded-3 overflow-hidden">
        <table className="table table-striped table-hover">
          <thead>
            <tr className="bg-light">
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Disponible</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item) => (
              <ProductRow
                key={item.id}
                item={item}
                isEditing={editingId === item.id}
                dataProduct={dataProduct}
                onChange={handleInputChange}
                onEdit={() => handleEdit(item)}
                onConfirm={() => handleConfirm(item)}
                onCancel={handleCancel}
                onDelete={() => handleDelete(item)}
              />
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default PanelProducts;
