import React, { Component } from 'react'
import '../styles/App.css'
import { Switch, Route } from 'react-router-dom'
import CustomLink from './CustomLink'
import Home from './Home'
import Login from './Login'
import Acknowledgements from './Acknowledgements'
import Resources from './Resources'

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <header>
          <div className="imageWrapper">
            <img src="https://image.freepik.com/free-icon/books-stack-of-three_318-45543.jpg" alt="" />
          </div>
          <h1>Flexible Homeschool</h1>
        </header>
        <nav>
          <CustomLink activeOnlyWhenExact={true} to="/" label="Home"/>
          <CustomLink to="/resources" label="Find Resources" />
          <CustomLink to="/assignments" label="Schedule Assignments" />
          <CustomLink to="/progress" label="Track Progress" />
        </nav>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/acknowledgements' component={Acknowledgements} />
          <Route path='/resources' component={Resources} />
          <Route path='/' render={() => <h2>Coming soon</h2>} />
        </Switch>
        <footer>
          <p>Flexible Homeschool</p>
          <CustomLink to="/about" label="About" />
          <CustomLink to="/contact" label="Contact" />
          <CustomLink to="/acknowledgements" label="Acknowledgements" />
        </footer>
      </div>
    )
  }
}

export default App
