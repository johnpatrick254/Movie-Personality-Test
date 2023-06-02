import './styles/App.css';
import Account from './pages/Account';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import Questions from './components/Questions';
import { doc, onSnapshot } from 'firebase/firestore';
import {Dashboard} from './pages/Dashboard';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [isAsked,setIsAsked] = useState(false);
  const [answers,setAnswers] = useState([]);

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
        setAnswers(JSON.parse(answers))
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
          {isAsked?
            <Dashboard answers={answers} />
          :
            <Questions />
          }
        </>
      }
      
    </main>
  )
}

export default App
