const { Telegraf } = require('telegraf');
const conf = require('./config.json');
const token = conf[0].token;
const bot = new Telegraf(token);
const func = require('./app/func.js');

bot.start( ctx => ctx.reply(`   
   Привет ${ctx.from.first_name}!
   Узнай актуальную информацию из dsbt.gov.ua .
   Получить список команд - /help."
`));
bot.help((ctx) => ctx.reply('/new - завантажити список дозволів виданих сьогодні. \n'+'/update - актуалізувати дані.')) ;

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
 cb_perm = ctx.match;
 getdata(cb_perm)
  .then((result)=>{
   /**/
   for (let i = 0; i< result.length; i++) {
    console.log('result['+i+']', result[i].res);
     ctx.telegram.sendMessage(ctx.chat.id, result[i].res,
     {
      parse_mode:'HTML',
      disable_web_page_preview:true,
      reply_markup:{
       inline_keyboard:[
         [{text: "Видалити зі списку", callback_data:"deleteMsg"}]
       ]
      }
     });
   }
  })
});

bot.action('deleteMsg', (ctx)=>{
	ctx.deleteMessage();
});


bot.action('DA', (ctx) =>{
 ctx.deleteMessage();
 cb_perm = ctx.match;
 getdata(cb_perm)
  .then((result)=>{
   /**/
   console.log(result.length);

   for (let i = 0; i< result.length; i++) {
    console.log('result['+i+']', result[i].res);
    ctx.telegram.sendMessage(ctx.chat.id, result[i].res,
     {
      parse_mode:'HTML',
      disable_web_page_preview:true,
      reply_markup:{
       inline_keyboard:[
         [{text: "Go back to menu", callback_data:"go-back"}]
       ]
      }
     });

   }
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
 const fs = require('fs');
 let fileName = fs.readFileSync("./tmp/link/link.txt", "utf8");
 const obj = require('./tmp/json/'+fileName.slice(0,-5)+'.json');
 let data = [];

 await obj.forEach(item =>{

  //if((cb_perm !== '')&&(cb_perm === 'DV')){
   //console.log(cb_perm);
   if ((item.today !== 0)&&(item.today !== 'Видано сьогодні')&&(item.permission === 'Дозвіл вантажний')){
    let res = `${item.permission}
<b>ПВД:</b> <a href="www.google.com/search?q=ПВД+${item.pvd}">${item.pvd}</a>
<b>Країна дозволу:</b> ${item.country}
<b>Вид дозволу:</b> ${item.type}
<b>Рік дозволу:</b> ${item.year}
<b>Поточний залишок:</b> ${item.remainder}
<b>Видано сьогодні:</b> ${item.today}
<b>Видано з початку місяця:</b> ${item.v_month}
<b>Видано з початку року:</b> ${item.v_year}
`;
    data.push({
     res
    });
   }
  //}
 });
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

//-----------------------ТЕСТ-----------------------------------------//
bot.command('update', (ctx)=>{
 ctx.deleteMessage();
 ctx.telegram.sendMessage(ctx.chat.id, 'Актуалізувати інформацію? \n' +
  'Це може зайняти деякий час. Не більше 5-ти хвилин.',
  {
   reply_markup:{
    inline_keyboard:[
     [{text: "Так", callback_data:"actualizeData"}, {text: "Ні", callback_data:"go-back"}]
    ]
   }
  })
});
bot.action('actualizeData', (ctx) =>{
 ctx.deleteMessage();
 ctx.telegram.sendMessage(ctx.chat.id, 'Wait...');
 //aData = ctx.match;
 //console.log(aData);
 update()
  .then((result)=>{
   /**/
   //console.log('actualizeData result[0]', result[0]);
   ctx.telegram.sendMessage(ctx.chat.id, 'Нові данні завантажені.\n'+'Інформація актуальна!',
     {
      parse_mode:'HTML',
      disable_web_page_preview:true,
      reply_markup:{
       inline_keyboard:[
        [{text: "Go back to menu", callback_data:"go-back"}]
       ]
      }
     });

  })
});

async function update(){
 try {
  const index = require('./app/index');
  await index.getXLSX();
  console.log('log here 173');
 }catch (e) {
  console.log(e);
 }finally {
  console.log('finally');
 }
}
//-----------------------ТЕСТ-----------------------------------------//

bot.launch();