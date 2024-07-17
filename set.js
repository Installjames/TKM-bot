const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUpXb1M4dkc5bzlBSEdEWlBUZ21VME0wWUo0b29MUzU5V25GTlozTklWST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0RaQzl1dTVSdjhkTys3bGh3b2JjaFRadHN3VHg4SUJiU00rWThtRnVDbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjSXJGTWZMcm8xUDltQW9sQVpKRmNWYUdhZ3BDUUNUWDBuOUE1aHZGRkZvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjNEJPQUk4RDduYlZYMnh4L1ZRK3FyQlZEQU9oWURwbE0yQlB6bldRQmhBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktFRUFKSmh3REF6N3kwZFJ5T3JmWkY3V1dpSVBSc21YU3RpMDZhdlBtVW89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijl0NGUxMEh1ZHF6TitMZzhQdUpqc2sydVNpeWNhSG9jbkpKYXpIb0lFR009In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUVDYzRqSGd2NXNUMDZ3NE1Ia3FBRGY4ZmJuRGxWcHZzODU1UExWd1EwMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibDc5RGJpUGdzL0lWZGVDeUVwaWoxVWs3cytQTERNVGhLTWxlK05aeUlEaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlExN3lnL08vYkhUcXkxWGxrTGFnOW56QjlPYW5BVktDOVFqazJxK2hsdWIwbFF6R0UvNzQwZHJSRVR0bHB1dklEemxoQlp4RVdQd3JoeEp1M2RPMUFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ0LCJhZHZTZWNyZXRLZXkiOiJFNWlQSXFzdU9kWWRxUE9lNDZialVoQlFPTlhVYkZmVlFXaWN2NzJseFdjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI3VVRxNUM5WlJMaTkyc3Z0YnMxc1BRIiwicGhvbmVJZCI6IjkyMjQyNTc4LTYwZjAtNGI4Ni1iZTg1LWMzMDk5ZTdhOTA2MyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5Y0dCd1VkcllGTStVbG9JL0tXMm5tT1FlSGc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV2pJajB3ZTRndlYwakdiNyt0N0o4TWx1Y1dnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjMzRkhXQkJWIiwibWUiOnsiaWQiOiIyMzQ5MTI3MjM3NTA2OjM1QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOREltY1lGRU56UzRMUUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIzdUk3aGNuMW5vUElJcmJLZFkwc01Db2tQNW5kYUd2Y3d0Rnc4K0NkdzJZPSIsImFjY291bnRTaWduYXR1cmUiOiJCOFJSZ3RQR3BaK0lES1VZb1lUYzhuSSt0Lzh0K3Zmd2NicWhTazNxZ1BRRHQzbFhLY3h6L1Y0cit0emhnMjRxK3RtY1RIUHVNQUUyYnhuV3o4QWlCUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTlVzeXBNa0FBd3VBNGxmY1ozOUVsNVozQUU4Z0cyVExINTVGSHZQSS9GdkJDSHpOQzhCWFpIS2dBTzVlbGdyNTBJZm5YK0Jvamk3VmVubVg4UFF6Qnc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTI3MjM3NTA2OjM1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmQ3aU80WEo5WjZEeUNLMnluV05MREFxSkQrWjNXaHIzTUxSY1BQZ25jTm0ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjEyNDgxMDUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ2N6In0=',
    PREFIXE: process.env.PREFIX || "",
    OWNER_NAME: process.env.OWNER_NAME || "ProfessorBotz",
    NUMERO_OWNER : process.env.OWNER_NUM || "2349127237506",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'EMMYBOTZ-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
