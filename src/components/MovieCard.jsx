/* eslint-disable react/prop-types */


export const MovieCard = (props) => {
    
    return <> 
        <div className="moviecard" onClick={props.onClick} id={`${props.id}`}>
            <div className="moviecard-poster">
                <img src={`https://image.tmdb.org/t/p/original/${props.backdrop_path}`} id={`${props.id}`} />
            </div>
            <div className="moviecard-metadata" id={`${props.id}`} >
                <h1 id={props.id}>{props.title}</h1>
            <div className="moviecard-metadata_details" value={`${props.id}`}>
                <p className="releasedate" id={`${props.id}`}>
                    {props.release_date}
                </p>
                <p>Rating: {props.vote_average}</p>
            </div>
            </div>
        </div>
    </>
}