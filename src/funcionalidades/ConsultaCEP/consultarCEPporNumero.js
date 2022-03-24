// Módulo responsável por trazer os dados de um endereço apartir de um CEP

const axios = require("axios");

exports.consultaDadosPorCEP = async (cep) => {
  let retornoCep = "";

  const options = {
    method: "GET",
    url: `${process.env.BRASIL_API_URL}/cep/v2/${cep}`,
  };

  await axios
    .request(options)
    .then(function (response) {
      console.log("to aqui");
      console.log(response.data);

      retornoCep = `Logradouro: ${response.data.street} \nBairro: ${response.data.neighborhood} \nCidade: ${response.data.city} \nEstado: ${response.data.state}`;
    })
    .catch(function (error) {
      console.error(error);
      return "Não foi possível consultar o CEP";
    });

  return retornoCep;
};
