const Keyv = require("keyv")
const sgMail = require("@sendgrid/mail");
const config = require("../config.json");

const ALPHANUM =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

makeid = length =>
  [...Array(length)]
    .map(() => ALPHANUM.charAt(Math.floor(Math.random() * ALPHANUM.length)))
    .join("");

sendEmail = (email_address, code) =>
  sgMail
    .send({
      from: config.FROM_EMAIL,
      subject: config.EMAIL_SUBJECT,
      to: email_address.replace("!", ""),
      html: "This code expires in 30 minutes. Your <strong>verification code</strong> is: " + code
    })
    .then(
      () => {},
      error => {
        console.log(error);
      }
    );

exports.run = (discord, client, message, args, discord_email, code_email_temp, code_discord_temp) => {
    let email_address = args.shift();
    
    if (
      new RegExp(config.EMAIL_REGEX).test(email_address)
    ) {
      let code = makeid(6);
      console.log(code);
      code_email_temp.set(code, email_address, 10 * 60 * 1000);
      code_discord_temp.set(code, message.author.id, 10 * 60 * 1000);
      
      sendEmail(email_address, code)
          .then(
            message.channel
              .send(
                "Please check your email and reply with !code followed by a space and the code we sent you! (example '!code ######').\nThis code expires in 30 minutes.\nIt may be in your **JUNK** or **SPAM** folder."
              )
              .catch(reason => console.log(reason))
          )
          .catch(reason => console.log(reason));

      /* Send a rich embed message into channel */
      client.channels.cache
        .get(config.VERIFICATION_LOG_CHANNEL_ID)
        .send({
          embed: {
            color: 39423,
            title: "Verification Request",
            fields: [
              {
                name: "E-Mail",
                value: email_address
              },
              {
                name: "Code",
                value: code
              }
            ],
            footer: {
              text: "Requested by " + message.author.username,
              icon_url: message.author.displayAvatarURL
            }
          }
        })
        .catch(reason => console.log(reason));
    } else {
      message.channel
        .send("That is not a valid email address.")
        .catch(reason => console.log(reason));
    }
};