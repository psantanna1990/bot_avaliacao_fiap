// Módulo responsável por trazer os dados de um endereço apartir de um CEP

const axios = require("axios");

exports.consultaPorCNPJ = async (cnpj) => {
  let retorno = "";

  const options = {
    method: "GET",
    url: `${process.env.BRASIL_API_URL}/cnpj/v1/${cnpj}`,
  };

  await axios
    .request(options)
    .then(function (response) {
      retorno += `Razão Social: ${response.data.razao_social}\n\n`;
      retorno += `Situação Casastral: ${response.data.descricao_situacao_cadastral}\n\n`;
      retorno += `Atividade(CNAE): ${response.data.cnae_fiscal_descricao}\n\n`;
      retorno += `Natureza Juríca: ${response.data.natureza_juridica}\n\n`;
      retorno += `Endereço: ${response.data.logradouro}, ${response.data.bairro}, ${response.data.municipio}, ${response.data.uf}\n\n`;
      retorno += "\nDigite MENU para voltar para o menu inicial";
    })
    .catch(function (error) {
      console.error(error);
      retorno =
        "Não foi possível consultar o CNPJ \n\n Digite MENU para voltar para o menu inicial";
    });

  return retorno;
};
