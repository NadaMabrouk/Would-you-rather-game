import React , { Component} from 'react'
import { connect } from 'react-redux'
import {formatDate} from '../utils/api'
import {Link} from 'react-router-dom'
class Question extends Component{
    render(){
        const {id,curQues,name,avatarURL,date} = this.props
        return (
            <Link to={`/questions/${id}`}>
                <div className='question'>
                    <div className='avatar'>
                        <img src={avatarURL} alt='author-avatar'/>
                    </div>
                    <div className='ques-info'>
                        <h4>{name} asks:</h4>
                        <p>Would you rather?</p>
                        <p>{curQues.optionOne.text}</p>
                        <p>  {curQues.optionTwo.text}</p>
                        <span>{date}</span>
                    </div>
                </div>
            </Link>
        )
    }
}
function mapStateToProps({questions,users},props){
    const {id} = props
    const curQues = questions[id]
    const user = users[curQues.author]
    const {name,avatarURL} = user
    return {
        id,
        curQues,
        name,
        avatarURL,
        date: formatDate(curQues.timestamp)
    }
}
export default connect(mapStateToProps)(Question)