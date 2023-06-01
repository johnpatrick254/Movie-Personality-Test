import { useState } from 'react';
import '../styles/questions.css';
import { AlertData } from '../context/AlertContext';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const Questions = () => {
    const { setAlertData } = AlertData()
    const [currentQuestion,setCurrentQuestion] = useState(0);
    const [answers,setAnswers] = useState(['',[]])
    const questions = [
        {
            type:'radio',
            question:'do you like bananas?',
            options:['YES','NO']
        },
        {
            type:"checkBox",
            question:"why don't you like bananas?",
            options:['resons 1','resons 2','resons 3','resons 4']
        }
    ]

    function handleSubmit(e){
        e.preventDefault()
        if(typeof answers[currentQuestion] === 'string'){
            if(answers[currentQuestion] === ''){
                setAlertData({type:'warrning',showen:true,msg:'make sure to answer the question'})
            }else {
                const Ref = doc(db,'userData',auth.currentUser.uid)
                setDoc(Ref,{
                    isAsked:true,
                    answers:JSON.stringify(answers)
                })
                .then(()=>{
                    setAlertData({type:'success',showen:true,msg:'data collected successfully'})
                })
                .catch(err => setAlertData({type:'error',showen:true,msg:err.message}))
            }
        }else {
            if(answers[currentQuestion].length < 1){
                setAlertData({type:'warrning',showen:true,msg:'choose at least 1 chooice'})
            }else {
                const Ref = doc(db,'userData',auth.currentUser.uid)
                setDoc(Ref,{
                    isAsked:true,
                    answers:JSON.stringify(answers)
                }).then(()=>{
                    setAlertData({type:'success',showen:true,msg:'data collected successfully'})
                })
                .catch(err => setAlertData({type:'error',showen:true,msg:err.message}))
            }
        }
    }



    function handleChoose(qi,oi,type){
        if(type === 'radio'){
            setAnswers(prev => {
                let newArr = [...prev]
                if(newArr[qi] === questions[qi].options[oi]){
                    newArr[qi] = ''
                }else {
                    newArr[qi] = questions[qi].options[oi]
                }
                return newArr
            })
        }else {
            setAnswers(prev => {
                let newArr = [...prev]
                if(newArr[qi].includes(questions[qi].options[oi])){
                    newArr[qi] = newArr[qi].filter(e => e !== questions[qi].options[oi])
                }else {
                    newArr[qi].push(questions[qi].options[oi])
                }
                return newArr
            })
        }
    }


    function handleNext(e,currentQuestion,answers){
        e.preventDefault()
        if(typeof answers[currentQuestion] === 'string'){
            if(answers[currentQuestion] === ''){
                setAlertData({type:'warrning',showen:true,msg:'make sure to answer the question'})
            }else {
                setCurrentQuestion(prev => {
                    if(prev < questions.length - 1){
                        return prev + 1
                    } else {
                        return prev
                    }
                });
            }
        }else {
            if(answers[currentQuestion].length < 1){
                setAlertData({type:'warrning',showen:true,msg:'choose at least 1 chooice'})
            }else {
                setCurrentQuestion(prev => {
                    if(prev < questions.length - 1){
                        return prev + 1
                    } else {
                        return prev
                    }
                });
            }
        }
    }
    function handleBack(e){
        e.preventDefault()
        setCurrentQuestion(prev => {
            if(prev > 0){
                return prev - 1
            }else {
                return prev
            }
        });
    }
    return (
        <section className='questions'>
            <article className='holder'>
                <form action="" style={{transform:`translateX(-${currentQuestion * 550}px)`}}>
                    {questions.map((e,i)=>{
                        if(e.type === 'radio'){
                            return <div className='question' key={i}>
                                <h2 className='text'>{e.question}</h2>
                                {e.options.map((ele,index)=>{
                                    return <p key={index} onClick={()=>handleChoose(i,index,e.type)}>
                                        <span className={`bullet ${answers[i]=== ele && 'choosen'}`}></span>
                                        <span className='option'>{ele}</span>
                                    </p>
                                })
                                }
                                <button className='back' onClick={handleBack}>Back</button>
                                {i === questions.length-1?
                                    <button className='next' onClick={(e)=>handleSubmit(e)}>Submit</button>
                                :
                                    <button className='next' onClick={(e)=>handleNext(e,currentQuestion,answers)}>Next</button>
                                }
                            </div>
                        }else {
                            return <div className='question' key={i} >
                                <h2 className='text'>{e.question}</h2>
                                {e.options.map((ele,index)=>{
                                    return <p key={index} onClick={()=>handleChoose(i,index,e.type)}>
                                            <span className={`check ${answers[i].includes(ele) && 'choosen'}`}></span>
                                            <span className='option'>{ele}</span>
                                        </p>
                                })
                                }
                                <button className='back' onClick={handleBack}>Back</button>
                                {i === questions.length-1?
                                    <button className='next' onClick={(e)=>handleSubmit(e)}>Submit</button>
                                :
                                    <button className='next' onClick={(e)=>handleNext(e,currentQuestion,answers)}>Next</button>
                                }
                            </div>
                        }
                    })

                    }
                </form>
            </article>
        </section>
    )
}

export default Questions