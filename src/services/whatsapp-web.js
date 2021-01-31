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
      case 0:
      case 3:
      case 9:
        msg.reply("Hello My love! 😍");break;
      case 1:msg.reply("❤️❤️");break;
      case 2: msg.reply("😍😍😍");break;
      case 4: msg.reply("I love you 👸");break;
      case 5: msg.reply("I love you more😍");break;
      default: msg.reply("Honey 😘");break;
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
