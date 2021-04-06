import React, {Component} from 'react'
import Question from './Question'
class List extends Component {
    render(){
        const {items} = this.props
        
        return(
            <div>
                {items.map((id) => (
                    <Question key= {id} id={id}/>
                ))}       
            </div>
        )
    }
}

export default List