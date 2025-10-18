const { Oferta } = require("../models");
const postOffers = async (imagen) => {
  if (!imagen || imagen.trim() === "") {
    throw new Error("Debe proporcionar una imagen para la oferta");
  }
  const ofertaExistente = await Oferta.findOne({ where: { imagen } });
  if (ofertaExistente) {
    return "Ya existe una oferta con esa imagen";
  }

  //Posteamos la oferta una vez que este todo validado
  const nuevaOferta = await Oferta.create({ imagen });
  return nuevaOferta;
};

const deleteOffer = async (id) => {
  if (!id) {
    throw new Error("Debe proporcionar un ID válido para eliminar la oferta");
  }
  const oferta = await Oferta.findByPk(id);
  if (!oferta) {
    return "Esta oferta no existe o ya fue eliminada";
  }
  await oferta.destroy();
  return `La oferta con ID ${id} fue eliminada correctamente`;
};

const getOffers = async () => {
  const ofertas = await Oferta.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  // Si no hay ofertas, devolvemos array vacio
  if (!ofertas || ofertas.length === 0) {
    return [];
  }

  return ofertas;
};

module.exports = { postOffers, deleteOffer, getOffers };
