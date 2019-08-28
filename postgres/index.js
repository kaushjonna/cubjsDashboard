const { Client } = require('pg');
const client = new Client({
  user: "kaush",
  password: "toor",
  host: "localhost",
  port: 5432,
  database: "mediajel"
})

client.connect()
  .then(() => console.log('Connected to database, MEDIAJEL'))
  .catch(err => console.log('something went wrong', err))
  .finally(() => client.end())