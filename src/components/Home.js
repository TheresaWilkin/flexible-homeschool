import React, { PureComponent } from 'react'

class Home extends PureComponent {
  render() {
    return (
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
    )
  }
}

export default Home
