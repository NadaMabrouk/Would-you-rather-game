import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({isAuth, component: Component, ...rest}){
    return (
        <Route 
            {...rest}
            render = {
                (props) => {
                    if(isAuth){
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
export default PrivateRoute