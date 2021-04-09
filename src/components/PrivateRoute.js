import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'


function PrivateRoute({authedUser, questions , component: Component, ...rest}){
    return (
        <Route 
            {...rest}
            render = {
                (props) => {
                    if(authedUser !== null){
                        if(props.match.path === "/questions/:id" &&
                            !Object.keys(questions).includes(
                            props.match.params.id
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

function mapStateToProps({authedUser,questions}){
    return {
        authedUser,
        questions
    }
}
export default connect(mapStateToProps)(PrivateRoute)