import  { useEffect, useState } from 'react'
import Login from '../components/Login'
import '../styles/account.css';
import SignUp from '../components/Signup';

const Account = () => {
    const [currentPage,setCurrentPage] = useState('login')

    useEffect(()=>{
        document.addEventListener('mousemove',parallax);
        function parallax(e){
        const BG = document.querySelector('.BG');
        let x = e.clientX / 10 
        let y = e.clientY / 10
        BG.style.backgroundPositionX = `${x}px`
        BG.style.backgroundPositionY = `${y}px`
        }
    },[])
    return (
        <section className='account-section'>
            {currentPage === 'login'?
                <Login setCurrentPage={setCurrentPage} />
            :
                <SignUp setCurrentPage={setCurrentPage} />
            }
        </section>
    )
}

export default Account