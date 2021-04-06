import {
    _getUsers,
    _getQuestions,
  } from './_DATA.js'
  
  export function getInitialData () {
    return Promise.all([
      _getUsers(),
      _getQuestions(),
    ]).then(([users, questions]) => ({
      users,
      questions,
    }))
  }

  export function formatDate(timestamp){
      const d = new Date(timestamp)
      return d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()
  }
