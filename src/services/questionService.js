import React from 'react';

export default class QuestionService {
    constructor(){
        this._apiBase = 'https://opentdb.com/api.php?amount=10'
    }
    
        getResource =  async () => { // делаем классический метод
            const res = await fetch(`${this._apiBase}`);
            const { results } = await res.json();

            return results
        }
    



    
}