const config = require('../config.json');

exports.run = (discord, client, message, args) => {
    if (message.channel.id === config.VERIFICATION_CHANNEL_ID) {
      message.author
        .createDM()
        .then(dmchannel =>
          dmchannel
            .send(
              "Please reply using !email followed by a space and your Drexel E-Mail for Verification\n*(For example, '!email xyz123@drexel.edu' or '!email xyz@dragons.drexel.edu')*"
            )
            .catch(reason => console.log(reason))
        )
        .catch(reason => console.log(reason));
    } else {
              message.channel
                .send("Please use '!verify' in the appropriate channel.")
                .catch(reason => console.log(reason));
    }
  }