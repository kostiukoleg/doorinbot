const { Telegraf, Markup } = require('telegraf')
const { message } = require('telegraf/filters')
require('dotenv').config()
const commands = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
  const keyboard = Markup.inlineKeyboard([
    Markup.button.url('Google', 'https://www.google.com'),
    Markup.button.callback('Click me', 'button_clicked'),
  ]);

  // Send a message with the inline keyboard
  ctx.reply('Hello! Click the buttons below:', keyboard);
})
// Handle button click
bot.action('button_clicked', (ctx) => {
  ctx.answerCbQuery('Button clicked!');
});
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
