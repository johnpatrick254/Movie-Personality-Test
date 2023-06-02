import { useState } from 'react';
import '../styles/questions.css';
import { AlertData } from '../context/AlertContext';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const Questions = () => {
    const { setAlertData } = AlertData()
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(['', '', '', '', '', ''])
    const questions = [
        {
            type: 'radio',
            question: 'Do you interact with alot of people?',
            options: ['YES', 'NO']
        },
        {
            type: 'radio',
            question: 'Do you use logic or emotions in your decisions?',
            options: ['Logic', 'Emotions']
        },
        {
            type: 'radio',
            question: 'Do you act carefully or impulsively?',
            options: ['carefully', 'Impulsively']
        },
        {
            type: "input",
            question: "What movie do you hate the most?",
        },
        {
            type: "input",
            question: "Imagine you have the power to enter the plot of any movie and interact with the characters. Which movie would you choose and what role would you play?",
        },
        {
            type: "input",
            question: "Share a memorable movie-watching experience you've had and what made it so special",
        },
    ]

    function handleSubmit(e) {
        e.preventDefault()
        if (answers[currentQuestion] === '') {
            setAlertData({ type: 'warrning', showen: true, msg: 'make sure to answer the question' })
        } else {
            const Ref = doc(db, 'userData', auth.currentUser.uid)
            setDoc(Ref, {
                isAsked: true,
                answers: JSON.stringify(answers)
            })
            .catch(err => setAlertData({ type: 'error', showen: true, msg: err.message }))
        }
    }


    function handleChange(e, i) {
        setAnswers(prev => {
            let newArr = [...prev]
            newArr[i] = e.target.value
            return newArr
        })
    }

    function handleChoose(qi, oi) {
        setAnswers(prev => {
            let newArr = [...prev]
            if (newArr[qi] === questions[qi].options[oi]) {
                newArr[qi] = ''
            } else {
                newArr[qi] = questions[qi].options[oi]
            }
            return newArr
        })
    }



    function handleNext(e, currentQuestion, answers) {
        e.preventDefault()
        if (answers[currentQuestion] === '') {
            setAlertData({ type: 'warrning', showen: true, msg: 'make sure to answer the question' })
        } else {
            setCurrentQuestion(prev => {
                if (prev < questions.length - 1) {
                    return prev + 1
                } else {
                    return prev
                }
            });
        }
    }
    function handleBack(e) {
        e.preventDefault()
        setCurrentQuestion(prev => {
            if (prev > 0) {
                return prev - 1
            } else {
                return prev
            }
        });
    }
    return (
        <section className='questions'>
            <article className='holder'>
                <form action="" style={{ transform: `translateX(-${currentQuestion * 550}px)` }}>
                    {questions.map((e, i) => {
                        if (e.type === 'radio') {
                            return <div className='question' key={i}>
                                <h2 className='text'>{e.question}</h2>
                                {e.options.map((ele, index) => {
                                    return <p key={index} onClick={() => handleChoose(i, index)}>
                                        <span className={`bullet ${answers[i] === ele && 'choosen'}`}></span>
                                        <span className='option'>{ele}</span>
                                    </p>
                                })
                                }
                                <button className='back' onClick={handleBack}>Back</button>
                                {i === questions.length - 1 ?
                                    <button className='next' onClick={(e) => handleSubmit(e)}>Submit</button>
                                    :
                                    <button className='next' onClick={(e) => handleNext(e, currentQuestion, answers)}>Next</button>
                                }
                            </div>
                        } else {
                            return <div className='question' key={i} >
                                <h2 className='text'>{e.question}</h2>
                                <textarea
                                    name="" id=""
                                    placeholder='your answer goes here'
                                    value={answers[i]}
                                    onChange={(event) => handleChange(event, i)}
                                ></textarea>
                                <button className='back' onClick={handleBack}>Back</button>
                                {i === questions.length - 1 ?
                                    <button className='next' onClick={(e) => handleSubmit(e)}>Submit</button>
                                    :
                                    <button className='next' onClick={(e) => handleNext(e, currentQuestion, answers)}>Next</button>
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