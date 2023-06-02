import './styles/App.css';
import Account from './pages/Account';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import Questions from './components/Questions';
import { doc, onSnapshot } from 'firebase/firestore';
import {Dashboard} from './pages/Dashboard';
import { genres } from './pages/genres';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [isAsked,setIsAsked] = useState(false);
  const [answers,setAnswers] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(auth,(res)=>{
      if(res){
        setIsLoggedIn(true)
      }else {
        setIsLoggedIn(false)
      }
    })
  },[])

  useEffect(()=>{
    if(isLoggedIn){
      const Ref = doc(db,'userData',auth.currentUser.uid)
      onSnapshot(Ref,(res)=>{
        const { isAsked, answers } = res.data()
        setIsAsked(isAsked)
        const answersArr = JSON.parse(answers)
        let answersObj = {}
        for(let i=0; i<answersArr.length ; i++){
          answersObj[`question${i+1}`] = answersArr[i]
        }
       const take = Math.floor(Math.random() * 18)
       setAnswers(genres[take].name)
 
      })       
    }
  },[isLoggedIn])

  return (

    <main className='App'>
      <div className='BG'></div>
      {!isLoggedIn ?
        <Account />
      :
        <>
          {isAsked ?
            <Dashboard genres={answers} />
          :
            <Questions />
          }

        </>
      }
      
    </main>
    

  )
}

export default App
