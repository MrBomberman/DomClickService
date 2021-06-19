import React, { useEffect, useState } from 'react';
import QuestionService from '../../services/questionService';
import './questionPage.css'



const getData = new QuestionService();

function QuestionPage(){
    
    

    const [questions, setQuestions] = useState([]) // засовываем массив наших вопросов
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getData.getResource()
                .then(res => setQuestions(res))
                .then(() => setLoading(false))
    },[] )
        
    
        


    // const content = count === 10 ? <Finish id={count}/> :  <View question={questions.map(ques => (
    //     ques.question
    // ))} id={count}/> ;
   
   
    const answers = !loading ? <View questions={questions} id={count}/> : <h1>Loading.....</h1>;
    
    
    return (
        <div className='container'>
            

            
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


function View ({questions, id}) { // создаем локальный компонент
    console.log(questions[id].type);
    

    if(questions[id].type === 'multiple'){
        return (
            <div className='question'>
                <h4>{questions[id].question}</h4>
                <ul>
                {questions[id].incorrect_answers.map((answer) => <label><input type="checkbox"/> {answer}</label>)}
                <label><input type="checkbox"/>{questions[id].correct_answer}</label>
                </ul>
                
            </div>
            )
    } else {
        return (
                <div className='question'>
                    <h4>{questions[id].question}</h4>
                    <ul>
                    {questions[id].incorrect_answers.map((answer, j) => <label><input type="radio" name='radio'/> {answer}</label>)}
                    <label><input type="radio" name='radio'/> {questions[id].correct_answer}</label>
                    </ul>
                </div>
                
                )
    }
  
        
    
        
    
}






function Finish({id}){
    return (

        <div className='question'>
            Right answers: {id}
        </div>
    )
}

export default QuestionPage;