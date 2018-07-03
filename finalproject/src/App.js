import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Signup from './Signup'
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar';
import Dashboard from './Dashboard';


class App extends Component {

  constructor() {
    super()
    this.state = {
      sessionToken: ''
    }
  }

  componentWillMount() {
    const token = localStorage.getItem('token')
    if (token && !this.state.sessionToken) {
      this.setState({ sessionToken: token })
    }
  }

  setSessionState = (token) => {
    localStorage.setItem('token', token);
    this.setState({ sessionToken: token })
  }

  logout = () => {
    this.setState({
      sessionToken: ''
    })
    localStorage.clear();
  }

  protectedViews = () => {
    if (this.state.sessionToken === localStorage.getItem('token')) {
      return (
        <Router>
          <Switch>
            <Route path='/' exact>
              <Dashboard sessionToken={this.state.sessionToken} />
            </Route>
          </Switch>
        </Router>
      )
    } else {
      return (
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home setToken={this.setSessionState} clickLogout={this.logout}></Home>
            </Route>
            <Route exact path='/Signup'>
              <Signup setToken={this.setSessionState}></Signup>
            </Route>
          </Switch>
        </Router>
      )
    }
  }


  render() {
    return (
      <div className="App">
        <Router>
          <Route>
            <Navbar setToken={this.setSessionState} clickLogout={this.logout}></Navbar>
          </Route>
        </Router>
        {this.protectedViews()}
        {/* <Router>
          <Switch>
            <Route exact path='/'>
              <Home setToken={this.setSessionState} clickLogout={this.logout}></Home>
            </Route>
            <Route exact path='/signup'>
              <Signup setToken={this.setSessionState}></Signup>
            </Route>
          </Switch>
        </Router> */}
      </div>
    );
  }
}

export default App;
