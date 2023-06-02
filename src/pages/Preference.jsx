import { Genres } from "../components/Genres"
import { Header } from "../components/Header"
import { genres } from "./genres"
export const  Prefference =()=>{
    
    return <>
    <Header/>
    <div className="preference">
   <h1>What type of movies do you like?</h1>
    <div className="genres">
        {
            genres.map(gen=>{
                return <Genres
                key={gen.id}
                name={gen.name}
                />
            })
        }
        
    </div>
    </div>
    </>
   }