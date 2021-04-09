import React,{ Component } from 'react'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'
import { connect } from 'react-redux'
import Nav from './Nav'

class NewQuestion extends Component {
    state ={
        optionOneText: '',
        optionTwoText:'',
        toHome: false
    }
    handleOptionOne = (e) => {
        e.preventDefault()
        this.setState({
            optionOneText: e.target.value
        })
    }
    handleOptionTwo = (e) => {
        e.preventDefault()
        this.setState({
            optionTwoText: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {dispatch} = this.props
        dispatch(handleAddQuestion(this.state.optionOneText,this.state.optionTwoText))
        this.setState({
            toHome: true
        })
    }
    render(){
        if(this.state.toHome === true){
            return <Redirect to='/'/>
        }
        return (
            <div className='new-ques'>
                <Nav />
                <h2>Create New Question</h2>
                <h4>Would you rather?</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <input type='text' className="form-control form-control-lg" value={this.state.optionOneText} onChange={this.handleOptionOne}/>
                    </div>
                   
                    <label>
                        OR
                    </label>
                    <div className="form-group">
                        <input type='text' className="form-control form-control-lg" value={this.state.optionTwoText} onChange={this.handleOptionTwo}/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" 
                    disabled={this.state.optionOneText === '' || this.state.optionTwoText === ''}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewQuestion)