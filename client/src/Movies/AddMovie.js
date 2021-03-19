import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    id: 0,
    title: "",
    director: "",
    metascore: "",
    stars: []
}

const AddMovie = props => {
    const [movie, setMovie] = useState(initialMovie);
    const [stars, setStars] = useState("");
    const { id } = useParams();
    const { push } = useHistory();

    const changeHandler = e => {
        
        if(e.target.name !== 'stars'){
            setMovie({
                ...movie,
                [e.target.name]: e.target.value
              });
        }else{
            setStars(e.target.value)
            setMovie({
                ...movie,
                [e.target.name]: stars.split(",").map(function(item) {
                    return item.trim();
                })
              });
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Axios PUT request here (PUT = update)
        axios.post(`http://localhost:5000/api/movies`, movie)
          .then(res => {
            props.getMovieList();
            setMovie(initialMovie);
            push(`/`);
          })
          .catch(err => console.log(err));
    };

    return (
        <div>
          <h2>Add Movie</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="string"
              name="title"
              onChange={changeHandler}
              placeholder="Title"
              value={movie.title}
            />
            <br></br>
            <br></br>
            <input
              type="string"
              name="director"
              onChange={changeHandler}
              placeholder="Director"
              value={movie.director}
            />
            <br></br>
            <br></br>
            <input
              type="string"
              name="metascore"
              onChange={changeHandler}
              placeholder="Metascore"
              value={movie.metascore}
            />
            <br></br>
            <br></br>
            <input
              type="string"
              name="stars"
              onChange={changeHandler}
              placeholder="Stars"
              value={stars}
            />
            <button className="md-button form-button">Add</button>
          </form>
        </div>
    );
}

export default AddMovie;