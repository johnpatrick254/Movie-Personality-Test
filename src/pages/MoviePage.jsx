/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {Movie} from "../components/Movie.jsx"

export const MoviePage = (props) =>{
   const [movie,setMovie] =useState(null)
   const apiKey = import.meta.env.VITE_API_KEY;

   const fetchMovie = async (id) => {
      const url = `https://api.themoviedb.org/3/movie/${id}?&append_to_response=videos&api_key=${apiKey}`;
      const options = {
          method: "GET",
          headers: {
              accept: 'application/json',
              Authorization: `Bearer ${apiKey}`
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
          
          />}
    
   </>

}