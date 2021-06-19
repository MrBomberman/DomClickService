import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react';
import QuestionService from '../../services/questionService';
import './questionPage.css'
import FinishPage from '../finishPage/finishPage';
import { couldStartTrivia } from 'typescript';


const getData = new QuestionService();

function QuestionPage(){
    
    

    const [questions, setQuestions] = useState([]) // засовываем массив наших вопросов
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [score, setScore] = useState(0);
    const [check, setCheck] = useState(false)

    useEffect(() => {
        getData.getResource()
                .then(res => setQuestions(res))
                .then(() => setLoading(false))
    },[] )
        
    // useEffect(() => {
        
    //     const inputs = document.querySelectorAll('input');
    //     inputs.forEach(input => {
    //         input.addEventListener('click', (e) => {
    //             if(e.target === (input.defaultChecked === 'right')){
    //                 setScore(() => score++)
                    
    //             }
    //         })
           
    //     })

    // })
    


    
   
   
    const answers = !loading ? <View questions={questions} id={count}/> : <h1>Loading.....</h1>;
    
    
    

    
    if(count < 10){
        return (
            <div className='container'>
                <div id='main'>
            <div>
                {answers}
                </div>
                
                </div>
                
    
                
               
               
                <button onClick={() => {
                    setCount(prev => prev + 1)
                    
                    }}>
            Complete
          </button>
          <button onClick={() => setCount(prev => prev - 1)}>
            Return
          </button>
            </div>
        )
    } else {
     return (
         <div>
             <FinishPage score={score}/>
         </div>
     )
    }
   
}


function View ({questions, id}) { // создаем локальный компонент
    // console.log(questions);
    // const inputs = document.querySelectorAll('input')
    // inputs.forEach(input => {
    //     console.log(input)
    // })

    
    const mainBlock = document.querySelector('div > .container > #main'); // our block with questions and variants of answers
    console.log(mainBlock)
    const titleOfQuestion = `<h4>${questions[id].question.replace(/(&quot\;|&#039;\ )/g,"'")}</h4>`
    const incorrectAnswers = questions[id].incorrect_answers.map((answer) => `<label><input type="checkbox" value='wrong' /> ${answer.replace(/(&quot\;|&#039;)/g,"'")}</label>`)
    const correctAnswer = `                <label>
    <input type="checkbox" value='right' /> ${questions[id].correct_answer.replace(/(&quot\;|&#039;\ )/g,"'")}
     </label>`
    
    questions[id].incorrect_answers.forEach(element => {
        return console.log(`<label><input type="checkbox" value='wrong' /> ${element.replace(/(&quot\;|&#039;)/g,"'")}</label>`)
    });


    if(questions[id].type === 'multiple'){
        return (
            mainBlock.innerHTML = `${titleOfQuestion}
                <ul>${incorrectAnswers}
                ${correctAnswer}
             </ul>`
            )
    } else {
        return (
                mainBlock.innerHTML = `${titleOfQuestion}
                <ul>
                ${incorrectAnswers}
                ${correctAnswer}
                </ul>`
                )
    }
  
        
    
        
    
}



export default QuestionPage;