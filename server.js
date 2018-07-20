var express = require('express');
var path = require('path');
var Base64 = require('js-base64').Base64;
var request = require('request');
const axios = require('axios');
var app = express();

var sandboxUrl = 'https://sandbox.moip.com.br/assinaturas/v1'
var moipApiUrl = sandboxUrl;
var moipBeareToken = Base64.encode('MOIP_API_TOKEN:MOIP_API_KEY');

const instance = axios.create({
    baseURL: moipApiUrl,
    timeout: 1000,
    headers: {'Content-Type': 'application/json'},
    auth: {
        'bearer': moipBeareToken
    }
});
//app.use(express.static(__dirname)); // Current directory is root
app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

app.post('/api/criar-plano', function(req, res) {
    // Dados para criação do plano 
    // data = {
    //     "code": "plan101",
    //     "name": "Plano Especial",
    //     "description": "Descrição do Plano Especial",
    //     "amount": 990,
    //     "setup_fee": 500,
    //     "max_qty": 1,
    //     "interval": {
    //         "length": 1,
    //         "unit": "MONTH"
    //     },
    //     "billing_cycles": 12,
    //     "trial": {
    //         "days": 30,
    //         "enabled": true,
    //         "hold_setup_fee": true
    //     },
    //     "payment_method": "CREDIT_CARD"
    // }
    instance.post('/plans', data).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
});

app.get('/api/listar-planos', function(req, res) {
    instance.get('/plans').then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
})

app.get('/api/consultar-plano/:code', function(req, res) {
    var planCode = req.params.code;
    instance.get('/plans/' + planCode).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
})

app.put('/api/ativar-plano/:code', function(req, res) {
    var planCode = req.params.code;
    instance.put('/plans/' + planCode + '/activate').then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
})

app.put('/api/desativar-plano/:code', function(req, res) {
    var planCode = req.params.code;
    instance.put('/plans/' + planCode + '/inactivate').then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
})

app.put('/api/alterar-plano/:code', function(req, res) {
    var planCode = req.params.code;
    // DADOS para alterar o plano
    // data = {
    //     "name": "Plano Especial",
    //     "description": "Nova descrição",
    //     "amount": 1290,
    //     "setup_fee": 800,
    //     "max_qty": 1,
    //     "payment_method": "CREDIT_CARD",
    //     "interval": {
    //       "length": 1,
    //       "unit": "MONTH"
    //     },
    //     "billing_cycles": 12,
    //     "trial": {
    //       "days": 30,
    //       "enabled": true,
    //       "hold_setup_fee": true
    //     }
    // }
    instance.put('/plans/' + planCode, data).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
})



app.listen(8080);
console.log('Listening on port 8080');