/* eslint-disable react/prop-types */
import  { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { AlertData } from '../context/AlertContext';

const Login = ({setCurrentPage}) => {
    const { setAlertData } = AlertData()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit =  e => {
        e.preventDefault();
        if(formData.email === '' || formData.password === ''){
            setAlertData({type:'warrning',showen:true,msg:'make sure to fill all the inputs'})
        }else {
            signInWithEmailAndPassword(auth,formData.email,formData.password)
            .then(()=>{
                setAlertData({type:'success',showen:true,msg:'logged in successfully'})
            })
            .catch((err) => setAlertData({type:'error',showen:true,msg:err.message}))
        }
    }

    const handleChange = e => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value,
        })
    }
    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
            <h2 className='form-logo'>
                <span className='first'>Reel</span>
                <span className='second'>Radar</span>
            </h2>
            <label htmlFor="">Email</label>
            <input 
                type="text" 
                autoComplete='off'
                id='email'
                name='email'
                placeholder='example@email.com'
                value={formData.email}
                onChange={(e)=>handleChange(e)}
            />
            <label htmlFor="">password</label>
            <input 
                type='password'
                autoComplete='off'
                id='password'
                name='password'
                placeholder='******************'
                value={formData.password}
                onChange={handleChange}
            />
            <button className='Btn'>
                login
            </button>
            <p className='create-account'>
                don{`'`}t have an account? <span onClick={()=>setCurrentPage('signup')}>Create one</span>
            </p>
        </form>
    )
}

export default Login