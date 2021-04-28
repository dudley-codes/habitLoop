import React, { useEffect, useState } from 'react';
import { HabitCard } from './HabitCard'
import './Habit.css'
import { getHabitsByMonth, checkCounter, addCounter, getHabitsByUser } from '../../modules/HabitProvider';

import { getCurrentMonth } from '../../modules/helpers';

const currentMonth = getCurrentMonth()

export const HabitList = () => {

  const currentUserId = sessionStorage.getItem('user_id')
  const [ habits, setHabits ] = useState([])
  const [ habitCount, setHabitCount ] = useState({})

  const habitTracker = () => {
    const filterHabits = getHabitsByMonth(currentMonth)
      .then(res => res.filter(habitObj => {
        if (habitObj.habit.userId == currentUserId) {
          return habitObj
        }
      })).then(res => { return res })
    return filterHabits
  }

  const fetchHabits = () => {
    const filterHabits = getHabitsByUser(currentUserId)
      .then(res => setHabits(res))
    return filterHabits
  }



  useEffect(() => {
    fetchHabits()
  }, [])

  // const createCounter = () => {
  //   checkCounter()
  //     .then(res => {
  //       res.filter(habit => {
  //         if (habit.count.length === 0) {
  //           addCounter({
  //             habitId: habit.id,
  //             habitMonth: currentMonth,
  //             monthCount: 0,
  //             dayCount: 0,
  //             totalCount: 0,
  //           })
  //         }
  //       })
  //     }).then(() => habitTracker())
  // }

  // useEffect(() => {
  //   createCounter()
  // }, [])


  return (
    <>
      <section className='dashboard--container'>
        {/* <ProfileCard
          user={ user }
        /> */}
        <div className='habit--container'>
          <h3>My Habits</h3>
          { habits.map(habit =>
            <HabitCard
              key={ habit.id }
              habit={ habit }

            />
          ) }
        </div>
      </section>
    </>
  )
}