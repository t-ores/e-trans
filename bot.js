const { Telegraf } = require('telegraf');
const token = '1459568288:AAE9SHrNmGZH07szvYGzlc9Y1Rd1LQ4qOHs'; //
const bot = new Telegraf(token);
//const parse = require('./parsejson.js');
//const getjson = require('./getjson.js');
//const test = require('./test.js');
const func = require('./app/func.js');

// кнопки меню
/**/
// const menu = () => {
//   return Telegraf.Extra
//     .markup((m) =>
//       m.inlineKeyboard([
//         [
//           m.callbackButton('Press 0', '0'),
//           m.callbackButton('Press 1', '1')
//         ]
//       ])
//     )
// };
/**/
//const xx = getjson.json;
//console.log(xx);


bot.start( ctx => ctx.reply(`   
   Привет ${ctx.from.first_name}!
   Узнай актуальную информацию из dsbt.gov.ua .
   Получить список команд - /help."
`/*, menu()*/));

bot.help((ctx) => ctx.reply('Send me a parameter to get a response\n /z  /p  /b ')) ;

bot.on('text', async (ctx) => {
	if (ctx.message.text === 'z') {
		try{
   //const Data = await test.parse(xx[0]); //сюда помещаем сообщение юзера
   const data = await func.PrmToday(); //сюда помещаем сообщение юзера

   ctx.reply('New permits issued today:'+data.length); //и выведем полученные данные

   const obj = JSON.parse(data, function(k, v) {
    if (k === ''){
     console.log('if', v);
     return v;
    }
    console.log('no if',v);
    return v;
   });
   console.log('obj', obj);

   // data.forEach(item =>{
   //  ctx.reply(item);
   // });

		}catch(e){
			ctx.reply(e);
		}
	}else{
		ctx.reply('command "'+ctx.message.text+'" not found! \n/help - get commands list.');
	}
});

// bot.on('callback_query', (ctx) => {
//     // отвечаем телеграму что получили от него запрос
//     ctx.answerCbQuery();
//     // удаляем сообщение
//     //ctx.deleteMessage();
//     // отвечаем на нажатие кнопки
//     ctx.reply(ctx.callbackQuery.data, menu())
//   });


bot.command('new', (ctx) => {
 //ctx.reply('New permits issued today')
 ctx.telegram.sendMessage(ctx.chat.id, 'New permits issued today: \n',
  {
    reply_markup:{
     inline_keyboard:[
      [{text: "click me", url:"google.com"}, {text: "click me 2", url:"youtube.com"}],
      [{text: "click me 3", url:"https://opendata.e-transport.gov.ua/PermitsRests/"}]
     ]
    }
  })
});
/*
bot
  .on('message', (ctx) => {
    ctx.reply("Выберите действие.", menu());
  })
  .on('callback_query', (ctx) => {
    // отвечаем телеграму что получили от него запрос
    ctx.answerCbQuery();
    // удаляем сообщение
    ctx.deleteMessage();
    // отвечаем на нажатие кнопки
    ctx.reply('You press '   ctx.callbackQuery.data, menu())
  });
*/

bot.launch();

/*
bot.on('text', async (ctx) => {
   try {
       const userText = ctx.message.text
       const covidData = await covidApi.getReportsByCountries(userText)
       const countryData = covidData[0][0]
       const formatData = `
           Страна: ${countryData.country},
           Случаи: ${countryData.cases},
           Смерти: ${countryData.deaths},
           Выздоровело: ${countryData.recovered}`
       ctx.reply(formatData)
   } catch(e) {
       ctx.reply('Такой страны не существует, для получения списка стран используй команду /help')
   }
})
*/
