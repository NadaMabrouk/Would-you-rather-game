import React, { Component } from 'react'
import { connect } from 'react-redux'
class QuestionDetails extends Component{
    render(){
        const {isAnswered,curQues} = this.props
        return (
            <div>
            { isAnswered && <div>
                Answered Question
                </div>
                }
            {!isAnswered && <div>
                Not Answered yet
                </div>}
            </div>
        )
    }
}

function mapStateToProps({authedUser,users,questions},props){
    const {id} = props.match.params
    const answeredQuestions = Object.keys(users[authedUser].answers)
    const isAnswered = answeredQuestions.includes(id)
    const curQues = questions[id]
    return {
        isAnswered,
        curQues
    }
}
export default connect(mapStateToProps)(QuestionDetails)