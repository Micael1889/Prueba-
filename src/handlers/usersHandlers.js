const {
  postUser,
  getUser,
  getAllUsers,
  putUser,
  deleteUser,
  googleLogin,
} = require("../controllers/usersControllers");

const postUserHandlers = async (req, res) => {
  try {
    const { email, contrasena, nombre, apellido, telefono, rol } = req.body;
    const mensaje = await postUser({
      email,
      contrasena,
      nombre,
      apellido,
      telefono,
      rol,
    });
    res.status(201).json(mensaje);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserHandlers = async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    const respuesta = await getUser({ email, contrasena });
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsersHandlers = async (req, res) => {
  try {
    const usuarios = await getAllUsers();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putUserHandlers = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol } = req.body;
    const usuario = await putUser({ id, rol });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await deleteUser({ id });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* const googleUsersHandlers = async (req, res) => {
  try {
    const { credential } = req.body; // viene del frontend
    const respuesta = await googleLogin(credential);
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; */

module.exports = {
  postUserHandlers,
  getUserHandlers,
  getUsersHandlers /*googleUserHanders*/,
  putUserHandlers,
  deleteUserHandler,
};
