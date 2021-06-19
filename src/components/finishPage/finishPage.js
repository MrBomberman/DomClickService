import './finishPage.css'

export default function FinishPage({score, questions}){


    return (

        <div className='container'>
            <h1>Right answers: {score}</h1>
            <h2>In this test there were: {questions.length} questions</h2>
            <div>Difficult questions: </div>
            <div>Medium questions: </div>
            <div>Easy questions: </div>
        </div>
    )
}
