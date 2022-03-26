const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELEGRAM_BOT_KEY;
const bot = new TelegramBot(token, { polling: true });
const consultaCepPorNumero = require("./funcionalidades/ConsultaCEP/consultarCEPporNumero");
const consultaCidadesDDD = require("./funcionalidades/ConsultarDDD/ConsultarCidadesAtendidasPeloCodigo");
const consultaCNPJ = require("./funcionalidades/ConsultaCNPJ/ConsultaCNPJ");

let iteracoesPorUsuario = new Map();

const respondeMenu = (codigoAcao, chatId) => {
  switch (codigoAcao) {
    case "1":
      iteracoesPorUsuario.set(chatId, { ultimaIteracao: "SOLICITADO_CEP" });
      bot.sendMessage(
        chatId,
        `Informe o CEP que deseja consultar (apenas números)`
      );
      break;
    case "2":
      iteracoesPorUsuario.set(chatId, {
        ultimaIteracao: "SOLICITADO_CIDADES_POR_DDD",
      });
      bot.sendMessage(chatId, `Informe o DDD que deseja consultar`);
      break;
    case "3":
      iteracoesPorUsuario.set(chatId, {
        ultimaIteracao: "SOLICITADO_CONSULTA_CNPJ",
      });
      bot.sendMessage(chatId, `Informe o CNPJ que deseja consultar`);
      break;
    default:
      bot.sendMessage(
        chatId,
        `Opção não Localizada \n\nSomente são aceitas as opções informadas no menu \nInforme o número da opção que deseja: 
        \n1 - Consultar CEP \n2- Consultar cidades atendidas pelo DDD \n3- Dados CNPJ (Situação Cadastral, Endereço) \n\nA qualquer momento digite MENU para voltar para o menu inicial`
      );
      break;
  }
};

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  console.log(msg);

  let mensagemMenu = `Olá ${msg.chat.first_name} bem vindo ao nosso bot :) \nInforme o número da opção que deseja: \n\n  
  1 - Consultar CEP \n  2- Consultar cidades atendidas pelo DDD \n  3- Dados CNPJ (Situação Cadastral, Endereço) \n\n\n 
  A qualquer momento digite MENU para voltar para o menu inicial`;

  if (
    iteracoesPorUsuario.get(chatId) === undefined ||
    msg.text.trim().toUpperCase() === "MENU"
  ) {
    iteracoesPorUsuario.set(chatId, { ultimaIteracao: "ENVIADO_MENU" });
    bot.sendMessage(chatId, mensagemMenu);
  } else {
    switch (iteracoesPorUsuario.get(chatId).ultimaIteracao) {
      case "ENVIADO_MENU":
        respondeMenu(msg.text.trim(), chatId);
        break;
      case "SOLICITADO_CEP":
        bot.sendMessage(
          chatId,
          await consultaCepPorNumero.consultaDadosPorCEP(msg.text.trim())
        );
        break;
      case "SOLICITADO_CIDADES_POR_DDD":
        bot.sendMessage(
          chatId,
          await consultaCidadesDDD.consultaPorDDD(msg.text.trim())
        );
        break;
      case "SOLICITADO_CONSULTA_CNPJ":
        bot.sendMessage(
          chatId,
          await consultaCNPJ.consultaPorCNPJ(msg.text.trim())
        );
        break;
      default:
        iteracoesPorUsuario.set(chatId, {
          ultimaIteracao: "ENVIADO_MENU",
        });
        bot.sendMessage(chatId, mensagemMenu);
    }
  }
});
