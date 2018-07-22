var express = require('express');
var path = require('path');
var Base64 = require('js-base64').Base64;
var request = require('request');
const axios = require('axios');
const moip = require('moip-sdk-node').default({
    accessToken: 'your-access-token',
    // token: 'your-token',
    // key: 'your-key',
    production: false
  })
var app = express();

//var sandboxUrl = 'https://sandbox.moip.com.br/assinaturas/v1'
//var moipApiUrl = sandboxUrl;
//var moipBeareToken = Base64.encode('MOIP_API_TOKEN:MOIP_API_KEY');

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

app.post('/api/v1.5/plano/criar', function(req, res) {
    moip.plan.create({
        code: "plan101",
        name: "Plano Especial",
        description: "Descrição do Plano Especial",
        amount: 990,
        setup_fee: 500,
        max_qty: 1,
        interval: {
          length: 1,
          unit: "MONTH"
        },
        billing_cycles: 12,
        trial: {
          days: 30,
          enabled: true,
          hold_setup_fee: true
        },
        payment_method: "CREDIT_CARD"
      }).then((response) => {
          console.log(response.body) 
      }).catch((response) => {
          console.log(response.body) 
    })
})

app.get('/api/v1.5/plano/listar-todos', function(req, res) {
    moip.plan.getAll()
    .then((response) => {
        console.log(response.body) 
    }).catch((response) => {
        console.log(response.body) 
    })
})

app.get('/api/v1.5/planos/consultar/:code', function(req, res) {
    var planCode = req.params.code;
    moip.plan.getOne(planCode)
    .then((response) => {
        console.log(response.body) 
    }).catch((response) => {
        console.log(response.body) 
    })
})

app.put('/api/v1.5/plano/ativar/:code', function(req, res) {
    var planCode = req.params.code;
    var options = { 
        method: 'PUT',
        url: 'https://sandbox.moip.com.br/assinaturas/v1/plans/' + planCode + '/activate',
        headers: 
        { 'content-type': 'Content-Type',
        authorization: 'Authorization' } 
    };
  
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
    
        console.log(body);
    });
})

app.put('/api/v1.5/plano/desativar/:code', function(req, res) {
    var planCode = req.params.code;
    var options = { 
        method: 'PUT',
        url: 'https://sandbox.moip.com.br/assinaturas/v1/plans/' + planCode + '/inactivate',
        headers: 
        { 'content-type': 'Content-Type',
        authorization: 'Authorization' } 
    };
  
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
    
        console.log(body);
    });
})

