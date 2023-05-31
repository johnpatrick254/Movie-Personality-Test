import React, { useEffect } from 'react'
import Login from './Login'
import '../styles/account.css';
import SignUp from './Signup';

const Account = () => {

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
        <>
            <div className='BG'></div>
            <section className='account-section'>
                <SignUp />
            </section>
        </>
    )
}

export default Account