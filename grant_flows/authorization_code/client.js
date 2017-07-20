const express = require('express')
const path = require('path')

const client = express()

client.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/index.html'))
})

//redirection endpoint
client.get('/oauthExample/callback', (req, res) => {
  var data = require('querystring').stringify({
    client_id: "clientidclientid",
    client_secret: "clientsecretclientsecret",
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:8080/",
    code: req.query.code
  })
  var options = {
    uri: "http://localhost:8081/oauth/token",
    body: data,
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    }
  }
  var request = require('request')
  request(options, (err, response) => {
    if(err) console.log(err);
    else res.send(response.body)
  })
})

module.exports = client
