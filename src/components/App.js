// all top layer set up
import React,{Component} from 'react'
import { BrowserRouter, Route} from 'react-router-dom'
import {connect}from 'react-redux'
//take all actions we defined and assgin
import * as actions from '../actions'

import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'



class App extends Component{
    componentDidMount(){
        this.props.fetchUser()

    }
    render(){
    return(
 
        <div className="container">
            <BrowserRouter>
            <div>
                    <Header />
                    <Route exact path='/' component = {Landing}/>
                    <Route exact path='/surveys' component = {Dashboard}/>
                    <Route path='/surveys/new' component = {SurveyNew}/>
            </div>
            </BrowserRouter>
        </div>
    )
    }
}

export default connect(null,actions)(App)