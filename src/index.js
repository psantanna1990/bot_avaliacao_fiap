const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELEGRAM_BOT_KEY
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  bot.sendMessage(chatId, resp);
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  if (msg.text.toLowerCase() === "oi") {
    let mensagemEnviar = `oi ${msg.chat.first_name} bem vindo ao nosso bot da Aula da fiap \nvamos desenvolver algo?`;
    console.log(msg);
    bot.sendMessage(chatId, mensagemEnviar);
  } else {
    console.log(msg);
    bot.sendMessage(chatId, "Received your message");
  }
});
