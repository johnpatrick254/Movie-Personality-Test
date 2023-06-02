import {doc,setDoc } from 'firebase/firestore'
import { auth, db } from '../firebaseConfig';


export const  Header =()=>{
    function handleClick(){
        const Ref = doc(db,'userData',auth.currentUser.uid)
        setDoc(Ref,{
            isAsked:false,
            answers:''
        })
    }
    return <>
        <nav>
        <div className="nav_text">
            <h1>Reel<span>Radar</span></h1>
            <button onClick={handleClick}>
                Retake The Test
            </button>
        </div>
        </nav> 
    </>
}