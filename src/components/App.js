import React, {Component,Fragment} from 'react'
import { handleInitialData } from '../actions/shared';
import {connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import LogIn from './LogIn'
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import QuestionDetails from './QuestionDetails'

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
              {this.props.loading ? null :
              <div>
                <Route path='/login' component={LogIn}/>
                <Route path='/' exact component= {Home}/>
                <Route path='/questions/:id' component={QuestionDetails}/>
              </div>
              }
              {/*  */}
          </div>
        </Fragment>
      </Router>
    )
}
}

function mapStateToProps({authedUser}){
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
