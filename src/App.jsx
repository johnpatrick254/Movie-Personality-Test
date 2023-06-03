import './styles/App.css';
import Account from './pages/Account';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import Questions from './components/Questions';
import { doc, onSnapshot } from 'firebase/firestore';
import { Dashboard } from './pages/Dashboard';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAsked, setIsAsked] = useState(false);
  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    })
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      const Ref = doc(db, 'userData', auth.currentUser.uid)
      onSnapshot(Ref, (res) => {
        const { isAsked, answers } = res.data()
        setIsAsked(isAsked)
        const answersArr = JSON.parse(answers)
        let answersObj = {}
        for (let i = 0; i < answersArr.length; i++) {
          answersObj[`question${i + 1}`] = answersArr[i]
        }
        let data = JSON.stringify(answersObj);
        // console.log(data)
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://movie-recommender-api.vercel.app/recommend',
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        };

        axios.request(config)
          .then((response) => {
            setAnswers(JSON.stringify(response.data.genre));
          })
          .catch((error) => {
            console.log(error);
          });


      })
    }
  }, [isLoggedIn])

  return (

    <main className='App'>
      <div className='BG'></div>
      {!isLoggedIn ?
        <Account />
        :
        <>
          {(isAsked && answers !== null) ?
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
