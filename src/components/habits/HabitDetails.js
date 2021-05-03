import React, { useEffect, useState } from 'react';
import { getHabitsByUser } from '../../modules/HabitProvider';
import { HabitDetailsCard } from './HabitDetailsCard';


export const HabitDetails = () => {
  const currentUserId = sessionStorage.getItem('user_id');
  const [ habits, setHabits ] = useState([]);

  // fetches all habits that belong to the current signed in user
  const fetchHabits = () => {
    const filterHabits = getHabitsByUser(currentUserId)
      .then(res => setHabits(res))
    return filterHabits
  }

  useEffect(() => {
    fetchHabits()
  }, [])
  // Returns habit cards for all user habits
  return (
    <>
      <section className='dashboard--container'>
        <div className='habit--container'>
          <h3>Details</h3>
          { habits.map(habit =>
            <HabitDetailsCard
              key={ habit.id }
              habit={ habit }
              fetchHabits={ fetchHabits }
            />
          ) }
        </div>
      </section>
    </>)
}