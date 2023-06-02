/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"

export const Movie = (props) => {
    const baseImageURl = "https://image.tmdb.org/t/p/original/"
    const [trailer, setTrailer] = useState(null)
    const [read, setRed] = useState(false)

    const fetchTrailer = async (id) => {
        const apiKey = import.meta.env.VITE_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
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
                let link;
                data.results.forEach(dat => {
                    if (dat.type == "Trailer") {
                        link = dat.key;
                        setTrailer(link);
                    }
                })

            }
            )
            .catch((e) => console.log(e));

    }

    useEffect(() => {
        try {
            fetchTrailer(props.data.id)
        } catch (e) {
            console.log(e)
        }

    }, [props.data.id])



    return <>
        <div className="movie-page"
            style={
                {
                    backgroundImage:
                        `linear-gradient(0deg, rgba(0,0,0,1) 40%, rgba(10,10,10,0.7530987394957983) 55%, rgba(0,0,0,0.5) 100%), url(
                '${baseImageURl}${props.data.poster_path}')`,
                }
            }
        >
            <div className="movie-content">
                <div className="movie-name"


                >
                    <h1>
                        {props.data.title}

                    </h1>
                    <p>
                        {props.data.tagline}
                    </p>
                </div>
                <div className="movie-details">
                    <div className="movie-details__genre">
                        {
                            props.data.genres.map(genre => {
                                return <div key={genre.id} className="genre">
                                    <p>{genre.name}</p>
                                </div>
                            })
                        }
                    </div>
                    <div className="movie-details__synopsis">
                        <p>  {
                            !read ? props.data.overview.slice(0, 150) : props.data.overview
                        }
                            <span onClick={() => {
                                setRed(!read)
                            }}>
                                {!read ? " ...Read More" : " ...back"}</span>
                        </p>
                    </div>

                    <div className="movie-details__cast">
                        <div className="movie-details__cast-creators">
                            <h1>PRODUCED BY:</h1>

                            <div className="logos">
                                {
                                    props.data.production_companies.map((company, i) => {
                                        if (company.logo_path == null) return null;
                                        return <div className="logo-img" key={i}>
                                            <img src={`${baseImageURl}${company.logo_path}`} alt="" />
                                        </div>
                                    })
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <div className="movie-trailer" >
                    <iframe
                        src={`https://www.youtube.com/embed/${trailer}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

            </div>



        </div >


    </>
}