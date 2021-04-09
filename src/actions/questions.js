import { _saveQuestionAnswer,_saveQuestion} from '../utils/_DATA'
import {saveAnswerToUser,userNewQuestion} from './users'
import {showLoading,hideLoading} from 'react-redux-loading'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function saveQuestionAnswer(authedUser,qid,answer){
    return {
        type: SAVE_QUESTION_ANSWER,
        qid,
        answer,
        authedUser
    }
}

export function handleAddQuestionAnswer(qid,answer){
    return (dispatch,getState) => {
        const {authedUser} = getState()
        dispatch(showLoading())
        return _saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
        .then(()=> {
            dispatch(saveQuestionAnswer(authedUser,qid,answer))
            dispatch(saveAnswerToUser(authedUser,qid,answer))
        }).then(() => {
            dispatch(hideLoading())
        })
    }
}

function addQuestion(question){
    return{
        type:ADD_QUESTION,
        question
    }
}

export function handleAddQuestion(optionOneText,optionTwoText){
    return (dispatch,getState) => {
        const {authedUser} = getState()
        console.log(authedUser)
        dispatch(showLoading())
        return _saveQuestion({
            author: authedUser,
            optionOneText,
            optionTwoText
        }).then((question) => {
            dispatch(addQuestion(question))
            dispatch(userNewQuestion(question))
        }).then(() => {
            dispatch(hideLoading())
        })
    }
}