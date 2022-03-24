const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELEGRAM_BOT_KEY;
const bot = new TelegramBot(token, { polling: true });
const consultaCepPorNumero = require("./funcionalidades/ConsultaCEP/consultarCEPporNumero");

let iteracoesPorUsuario = new Map();

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  let mensagemMenu = `Olá ${msg.chat.first_name} bem vindo ao nosso bot :) \nInforme o número da opção que deseja: \n\n  1 - Consultar CEP `;

  if (iteracoesPorUsuario.get(chatId) === undefined) {
    iteracoesPorUsuario.set(chatId, { ultimaIteracao: "ENVIADO_MENU" });

    bot.sendMessage(chatId, mensagemMenu);
  } else if (
    iteracoesPorUsuario.get(chatId).ultimaIteracao === "ENVIADO_MENU"
  ) {
    // Caso a opção selecionada seja 1
    if (msg.text.trim() == 1) {
      iteracoesPorUsuario.set(chatId, { ultimaIteracao: "SOLICITADO_CEP" });
      bot.sendMessage(
        chatId,
        `Informe o CEP que deseja consultar (apenas números)`
      );
    } else {
      // Caso não exista a opção enviada
      iteracoesPorUsuario.set(chatId, { ultimaIteracao: "ENVIADO_MENU" });
      bot.sendMessage(
        chatId,
        "Envie apenas o número que aparece no menu \n" + mensagemMenu
      );
    }

    console.log(msg);
  } else if (
    iteracoesPorUsuario.get(chatId).ultimaIteracao === "SOLICITADO_CEP"
  ) {
    if (msg.text.trim().length === 8) {
      let mensagemDadosCepEnviar =
        await consultaCepPorNumero.consultaDadosPorCEP(msg.text);

      bot.sendMessage(chatId, mensagemDadosCepEnviar);
    } else {
    }
  }
});
