// Require Node Dependencies.
const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// Constants.
const expressServer = express();
const server = {};

// Express Metoder. De fungere som hjælpere til at håndtere http requests osv.
expressServer.use(express.json());
expressServer.use(express.urlencoded({extended: true}));
expressServer.use(express.static('client'));
expressServer.use(cors());

// Client Endpoint
expressServer.get('/', (req, res) => {

    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.sendFile(path.resolve(__dirname, '../client/index.html'));

});

expressServer.get('/wall', (req, res) => {

    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.sendFile(path.resolve(__dirname, '../client/wall.html'));

});

// Init metode til at starte serveren.
server.run = () => {

    // Getting Server Port to listen for.
    let port = process.env.PORT || 3000;


    // Start HTTP serveren.
    expressServer.listen(port, () => {

        console.log('\x1b[32m%s\x1b[0m','------------------------\n');
        console.log('\x1b[32m%s\x1b[0m','Serveren benytter følgende adresse http://localhost:' + port);
        console.log('\x1b[32m%s\x1b[0m','\n------------------------');

    });

}

// Exporting
module.exports = server;