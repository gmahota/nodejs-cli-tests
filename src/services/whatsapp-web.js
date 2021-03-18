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
      case 0: msg.reply("Mudando de assunto esse novo job tudo a postos?");break;
      case 1: msg.reply("Vais ter de fazer a indução novamente?");break;
      case 2: msg.reply("Interessante");break;
      case 3: msg.reply("Espero ver muito codigo teu.");break;
      case 4: msg.reply("Muita força ai.");break;
      case 5: msg.reply("De nada");break;
      case 6: msg.reply("Acabaste de conversar com o meu boot, ainda em produção (5% do fim), https://github.com/gmahota/nodejs-cli-tests  - branch whatsapp-web . Se achaste interessante please coloca 1 star 😃");break;
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
