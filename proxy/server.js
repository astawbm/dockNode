var proxy = require('express-http-proxy');
var app = require('express')();

app.use('/', proxy('/:3001'));
app.listen(3000, () => {
  console.log('running on port 3000');
  console.log('--------------------------');
});
