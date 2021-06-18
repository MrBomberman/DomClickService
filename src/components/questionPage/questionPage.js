import React, { useEffect, useState } from 'react';
import QuestionService from '../../services/questionService';
import './questionPage.css'


const getData = new QuestionService();


function QuestionPage(){
    
    

    const [questions, setQuestions] = useState([]) // засовываем массив наших вопросов
    const [count, setCount] = useState(0)
    // const [questionId , setQuestionId] = useState(Math.floor(Math.random()* 9))

    useEffect(() => {getData.getResource()
        .then(res => setQuestions(res))}, []);
    
   


    const content = count === 10 ? <Finish id={count}/> :  <View question={questions.map(ques => (
        ques.question
    ))} id={count}/> ;
   
    const answers = <CheckboxOrRadio variants={questions} id={count}/>;


    return (
        <div>

            {content}
            {answers}
            <button onClick={() => setCount(prev => prev + 1)}>
        Complete
      </button>
      <button onClick={() => setCount(prev => prev - 1)}>
        Return
      </button>
        </div>
    )
}

function CheckboxOrRadio ({variants, id}) { // создаем локальный компонент
    
    const correctAnswer = variants.map(answer => {
        return answer.correct_answer
    })

    const otherAnswers = variants.map(answers => {
        return answers.incorrect_answers
    })

    

    const typeOfAnswer = variants.map(answers => {
        return answers.type
    })
    
    if(typeOfAnswer[id] === 'multiple'){
        return (
            <input type='checkbox'/>
        ) 
    } else {
        return (
            <input type='radio'/>
              
           
        )
    }


}



function View ({question, id}) { // создаем локальный компонент
    
    // const {category, type, difficulty, question} = questions[id];
    
    return (
        <div className='question'>
            <h4>Question: {question[id]}</h4>

        </div>
    )
}



function Finish({id}){
    return (

        <div className='question'>
            Right answers: {id}
        </div>
    )
}

export default QuestionPage;