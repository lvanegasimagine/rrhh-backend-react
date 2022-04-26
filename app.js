const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv/config');

//Import Routes
const departamentoRouter = require('./routes/departamento.routes');
const cargoRouter = require('./routes/cargo.routes');

const api = process.env.API_URL;

app.use(cors());
app.options('*', cors());

// Middlewares
app.use(bodyParser.json());
app.use(morgan('tiny'));

//Routers
app.use(`${api}/departamento`, departamentoRouter);
app.use(`${api}/cargo`, cargoRouter);

mongoose.connect(process.env.CONNECTION_STRING,{ useNewUrlParser: true, useUnifiedTopology: true, dbName: 'rrhh' }).then(() => {
    console.log('Database Connection is ready...')
}).catch((err) => {
    console.error(err);
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is runnig http://localhost:${process.env.PORT}`);
    console.log(api);
});