const discord = require('discord.js');
const sgMail = require('@sendgrid/mail');
const Keyv = require('keyv');
const config = require('./config.json')

const client = new discord.Client();
client.login(config.DISCORD_API_KEY).then(console.log("Logged into Discord API!"))
client.once("ready", () => console.log("Starting DragonBot!"));

const discord_email = new Keyv("sqlite://database.sqlite", {
  namespace: "discord_email"
});

const code_email_temp = new Keyv("sqlite://database.sqlite", {
  namespace: "code_email_temp"
});

const code_discord_temp = new Keyv("sqlite://database.sqlite", {
  namespace: "code_discord_temp"
});

sgMail.setApiKey(config.EMAIL_API_KEY);

setInterval(function() {
    discord_email.clear();
    code_discord_temp.clear();
    code_email_temp.clear();
  }, 60 * 60 * 500);

  client.on("message", message => {
    if (message.author.bot) {
      return;
    }
    if (message.content.charAt(0) == config.PREFIX) {
      const args = message.content.slice(config.PREFIX.length).split(" ");
      const command = args.shift().toLowerCase();
      
      if (message.channel.guild == null) {
        let in_config = false;
        for (let j = 0; j < config.DM_COMMAND_ARRAY.length; j++) {
          if (command === config.DM_COMMAND_ARRAY[j]) in_config = true;
        }
        if (in_config) {
          try {
            let commandFile = require(`./commands/${command}.js`);
            commandFile.run(
              discord,
              client,
              message,
              args,
              discord_email,
              code_email_temp,
              code_discord_temp
            );
          } catch (err) {
            console.error(err);
          }
        }
      
      } else if (message.channel.guild.id == config.SERVER_ID) {      
        let in_config = false;
        for (let j = 0; j < config.SERVER_COMMAND_ARRAY.length; j++) {
          if (command === config.SERVER_COMMAND_ARRAY[j]) in_config = true;
        }
        if (in_config) {
          try {
            let commandFile = require(`./commands/${command}.js`);
            commandFile.run(
              discord,
              client,
              message,
              args
            );
          } catch (err) {
            console.error(err);
          }
        }
      } else if (message.type === "GUILD_MEMBER_JOIN") {
        message.channel
          .send("Send '!verify' to access other channels")
          .catch(reason => console.log(reason));
      }
    }
  });
  