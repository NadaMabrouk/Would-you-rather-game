export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_ANSWER_TO_USER = 'SAVE_ANSWER_TO_USER'
export const USER_NEW_QUESTION = 'USER_NEW_QUESTION'
export function receiveUsers(users){
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function saveAnswerToUser(authedUser,qid,answer){
    return {
        type: SAVE_ANSWER_TO_USER,
        qid,
        answer,
        authedUser
    }
}

export function userNewQuestion(question){
    return {
        type: USER_NEW_QUESTION,
        question
    }
}