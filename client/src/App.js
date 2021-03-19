import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateForm from "./Movies/UpdateForm";
import AddMovie from "./Movies/AddMovie"
import Movie from "./Movies/Movie";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id" render ={
        props => {
          return <Movie {...props} movieList={movieList} setMovieList={setMovieList} addToSavedList={addToSavedList}/>
        }
      } />
      <Route path='/update-movie/:id' render ={
        props => {
          return <UpdateForm {...props} movieList={movieList} setMovieList={setMovieList} />
        }
      } />
      <Route path='/add-movie' render ={
        props => {
          return <AddMovie {...props} movieList={movieList} setMovieList={setMovieList} getMovieList={getMovieList}/>
        }
      } />
    </>
  );
};

export default App;
