const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const oauth2Server = require('express-oauth-server')
const model = require('./model')
const UserModel = require('./model/userModel')

// create db connection, defaultClient, defaultUser
model.defaultSetup()

// express server config
const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: false}))

server.oauth = new oauth2Server({
  model: model
})

let authenticateHandler = {
  handle: function(req, res){
    return UserModel.findOne({id: req.body.id, password: req.body.password}, (err, user) => {
      if(err) {
        console.log(err);
        return
      }
      if(user) {
        return {
          id: user.id,
          password: user.password
        }
      }
      else return
    })
  }
}

let options = {
  authenticateHandler: authenticateHandler
}

server.get('/oauth/authorize', (req, res) => {
  //response_type, client_id, redirect_uri, state must be in query string
  res.sendFile(path.join(__dirname, 'html/login.html'))
})
server.post('/oauth/authorize', (req, res) => {
  //user authenticate
  let userDocument = UserModel.findOne({id: req.body.id, password: req.body.password})
  .exec((err, user) => {
    if(err) {
      console.log(err);
    }
    if(user) {
      console.log('authentication success');
      server.oauth.authorize(options)(req, res)
    }
    else {
      console.log('wrign id, password!; id: puroong, password: yikes');
      res.redirect(req.originalUrl)
    }
  })
})

server.post('/oauth/token', (req, res) => {
  return server.oauth.token()(req, res)
})

module.exports = server
