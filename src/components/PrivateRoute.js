import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

function PrivateRoute({authedUser, component: Component, ...rest}){
    return (
        <Route 
            {...rest}
            render = {
                (props) => {
                    if(authedUser !== null){
                        if(props.match.path === "/questions/:question_id" &&
                            !Object.keys(this.props.questions).includes(
                            props.match.params.question_id
                            )){ 
                            return <Redirect to="/404" />
                             }else{
                                return  <Component {...props} />
                             }
                    }else{
                        return <Redirect to={{pathname:'/login', state: {from: props.location}}} />
                    }
                }
            }
        />
    )

}

function mapStateToProps({authedUser}){
    return {
        authedUser
    }
}
export default connect(mapStateToProps)(PrivateRoute)