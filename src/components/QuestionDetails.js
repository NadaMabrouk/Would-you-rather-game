import React, { Component,Fragment } from 'react'
import { connect } from 'react-redux'
import {handleAddQuestionAnswer} from '../actions/questions'
import Nav from './Nav'

class QuestionDetails extends Component{
    state = {
        selectedOption : ''
    }
    onValueChange = (event) => {
        this.setState({
          selectedOption: event.target.value
        });
      }
    handleSubmit = (e) => {
        e.preventDefault()
        const {dispatch} = this.props
        dispatch(handleAddQuestionAnswer(this.props.match.params.id,this.state.selectedOption))
    }
    
    render(){
        const {isAnswered,curQues,authorsOption,optionOneVotes,optionTwoVotes,optionOnePerc,optionTwoPerc,name,avatarURL} = this.props

        return (
            <div className="ques-details">
                <Nav/>
            <div className='question' style={{height: "80%"}}>
                <div className='avatar'>
                    <img src={avatarURL} alt='author-avatar'/>
                </div>
                <div className='ques-info'>
                        <h4>{name} asks:</h4>
                        <p>Would you rather?</p>
            { isAnswered &&
                    <Fragment>
                        <li className={authorsOption === 'optionOne' ? 'correct' : ''}>
                            <span className="perc-bar" style={{width : `${optionOnePerc}%`}}></span>
                            <label className="answeredLabel" for="option1">{curQues.optionOne.text}</label>
                            <span className="perc-number">{optionOnePerc} %</span>
                        </li>
                        <p>{optionOneVotes} people voted for this</p>
                        <li className={authorsOption === 'optionTwo' ? 'correct' : ''}>
                            <span className="perc-bar" style={{width : `${optionTwoPerc}%`}}></span>
                            <label className="answeredLabel" for="option2">{curQues.optionTwo.text}</label>
                            <span className="perc-number">{optionTwoPerc} %</span>
                        </li>
                        <p>{optionTwoVotes} people voted for this</p>
                        
                    </Fragment>
                }
                 
            {!isAnswered && 
                <form onSubmit={this.handleSubmit}>
                    <div className="radio">
                        <label>
                            <input
                            type="radio"
                            value="optionOne"
                            checked={this.state.selectedOption === "optionOne"}
                            onChange={this.onValueChange}
                            />
                            {curQues.optionOne.text}
                        </label>
                    </div>
                    <div>
                    <label>
                        <input
                        type="radio"
                        value="optionTwo"
                        checked={this.state.selectedOption === "optionTwo"}
                        onChange={this.onValueChange}
                        />
                        {curQues.optionTwo.text}
                    </label>
                    </div>
                    <div>
                        <button className="btn btn-primary" type="submit" disabled={this.state.selectedOption === ''}>
                            Submit
                        </button>
                    </div>
                </form>
                }
                </div>
            </div>
        </div>
        )
    }
}

function mapStateToProps({authedUser,users,questions},props){
    const {id} = props.match.params
    const answeredQuestions = Object.keys(users[authedUser].answers)
    const isAnswered = answeredQuestions.includes(id)
    let authorsOption = ''
    const curQues = questions[id]
    if(isAnswered){
        authorsOption = curQues.optionOne.votes.includes(authedUser) ? 'optionOne' : 'optionTwo'
    }
    const optionOneVotes =  curQues.optionOne.votes.length
    const optionTwoVotes = curQues.optionTwo.votes.length
    const totalVotes = optionOneVotes + optionTwoVotes
    
    const user = users[curQues.author]
    const {name,avatarURL} = user
    return {
        isAnswered,
        curQues,
        authorsOption,
        optionOneVotes,
        optionTwoVotes,
        optionOnePerc: ( optionOneVotes * 100 ) / totalVotes,
        optionTwoPerc: (optionTwoVotes * 100 ) / totalVotes,
        name,
        avatarURL
    }
}
export default connect(mapStateToProps)(QuestionDetails)