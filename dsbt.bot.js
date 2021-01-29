const { Telegraf } = require('telegraf');
const token = '1459568288:AAE9SHrNmGZH07szvYGzlc9Y1Rd1LQ4qOHs';
const bot = new Telegraf(token);
const axios = require('axios');
const func = require('./app/func.js');

bot.start( ctx => ctx.reply(`   
   Привет ${ctx.from.first_name}!
   Узнай актуальную информацию из dsbt.gov.ua .
   Получить список команд - /help."
`));
bot.help((ctx) => ctx.reply('/new - завантажити список дозволів виданих сьогодні. ')) ;

bot.command('new', (ctx) => {
 ctx.telegram.sendMessage(ctx.chat.id, 'Оберіть тип дозволу: \n',
  {
   reply_markup:{
    inline_keyboard:[
     [{text: "Дозвіл вантажний", callback_data:"DV"}, {text: "Дозвіл автобусний", callback_data:"DA"}]
    ]
   }
  })
});


bot.action('DV', (ctx) =>{
 ctx.deleteMessage();
 statecode = ctx.match;
 getdata()
  .then((result)=>{
   ctx.telegram.sendMessage(ctx.chat.id, result,
    {
     reply_markup:{
      inline_keyboard:[
       [{text: "Go back to menu", callback_data:"go-back"}]
      ]
     }
    })
  })
});

// bot.action('DV', (ctx) =>{
//  ctx.deleteMessage();
//  getdata();
//  ctx.telegram.sendMessage(ctx.chat.id, 'text',
//   {
//    reply_markup:{
//     inline_keyboard:[
//      [{text: "Go back to menu", callback_data:"go-back"}]
//     ]
//    }
//   })
// });

bot.action('go-back', (ctx)=>{
 ctx.deleteMessage();
 ctx.telegram.sendMessage(ctx.chat.id, 'Оберіть тип дозволу: \n',
  {
   reply_markup:{
    inline_keyboard:[
     [{text: "Дозвіл вантажний", callback_data:"DV"}, {text: "Дозвіл автобусний", callback_data:"DA"}]
    ]
   }
  })
});

async function getdata(){
 //const res = await func.Convert();
 
 DataArr = res.Sheet1;
 //dataPermits = DataArr.filter((elem) => {return elem.permission === 'Дозвіл вантажний'});
 //dataPermitsToday = dataPermits.filter((elem) => {return elem.today !== 0});

 //console.log(DataArr.length);
 //console.log(dataState);
 // cases = dataState[0];
 //
 let data = [];
 for (var i = 0; i < DataArr.length; i++) {
  if((DataArr[i].permission === 'Дозвіл вантажний')||(DataArr[i].today !== 0)){
   let item = res.Sheet1[i];
   data.push({
    item
   });
  }
 }
 console.log(data);

 // results = `Case in ${cases.state}:
 //   Confirmed: ${cases.confirmed}
 //   Active : ${cases.active}
 //   Recovered: ${cases.recovered}
 //   Deaths: ${cases.deaths}
 //   `;
 // console.log(results);
 return data;
}
// async function getdata(statecode){
//  url = 'https://api.covid19india.org/data.json';
//  let res = await axios.get(url);
//  stateDataArr = res.data.statewise;
//  dataState = stateDataArr.filter((elem) => {return elem.statecode == statecode});
//  cases = dataState[0];
//
//  results = `Case in ${cases.state}:
//    Confirmed: ${cases.confirmed}
//    Active : ${cases.active}
//    Recovered: ${cases.recovered}
//    Deaths: ${cases.deaths}
//    `;
//  console.log(results);
//  return results;
// }

bot.launch();