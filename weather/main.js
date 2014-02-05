var http = require('../lib/http-promise/main');
var key = require('./apikey').key;
var path = '/api/'+key;
// request sample http://api.wunderground.com/api/3714a34f3207b9a2/conditions/q/TX/ROUND_ROCK.json

function makeRequest(url) {
  var future = http.request({
    hostname: 'api.wunderground.com',
    port: 80,
    path: url,
    method: 'GET'
  });
  return future; 
}

function makeDecimalAudible(data) {
  return ('' + data).replace(/\./, ' point ');
}

var defolt = function(place) {
  var url = path + '/conditions/q/'+place+'.json';
    
  var future = makeRequest(url);

  future.then(function(d) {
    var string = '';
    if(d && d.current_observation) {
      string += 'Current temperature in celcius: ' + makeDecimalAudible(d.current_observation.temp_c) + ' degrees.';
      string += 'Current temperature in fahrenheit: '+ makeDecimalAudible(d.current_observation.temp_f) + ' degrees.';
      string += 'Feels like temperature in fahrenheit: ' + makeDecimalAudible(d.current_observation.feelslike_f) + ' degrees.';
      string += 'Chances of rain: "' + makeDecimalAudible(d.current_observation.precip_1hr_in)+'"%';
      console.log(string);
    }else {
      console.log('There was no response from the weather underground.');
    }
  }, function(err) {
    // it errored
    console.log('I ran into some issues while commiunicating through internet.');
  });
};

var pronunciation = function(word) {
  var url = path + '/'+word+'/audio';
  var query = 'useCanonical=false&limit=1&api_key='+key;
  
  var future = makeRequest(url, query);
  
  future.then(function(d) {
    if(d.length > 0) {
      console.log(d[0].fileUrl);
    }
  }, function(error) {
    
  });
  console.log('Making dictionary pronouce calls');
  
};

module.exports = {
    defolt: defolt
};
