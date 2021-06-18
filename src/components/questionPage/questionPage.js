import React, { useEffect, useState } from 'react';
import QuestionService from '../../services/questionService';
import './questionPage.css'

function QuestionPage(){
    
    const getData = new QuestionService();

    const [questionList, setQuestion] = useState([]); // засовываем массив наших вопросов
    const [count, setCount] = useState(0)
    // const [questionId , setQuestionId] = useState(Math.floor(Math.random()* 9))

   useEffect(() => {
    if(questionList.length !== 10){
        getData.getResource()
        .then(res => setQuestion(res))
    } else {
        return // останавливает обновление запросов
    }
   })
    
   


    const content = <View quesList={questionList} id={count}/>;
   
    return (
        <div>

            {content}
        
            <button onClick={() => setCount(count + 1)}>
        Complete
      </button>
      <button onClick={() => setCount(count - 1 )}>
        Return
      </button>
        </div>
    )
}


function View ({quesList, id}) { // создаем локальный компонент
    
    const {category, type, difficulty, question} = quesList[id];
    
    return (
        <div className='question'>
            <h4>Question: {question}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span><strong>Type: </strong></span>
                    <span>{type}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span><strong>Category: </strong></span>
                    <span>{category}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span><strong>Difficulty: </strong></span>
                    <span>{difficulty}</span>
                </li>
                <span>{id}</span>

            </ul>
        </div>
    )
}

export default QuestionPage;