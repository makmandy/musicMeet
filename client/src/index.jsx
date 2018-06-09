import React from 'react'
import ReactDOM from 'react-dom'

import {BrowserRouter as Router, Route, Link, Switch, History} from 'react-router-dom'
import User from './components/User.jsx'

import Events from './components/Events.jsx'
import EventPage from './components/EventPage.jsx'

import NavBar from './components/NavBar.jsx'
import CreateEvent from './components/CreateEvent.jsx'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleLogin(username) {
        this.setState({username})
    }
    render() {
        return (
            <Router>
                <div>
                <NavBar handleLogin = {this.handleLogin}/>

                <Switch>
                    <Route exact path = '/' component = {Events}/>
                    <Route exact path = '/create' component = {CreateEvent}/>
                    <Route exact path = '/user/:username' component = {User}/>
                    <Route exact path = '/event/:number' component = {EventPage}/>
                </Switch>
                
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))