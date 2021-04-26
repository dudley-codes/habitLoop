import React, { useEffect, useState } from 'react';
import { ProfileCard } from '../user/ProfileCard'
import { HabitCard } from './HabitCard'
import './Habit.css'
import { getAllHabits, getHabitCounter } from '../../modules/HabitProvider';
import { getAllUsers } from '../../modules/UserDataManager';
import { getCurrentMonth } from '../../modules/helpers';

const currentMonth = getCurrentMonth()

export const HabitList = () => {

  const currentUserId = sessionStorage.getItem('user_id')
  const [ habits, setHabits ] = useState([])
  const [ user, setUser ] = useState('');
  const [ habitCount, setHabitCount ] = useState([])

  const getCurrentUser = () => {
    getAllUsers().then(res => res.filter(user => {
      if (user.id == currentUserId) {
        setUser(user)
      }
    }))
  }

  useEffect(() => {
    getCurrentUser()

  }, [])

  const habitTracker = () => {
    const filterHabits = getAllHabits()
      .then(res => res.filter(habitObj => {
        if (habitObj.userId == currentUserId) {
          return habitObj
        }
      })).then(res => { return res })
    return filterHabits
  }

  useEffect(() => {
    habitTracker().then(res => {
      setHabits(res)
    })
  }, [])

  const habitCounter = () => {
    const currentCount = getHabitCounter()
      .then(res => res.filter(countObj => {
        console.log('currentMonth', currentMonth)
        if (countObj.habitMonth === currentMonth) {
          return countObj
        }
      })).then(res => {
        return res
      })
    return currentCount
  }

  // const getCounter = () => {
  //   return habitCounter().then(counter => {
  //     setHabitCount(counter)
  //   })
  // }

  // useEffect(() => {
  //   getCounter()
  // }, [])

  console.log('habitCounter', habits)

  return (
    <>
      <section className='dashboard--container'>
        <ProfileCard
          user={ user }
        />
        <div className='habit--container'>
          <h3>My Habits</h3>
          { }
        </div>
      </section>
    </>
  )
}