app.put('/api/v1.5/plano/alterar/:code', function(req, res) {
    var planCode = req.params.code;
    // DADOS para alterar o plano
    // data = {
    //     "name": "Plano Especial",
    //     "description": "Nova descrição",
    // DADOS para alterar o plano
    // data = {
    //     "name": "Plano Especial",
    //     "description": "Nova descrição",
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

app.post('/api/v1.5/assinante/criar/:newVault', function(req, res) {
    var newVault = req.params.newVault;
    moip.subscriber.create({
        code: "cliente012018",
        email: "nome@exemplo.com.br",
        fullname: "Nome Sobrenome",
        cpf: "22222222222",
        phone_area_code: "11",
        phone_number: "934343434",
        birthdate_day: "26",
        birthdate_month: "04",
        birthdate_year: "1980",
        address: {
          street: "Rua Nome da Rua",
          number: "100",
          complement: "Casa",
          district: "Nome do Bairro",
          city: "São Paulo",
          state: "SP",
          country: "BRA",
          zipcode: "05015010"
        },
        billing_info: {
          credit_card: {
            holder_name: "Nome Completo",
            number: "4111111111111111",
            expiration_month: "06",
            expiration_year: "22"
          }
        }
      }).then((response) => {
          console.log(response.body) 
      }).catch((response) => {
          console.log(response.body) 
    })
})

app.get('/api/assinante/listar-todos', function(req, res) {
    moip.subscriber.getAll()
    .then((response) => {
        console.log(response.body) 
    }).catch((response) => {
        console.log(response.body) 
    })
})

app.get('/api/v1.5/assinante/consultar/:code', function(req, res) {
    moip.subscriber.getOne('cliente02')
    .then((response) => {
        console.log(response.body) 
    }).catch((response) => {
        console.log(response.body) 
    })
})

app.put('/api/v1.5/assinante/alterar', function(req, res) {
    // data = {
    //     "code": "cliente01",
    //     "email": "novoemail@exemplo.com.br",
    //     "fullname": "Nome Sobrenome",
    //     "cpf": "22222222222",
    //     "phone_number": "934343434",
    //     "phone_area_code": "11",
    //     "birthdate_day": "26",
    //     "birthdate_month": "04",
    //     "birthdate_year": "1986",
    //     "address": {
    //       "street": "Rua nova rua",
    //       "number": "100",
    //       "complement": "Casa",
    //       "district": "Bairro",
    //       "city": "São Paulo",
    //       "state": "SP",
    //       "country": "BRA",
    //       "zipcode": "00000-000"
    //     }
    //   }
})

app.put('/api/v1.5/assinante/atualizar-cartao/:code', function(req, res) {
    // data = {
    //     "credit_card": {
    //       "holder_name": "Novo nome",
    //       "number": "5555666677778884",
    //       "expiration_month": "12",
    //       "expiration_year": "20"
    //     }
    //   }
})

app.post('/api/v1.5/assinatura/criar', function(req, res) {
    moip.subscription.create('assinatura01',{ 
        new_customer: false,
        amount: 9990,
        payment_method: "CREDIT_CARD",
        plan : {
            code : 'plan01'
        },
        customer : {
            code : 'cliente01'
      }  
    }).then((response) => {
        console.log(response.body) 
    }).catch((response) => {
        console.log(response.body) 
    })
})

app.get('/api/v1.5/assinatura/listar', function(req, res) {
    moip.subscription.getAll()
    .then((response) => {
        console.log(response.body) 
    }).catch((response) => {
        console.log(response.body) 
    })
})

app.get('/api/v1.5/assinatura/consultar-detalhes/:code', function(req, res) {
    moip.subscription.getOne('2017050602')
    .then((response) => {
        console.log(response.body) 
    }).catch((response) => {
        console.log(response.body) 
    })
})

app.put('/api/v1.5/assinatura/suspender/:code', function(req, res) {
    var options = { 
        method: 'PUT',
        url: 'https://sandbox.moip.com.br/assinaturas/v1/subscriptions/code/suspend',
        headers: { authorization: 'Authorization' } 
    };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    });
})

app.put('/api/v1.5/assinatura/reativar/:code', function(req, res) {
    var options = { 
        method: 'PUT',
        url: 'https://sandbox.moip.com.br/assinaturas/v1/subscriptions/code/activate',
        headers: { authorization: 'Authorization' } 
    };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    });
})

app.put('/api/v1.5/assinatura/cancelar/:code', function(req, res) {
    var options = { 
        method: 'PUT',
        url: 'https://sandbox.moip.com.br/assinaturas/v1/subscriptions/code/cancel',
        headers: { authorization: 'Authorization' } 
    };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    });
})

app.put('/api/v1.5/assinatura/alterar/:code', function(req, res) {
    // data = {
    //     "plan": {
    //       "code": "codigo_do_novo_plano"
    //     },
    //     "amount": "9990",
    //     "next_invoice_date": {
    //       "day": "05",
    //       "month": "01",
    //       "year": "2017"
    //     }
    //   }
})

app.put('/api/v1.5/assinatura/alterar-pagamento', function(req, res) {
    // data = {
    //     "payment_method": "BOLETO"
    // }
}) 
app.listen(8080);
console.log('Listening on port 8080');