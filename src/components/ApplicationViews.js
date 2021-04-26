import React from 'react'
import { Route } from "react-router-dom";
import { HabitList } from './habit-data/HabitList';
import { ProfileCard } from './user/ProfileCard'



export const ApplicationViews = () => {
  return (
    <>
      <Route path='/'>
        {/* <ProfileCard /> */ }
        <HabitList />
      </Route>
      {/* <Route exact path='/'>
        <HabitList />
      </Route> */}
    </>

  )
}