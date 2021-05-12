import React, { useEffect, useState } from 'react';
import { HabitCard } from './HabitCard'
import './Habit.css'
import { getHabitsByUser } from '../../modules/HabitProvider';
import { HabitDetailsCard } from './HabitDetailsCard';
import { JournalList } from '../journal/JournalList';
import { getAllUsers } from '../../modules/UserDataManager';


export const HabitList = () => {
  const [ habits, setHabits ] = useState([])
  const [ user, setUser ] = useState({
    name: ''
  });
  const currentUserId = sessionStorage.getItem('user_id')
  const [ firstName, setFirstName ] = useState()
  // fetches all habits that belong to the current signed in user
  const fetchHabits = () => {
    const filterHabits = getHabitsByUser(currentUserId)
      .then(res => setHabits(res))
    return filterHabits
  }

  let habitList = { ...habits }
  let currentUser = { ...user }

  const getCurrentUser = () => {
    getAllUsers().then(res => res.filter(user => {
      if (user.id === parseInt(currentUserId)) {
        setUser(user)
      }
    }))
  }


  useEffect(() => {
    fetchHabits()
  }, [])

  useEffect(() => {
    getCurrentUser()
    // .then(() => {
    //   const splitName = user.name.split(' ')

    //   if (splitName !== undefined) {
    //     return splitName[ 0 ]
    //   }
    // }).then((res) => setFirstName(res))

  }, [])
  // Returns habit cards for all user habits
  return (
    <>
      <section className='dashboard--container'>
        <div className='habit--container'>
          <h3>My Habits</h3>
          <div className='habit--cont__list'>
            { habits.map(habit =>
              <HabitCard
                key={ habit.id }
                habit={ habit }
                fetchHabits={ fetchHabits }
              />
            ) }
          </div>
        </div>
        {/* <JournalList
          fetchHabits={ fetchHabits }
          habitList={ habitList } /> */}
      </section>
    </>
  )
}