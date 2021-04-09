import React,{ Component } from 'react'
import Nav from './Nav'
import { connect } from 'react-redux'

class Leaderboard extends Component{
    render(){
        const {usersList} = this.props
        return(
            <div className='leaderboard'>
                <Nav />
            {
                usersList.map((user) => (
                <div className='board-card' key={user.id}>
                    <div className='avatar'>
                        <img src={user.avatarURL} alt='avatar'/>
                    </div>    
                    <div className='ques-info new-width'>
                        <span>{Object.keys(user.answers).length + user.questions.length}</span>
                        <h4>{user.name}</h4>
                        <p>Answered Questions: {Object.keys(user.answers).length}</p>
                        <p>Asked Questions: {user.questions.length}</p>
                    </div> 
                </div>  
                ))
            }
            </div>
            
        )
    }
}

function mapStateToProps({users}){
    const usersList = Object.values(users).sort((a,b) => (Object.keys(b.answers).length + b.questions.length) - 
    ( Object.keys(a.answers).length + a.questions.length))
    
    return {
        usersList
    }
}
export default connect(mapStateToProps)(Leaderboard)