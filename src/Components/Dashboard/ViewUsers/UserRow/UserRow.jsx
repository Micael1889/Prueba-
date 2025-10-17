import { Button, Form } from "react-bootstrap";
import DeleteModal from "../../../shared/deleteModal/DeleteModal";
import { useContext } from "react";
import { AuthUserContext } from "../../../../Services/AuthUserContext/AuthUserContext";

const UserRow = ({
  item,
  isEditing,
  dataUser, // Cambiado de dataProduct a dataUser para mayor claridad
  onChange,
  onEdit,
  onConfirm,
  onCancel,
  onDelete,
}) => {
  const { rol } = useContext(AuthUserContext);
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.nombre}</td>
      <td>{item.apellido}</td>
      <td>{item.email}</td>
      <td>{item.telefono}</td>
      <td>
        {isEditing ? (
          <Form.Select
            name="rol"
            value={dataUser.rol ?? ""}
            onChange={onChange}
          >
            {rol === "sysadmin" ? (
              <>
                <option value="cliente">cliente</option>
                <option value="admin">admin</option>
                <option value="sysadmin">sysadmin</option>
              </>
            ) : (
              <>
                <option value="cliente">cliente</option>
                <option value="admin">admin</option>
              </>
            )}
          </Form.Select>
        ) : (
          item.rol
        )}
      </td>
      <td>
        {isEditing ? (
          <div className="d-flex flex-column flex-sm-row">
            <Button
              onClick={() => onConfirm(item.id, item)}
              variant="success"
              className="mb-1 me-sm-1"
            >
              Confirmar
            </Button>
            <Button onClick={onCancel} variant="secondary" className="mb-1">
              Cancelar
            </Button>
          </div>
        ) : (
          <div className="d-flex flex-column flex-sm-row">
            <Button
              onClick={() => onEdit(item)}
              variant="warning"
              className="mb-1 me-sm-1"
            >
              Editar Rol
            </Button>
            <DeleteModal onDelete={() => onDelete(item)} item={item} />
          </div>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
