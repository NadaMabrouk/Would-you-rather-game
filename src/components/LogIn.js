import React, {Component} from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import {Redirect} from 'react-router-dom'

class LogIn extends Component {
    state = {
        user_ID: '',
        toHome: false
    }
    handleChange = (e) => {
        e.preventDefault()
        this.setState({user_ID : e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {dispatch} = this.props
        if(this.state.user_ID === null || this.state.user_ID === ''){
            return alert('Please Select a User to Log In')
        }
        dispatch(setAuthedUser(this.state.user_ID))
        // Redirect User to the HomePage
        this.setState({toHome: true})
    }
    render() {
        console.log(this.props.users)
        console.log(Object.entries(this.props.users))
        if(this.state.toHome === true)
        return <Redirect to="/" />
        return (
            <div className="login">
                <h2>Welcome to the Would you rather Game !</h2>
                
                <form onSubmit={this.handleSubmit}>
                    <label>Please Select a User to Log in</label>
                    <select className='user_login' value={this.state.user_ID} onChange={this.handleChange}> 
                        <option key='def' value='' > </option>
                        {this.props.users.map((user) => (
                            <option key={user[0]} value={user[0]}>{user[1].name}</option>
                        ))}
                    </select>
                    <button className='log_btn' type='submit' >Log In</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({authedUser,users}){
    return {
        authedUser,
        users: Object.entries(users),
    }
}
export default connect(mapStateToProps)(LogIn)