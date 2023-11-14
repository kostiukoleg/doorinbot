const { Telegraf, Markup } = require('telegraf')
const { message } = require('telegraf/filters')
const path = require('path')
const commands = require('./const')
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN)
// Object to store user states (current menu)
const userStates = {}
const MENU_STATES = {
  MAIN_MENU: 'main_menu',
  CONTACT_US: 'contact_us',
  SOCIAL: 'social',
  FLOOR: 'floor',
  LAMINATE: 'laminate',
  WOODFLOOR: 'wood_floor',
}
const mainMenuLayout = Markup.keyboard([
  ["Підлога", "🚪Двері", "Стіни"],
  ["Соцмережі", "☎️ Зворотній зв'язок"],
  ["Дізнатись має чат-ID"],
]).resize()

const laminateLayout = Markup.keyboard([
  [
    Markup.button.callback("📊 Прайс", "laminate_price_button"),
    Markup.button.callback("📒 Каталог", "laminate_catalog_button"),
  ],
  [
    Markup.button.callback("⏪ Назад", "laminate_back_button"),
    Markup.button.callback("⬅️ Головне меню", "main_menu_button"),
  ],
]).resize()

const woodfloorLayout = Markup.keyboard([
  [
    Markup.button.callback("📊 Прайс", "woodfloor_price_button"),
    Markup.button.callback("📒 Каталог", "woodfloor_catalog_button"),
  ],
  [
    Markup.button.callback("⏪ Назад", "woodfloor_back_button"),
    Markup.button.callback("⬅️ Головне меню", "main_menu_button"),
  ],
]).resize()

const contactUsLayout = Markup.keyboard([
  ["☎️ Контакти", "🌐 Сайт", "❓ Запитати"],
  [Markup.button.callback("⬅️ Головне меню", "main_menu_button")],
]).resize()

const socialLayout = Markup.keyboard([
  ["Facebook", "Instagram", "Youtube"],
  [Markup.button.callback("⬅️ Головне меню", "main_menu_button"),],
]).resize()

const floorLayout = Markup.keyboard([
  ["Ламінат/Вініл", "Дерев'яна підлога", "Лінолеум/Ковролін"],
  ["Плінтус/Пороги", "Декоративні профілі", "Тепла підлога"],
  [Markup.button.callback("⬅️ Головне меню", "main_menu_button"),],
]).resize()
// Middleware to log the chat ID
// bot.use((ctx, next) => {
//   // Access the chat ID using ctx.chat.id
//   const chatId = ctx.chat.id;
//   console.log('Chat ID:', chatId);

//   // Continue to the next middleware or handler
//   next();
// });

bot.start((ctx) => {
  const chatId = ctx.chat.id;
  // Store the current state as 'send_message'
  userStates[chatId] = MENU_STATES.MAIN_MENU
  // Send a message with the inline keyboard
  ctx.reply("Оберіть пункт меню із кнопок розміщених нижче", mainMenuLayout)
})
// Command handler for /help command
bot.help((ctx) => {
  const chatId = ctx.chat.id
  ctx.reply("This is a help message. You can customize it based on your needs.")
})

bot.hears("Дізнатись має чат-ID", (ctx) => {
  // Access the chat ID using ctx.chat.id
  const chatId = ctx.chat.id
  // Send a message to the same chat
  ctx.reply(`Ваш чат ID: ${chatId}\n\nВін може знадобитися для точної ідентифікації чи розблокування вашого телеграм-аккаунту в нашому боті.\nПовідомте його нашому менеджеру, а далі справа за нами 😉`)
})
/*
bot.hears("📊 Прайс", async (ctx) => {
  const chatId = ctx.chat.id
  userStates[chatId] = MENU_STATES.LAMINATE
  const filePath = ["price/floor/doorin_laminate_13_11_23.pdf", "price/floor/doorin_floor_01_11.pdf"]
  const absolutePath = [path.resolve(__dirname, filePath[0]), path.resolve(__dirname, filePath[1])]
  // Send the file as a document
  try {
    await ctx.replyWithDocument({ source: absolutePath[0] })
    await ctx.replyWithDocument({ source: absolutePath[1] })
  } catch (error) {
    console.error("Error sending file:", error.description)
  }
})

bot.hears("📒 Каталог", async (ctx) => {
  const chatId = ctx.chat.id
  userStates[chatId] = MENU_STATES.LAMINATE
  const filePath = "catalog/Каталог_підлога_складська_03_10_2022.pdf"
  const absolutePath = path.resolve(__dirname, filePath)
  // Send the file as a document
  try {
    await ctx.replyWithDocument({ source: absolutePath });
  } catch (error) {
    console.error("Error sending file:", error.description);
  }
})*/

