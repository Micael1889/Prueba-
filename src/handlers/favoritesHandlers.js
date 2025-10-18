const {
  postFavorites,
  getFavorites,
  deleteFavorite,
} = require("../controllers/favoritesControllers");

const postFavoritesHandler = async (req, res) => {
  try {
    const producto_id = req.params.id;
    const usuario_id = req.user.id;
    const favorite = await postFavorites(usuario_id, producto_id);
    res.status(200).json(favorite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFavoritesHandler = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    const favorites = await getFavorites(usuario_id);
    res.status(200).json(favorites);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFavoritesHandler = async (req, res) => {
  try {
    const producto_id = req.params.id;
    const usuario_id = req.user.id;
    const favdelete = await deleteFavorite(usuario_id, producto_id);
    res.status(200).json(favdelete);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postFavoritesHandler,
  getFavoritesHandler,
  deleteFavoritesHandler,
};
