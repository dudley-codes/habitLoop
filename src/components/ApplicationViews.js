import React from 'react'
import { Route } from "react-router-dom";
import { NewHabit } from './data/HabitForm';
import { HabitList } from './habit-data/HabitList';
import { ProfileCard } from './user/ProfileCard'



export const ApplicationViews = () => {
  return (
    <>
      <Route exact path='/'>
        {/* <ProfileCard /> */ }
        <HabitList />
      </Route>
      <Route exact path='/new'>
        <ProfileCard />
        <NewHabit />
      </Route>
    </>

  )
}