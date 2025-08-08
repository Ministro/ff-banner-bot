import fetch from "node-fetch";
import TelegramBot from "node-telegram-bot-api";

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || "7496271293:AAEnc7H3_GeGAY3NhTmUehLuAn-SEISc8B0";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "-1002558895285";

const bot = new TelegramBot(TELEGRAM_TOKEN);

const lettersAny = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "123456789";
const hVariants = ["h", "H"];
const lettersUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const OB_VERSION = "OB50"; // Mude se quiser
const BASE_NAME = process.env.BASE_NAME || "TWMadaraTitleUs"; // Pode mudar no env

async function testImage(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

async function sendTelegramMessage(msg) {
  try {
    await bot.sendMessage(TELEGRAM_CHAT_ID, msg);
    console.log("Mensagem enviada:", msg);
  } catch (err) {
    console.error("Erro ao enviar mensagem Telegram:", err.message);
  }
}

async function run() {
  for (const p1 of lettersAny) {
    for (const p2 of digits) {
      for (const p3 of hVariants) {
        for (const p4 of lettersUpper) {
          for (const p5 of lettersUpper) {
            const code = `${p1}${p2}${p3}${p4}${p5}`;
            const url = `https://dl.aw.freefiremobile.com/common/${OB_VERSION}/BR/gacha/${code}${BASE_NAME}_pt_br.png`;

            const exists = await testImage(url);
            if (exists) {
              const message = `Imagem encontrada!\n${url}`;
              await sendTelegramMessage(message);
              console.log("Parando execução após achar imagem.");
              return; // Para após a 1ª imagem
            }
          }
        }
      }
    }
  }
  console.log("Busca finalizada, nenhuma imagem encontrada.");
}

run();
