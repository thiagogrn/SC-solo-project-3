import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Intro from "./components/Intro"
import Question from "./components/Question"
import "./App.css"

const App = () => {
    const [intro, setIntro] = useState(true)
    const [quizArray, setQuizArray] = useState([])
    const [score, setScore] = useState(0)
    const [checkBtn, setCheckBtn] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [restartTrigger, setRestartTrigger] = useState(false)
    
    const allAnswered = quizArray.every(question => question.selectedAnswer !== '')
    
    useEffect(() => {
         fetch("https://opentdb.com/api.php?amount=5")
         .then(res => res.json())
        .then(data => setQuizArray(data.results.map
            (data => {return {...data, id:nanoid(), selectedAnswer:'', showAnswer:false} })
            ))
        },[restartTrigger])
        
    useEffect(() => {
        if(quizArray.length !== 0 && allAnswered){
            let counter = 0
            quizArray.forEach(question => {
                if(question.correct_answer === question.selectedAnswer){
                    counter++
                }
            })
            setScore(counter)
            setCheckBtn(true)
        }
    },[quizArray])
        
    function handleIntro() {
        setIntro(false)
    }
    
    const handleSelectAnswer = (questionId, answer) => {
		if (intro === false) {
			setQuizArray(prevQuiz => (
				prevQuiz.map(question => (
					question.id === questionId
						? {...question, selectedAnswer: answer }
						: question
				))
			));
		}
	}    
    
    const checkAnswer = () => {
        if(allAnswered){
           setGameOver(true)
           setQuizArray(prevQuiz => prevQuiz.map(question => ({...question, showAnswer:true})))
        }
    }
    
    const resetGame = () => {
        setGameOver(false)
        setCheckBtn(false)
        setRestartTrigger(prevState => !prevState)
    }
            
    const quizCard = quizArray.map(question => 
    <Question 
        key={question.id} 
        question={question.question}
        incorrectAnswers={question.incorrect_answers}
        correctAnswer={question.correct_answer}
        id={question.id}
        selectedAnswer={question.selectedAnswer}
		showAnswer={question.showAnswer}
		handleSelectAnswer={handleSelectAnswer}
    />)
    
    return (
        <>
            {
                intro ? 
                    <div className="intro-container">
                        <Intro handleIntro={handleIntro}/>
                    </div>
                :
                    <div className="question-container">
                        <div className="question-card">
                            {quizCard}
                        </div>
                        <div className="btn-check">
                            {gameOver && <p>You score is {score}/5 </p> }
                            <button 
                            className={checkBtn ? 'btn-check' : 'btn-check-disable'}
                            onClick={gameOver ? resetGame : checkAnswer}
                            >
                            {gameOver ? 'Play Again' : 'Check Answers'}
                            </button>
                        </div>
                    </div>   
            }
        </>
    )
}

export default App;