bot.hears("Ламінат/Вініл", (ctx) => {
  const chatId = ctx.chat.id
  userStates[chatId] = MENU_STATES.LAMINATE
  // Send a message with the inline keyboard
  ctx.reply("Оберіть пункт меню із кнопок розміщених нижче", laminateLayout)
})

bot.hears("Дерев'яна підлога", (ctx) => {
  const chatId = ctx.chat.id
  userStates[chatId] = MENU_STATES.WOODFLOOR
  // Send a message with the inline keyboard
  ctx.reply("Оберіть пункт меню із кнопок розміщених нижче", woodfloorLayout)
})

bot.hears("Підлога", (ctx) => {
  const chatId = ctx.chat.id
  userStates[chatId] = MENU_STATES.FLOOR
  // Send a message with the inline keyboard
  ctx.reply("Оберіть пункт меню", floorLayout)
})

bot.hears("☎️ Зворотній зв'язок", (ctx) => {
  const chatId = ctx.chat.id
  userStates[chatId] = MENU_STATES.CONTACT_US
  // Send a message with the inline keyboard
  ctx.reply("Виберіть варіант зв'язку з нами:", contactUsLayout)
})

bot.hears("Соцмережі", (ctx) => {
  const chatId = ctx.chat.id
  userStates[chatId] = MENU_STATES.SOCIAL
  // Send a message with the inline keyboard
  ctx.reply("Долучайтеся до нас в улюбленій соцмережі", socialLayout)
})

bot.hears("🌐 Сайт", (ctx) => {
  const chatId = ctx.chat.id
  userStates[chatId] = MENU_STATES.CONTACT_US
  // Send a message with the inline keyboard
  ctx.reply("Наш сайт: www.doorin.store", contactUsLayout)
})

bot.hears("❓ Запитати", (ctx) => {
  const chatId = ctx.chat.id
  userStates[chatId] = MENU_STATES.CONTACT_US
  // Send a message with the inline keyboard
  ctx.reply(`Натисніть для зв'язку з менеджером: @olegkostiuk`)
})
bot.hears("☎️ Контакти", (ctx) => {
  const chatId = ctx.chat.id
  userStates[chatId] = MENU_STATES.CONTACT_US
  // Send a message with the inline keyboard
  ctx.reply(`
  Будемо раді Вас чути!

  🕐Пн.-Пт.: 9:00-18:00
  Сб.: 9:00-14:00
  
  🏠м.Вінниця 
  вул.Замостянська 25 офіс 24

  📱+38(096)938-96-28 – Олег
  📱+38(063)313-49-82 – Олег`, contactUsLayout)
})

bot.hears("Facebook", (ctx) => {
  const chatId = ctx.chat.id
  userStates[chatId] = MENU_STATES.SOCIAL
  // Send a message with the inline keyboard
  //ctx.replyWithHTML(`<a href='https://www.facebook.com/DoorInVinnitsa'>DOORIN Facebook Business Page</a>`, { disable_web_page_preview: true }, socialLayout)
  ctx.replyWithHTML(`https://www.facebook.com/DoorInVinnitsa`, { disable_web_page_preview: true }, socialLayout)
})

bot.hears("Instagram", (ctx) => {
  const chatId = ctx.chat.id
  userStates[chatId] = MENU_STATES.SOCIAL
  // Send a message with the inline keyboard
  ctx.replyWithHTML(`https://www.instagram.com/oleg_kostiuk/`, socialLayout)
})

bot.hears("Youtube", (ctx) => {
  const chatId = ctx.chat.id
  userStates[chatId] = MENU_STATES.SOCIAL
  // Send a message with the inline keyboard
  ctx.replyWithHTML(`https://www.youtube.com/@doorin_store`, socialLayout)
})

