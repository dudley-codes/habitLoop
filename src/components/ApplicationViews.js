import React from 'react'
import { Route } from "react-router-dom";
import { HabitDetails } from './habits/HabitDetails';
import { NewHabit } from './habits/HabitForm';
import { HabitList } from './habits/HabitList';
import { ProfileCard } from './user/ProfileCard'


export const ApplicationViews = () => {
  return (
    <>
      <Route exact path='/'>
        <HabitList />
      </Route>
      <Route path='/new'>
        <NewHabit />
      </Route>
      <Route exact path='/details'>
        <HabitDetails />
      </Route>
    </>

  )
}