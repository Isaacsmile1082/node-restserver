require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use( require('./routes/index') );

// habilitar la carpeta de public
app.use( express.static( path.resolve(__dirname, '../public' )));


mongoose.connect(process.env.urlDB, { useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true} ,(err, res)=> {

    if ( err ) {
        throw err;
    }
    console.log('Base de datos ONLINE');

});

mongoose.set('useCreateIndex', true)

 
app.listen(process.env.PORT, ()=> {
    console.log('Escuchando en el puerto',process.env.PORT );
});
