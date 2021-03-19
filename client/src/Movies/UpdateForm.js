import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    id: 0,
    title: "",
    director: "",
    metascore: 0,
    stars: []
}

const UpdateForm = props => {
    const [movie, setMovie] = useState(initialMovie);
    const [stars, setStars] = useState(movie.stars);
    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
          .then(res => {
            setMovie(res.data);
          })
          .catch(err => console.log(err));
    }, [])

    const changeHandler = e => {
        setMovie({
                ...movie,
                [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Axios PUT request here (PUT = update)
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
          .then(res => {
            props.setMovieList(props.movieList.map(movieList => {
                if(movieList.id === res.data.id){
                    return res.data
                }else{
                    return movieList
                }
            }));
            push(`/movies/${id}`);
          })
          .catch(err => console.log(err));
    };

    return (
        <div>
          <h2>Update Movie</h2>
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
            <button className="md-button form-button">Update</button>
          </form>
        </div>
    );
}

export default UpdateForm;