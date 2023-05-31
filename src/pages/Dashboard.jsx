import React, { useRef, useState } from "react";
import { Header } from "../components/Header"
import { movies } from "./movies"
import {MovieCard} from "../components/MovieCard"
import { Swiper } from 'swiper/react';
import { Pagination } from "swiper";




export const  Dashboard =()=>{
    
    return <>
    <Header/>
     <div className="dashboard">
     <h3>Picks for you</h3>
     <div className="picks">
        {
            movies.results.map((movie,i)=>{
                if (i < 5){
                    return <MovieCard
                    key={i}
                    title={movie.title}
                    release_date={movie.release_date}
                    vote_average={movie.vote_average}
                    backdrop_path={movie.poster_path}
                   />}
                
                
            })
        }
     </div>
     <h3>You might also like</h3>
     <div className="picks">
     {
            movies.results.map((movie,i)=>{
                if (i > 5 && i<11){
                    return <MovieCard
                    key={i}
                    title={movie.title}
                    release_date={movie.release_date}
                    vote_average={movie.vote_average}
                    backdrop_path={movie.poster_path}
                   />}
                
                
            })
        }
     </div>
     <h3>Trending</h3>

     <div className="picks">
     {
            movies.results.map((movie,i)=>{
                if (i >10 && i < 14){
                    return <MovieCard
                    key={i}
                    title={movie.title}
                    release_date={movie.release_date}
                    vote_average={movie.vote_average}
                    backdrop_path={movie.poster_path}
                   />}
                
                
            })
        }
        </div>
    </div>
   
    </>
   }