const express = require('express');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express();
app.set('port', process.env.PORT || 3001);
app.use(express.json());

app.listen(app.get('port'), () => console.log(`App is running on localhost: ${app.get('port')}`));

