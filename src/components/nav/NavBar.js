import React from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './NavBar.css'
// import 'papercss/dist/paper.css'
import logo from './logo.png'

const handleSignOut = () => {
  sessionStorage.setItem('user_name', '')
  sessionStorage.setItem('habitLoop_user', '')
}

export const NavBar = (props) => {
  return (
    <nav className="navbar">
      <img src={ logo } alt='logo' />

      <ul className="nav nav-pills nav-fill">
        <li className="nav-item">
          <Link className="nav-link" to="/">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/social">Social</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/habits">My Habits</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={ (handleSignOut) }>Sign Out</Link>
        </li>
      </ul>
    </nav>
  )
}
