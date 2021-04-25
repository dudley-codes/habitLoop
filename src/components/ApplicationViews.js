import React from 'react'
import { Route } from "react-router-dom";
import { ProfileCard } from './user/ProfileCard'



export const ApplicationViews = () => {
  return (
    <>
      <Route path='/'>
        <ProfileCard />
      </Route>
    </>

  )
}