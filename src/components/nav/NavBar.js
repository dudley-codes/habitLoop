import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
// import 'papercss/dist/paper.css'
import 'materialize-css/dist/css/materialize.min.css'
import "bootstrap/dist/css/bootstrap.min.css"
import './NavBar.css'
// import 'mdl-templates/material.css'
import logo from './logo.png'
import { userStorageKey } from "../../auth/authSettings"

const Logout = () => {
  sessionStorage.setItem(userStorageKey, "")

}


export const NavBar = () => {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  const currentUser = sessionStorage.getItem('user_id')

  const userAuthenticated = () => {
    if (currentUser !== '') {
      setIsAuthenticated(true)
    }
  }

  useEffect(() => {
    userAuthenticated()
  }, [])

  return (
    <nav className="navbar">
      <img src={ logo } alt='logo' />

      <ul className="nav nav-pills nav-fill">
        { isAuthenticated
          ?
          <li className="nav-item">
            <Link className="nav-link" to="/">dashboard</Link>
          </li>
          : null }
        { isAuthenticated
          ? <li className="nav-item">
            <Link className="nav-link" to="/journal">journal</Link>
          </li>
          : null }
        { isAuthenticated
          ? <li className="nav-item">
            <Link className="nav-link" to="/new">new</Link>
          </li>
          : null }
        {/* { isAuthenticated
          ? <li className="nav-item">
            <Link className="nav-link" to="/about">about</Link>
          </li>
          : null } */}
        <li className="nav-item">
          <Link className="nav-link" to="/about">about</Link>
        </li>
        { isAuthenticated
          ? <li className="nav-item">
            <Link className="nav-link" to="" onClick={ Logout }>logout</Link>
          </li>
          : null }
      </ul>
    </nav>
  )
}
