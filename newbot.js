const { Telegraf } = require('telegraf');
const conf = require('./config.json');
const token = conf[0].token;
const bot = new Telegraf(token);
const axios = require('axios');

bot.start( ctx => ctx.reply(`   
   Привет ${ctx.from.first_name}!
   Узнай актуальную информацию из dsbt.gov.ua .
   Получить список команд - /help."
`));

bot.command('new', (ctx) => {
 //ctx.reply('New permits issued today')
 ctx.telegram.sendMessage(ctx.chat.id, 'New permits issued today: \n',
  {
   reply_markup:{
    inline_keyboard:[
     [{text: "Delhi", callback_data:"DL"}, {text: "Maharashtra", callback_data:"MH"}],
     [{text: "Madhya Pradesh", callback_data:"MP"}]
    ]
   }
  })
});

// bot.action('DL', (ctx) =>{
//  ctx.deleteMessage();
//  result = getdata();
//  ctx.telegram.sendMessage(ctx.chat.id, result,
//   {
//    reply_markup:{
//     inline_keyboard:[
//      [{text: "Go back to menu", callback_data:"go-back"}]
//     ]
//    }
//   })
// });
bot.action('DL', (ctx) =>{
 ctx.deleteMessage();

 statecode = ctx.match;

 getdata(statecode)
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

bot.action('MH', (ctx) =>{
 ctx.deleteMessage();

 statecode = ctx.match;

 getdata(statecode)
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

bot.action('MP', (ctx) =>{
 ctx.deleteMessage();

 statecode = ctx.match;

 getdata(statecode)
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

bot.action('go-back', (ctx)=>{
 ctx.deleteMessage();
 ctx.telegram.sendMessage(ctx.chat.id, 'New permits issued today: \n',
  {
   reply_markup:{
    inline_keyboard:[
     [{text: "Delhi", callback_data:"DL"}, {text: "Maharashtra", callback_data:"MH"}],
     [{text: "Madhya Pradesh", callback_data:"MP"}]
    ]
   }
  })
});

// function getdata(){
//  url = 'https://api.covid19india.org/data.json';
//  axios.get(url)
//   .then((res)=>{
//    stateDataArr = res.data.statewise;
//    dataState = stateDataArr.filter((elem) => {return elem.statecode == 'DL'});
//    cases = dataState[0];
//
//    results = `Case in ${cases.state}:
//    Confirmed: ${cases.confirmed}
//    Active : ${cases.active}
//    Recovered: ${cases.recovered}
//    Deaths: ${cases.deaths}
//    `;
//    console.log(results);
//    return results;
//   })
// }

// async function getdata(){
//  url = 'https://api.covid19india.org/data.json';
//  let res = await axios.get(url);
//  stateDataArr = res.data.statewise;
//  dataState = stateDataArr.filter((elem) => {return elem.statecode == 'DL'});
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

async function getdata(statecode){
 url = 'https://api.covid19india.org/data.json';
 let res = await axios.get(url);
 stateDataArr = res.data.statewise;
 dataState = stateDataArr.filter((elem) => {return elem.statecode == statecode});
 cases = dataState[0];

 results = `Case in ${cases.state}:
   Confirmed: ${cases.confirmed}
   Active : ${cases.active}
   Recovered: ${cases.recovered}
   Deaths: ${cases.deaths}
   `;
 console.log(results);
 return results;
}

bot.launch();