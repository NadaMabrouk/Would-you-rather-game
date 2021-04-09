import React, {Component,Fragment} from 'react'
import { handleInitialData } from '../actions/shared';
import {connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import LogIn from './LogIn'
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import QuestionDetails from './QuestionDetails'
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import PrivateRoute from './PrivateRoute'

class App extends Component{
  componentDidMount(){
      this.props.dispatch(handleInitialData())
  }
  render(){
    
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div>
              <div>
                <Route path='/login' component={LogIn}/>
                <PrivateRoute path='/' exact component= {Home} isAuth={this.props.authedUser !== null}/>
                <PrivateRoute path='/questions/:id' component={QuestionDetails} isAuth={this.props.authedUser !== null}/>
                <PrivateRoute path='/add' component={NewQuestion} isAuth={this.props.authedUser !== null}/>
                <PrivateRoute path='/leaderboard' component={Leaderboard} isAuth={this.props.authedUser !== null}/>
              </div>
              
              
          </div>
        </Fragment>
      </Router>
    )
}
}

function mapStateToProps({authedUser}){
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App);
