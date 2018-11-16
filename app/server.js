var express = require('express');
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');
const moip = require('moip-sdk-node').default({
    //accessToken: 'your-access-token',
    token: 'G9UMOE6EAONC67MB2TPZ5NKH15AABIIK',
    key: '8T1ATA5SJXN5Q2STBSNNEHO85IPOR7DJOX4S0737',
    production: false
  })
var moipServerUrl = 'https://sandbox.moip.com.br/assinaturas/v1';
var moipBeareToken = 'Basic RzlVTU9FNkVBT05DNjdNQjJUUFo1TktIMTVBQUJJSUs6IDhUMUFUQTVTSlhONVEyU1RCU05ORUhPODVJUE9SN0RKT1g0UzA3Mzc=' // Este token nao funciona 
//var moipBeareToken = 'Basic MDEwMTAxMDEwMTAxMDEwMTAxMDEwMTAxMDEwMTAxMDE6QUJBQkFCQUJBQkFCQUJBQkFCQUJBQkFCQUJBQkFCQUJBQkFCQUJBQg=='; // este token é o de exemplo 
console.log(moipBeareToken);


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

app.post('/api/v2/plano/criar', function(req, res) {
    console.log('REQUEST BODY: ', req.body);
    moip.plan.create({
        code: req.body.code,
        name: req.body.name,
        description: req.body.description,
        amount: req.body.amount,
        setup_fee: req.body.setup_fee,
        max_qty: req.body.max_qty,
        interval: {
          length: req.body.interval.length,
          unit: req.body.interval.unit
        },
        billing_cycles: req.body.billing_cycles,
        trial: {
          days: req.body.trial.days,
          enabled: req.body.trial.enabled,
          hold_setup_fee: req.body.trial.hold_setup_fee
        },
        status: req.body.status,
        payment_method: req.body.payment_method
      }).then((response) => {
          res.send(response);
          console.log('Console log response', response); 
      }).catch((response) => {
          res.json(response);
          console.log('Console log response at catch', response);
    })
})

app.get('/api/v2/plano/listar-todos', function(req, res) {
    moip.plan.getAll()
    .then((response) => {
        console.log(response.body);
        res.json(response);
    }).catch((response) => {
        console.log(response.body);
        res.send(response); 
    })
})

app.get('/api/v2/planos/consultar/:code', function(req, res) {
    var planCode = req.params.code;
    moip.plan.getOne(planCode)
    .then((response) => {
        console.log(response.body);
        res.send(response); 
    }).catch((response) => {
        console.log(response.body);
        res.send(response);
    })
})

app.put('/api/v1.5/plano/ativar/:code', function(req, res) {
    var planCode = req.params.code;
    var options = { 
        method: 'PUT',
        url: 'https://sandbox.moip.com.br/assinaturas/v1/plans/' + planCode + '/activate',
        headers: 
        { 'content-type': 'application/json',
        authorization: moipBeareToken } 
    };
  
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
    
        console.log(body);
        res.send(response);
    });
})

app.put('/api/v1.5/plano/desativar/:code', function(req, res) {
    var planCode = req.params.code;
    var options = {
        method: 'PUT',
        url: 'https://sandbox.moip.com.br/assinaturas/v1/plans/' + planCode + '/inactivate',
        headers: { 
            'content-type': 'application/json', 
            'authorization': moipBeareToken 
        } 
    };
  
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
    
        console.log(body);
        res.send(response);
    });
})

app.put('/api/v1.5/plano/alterar/:code', function(req, res) {
    var planCode = req.params.code;
    // TODO
    //==========================================
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
    // instance.put('/plans/' + planCode, data).then(response => {
    //     console.log(response);
    // }).catch(error => {
    //     console.log(error);
    // });
})

app.post('/api/v1.5/assinante/criar/:newVault', function(req, res) {
    request.post({
        headers: { 'Authorization' : moipBeareToken },
        url: moipServerUrl + '/customers?new_vault=' + req.params.newVault,
        json: req.body
    }, (error, response, body) => {
        if (error) {
            res.send(error)
            throw new Error(error);
        }
        console.log(response);
        res.send(response);
    })
})

app.post('/api/v2/assinante/criar/:newVault', function(req, res) {
    console.log('isNew? ' + req.params.newVault);
    console.log('Billing Info: ' + req.body.billing_info.credit_card.holder_name);
    moip.subscriber.create({
        code: req.body.code,
        email: req.body.email,
        fullname: req.body.fullname,
        cpf: req.body.cpf,
        phone_area_code: req.body.phone_area_code,
        phone_number: req.body.phone_number,
        birthdate_day: req.body.birthdate_day,
        birthdate_month: req.body.birthdate_month,
        birthdate_year: req.body.birthdate_year,
        address: {
          street: req.body.address.street,
          number: req.body.address.number,
          complement: req.body.address.complement,
          district: req.body.address.district,
          city: req.body.address.city,
          state: req.body.address.state,
          country: req.body.address.country,
          zipcode: req.body.address.zipcode
        },
        billing_info: {
          credit_card: {
            holder_name: req.body.billing_info.credit_card.holder_name,
            number: req.body.billing_info.credit_card.number,
            expiration_month: req.body.billing_info.credit_card.expiration_month,
            expiration_year: req.body.billing_info.credit_card.expiration_year
          }
        }
      }).then((response) => {
          console.log(response);
          res.json(response);
      }).catch((response) => {
          console.log(response.body);
          res.json(response); 
    })
})

