/* eslint-disable react/prop-types */

export const MovieCard = (props) => {

    return <> 
        <div className="moviecard">
            <div className="moviecard-poster">
                <img src={`https://image.tmdb.org/t/p/w185/${props.backdrop_path}`} />
            </div>
            <div className="moviecard-metadata">
                <h1>{props.title}</h1>
            <div className="moviecard-metadata_details">
                <p className="releasedate">
                    {props.release_date}
                </p>
                <p>Rating: {props.vote_average}</p>
            </div>
            </div>
        </div>
    </>
}