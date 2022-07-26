import React from "react"
import { nanoid } from "nanoid"

const Question = (props) => {
        
    function decode(input) {
        let doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }

    const badAnswers = props.incorrectAnswers.map(answer => {
		const badAnswerClassName = `
			${props.selectedAnswer === answer && "quiz-btn-selected"}
            ${(props.showAnswer && props.selectedAnswer === answer) && "quiz-btn-incorrect"}
            ${(props.showAnswer && props.selectedAnswer !== answer) && "quiz-btn-disable"}
		`;

		return <button
			key={nanoid()}
			className={badAnswerClassName}
			onClick={() => props.handleSelectAnswer(props.id, answer)}
		>
			{ decode(answer) }
		</button>
	});
    
    const goodAnswerClassName = `
		${props.selectedAnswer === props.correctAnswer ? "quiz-btn-selected" : "quiz-btn"}
        ${props.showAnswer && "quiz-btn-correct"}
	`;
    
    const goodAnswer = 
        <button key={nanoid()} 
        className={goodAnswerClassName}
        onClick={() => props.handleSelectAnswer(props.id, props.correctAnswer)}
        >
            {decode(props.correctAnswer)}
        </button>
        
    badAnswers.push(goodAnswer)
    
    const sortedAnswerElements = badAnswers.sort((a, b) => (
		a.props.children.localeCompare(b.props.children))
	);
                
    return (
        <div className="question">
            <h4 className="question--title">{decode(props.question)}</h4>
            <div className="question--answers">
                {sortedAnswerElements}
            </div>
        </div>
    )
}

export default Question;