// 1- require express
const express = require('express');

// 2- Initialize express
const app = express();
//console.log(app);

// 3- Start The Server
const port = 5000;
app.listen(port, () => {
  console.log(`🚀 The Server is running on port ${port}`);
});

// 4- app.get() => send a message to the browser
app.get('/', (req, res) => {
  console.log(req);
  console.log('method', req.method);
  console.log('url', req.url);
  res.send('Home Page');
  //res.send('<h1 style="color:red;" >Home Page</h1>');
});

app.get('/about', (req, res) => {
  console.log('method', req.method);
  console.log('url', req.url);
  res.send('<h1 style="color:red;">About Page</h1>');
});

// 5- Get the html files using sendFile
app.get('/', (req, res) => {
  //res.sendFile('/Public/index.html'); // ==> error: __ dirname is missing
  res.sendFile(__dirname + '/Public/index.html');
});

app.get('/products', (req, res) => {
  //res.sendFile('/Public/products.html'); // ==> error: __ dirname is missing
  res.sendFile(__dirname + '/Public/products.html');
});

// serve the css
app.get('/css/style.css', (req, res) => {
  res.sendFile(__dirname + '/Public/css/style.css');
});

// 6- Create a middleWare
const logger = require('./middleware/logger');

// 7- app level middleware ==> global middlewares
app.use(logger);

// Body Parser Middleware ==> global middleWare => To parse the data to json
app.use(express.json());

// 8- use express.static to staticly serve all files
app.use(express.static(__dirname + '/Public')); // => to use the express.static you need to add the file extension in the url

// 9- Users API Routes
app.use('/api/users', require('./routes/api/users'));
