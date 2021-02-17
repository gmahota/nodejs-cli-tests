const dotenv = require ("dotenv");

const qrcode = require("qrcode-terminal");

const { Client } = require("whatsapp-web.js");

const state = require("./state.js");

dotenv.config();

const client = new Client();
let count = 0;

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  // console.log(msg.body);
  // console.log(msg.from)

  state.saveJson(msg);

  
  const contact = process.env.contact


  if(msg.from === contact){
    switch(count){
      case 0: msg.reply("Boss");break;
      case 1: msg.reply("Quando voltas a Jogar");break;
      case 2: msg.reply("Muita, força no Africano");break;
      case 3: msg.reply("Espero que consigas vencer o maximo");break;
      case 4: msg.reply("denada");break;
      case 6: msg.reply("Abaste de conversar com o meu chatbook programado!!!");break;
      case 9: msg.reply("kkkkk");break;
    }
    count ++;
  }

  if (msg.body === "!claudia") {
    msg.reply("Hello My love! 😍");
  }

  if (msg.hasMedia) {
    const media = await msg.downloadMedia();
    const mimetype = media.mimetype.split("/");

    const extension =
      mimetype[0] === "audio" ? 
        mimetype[1].split(";")[0] : 
        mimetype[1];

    state.save(media.data, msg.id.id, extension);
    // do something with the media data here
  }
});

client.initialize();
