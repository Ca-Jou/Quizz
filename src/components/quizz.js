import React, { useState } from 'react';

export default function Quizz() {
  
  const questions = require('./question').default;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswerButtonClick = (id) => {

    selectedAnswers.includes(id) 
      ? setSelectedAnswers(selectedAnswers.filter(a => a !== id)) 
      : setSelectedAnswers([...selectedAnswers, id]);
  };

  const onSubmit = () => {
    const nextQuestion = currentQuestion + 1;
    let answers = questions[currentQuestion].answerOptions.filter(o => o.isAnswer).map(a => a.id);

    if (JSON.stringify(answers.sort()) === JSON.stringify(selectedAnswers.sort())) {setScore(score + 1)};
    setSelectedAnswers([]);
   
    document.querySelectorAll('input[type=radio]').forEach( el => el.checked = false );
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  }

  const average = questions.length / 2;

	return (
		<div className='question-section'>
      
          {showScore ? (
          score >= average ? <p>Tu es un-e BOOMER</p> : <p>Tout va bien pour toi..</p>
			) : (
            <div className='quiz'>
                <section >
                  <h2>Question {currentQuestion + 1}</h2>
                    <div className='question-text'>{questions[currentQuestion].questionText}</div>
                    <ul className='answer-section'>

                      {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                        <li key={index}>
                            <input id={index} type='radio' onClick={() => handleAnswerButtonClick(answerOption.id)}/>
                            <label htmlFor={index}>{answerOption.answerText}</label>

                        </li>

                        ))}
                      {questions[currentQuestion].img ? <img src={questions[currentQuestion].img}/> : ''}
                        <button onClick={() => onSubmit()}>Valider</button>
                      </ul>
                </section>
            </div>
			)}
		</div>
	);
}
