const Keyv = require("keyv")
const config = require("../config.json");

exports.run = (discord, client, message, args, discord_email, code_email_temp, code_discord_temp) => {
  let text = args.shift()
  console.log(text);
  
  if (text.match(/^[a-zA-Z0-9]{6}$/)){
    Promise.all([code_email_temp.get(text), code_discord_temp.get(text)])
      .then(([email_address, discord_id]) => {
        if (email_address && discord_id && discord_id === message.author.id) {
          discord_email.set(message.author.id, email_address);
          let guild = client.guilds.cache.get(config.SERVER_ID);
          
          let role = guild.roles.cache.find(role => role.name === config.ROLE_NAME);
          guild.members.fetch(message.author).then(guildMember =>
              guildMember.roles.add(role.id)
                .then(message.channel.send("You are now **verified!**")
                    .catch(reason => console.log(reason))
                )
            )
            .catch(reason => console.log(reason));
          guild.client.channels.fetch(config.VERIFICATION_LOG_CHANNEL_ID)
            .then(channel => {    
              channel.messages.fetch()
              .then(messages => {
                for (const mess of messages.array()) {
                  if (!Array.isArray(mess.embeds) || !mess.embeds.length) {

                  } else {
                    if (mess.embeds[0].fields[0].value === email_address) {
                      mess.delete();
                    }
                  }
                }
              }).catch(reason => console.log(reason));
          
            }).catch(reason => console.log(reason));
        } else {
          message.channel.send(
            "That code isn't right. Please make sure you have the right code."
          );
        }
      })
      .catch(reason => console.log(reason));
  }
}