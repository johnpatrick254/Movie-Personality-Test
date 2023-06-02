/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Header } from "../components/Header"
import { Routes, Route } from "react-router-dom";
import { MovieCard } from "../components/MovieCard"
import React, { useState, useEffect } from "react";
import { genres } from "./genres";
import { MoviePage } from "./MoviePage";
import '../styles/dashboard.css'

export const Dashboard = (props) => {
    const [movies, setMovies] = useState()
    const [view, setView] = useState(false)
    const [id, setID] = useState(null)

    const fetchTrailer = async (id) => {
        const apiKey = import.meta.env.VITE_API_KEY;
        let gen;
        for (const e of genres) {
            if (e.name == id) {
                gen = e.id;
            }
        }
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=79f884347c3b7cc3eb431b0e6a15f5d1&with_genres=${gen}`;
        const options = {
            method: "GET",
            headers: {

                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            },
        };

        fetch(url, options)
            .then((res) => res.json())
            .then((data) => {

                setMovies(data);
                console.log(data)

            }
            )
            .catch((e) => console.log(e));

    }

    useEffect(() => {
        try {
            fetchTrailer(props.genres)
        } catch (e) {
            console.log(e)
        }

    }, [props.genres])

    return <>

        {view ? <MoviePage handleClick={() => {
            setView(false);
            console.log(view)
        }} id={id} /> : (movies && (<>
            <Header />
            <div className="dashboard">
                <h3>Picks for you</h3>
                <div className="picks">
                    {
                        movies.results.map((movie, i) => {
                            if (i <= 4) {
                                return <MovieCard
                                    key={i}
                                    onClick={(e) => {
                                        setID(e.target.id)
                                        setView(true);

                                    }}
                                    value={movie.id}
                                    id={movie.id}
                                    title={movie.title}
                                    release_date={movie.release_date}
                                    vote_average={movie.vote_average}
                                    backdrop_path={movie.poster_path}
                                />
                            }


                        })
                    }
                </div>
                <h3>You might also like</h3>
                <div className="picks">
                    {
                        movies.results.map((movie, i) => {
                            if (i >= 5 && i <= 9) {
                                return <MovieCard
                                    key={i}
                                    title={movie.title}
                                    id={movie.id}
                                    release_date={movie.release_date}
                                    vote_average={movie.vote_average}
                                    backdrop_path={movie.poster_path}
                                />
                            }


                        })
                    }
                </div>
                <h3>Trending</h3>

                <div className="picks">
                    {
                        movies.results.map((movie, i) => {
                            if (i >= 10 && i <= 14) {
                                return <MovieCard
                                    key={i}
                                    id={movie.id}
                                    title={movie.title}
                                    release_date={movie.release_date}
                                    vote_average={movie.vote_average}
                                    backdrop_path={movie.poster_path}
                                />
                            }


                        })
                    }
                </div>
            </div></>))}

    </>
}



