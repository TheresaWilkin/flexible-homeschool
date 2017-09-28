import React, { Component } from 'react'
import '../styles/App.css'
import { Switch, Route, Link } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Home from './Home'
import Login from './Login'
import Acknowledgements from './Acknowledgements'

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
  <a href="">Home</a>
  <a href="">Find Resources</a>
  <a href="">Schedule Assignments</a>
  <a href="">Track Progress</a>
</nav>
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/acknowledgements' component={Acknowledgements}/>
    <Route path='/' render={() => <h2>Coming soon</h2>} />
  </Switch>
<footer>
  <p>Flexible Homeschool</p>
  <a href="">About</a>
  <a href="">Contact</a>
  <Link to="/acknowledgements">Acknowledgements</Link>
</footer>
  </div>
    )
  }
}

export default App
