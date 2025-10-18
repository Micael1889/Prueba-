const {
  postOffers,
  deleteOffer,
  getOffers,
} = require("../controllers/offersControllers");

const postOffersHandler = async (req, res) => {
  try {
    const { imagen } = req.body;
    const oferta = await postOffers(imagen);
    res.status(200).send(oferta);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteOfferHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const oferta = await deleteOffer(id);
    res.status(200).send(oferta);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOffersHandler = async (req, res) => {
  try {
    const ofertas = await getOffers();
    res.status(200).send(ofertas);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { postOffersHandler, deleteOfferHandler, getOffersHandler };
