import React, { Component } from 'react'
import Header from './Header'
import Login from './Login'
import Acknowledgements from './Acknowledgements'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <div>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/acknowledgements' component={Acknowledgements} />
            <Route path='/' render={() => <h2>Coming soon</h2>} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
