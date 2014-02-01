var string = '', parts = {};
var modules = ['dictionary', 'time', 'system', 'weather'];
var deps = {};
modules.forEach(function(mod) {
  deps[mod] = require('./'+mod+'/main');
});
if (process.argv.length < 3) {
	console.log('Nothing to be done here.');
	process.exit(1);
}
process.argv.forEach(function(str, i) {
	if(i > 1) {
		string += ' ' + str;
	}
});

if(/define/.test(string)) {
  parts = {
      cat: 'dictionary',
      method: 'define'
  };
  string = string.replace(/define/,'').replace(/^\s+|\s+$/g, '');
} else if(/pronounce/.test(string)) {
  parts = {
      cat: 'dictionary',
      method: 'pronunciation'
  };
  string = string.replace(/pronounce/,'').replace(/^\s+|\s+$/g, '');
} else if(/thesaurus/.test(string)) {
  parts = {
      cat: 'dictionary',
      method: 'thesaurus'
  };
} else if(/weather/.test(string)) {
  parts = {
      cat: 'weather',
      method: 'default'
  };
} else if(/world\stime/.test(string)) {
  parts = {
      cat: 'time',
      method: 'local'
  };
} else if(/time/.test(string)) {
  parts = {
      cat: 'time',
      method: 'world'
  };
} else if(/system/.test(string)) {
  parts = {
      cat: 'system',
      method: 'default'
  };
} else if(/movie\sdatabase/.test(string)) {
  parts = {
      cat: 'imdb',
      method: 'default'
  };
}else {
  parts = {
      cat: 'future',
      method: 'default'
  };
}
deps[parts.cat][parts.method](string, parts);