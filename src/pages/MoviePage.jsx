/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {Movie} from "../components/Movie.jsx"

export const MoviePage = (props) =>{
   const [movie,setMovie] =useState(null)
   const apiKey = import.meta.env.VITE_API_KEY;

   const fetchMovie = async (id) => {
      const url = `https://api.themoviedb.org/3/movie/${id}?&append_to_response=videos&api_key=79f884347c3b7cc3eb431b0e6a15f5d1`;
      const options = {
          method: "GET",
          headers: {
              accept: 'application/json',
              Authorization: `Bearer 79f884347c3b7cc3eb431b0e6a15f5d1`
          },
      };

      fetch(url,options)
          .then((res) => res.json())
          .then((data) => {
            setMovie(data)
          }
          )
          .catch((e) => console.log(e));

  }


   useEffect(()=>{
      try {
         fetchMovie(props.id);
     } catch (e) {
         console.log(e)
     }

   },[props.id])

   return <>
        {
          movie && <Movie
           data={movie}
           handleClick={props.handleClick}
          />}
    
   </>

}