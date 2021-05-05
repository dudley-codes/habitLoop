import React, { useEffect, useState } from 'react';
import { HabitCard } from './HabitCard'
import './Habit.css'
import { getHabitsByUser } from '../../modules/HabitProvider';
import { HabitDetailsCard } from './HabitDetailsCard';
import { JournalList } from '../journal/JournalList';
import { currentUserId } from '../../modules/helpers';

export const HabitList = () => {
  const [ habits, setHabits ] = useState([])

  // fetches all habits that belong to the current signed in user
  const fetchHabits = () => {
    const filterHabits = getHabitsByUser(currentUserId)
      .then(res => setHabits(res))
    return filterHabits
  }

  let habitList = { ...habits }

  useEffect(() => {
    fetchHabits()
  }, [])
  // Returns habit cards for all user habits
  return (
    <>
      <section className='dashboard--container'>
        <div className='habit--container'>
          <h3>My Habits</h3>
          { habits.map(habit =>
            <HabitCard
              key={ habit.id }
              habit={ habit }
              fetchHabits={ fetchHabits }
            />
          ) }
        </div>
        <JournalList
          fetchHabits={ fetchHabits }
          habitList={ habitList } />
      </section>
    </>
  )
}