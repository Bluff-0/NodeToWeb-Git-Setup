const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port= process.env.PORT || 3000;

var app= express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next)=> {
  var now= new Date().toString();
  var log= `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log', log + '\n');
  next();
});

app.use((req, res, next)=> {
  res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res)=> {
  // res.send('<h1>Hello User!</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    text: 'Welcome to the party'
  });
});

app.get('/about', (req,res)=> {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res)=> {
  // res.send('<h1>Hello User!</h1>');
  res.send({
    error: '404 Page Not Found',
    you: `You're an idiot`
  });
});

app.listen(port, ()=> {
  console.log(`Server is up on port ${port}`);
});
