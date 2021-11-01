const express = require('express');
const morgan = require('morgan');
const app = express();

let movies = [
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    director: 'Chris Columbus'
  },
  {
    title: 'Lord of the Rings Trilogy',
    director: 'Peter Jackson'
  },
  {
    title: 'Green Mile',
    director: 'Frank Darabont'
  },
  {
    title: 'The Shawshank Redemption ',
    director: 'Frank Darabont'
  },
  {
    title: 'The Dark Knight',
    director: 'Christopher Nolan'
  },
  {
    title: 'Good Will Hunting',
    director: 'Gus Van Sant'
  },
  {
    title: 'The Godfather',
    director: 'Francis Ford Coppola'
  },
  {
    title: 'Fight Club',
    director: 'David Fincher'
  },
  {
    title: 'Inception',
    director: 'Christopher Nolan'
  },
  {
    title: 'The Matrix',
    director: 'Lana Wachowski & Lilly Wachowski'
  }
];
// middleware
app.use(morgan('common'));
app.use(express.static('public'));

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to ten of my best movies which I pick!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('An error has been detected')
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});