const { AsyncLocalStorage } = require("async_hooks");
const TelegramBot = require("node-telegram-bot-api");
const token = '5234516887:AAGWVWwDaWf4T5omlvtzrMAZWCAGDl06tyw'
const bot = new TelegramBot(token, { polling: true });


bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  bot.sendMessage(chatId, resp);
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const hora = 1; //new Date().getHours();
  var saudacao;

  if ((hora >= 6) && (hora <= 12)) {
      saudacao = "Boa Dia";
    } else if ((hora > 12) && (hora <= 18)){
        saudacao = "Boa Tarde";
    } else {
        saudacao = "Boa Noite";
  }

  switch (msg.text.toLowerCase()) {
        case "oi": case "ola": case "boa tarde": case "boa noite": case "bom dia":
            bot.sendMessage(chatId, `${saudacao} ${msg.chat.first_name}! \nBem vindo ao bot da Aula da Fiap! 👍🏽`);
            bot.sendMessage(chatId, `Vamos aprender a configurar seu GIT ?`);
            console.log(msg);
            break;
        case "sim":
            bot.sendMessage(chatId, `${msg.chat.first_name}, selecione uma das opcoes abaixo: \n 1 - Configurar Usuario \n 2 - Configurar Email \n 3 - Bonus`);
            console.log(msg);
            break;
        case "nao":
            bot.sendMessage(chatId, `Que pena ${msg.chat.first_name}! \nQuando quiser estou aqui para te ajudar 😉`);
            console.log(msg);
            break;
        case "1":
            bot.sendMessage(chatId, `Para configurar seu usuario utilize o codigo abaixo em seu terminal`);
            bot.sendMessage(chatId, `git config --global user.name "Fulano de Tal"`);
            console.log(msg);
            break;
        case "2":
            bot.sendMessage(chatId, `Para configurar seu email utilize o codigo abaixo em seu terminal`);
            bot.sendMessage(chatId, `git config --global user.email fulanodetal@exemplo.br"`);
            console.log(msg);
            break;
        case "3":
            bot.sendMessage(chatId, `Oops! Essa opcao ainda nao esta pronta`);
            console.log(msg);
            break;
        default:
            bot.sendMessage(chatId, `Desculpe, nao consigo entender isso! 😕`);
            console.log(msg);
  }
});