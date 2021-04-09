import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {logout} from '../actions/authedUser'
import {withRouter} from 'react-router-dom'

class Nav extends Component{
    handleLogout = () => {
        const {dispatch} = this.props
        this.props.history.push('/')
        dispatch(logout())
    }
    render(){
        const {avatarURL,name} = this.props
        return (
            <nav className='nav'>
                <ul >
                    <li>
                        <NavLink to='/' exact activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' activeClassName='active'>
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'>
                            Leaderboard
                        </NavLink>
                    </li>
                </ul>
                <div className='authed-user-info'>
                    <img src={avatarURL} alt='authors-avatar'/>
                    <span>{name}</span>
                    <button className='btn btn-light' type='button' onClick={this.handleLogout}>Log out</button>
                </div>
                </nav>
            
        )
    }
}
function mapStateToProps({authedUser,users}){
    return {
        avatarURL: users[authedUser].avatarURL,
        name: users[authedUser].name
    }
}
export default withRouter(connect(mapStateToProps)(Nav))