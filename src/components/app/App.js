import React, { Component } from 'react';
import './App.css';
import QuestionService from '../../services/questionService'
import QuestionPage from '../questionPage/questionPage';

export default class App extends Component{
   
    // QuestionService = new QuestionService() // создается новый сервис с массивом объектов(вопросов)
    
    render(){
        return (
           
            <QuestionPage/>
         
     )
    }



}


