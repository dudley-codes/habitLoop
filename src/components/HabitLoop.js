import React from 'react';
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import { NavBar } from './nav/NavBar'

export const HabitLoop = () => (
  <>
    <Route
      render={ () => {
        if (sessionStorage.getItem('habitLoop_user')) {
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

export default HabitLoop()