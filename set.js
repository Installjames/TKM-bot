const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0xiV1RTcGVOcUxDYysvemFvMDI0NWtCaENVYUZYbi9WMGkwNWQzMlRYUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoick9nWFN2YXNsMG5pZUVqUVlmcVovbnlITG0xYmtvZHJmUWRxOWhkNytuaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZTGlGUTdzWXJDcGpWcnUzTjBEVmJMS1BETG85dEU3TjROclI4SWJiSTJBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4amhFa0pDMzQxODVzRnRROEZVeXpLMUlYaVlmbnJiMzFXWEw0Vjhqc1cwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNGa3RCK093ZDdjT3F2OUlLaGpXTnNadDJlNVVNOWNtOFo0Z01wWTYwbjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpUSnpTdTl1ZVRVUmRad2RORW1XWXVDSCthcjBHQ1J4SHFYNUo3aG81eEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU1jVGlWd0d3WW5TOUg5RUhjQVVCZys5SGFwRFF2bXkvUnYwU2U3bWJWMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoielJ6T1UrOGI0U2dKSXFMWW1pRy8xcTNKeURUQzRTaFpJbC9ndXFSaW5XRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklSOGVGOWdaaEc0MVdYNlQzeG5BNkp0cDg0NWVVYitpZTl3OWRCeWUyUmxUb2twMVlYcmpJYTQvbjdzbVA4aFlaKzZMS1k1citTd294eXh3Mk9MMmpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEwLCJhZHZTZWNyZXRLZXkiOiJ3a2JraWZYanFwNFhQOWlURmVPQjJMSkhPb3NLbkRscHJkTlNJU3hpbWdnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJyMll2UG9oaVFkMmRmU241Z0lTNWxnIiwicGhvbmVJZCI6IjFiMTgyNDk4LTE3MDAtNGY0Yi1iODliLWU0NTYzZjIwNzdkYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQRHI1YStpOFVGRUsxVFdxaWlmb1VQUjc4L3c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTDNkTis1V0U4b25aN0Z4cGhwb0NvcVNZM3FJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjNOQllEQUZNIiwibWUiOnsiaWQiOiIyMzQ5MTI3MjM3NTA2OjMyQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOL1hvcElHRUszUDM3UUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJPbFNuTHNWTXRnTmJqK3lYUlFsRFJ6UDI5dGx5eE1EeGdaUXIrd2xRcmtzPSIsImFjY291bnRTaWduYXR1cmUiOiJsR01UKzZvMEZsSzEwaXdsVXd0VmJ4WGtaWjR0V2lINDE5WFhuNExDenRldUdBbHJ5dE5mV2tXc0RSQmxmNkJPSTgvTWpiYTNmMWdxQkR5RjdHREJBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoidFl3MkJWeWo3UTlMM2VlR0p3a040YmhJM0o1c2d4bnFvMDN2RzkrZXRlU05COElBQndjbmFkUEk0ckVUVW9yaVNHT3MvSHhrZVdmQ2tpYWI2cGgxaXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTI3MjM3NTA2OjMyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlRwVXB5N0ZUTFlEVzQvc2wwVUpRMGN6OXZiWmNzVEE4WUdVSy9zSlVLNUwifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjEyMzEyOTAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSng5In0=',
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
