import {RECEIVE_USERS,SAVE_ANSWER_TO_USER,USER_NEW_QUESTION} from '../actions/users'

export default function users(state = {},action) {
    switch(action.type){
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case SAVE_ANSWER_TO_USER:
            const {authedUser,qid,answer} = action
            return {
                ...state,
                [authedUser]:{
                ...state[authedUser],
                answers : {
                    ...state[authedUser].answers,
                    [qid] : answer
                }
            }
        }
        case USER_NEW_QUESTION:
            const {question} = action
            return {
                ...state,
                [question.author] : {
                    ...state[question.author],
                    questions: state[question.author].questions.concat([question.id])
                }
            }
        default:
            return state
    }
}