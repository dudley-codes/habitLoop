import React from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './NavBar.css'
// import 'papercss/dist/paper.css'
import logo from './logo.png'
import { userStorageKey } from "../../auth/authSettings"

const Logout = () => {
  if (window.confirm("Are you sure you want to log out?")) {
    sessionStorage.setItem(userStorageKey, "")
  }
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
          <Link className="nav-link" to="" onClick={ Logout }>Logout</Link>        </li>
      </ul>
    </nav>
  )
}
