import React from 'react'
import { Route } from "react-router-dom";
import { About } from './about/About';
import { HabitDetails } from './habits/HabitDetails';
import { NewHabit } from './habits/HabitForm';
import { HabitList } from './habits/HabitList';
import { JournalList } from './journal/JournalList';
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
      <Route path='/journal'>
        <JournalList />
      </Route>
      <Route exact path='/about'>
        <About />
      </Route>
    </>
  )
}