import React, { Component } from 'react'
import '../styles/App.css';
import { Switch, Route } from 'react-router-dom'


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
<main>
  <section>
      <h2 className="center">Welcome!</h2>
      <p>This free website will allow you to:</p>
      <ul>
        <li>Browse resources and curriculum that have been rated and reviewed by homeschooling parents like you</li>
        <li>Schedule assignments and curriculum for your children</li>
        <li>Track and record your children's progress throughout the school year -- and easily adapt if you fall behind</li>
      </ul>
    <div className="buttons">
      <button className="important">Start Planning</button>
      <p>or</p>
      <button>Find Resources</button>
    </div>
  </section>
</main>
<footer>
  <p>Flexible Homeschool</p>
  <a href="">About</a>
  <a href="">Contact</a>
  <a href="">Acknowledgements</a>
</footer>
  </div>
    )
  }
}

export default App
