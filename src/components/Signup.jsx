/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { auth,db } from '../firebaseConfig';
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { setDoc,doc } from 'firebase/firestore';
import { AlertData } from '../context/AlertContext';

const SignUp = ({setCurrentPage}) => {
    const { setAlertData } = AlertData()
    const [ formData, setFormData] = useState({
        email: '',
        password: '',
        passwordConf: '',
        username:'',
    })

    const { email, password, passwordConf,username } = formData

    const handleSubmit = e => {
        e.preventDefault()
        if(email === '' || password === '' || passwordConf === '' || username === ''){
            setAlertData({type:'warrning',showen:true,msg:'make sure to fill all the inputs'})
        }else if(password !== passwordConf ){
            setAlertData({type:'warrning',showen:true,msg:'make sure to match the passwords'})
        } else {
            createUserWithEmailAndPassword(auth,email,password)
            .then((res)=>{
                setAlertData({type:'success',showen:true,msg:'created account successfully'})
                updateProfile(res.user,{displayName:username})
                .then(()=>{
                    const Ref = doc(db,'userData',auth.currentUser.uid)
                    setDoc(Ref,{
                        isAsked:false,
                        answers:[]
                    })
                })
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
            <label htmlFor="">username</label>
            <input 
                type="text" 
                placeholder='username' 
                autoComplete='off'
                id='username'
                name='username'
                value={username}
                onChange={handleChange}
                />
            <label htmlFor="">Email</label>
            <input 
                type="text" 
                autoComplete='off'
                id='email'
                name='email'
                placeholder='example@email.com'
                value={email}
                onChange={handleChange}
            />
            <label htmlFor="">password</label>
            <input 
                type='password'
                autoComplete='off'
                id='password'
                name='password'
                placeholder='****************'
                value={password}
                onChange={handleChange}
            />
            <label htmlFor="">confirm password</label>
            <input 
                type='password'
                autoComplete='off'
                id='confirm'
                name='passwordConf'
                placeholder='****************'
                value={passwordConf}
                onChange={handleChange}
            />
            <button className='Btn'>
                create account
            </button>
            <p className='create-account'>
                {/* already have an account? <Link to='/'><span> login</span></Link>  */}
                already have an account?<span onClick={()=>setCurrentPage('login')}> login</span>
            </p>
        </form>
    )
}

export default SignUp