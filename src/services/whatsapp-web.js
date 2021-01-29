const qrcode = require("qrcode-terminal");

const { Client } = require("whatsapp-web.js");

const state = require("./state.js");

const client = new Client();

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
