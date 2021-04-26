import React, { useState, } from 'react';
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import { NavBar } from './nav/NavBar'

export const HabitLoop = () => {
  // const [ isAuthenticated, setIsAuthenticated ] = useState(sessionStorage.getItem("user_id") !== null);

  // const setAuthUser = (user) => {
  //   sessionStorage.setItem("user_id", JSON.stringify(user));
  //   setIsAuthenticated(sessionStorage.getItem("user_id") !== null);
  // };


  return (
    <>
      <Route
        render={ () => {
          if (sessionStorage.getItem('user_id')) {
            return (
              <>
                <NavBar />
                <ApplicationViews />
              </>
            )
          } else {
            return <Redirect to='/login' />
          }
        } } />

      <Route path="/login">
        <NavBar />
        <Login />
      </Route>
      <Route path="/register">
        <NavBar />
        <Register />
      </Route>
    </>
  )
}

export default HabitLoop()