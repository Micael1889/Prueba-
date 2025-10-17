import { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { AuthUserContext } from "../../../Services/AuthUserContext/AuthUserContext";
import UserRow from "./UserRow/UserRow";
import {
  EditToast,
  successToast,
} from "../../shared/notifications/notification";
import useFetch from "../../../useFetch/useFetch";

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [dataUser, setDataUser] = useState({});

  const { token, rol } = useContext(AuthUserContext);
  const { get, put, del } = useFetch();

  const getUsers = () => {
    if (!token) {
      setLoading(false);
      return;
    }

    get(
      "/user/",
      true,
      (data) => {
        const userFilter =
          rol === "admin"
            ? data.filter((user) => user.rol !== "sysadmin")
            : data;
        setUsers(userFilter);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        console.error("Error al obtener usuarios:", err);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    getUsers();
  }, [token]);

  const handleEdit = (item) => {
    setEditingId(item.id);
    setDataUser(item);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const handleConfirm = (itemId) => {
    put(
      `/user/${itemId}`,
      true,
      { rol: dataUser.rol },
      (updatedUser) => {
        setUsers(
          users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setEditingId(null);
        EditToast(`Usuario ${updatedUser.nombre} editado con éxito.`);
        console.log("Usuario actualizado con éxito:", updatedUser);
      },
      (err) => {
        console.error("Error al actualizar el usuario:", err);
      }
    );
  };

  const handleCancel = () => {
    setEditingId(null);
    setDataUser({});
  };

  const handleDelete = (item) => {
    del(
      `/user/${item.id}`,
      true,
      () => {
        setUsers(users.filter((user) => user.id !== item.id));
        successToast(`El usuario ${item.nombre} ha sido eliminado.`);
        console.log("Usuario eliminado con éxito:", item);
      },
      (err) => {
        console.error("Error al eliminar el usuario:", err);
      }
    );
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error al cargar los usuarios: {error}</p>;

  return (
    <>
      <Row className="m-3 pb-3 border-bottom align-items-center">
        <Col>
          <h2 className="mb-0 fw-semibold">Gestión de Usuarios</h2>
          <p className="text-muted mb-0 mt-1">
            Total: {users.length} usuario{users.length !== 1 ? "s" : ""}
          </p>
        </Col>
      </Row>
      <div className="bg-white p-3 rounded border">
        <h2 className="mb-0 fw-semibold">Lista de Usuarios</h2>
        <Card className="productos-card table-responsive rounded-3 m-4 overflow-hidden">
          <table className="table table-striped table-hover">
            <thead>
              <tr className="bg-light">
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((item) => (
                  <UserRow
                    key={item.id}
                    item={item}
                    isEditing={editingId === item.id}
                    dataUser={dataUser}
                    onChange={handleInputChange}
                    onEdit={handleEdit}
                    onConfirm={() => handleConfirm(item.id)}
                    onCancel={handleCancel}
                    onDelete={() => handleDelete(item)}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No se encontraron usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
};

export default ViewUser;
