import React, { Component } from 'react'
import Header from './Header'
import Login from './Login'
import Acknowledgements from './Acknowledgements'
import Students from './Students';
import { Switch, Route } from 'react-router-dom'
import BurgerMenu from './BurgerMenu'

class App extends Component {
  render() {
    return (
      <div id="outer-container">
        <BurgerMenu />
        <div className="page-wrap container">
        <Header />
        <div>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/acknowledgements' component={Acknowledgements} />
            <Route exact path='/students' component={Students} />
            <Route path='/' render={() => <h2>Coming soon</h2>} />
          </Switch>
        </div>
      </div>
      </div>
    )
  }
}

export default App