/*bot.hears("⏪ Назад", (ctx) => {
  const chatId = ctx.chat.id
  // Retrieve the previous state (or default to 'main')
  const prevState = userStates[chatId] || MENU_STATES.MAIN_MENU
  switch (prevState) {
    case MENU_STATES.LAMINATE:
      ctx.reply("Оберіть пункт меню із кнопок розміщених нижче", floorLayout)
      break;
    // Add more cases as needed
    default:
      ctx.reply("Оберіть пункт меню із кнопок розміщених нижче", mainMenuLayout)
      break;
  }
  // Update the current state to the previous state
  userStates[chatId] = prevState;
})

bot.hears("⬅️ Головне меню", (ctx) => {
  const chatId = ctx.chat.id
  // Retrieve the previous state (or default to 'main')
  const prevState = userStates[chatId] || MENU_STATES.MAIN_MENU
  switch (prevState) {
    case MENU_STATES.MAIN_MENU:
    case MENU_STATES.CONTACT_US:
    case MENU_STATES.SOCIAL:
    case MENU_STATES.FLOOR:
      ctx.reply("Оберіть пункт меню із кнопок розміщених нижче", mainMenuLayout)
      break;
    // Add more cases as needed
    default:
      ctx.reply("Оберіть пункт меню із кнопок розміщених нижче", mainMenuLayout)
      break;
  }
  // Update the current state to the previous state
  userStates[chatId] = prevState;
})*/

const buttonActions = {
  'laminate_price_button': async (ctx) => {
    const chatId = ctx.chat.id
    userStates[chatId] = MENU_STATES.LAMINATE
    const filePath = ["price/floor/doorin_laminate_13_11_23.pdf", "price/floor/doorin_floor_01_11.pdf"]
    const absolutePath = [path.resolve(__dirname, filePath[0]), path.resolve(__dirname, filePath[1])]
    // Send the file as a document
    try {
      await ctx.replyWithDocument({ source: absolutePath[0] })
      await ctx.replyWithDocument({ source: absolutePath[1] })
    } catch (error) {
      console.error("Error sending file:", error.description)
    }
  },
  'laminate_catalog_button': async (ctx) => {
    const chatId = ctx.chat.id
    userStates[chatId] = MENU_STATES.LAMINATE
    const filePath = "catalog/Каталог_підлога_складська_03_10_2022.pdf"
    const absolutePath = path.resolve(__dirname, filePath)
    // Send the file as a document
    try {
      await ctx.replyWithDocument({ source: absolutePath });
    } catch (error) {
      console.error("Error sending file:", error.description);
    }
  },
  'laminate_back_button': (ctx) => {
    const chatId = ctx.chat.id
    // Retrieve the previous state (or default to 'main')
    const prevState = userStates[chatId] || MENU_STATES.MAIN_MENU
    switch (prevState) {
      case MENU_STATES.LAMINATE:
        ctx.reply("Оберіть пункт меню із кнопок розміщених нижче", floorLayout);
        break;
      // Add more cases as needed
      default:
        ctx.reply("Оберіть пункт меню із кнопок розміщених нижче", mainMenuLayout);
        break;
    }
    // Update the current state to the previous state
    userStates[chatId] = prevState;
  },
  'main_menu_button': (ctx) => {
    const chatId = ctx.chat.id
    // Retrieve the previous state (or default to 'main')
    const prevState = userStates[chatId] || MENU_STATES.MAIN_MENU
    switch (prevState) {
      case MENU_STATES.MAIN_MENU:
      case MENU_STATES.CONTACT_US:
      case MENU_STATES.SOCIAL:
      case MENU_STATES.FLOOR:
        ctx.reply("Оберіть пункт меню із кнопок розміщених нижче", mainMenuLayout);
        break;
      // Add more cases as needed
      default:
        ctx.reply("Оберіть пункт меню із кнопок розміщених нижче", mainMenuLayout);
        break;
    }
    // Update the current state to the previous state
    userStates[chatId] = prevState;
  },
}

// Handling button clicks
bot.on('callback_query', (ctx) => {
  const buttonId = ctx.callbackQuery.data;
  
  // Lookup and execute the corresponding action based on the buttonId
  const action = buttonActions[buttonId];
  if (action) {
    action(ctx);
  } else {
    // Handle unknown button clicks
  }
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
