var Firebase = require('firebase');
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

ref = new Firebase('https://lhvtr92ik5p.firebaseio-demo.com/');

var num = Math.floor(Math.random() * 1000);

ref.on('child_added', (snapshot) => {
  console.log('child added: ' + snapshot.val());
});

// Typing stuff in should create a new message
rl.on('line', (content) => {
  ref.push(content);
  console.log('read ' + content);
});
