const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

// const uuid = require("uuid");

const app = express();

mongoose.connect('mongodb://localhost:27017/test',
 { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// middleware
app.use(morgan('common'));
app.use(express.static('public'));

let auth = require('./auth')(app); //This ensures that Express is available in your “auth.js” file as well.
const passport = require('passport');
require('./passport');






// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to myFlix App');
});

//Reading document.html file
app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

// Gets the list of data about ALL movies
app.get('/movies', passport.authenticate('jwt', 
{ session: false }), (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " +err);
  })
});

// Gets the data about a single movie, by title
app.get('/movies/:title',  passport.authenticate('jwt',{session: false}), (req, res) => {
    res.json(movies.find( (movie) => {
        return movie.title === req.params.title 
    }));
});

//Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get('/movies/:title/genre', passport.authenticate('jwt',{session: false}), (req, res) => {
    res.send('Successful GET request returning data about a genre.');
});

//Return data about a director (bio, birth year, death year) by name
app.get('/movies/directors/:name',passport.authenticate('jwt',{session: false}), (req, res) => {
    res.send('Successful GET request returning data about a director.');
});

// Get all users
app.get('/users',  (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('/users/:Username',  (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//New users to register
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username',  (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
     { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//// Updating the "username" 
app.put('/users/:id/info',  (req, res) => {
    res.send('Successful PUT request - user info is updated');
});

//Adding the movie to the favorites with id
app.post('/users/:id/favorites',  (req, res) => {
    res.send('Successful POST request - user added a movie to their favourites');
});

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID',  (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//Removing movies from the favorites with id
app.delete('/users/:id/favorites', (req, res) => {
    res.send('Successful DELETE request - user removed movie from favourites');
});

//To deregister 
app.delete('/users',  (req, res) => {
    res.send('Successful DELETE request - user has deregistered');
});

// Delete a user by username
app.delete('/users/:Username',  (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('An error has been detected')
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});