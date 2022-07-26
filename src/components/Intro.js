import React from "react"

const Intro = (props) => {
    return (
        <div className="intro">
            <h1 className="intro-title">Quizzical</h1>
            <p className="intro--description">Some description if needed</p>
            <button className="intro--btn" onClick={props.handleIntro}>Start Quiz</button>
        </div>
    )
}

export default Intro;