import './styles/App.css';
import Account from './pages/Account';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  useEffect(()=>{
    onAuthStateChanged(auth,(res)=>{
      if(res){
        setIsLoggedIn(true)
      }else {
        setIsLoggedIn(false)
      }
    })
  },[])

  return (
    <main className='App'>
      <div className='BG'></div>
      {isLoggedIn ?
        <h2>hi</h2>
      :
        <Account />
      }
    </main>
  )
}

export default App
