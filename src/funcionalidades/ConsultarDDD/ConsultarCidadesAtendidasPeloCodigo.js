// Módulo responsável por trazer os dados de um endereço apartir de um CEP

const axios = require("axios");

exports.consultaPorDDD = async (ddd) => {
  let retorno = "";

  const options = {
    method: "GET",
    url: `${process.env.BRASIL_API_URL}/ddd/v1/${ddd}`,
  };

  await axios
    .request(options)
    .then(function (response) {
      console.log(response.data);

      retorno = `As cidades atendidas pelo DDD ${ddd} são: \n`;

      for (let i = 0; i < response.data.cities.length; i++) {
        const cid = response.data.cities[i];
        retorno += "\n" + cid;
      }
    })
    .catch(function (error) {
      console.error(error);
      retorno = "Não foi possível consultar as cidades Atendidas ";
    });

  retorno += "\n\n Digite MENU para voltar para o menu inicial";

  return retorno;
};
