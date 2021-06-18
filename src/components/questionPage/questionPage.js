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



    

    const typeOfAnswer = variants.map(answers => {
        return answers.type
    })

    // const answers =  variants[id].incorrect_answers + variants[id].correct_answer
    let array = []



    if(typeOfAnswer[id] === 'multiple'){
        
   

        // array.forEach(elem => {
        //     return (
        //     <label><input type="checkbox"/>${elem}</label>
        //     )
        // })
        
        
        return (
                <div class='question'>
                    <label><input type="checkbox"/></label>
                    <label><input type="checkbox"/>{correctAnswer[id]}</label>
                </div>
            )
       
       
          
           
           
       


    } else {
       
        
        return (
            <div class='question'>
            <label><input type="radio"/></label>
            <label><input type="radio"/>{correctAnswer[id]}</label>
            </div>
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