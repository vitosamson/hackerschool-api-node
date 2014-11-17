# hackerschool-api

This library is meant to be a node wrapper for the Hacker School API. It encapsulates the OAuth flow as well as all the API endpoints.


## Installation

    npm install hackerschool-api

## Usage

#### OAuth flow

```.js
var hackerschool = require('hackerschool-api'),
    app = require('express')();

var client = new hackerschool.Client();

var auth = hackerschool.auth({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri: process.env.REDIRECT_URI
});

app.get('/login', function(req, res) {
  var authUrl = auth.createAuthUrl();

  // redirect the user to the auth page
  res.redirect(authUrl);
});

app.get('/oauthCallback', function(req, res) {
  var code = req.query.code;

  auth.getToken(code)
  .then(function(token) {
    // tells the client instance to use this token for all requests
    client.setToken(token);
  }, function(err) {
    res.send('There was an error getting the token');
  });
});

app.listen(3000);
```

#### Getting resources

These assume that the access token has already been set.

```.js
var hackerschool = require('hackerschool-api');

var client = new hackerschool.Client();

// Get information about the currently authorized hackerschooler
client.people.me()
.then(function(me) {
  console.log(me);
});

// Get information about a specific hackerschooler
client.people.person(901)
.then(function(person) {
  console.log(person);
});

// Get a list of all batches
client.batches.list()
.then(function(batches) {
  console.log(batches);
});

// Get information about a specific batch
client.batches.batch(12)
.then(function(batch) {
  console.log(batch);
});

// Get a list of the hackerschoolers in a specific batch
client.batches.people(12)
.then(function(people) {
  console.log(peoeple);
});
```

## API reference

### Auth

Auth contains the OAuth flow.

#### `new hackerschool.Auth(config)`

Config should be an object containing the following objects:
  - `client_id`: API client ID
  - `client_secret`: API client secret
  - `redirect_uri`: API redirect URI

Returns a new Auth object.

#### `Auth.createAuthUrl()`

Returns an authorization URL that the user should be redirected to in order to authorize access to their data.

#### `Auth.getToken(code, [callback])`

Makes a call to the access token endpoint with the given authorization code.

Returns a promise that resolves with the token. Also takes an optional callback if that's more your thing.

### People

#### `people.me()`

Gets information about the currently authorized user.

Returns a promise that resolves with the person object.

#### `people.person(id)`

Gets information about about a specific hackerschooler by ID.

Returns a promise that resolves with the person object.

### Batches

#### `batches.list()`

Gets a list of all current and previous batches.

Returns a promise that resolves with an array of batches.

#### `batches.batch(id)`

Gets information about a specific batch.

Returns a promise that resolves with the batch object.

#### `batches.people(id)`

Gets a list of hackerschools in a particular batch.

Returns a promise that resolves with an array of people.
