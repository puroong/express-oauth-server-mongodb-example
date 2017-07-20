const mongoose = require('mongoose')
const ClientModel = require('./clientModel')
const UserModel = require('./userModel')
const AuthCodeModel = require('./authCodeModel')
const TokenModel = require('./tokenModel')

module.exports.defaultSetup = function() {
  //create mongodb connection
  mongoose.connect('mongodb://localhost/oauthExample');

  // create defaultClient and defaultUser
  let defaultClient = new ClientModel({
    id: 'clientidclientid',
    secret: 'clientsecretclientsecret',
    type: 'confidential',
    redirectUris: ["http://localhost:8080/oauthExample/callback", "http://localhost:8080/"],
    grants: ["authorization_code"]
  })
  let defaultUser = new UserModel({
    id: 'puroong',
    password: 'yikes'
  })

  defaultClient.save(err => {
    if(err) {console.log('error during creating defaultClient');console.log(err);}
    else console.log('created defaultClient');
  })
  defaultUser.save(err => {
    if(err) {console.log('error during creating defaultUser');console.log(err);}
    else console.log('created defaultUser');
  })
}

module.exports.getClient = function(clientId, clientSecret, callback){
  console.log('getClient');
  // query client
  ClientModel.findOne({id:clientId})
  .exec((err, clientQuery) => {
    let client = {
      id: clientQuery.id,
      secret: clientQuery.secret,
      type: clientQuery.type,
      redirectUris: clientQuery.redirectUris,
      grants: clientQuery.grants
    }

    // call callback
    callback(null, client)
  })
}
module.exports.saveAuthorizationCode = function(code, client, user, callback){
  console.log('saveAuthorizationCode');

  // save code
  var authorizationCode = {
    authorizationCode: code.authorizationCode,
    expiresAt: code.expiresAt,
    redirectUri: "http://localhost:8080/",
    scope: [code.scope],
    clientId: client.id,
    userId: user.id
  }
  var codeDocument = new AuthCodeModel(authorizationCode)

  codeDocument.save(err => {
    if(err) {console.log(err); callback(err, null)}
    else {console.log('saved authorization code');}
   })

  //call callbacck
  callback(null, authorizationCode)
}

module.exports.getAuthorizationCode = function(code, callback){
  console.log('getAuthorizationCode');

  AuthCodeModel.findOne({authorizationCode:code})
  .exec((err, codeQuery) => {
    if(err) {
      console.log(err);
      callback(err, null)
    }
    else {
      var authorizationCode = {
        authorizationCode: codeQuery.authorizationCode,
        expiresAt: codeQuery.expiresAt,
        redirectUri: codeQuery.redirectUri,
        scope: codeQuery.scope,
        client: {id: codeQuery.clientId},
        user: {id: codeQuery.userId}
      }

      callback(null, authorizationCode)
    }
  })
}
module.exports.revokeAuthorizationCode = function(code){
  console.log('revokeAuthorizationCode');
  return AuthCodeModel.remove({code: code}, err => {
    if(err) {console.log(err);return false}
    else return true
  })
}
module.exports.saveToken = function(token, client, user, callback){
  console.log('saveToken');

  var token = {
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    refreshToken: token.refreshToken,
    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    scope: token.scope,
    client: {id: client.id},
    user: user
  }
  var tokenDocument = new TokenModel(token)

  tokenDocument.save(err => {
    if(err) {
      console.log(err);
      callback(err, null)
    }
    else callback(null, token)
  })
}