app.post('/api/v2/assinante/adicionar-cartao', function(req, res){
    moip.customer.createCreditCard(customerId, {
        method: "CREDIT_CARD",
        creditCard: {
            expirationMonth: "05",
            expirationYear: "22",
            number: "5555666677778884",
            cvc: "123",
            holder: {
                fullname: "Jose Portador da Silva",
                birthdate: "1988-12-30",
                taxDocument: {
                    type: "CPF",
                    number: "33333333333"
                },
                phone: {
                    countryCode: "55",
                    areaCode: "11",
                    number: "66778899"
                }
            }
        }
    }).then((response) => {
        console.log(response.body)
    }).catch((err) => {
        console.log(err)
    })
})

app.get('/api/v2/assinante/listar-todos', function(req, res) {
    moip.subscriber.getAll()
    .then((response) => {
        console.log(response.body);
        res.send(response); 
    }).catch((response) => {
        console.log(response.body);
        res.send(response);
    })
})

app.get('/api/v2/assinante/consultar/:code', function(req, res) {
    var assinanteCode = req.params.code;
    moip.subscriber.getOne(assinanteCode)
    .then((response) => {
        console.log(response.body);
        res.send(response);
    }).catch((response) => {
        console.log(response.body);
        res.send(response);
    })
})

app.put('/api/v1.5/assinante/alterar/:code', function(req, res) {
    // TODO
    //==============================================
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
    // TODO
    //==================================
    // data = {
    //     "credit_card": {
    //       "holder_name": "Novo nome",
    //       "number": "5555666677778884",
    //       "expiration_month": "12",
    //       "expiration_year": "20"
    //     }
    //   }
    res.send('YET TO BE IMPLEMENTED');
})

app.post('/api/v2/assinatura/criar/:new_customer', function(req, res) {
    //REQUIRED Seu ID próprio da assinatura. Não deve ser duplicado. 
    // console.log('REQUEST PARAMS: ' + req.params.new_customer);
    // console.log('REQUEST BODY: ' + req.body.payment_method);
    console.log(req.body.code);
    console.log(req.body.plan.code);
    console.log(req.body.customer.code);

    moip.subscription.create({
        code: req.body.code,
        payment_method: req.body.payment_method,
        plan : {
            code : req.body.plan.code
        },
        customer: req.body.customer
    }).then((response) => {
        console.log(response.body);
        res.json(response);
    }).catch((response) => {
        console.log(response);
        res.json(response); 
    })
})

app.get('/api/v2/assinatura/listar', function(req, res) {
    moip.subscription.getAll()
    .then((response) => {
        console.log(response.body) 
    }).catch((response) => {
        console.log(response.body) 
    })
})

app.get('/api/v2/assinatura/consultar-detalhes/:code', function(req, res) {
    moip.subscription.getOne(req.params.code)
    .then((response) => {
        console.log(response.body) 
    }).catch((response) => {
        console.log(response.body) 
    })
})

app.put('/api/v1.5/assinatura/suspender/:code', function(req, res) {
    var options = { 
        method: 'PUT',
        url: 'https://sandbox.moip.com.br/assinaturas/v1/subscriptions/' + req.params.code + '/suspend',
        headers: { authorization: 'Authorization' } 
    };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    res.send(response);
    });
})

app.put('/api/v1.5/assinatura/reativar/:code', function(req, res) {
    var options = { 
        method: 'PUT',
        url: 'https://sandbox.moip.com.br/assinaturas/v1/subscriptions/' + req.params.code + '/activate',
        headers: { authorization: 'Authorization' } 
    };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    res.send(response);
    });
})

app.put('/api/v1.5/assinatura/cancelar/:code', function(req, res) {
    var options = { 
        method: 'PUT',
        url: 'https://sandbox.moip.com.br/assinaturas/v1/subscriptions/' + req.params.code + '/cancel',
        headers: { authorization: 'Authorization' } 
    };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    res.send(response);
    });
})

app.put('/api/v1.5/assinatura/alterar/:code', function(req, res) {
    // TODO
    //=========================================
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

app.put('/api/v1.5/assinatura/alterar-pagamento/:code', function(req, res) {
    // TODO
    //====================================
    // data = {
    //     "payment_method": "BOLETO"
    // }
}) 
app.listen(8080);
console.log('Listening on port 8080');