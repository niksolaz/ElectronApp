'use strict';
var fs = require('fs');
var smalltalk = require('smalltalk');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var React = require('react');
var ReactDOM = require('react-dom');
import SeeEvent from './src/components/modules/SeeEvent.jsx'

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
/*
changed SCOPE 'https://www.googleapis.com/auth/calendar.readonly' with
new path to add events 'https://www.googleapis.com/auth/calendar';
*/
var SCOPES = ['https://www.googleapis.com/auth/calendar'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  authorize(JSON.parse(content), listEvents);
});

//write file
fs.writeFile(event, function(err,data) {
  if (err) {
    console.log('Error add event: ' + err);
    return;
  }
  console.log('It is saved!');
  authorize(JSON.parse(data), addEvents);
});

// example Json file in https://developers.google.com/google-apps/calendar  event --> insert
var event = {
  "start":
    {
      "timeZone":"Europe/Rome"
    },
    "end":
      {
        "dateTime":""
      },
    "reminders":
      {
        "overrides":{
          "minutes":10080,
          "method":"email"
        }
      },
    "attendees":
      {
        "email":"solazzo.nicola@gmail.com"
      },
    "attachments":{
      "fileUrl":"https://calendar.google.com/calendar/"
    },

  "description":""
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  console.log("CREDENTIALS", credentials);
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
  console.log("OAUTH2", oauth2Client);

  // Check if we have previously stored a token.
  console.log("TOKEN PATH", TOKEN_PATH);
  fs.readFile(TOKEN_PATH, function(err, token) {
    console.log("TOKEN PATH RESULT", err, token);
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  try{
    var authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
  }catch(err){
    console.log("Errr", err);
  }
  console.log('Authorize this app by visiting this url: ', authUrl);

  document.write(`Go to this <a href='${authUrl}'>url</a> and copy the code in the text field below`);
  smalltalk.prompt('Question', 'Enter the code from that page here: ', '').then(function(code) {
    console.log("code", code);
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  }, function() {
      console.log('cancel');
  });
  /*
  console.log("rl.question", rl.question);
  rl.prompt("test", function(abc){console.log(abc)});
  rl.question('Enter the code from that page here: ', (code) => {
    console.log("Answer", code);
    rl.close();
    console.log("CODE", code);
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
  */
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  var calendar = google.calendar('v3');
  calendar.events.list({
    auth: auth,
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.items;
    if (events.length == 0) {
      //------- Module REACT.JS --------------
      document.write(
        <div>{SeeEvent}</div>
      );
      console.log('No upcoming events found.');
    } else {
      document.write(`Upcoming ${events.length} events`);
      document.write(`<div><ul>`);
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
        console.log('%s - %s', start, event.summary);
        document.write(`<li><a href='${event.htmlLink}'>Event: ${start} - ${event.summary}</a></li>`);
      }
      document.write(`</ul></div>`);
      document.write(`<div>'${addEvents}'</div>`);
    }
  });
}

function addEvents(auth) {
  var calendar = google.calendar('v3');
  calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    fields: 'htmlLink',
    resource: event,
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }else{
      var description = event.description;
      document.write(`<form>`);
      document.write(`<input type="text" name="event">Event:${description}</input>`);
      document.write(`<input type="submit"></input>`);
      document.write(`</form>`);
    }
    console.log('Event created: %s', event.htmlLink);
  });
}
