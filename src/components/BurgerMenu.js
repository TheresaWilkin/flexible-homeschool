import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import '../styles/BurgerMenu.css'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'
import { slide as Menu } from 'react-burger-menu'

class BurgerMenu extends Component {
  render() {
    const userId = localStorage.getItem(GC_USER_ID)
    return (
          <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
            <Link className="menu-item" to="/">Home</Link>
            {userId && <Link className="menu-item" to="/students">Students</Link>}
            <Link className="menu-item" to="/acknowledgements">Acknowledgements</Link>
          </Menu>
    )
  }
}

export default withRouter(BurgerMenu)
