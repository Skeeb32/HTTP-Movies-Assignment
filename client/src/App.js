import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import MovieForm from './Movies/MovieForm';
import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [savedList, setSavedList] = useState([]);
  const [update, setUpdate] = useState(false);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
    console.log(savedList)
  };


const fetchData = () => {
  axios
    .get('http://localhost:5000/api/movies')
    .then(res => setMovies(res.data))
    .catch(err => console.log(err.response));
}
  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" 
        render={props => {
          return <MovieList {...props} movies={movies} />
        }}
        />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} setUpdate={setUpdate} update={update} />;
        }}
      />
      <Route
        path="/update/movies/:id"
        render={props => {
          return <MovieForm {...props} setUpdate={setUpdate} update={update} />;
        }}
      />
    </>
  );
};

export default App;
