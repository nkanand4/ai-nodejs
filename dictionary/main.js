var http = require('../lib/http-promise/main');
var key = require('./apikey').key;
var path = '/v4/word.json';

function makeRequest(url, query) {
  var future = http.request({
    hostname: 'api.wordnik.com',
    port: 80,
    path: url + '?' + query,
    method: 'GET'
  });
  return future; 
}

var define = function(word) {
  var url = path + '/'+word+'/definitions';
  var query = 'limit=2&includeRelated=true&sourceDictionaries=webster'+
    '&useCanonical=true&includeTags=false&api_key='+key;
    
  var future = makeRequest(url, query);

  future.then(function(d) {
    var string = 'Here is what I got for the word "'+word +'". ';
    if(d.length > 0) {
      d.forEach(function(r, index) {
        if(index > 0) {
          string += ' Or, it can also be defined as: ';
        }
        string += r.text;
      });
      console.log(string);
    }else {
      console.log('Could not locate the word.');
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
    define: define,
    pronunciation: pronunciation
};