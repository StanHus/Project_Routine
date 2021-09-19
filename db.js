const Client = require("pg").Client;
//require("dotenv").config();


const client = new Client({
    user: "postgres",
    password: "Papa1973",
    host: "localhost",
    port: 5432,
    database: "workout"
})


// const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

// const proConfig = process.env.DATABASE_URL;

// const client = new Client({
//   connectionString:
//     process.env.NODE_ENV === "production" ? proConfig : devConfig,
// });

module.exports = client;
