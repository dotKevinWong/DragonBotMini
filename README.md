# DragonBot Mini

# Info

DragonBot Mini is a super simple discord email verification bot. It's a stripped down version of [DragonBot](https://github.com/dotKevinWong/DragonBot) which is currently in use on our [DrexelDiscord](https://drexeldiscord.com) server.

Built using [Discord.js](https://discord.js.org), [KeyV](https://github.com/lukechilds/keyv), [SendGrid](https://github.com/sendgrid/sendgrid-nodejs)

Some code based on [seanbudd](https://github.com/seanbudd)/[discord-email-verification](https://github.com/seanbudd/discord-email-verification) bot.

# Setup

Requires node/npm. You can use LTS or the latest version.

Run `npm install .`

# Config

```js
{
    "DISCORD_API_KEY": "", // Discord Developer Bot Token (https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
    "SERVER_ID": "", // Discord Server ID (https://support.discord.com/hc/en-us/articles/206346498)
    "PREFIX": "!", // Preferred prefix for calling bot commands
    "VERIFICATION_CHANNEL_ID": "", // Channel ID for where !verify command is called
    "VERIFICATION_LOG_CHANNEL_ID": "", // Channel ID for where the bot logs verifications
    "ROLE_NAME": "Verified", // Verification Role Name
    "EMAIL_API_KEY": "", // SendGrid Email API Key 
    "EMAIL_REGEX": "[^!]*@example.com", // Verification email to filter. Use * for any email
    "FROM_EMAIL": "noreply@example.com", // Display email where emails are sent
    "EMAIL_SUBJECT": "", // Email Subject
    "DM_COMMAND_ARRAY": [ // Ignore
        "email",
        "code"
    ],
    "SERVER_COMMAND_ARRAY": [ // Ignore
        "verify"
    ]
}
```

# Running

Start the bot by running

`>>> node bot.js`

or

`>>> npm start`
