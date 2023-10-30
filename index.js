const { Telegraf } = require('telegraf');
const request = require('request');

const bot = new Telegraf('5543993607:AAHiITIAqpMJYo4YiZvJktfCfV0bXK-lKJM');

bot.command('/start', async (ctx) => {
    // Отправка сообщений клиенту
    await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.message.chat.first_name}`);

    // Ответ на сообщение, отправленное Боту
    ctx.reply(`Ты отправил текст: ${ctx.message.text}`)
});

bot.command('/start2', async (ctx) => {
    const answer = "Привет, " + ctx.message.chat.first_name + "!\n\n"
        + 'Сыиграем в игру: камень-ножницы-бумага?\n'
        + '/stone - твой камень \n'
        + '/scissors - тво ножницы \n'
        + '/paper - твоя бумага \n'
        + '\n\n'; 
    
    // Ответ на сообщение, отправленное Боту
  ctx.reply(answer)
});

//Обработка команды /stone
bot.command('/stone', (ctx) => {
    ctx.reply("А у меня бумага  - ты проиграл!!!")
})
//Обработка команды /scissors
bot.command('/scissors', (ctx) => {
    ctx.reply("А у меня камень  - ты проиграл!!!")
})
//Обработка команды /paper
bot.command('/paper', (ctx) => {
    ctx.reply("А у меня ножницы  - ты проиграл!!!")
})

//Обработка команды /rates
bot.command('/rates', (ctx) => {
    //ctx.reply("Курсы валют")
    request('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', function (error, response, body) {
        const data = JSON.parse(body);
        let answer = "Курсы Валют:\n"
        data.forEach(item => {
            answer += 
            `
            ${item.ccy} => ${item.base_ccy} 
            Покупка: ${item.buy}
            Продажа: ${item.sale}
            ======================
            `
        });  
        ctx.reply(answer)
});
})

//Start bot
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));