/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

export const Genres = (props) => {
    return <>

        <div onClick={props.onClick} className="genres-type">
            <p>{props.name}</p>
        </div>

    </>
}