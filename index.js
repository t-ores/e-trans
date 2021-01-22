const xlsx = require('./app/index');
const func = require('./app/func.js');

//C:\Users\Yakim\AppData\Local\Google\Chrome\User Data\Default\Extensions\

async function start() {
 try {
  await xlsx.getXLSX();
  // await mongoose.connect('mongodb+srv://xdaclaster123:xdaclaster123@xdacluster.gjaig.mongodb.net/xdaCluster', {
  //  useUnifiedTopology: true,
  //  useNewUrlParser: true,
  //  useFindAndModify:false
  // });

 }catch (e) {
  console.log(e)
 }
}

start();