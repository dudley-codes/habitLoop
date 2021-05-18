import React, { useState, useEffect } from 'react';
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import { NavBar } from './nav/NavBar'
import { getAllUsers } from '../modules/UserDataManager';
import { ProfileCard } from './user/ProfileCard';
import { About } from './about/About';

export const HabitLoop = () => {
  // const [ user, setUser ] = useState('');
  // const currentUserId = sessionStorage.getItem('user_id')
  // const [ user, setUser ] = useState('');


  // const getCurrentUser = () => {
  //   getAllUsers().then(res => res.filter(user => {
  //     if (user.id === parseInt(currentUserId)) {
  //       setUser(user)
  //     }
  //   }))
  // }

  // useEffect(() => {
  //   getCurrentUser()

  // }, [])
  return (
    <>
      <Route
        render={ () => {
          if (sessionStorage.getItem('user_id')) {
            return (
              <>
                {/* <NavBar /> */ }
                <section className='dashboard-container'>
                  {/* <ProfileCard
                  /> */}
                  <ApplicationViews
                  />
                </section>
              </>
            )
          } else {
            return <Redirect to='/login' />
          }
        } } />

      <Route path="/login">
        <section className='dashboard-container'>
          <div className='laptop-screen'>

            <div className='laptop-screen__bttm'>
              <Login />
            </div>
          </div>
        </section>
      </Route>
      <Route path="/register">
        <section className='dashboard-container'>
          <div className='laptop-screen'>

            <div className='laptop-screen__bttm'>
              <Register />
            </div>
          </div>
        </section>

      </Route>

    </>
  )
}

export default HabitLoop()