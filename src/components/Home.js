import React, {Component} from 'react'
import { connect } from 'react-redux'
import List from './List'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Nav from './Nav'

class Home extends Component{

    
    render(){
        return (
            <div className='questions-list'>
                <Nav/>
                <Tabs fill defaultActiveKey="answered" >
                    <Tab eventKey="answered" title="Answered">
                        <List items = {this.props.answeredQuestions}/>
                    </Tab>
                    <Tab eventKey="unanswered" title="Unanswered">
                        <List items = {this.props.unansweredQuestions}/>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

function mapStateToProps({authedUser,users,questions}){
    let user = users[authedUser]
    let answeredQuestions = Object.keys(user.answers)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    return{
        answeredQuestions,
        unansweredQuestions: Object.keys(questions).filter((id) => 
            !answeredQuestions.includes(id)
        ).sort((a,b) => questions[b].timestamp - questions[a].timestamp)

    }
}
export default connect(mapStateToProps)(Home)