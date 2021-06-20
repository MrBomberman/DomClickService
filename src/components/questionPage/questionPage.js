import React, { useEffect, useState } from 'react';
import QuestionService from '../../services/questionService';
import './questionPage.css'
import FinishPage from '../finishPage/finishPage';


const getData = new QuestionService();

function QuestionPage(){
    
    const [questions, setQuestions] = useState([]) // засовываем массив наших вопросов
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [score, setScore] = useState(0);
    const [hard, setDiff] = useState(0);
    const [medium, setMedium] = useState(0);
    const [easy, setEasy] = useState(0);

    useEffect(() => {
        getData.getResource()
                .then(res => setQuestions(res))
                .then(() => setLoading(false))
    },[])
        
    

   
   
    const answers = !loading ? <View questions={questions} id={count}/> : <h1>Loading.....</h1>;
    
    function changeStates(){
        const inputs = document.querySelectorAll('input')
        inputs.forEach(input => {
            if(questions[count].difficulty === 'hard' && input.value === 'right' && input.checked){
                setScore(() => score + 1)
                setDiff(() => hard + 1)
            } else if(questions[count].difficulty === 'medium' && input.value === 'right' && input.checked){
                setMedium(() => medium + 1)
                setScore(() => score + 1)
            } else if(questions[count].difficulty === 'easy' && input.value === 'right' && input.checked){
               setEasy(() => easy + 1)
               setScore(() => score + 1)
            }
        })


        setCount(prev => prev + 1)
    }
    


    console.log(questions)
    
    if(count < questions.length){
        return (
            <div className='container'>
                <div id='main'>
            <div>
            {answers}
                </div>
                
                </div>
              
                <button onClick={() => changeStates() }>
            Complete
          </button>
                   
            </div>
            
        )
    } else if(loading) {
        return <h1>Loading....</h1>
    } else {
        return (
            <div>
                <FinishPage questions={questions} score={score} hard={hard} medium={medium} easy={easy}/>
            </div>
        )
       }
   
}


function View ({questions, id}) { // создаем локальный компонент
    // console.log(questions);
    let arrOfAnswers = []
    
    questions[id].incorrect_answers.forEach((ques) => {
        return arrOfAnswers.push([ques])
    })


    
    const mainBlock = document.querySelector('div > .container > #main'); // our block with questions and variants of answers
    console.log(mainBlock)
    const titleOfQuestion = `<h3>${questions[id].question.replace(/(&quot;)/g,"\"").replace(/(&#039;)/g, "'")}</h3>`
    const incorrectAnswers = questions[id].incorrect_answers.map((answer) =>{ 
        return `<label class="control control-checkbox"><input type="checkbox" value='wrong'/> ${answer.replace(/(&quot;)/g,"\"").replace(/(&#039;)/g, "'")}<div class="control_indicator"></div></label>`}).join('')
    const correctAnswer = `
    <label class="control control-checkbox">
    <input type="checkbox" value='right' /> ${questions[id].correct_answer.replace(/(&quot;)/g,"\"").replace(/(&#039;)/g, "'")}<div class="control_indicator"></div></label>`
    
    console.log(arrOfAnswers)
   
    

    if(questions[id].type === 'multiple'){
        return (
            mainBlock.innerHTML = `${titleOfQuestion}
            <h4>Choose one variant: </h4>
                <ul>${incorrectAnswers}
                ${correctAnswer}
             </ul>`
            )
    } else {
        return (
                mainBlock.innerHTML = `${titleOfQuestion}
                <ul>
                ${questions[id].incorrect_answers.map((answer) => `<label  class='b-contain'><input class='radiobtn' type="radio" value='wrong' name='radio'/> ${answer.replace(/(&quot;)/g,"\"").replace(/(&#039;)/g, "'")}<div class="b-input"></div></label>`)}
            <label class='b-contain'>
                <input type="radio" value='right' name='radio'/> ${questions[id].correct_answer.replace(/(&quot;)/g,"\"").replace(/(&#039;)/g, "'")}<div class="b-input"></div>
            </label>
                </ul>`
                )
    }
  
        
    
        
    
}



export default QuestionPage;