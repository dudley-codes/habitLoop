import React, { useEffect, useState } from 'react';
import { HabitCard } from './HabitCard'
import './Habit.css'
import { getHabitsByUser } from '../../modules/HabitProvider';
import { getCurrentMonth, getCurrentYear } from '../../modules/helpers';

export const HabitList = () => {

  const currentUserId = sessionStorage.getItem('user_id')
  const [ habits, setHabits ] = useState([])

  const fetchHabits = () => {
    const filterHabits = getHabitsByUser(currentUserId)
      .then(res => setHabits(res))
    return filterHabits
  }

  useEffect(() => {
    fetchHabits()
  }, [])

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
      </section>
    </>
  )
}