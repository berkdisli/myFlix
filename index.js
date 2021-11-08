const express = require('express');
const morgan = require('morgan');
const app = express();

let movies = [
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    director: 'Chris Columbus',
    genre:['Adventure', 'Family', 'Fantasy'],
    releaseYear:2001
  },
  {
    title: 'Lord of the Rings Trilogy',
    director: 'Peter Jackson',
    genre:['Adventure', 'Action', 'Drama'],
    releaseYear:2001
  },
  {
    title: 'The Green Mile',
    director: 'Frank Darabont',
    genre:['Crime', 'Drama', 'Fantasy'],
    releaseYear:1998
  },
  {
    title: 'The Shawshank Redemption ',
    director: 'Frank Darabont',
    genre:['Drama'],
    releaseYear:1994
  },
  {
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    genre:['Adventure', 'Action'],
    releaseYear:2008
  },
  {
    title: 'Good Will Hunting',
    director: 'Gus Van Sant',
    genre:['Drama', 'Romance'],
    releaseYear:1997
  },
  {
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    genre:['Crime', 'Drama',],
    releaseYear:1972
  },
  {
    title: 'Fight Club',
    director: 'David Fincher',
    genre:['Drama'],
    releaseYear:1999
  },
  {
    title: 'Inception',
    director: 'Christopher Nolan',
    genre:['Adventure', 'Action', 'Sci-Fi'],
    releaseYear:2010
  },
  {
    title: 'Star Wars',
    director: 'George Lucas',
    genre:['Action', 'Adventure', 'Fantasy'],
    releaseYear:1977
  }
];
// middleware
app.use(morgan('common'));
app.use(express.static('public'));

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to myFlix App');
});

//Reading document.html file
app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

// Gets the list of data about ALL movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Gets the data about a single movie, by title
app.get('/movies/:title', (req, res) => {
    res.json(movies.find( (movie) => {
        return movie.title === req.params.title 
    }));
});

//Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get('/movies/:title/genre', (req, res) => {
    res.send('Successful GET request returning data about a genre.');
});

//Return data about a director (bio, birth year, death year) by name
app.get('/movies/directors/:name', (req, res) => {
    res.send('Successful GET request returning data about a director.');
});

//New users to register
app.post('/newUser', (req, res) => {
    res.send('Successful POST request - new user is registered');
});

//// Updating the "username" 
app.put('/newUser/:id/info', (req, res) => {
    res.send('Successful PUT request - user info is updated');
});

//Adding the movie to the favourites 
app.post('/newUser/:id/favourites', (req, res) => {
    res.send('Successful POST request - user added a movie to their favourites');
});

//Removing movies from the favourites
app.delete('/newUser/:id/favourites', (req, res) => {
    res.send('Successful DELETE request - user removed movie from favourites');
});

//To deregister 
app.delete('/newUser', (req, res) => {
    res.send('Successful DELETE request - user has deregistered');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('An error has been detected')
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});