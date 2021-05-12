import React, { useEffect, useState } from 'react';
import { HabitCard } from './HabitCard'
import './Habit.css'
import { getHabitsByUser } from '../../modules/HabitProvider';
import { HabitDetailsCard } from './HabitDetailsCard';
import { JournalList } from '../journal/JournalList';
import { getAllUsers } from '../../modules/UserDataManager';
import { NavBar } from '../nav/NavBar';


export const HabitList = () => {
  const [ habits, setHabits ] = useState([])
  const [ user, setUser ] = useState({
    name: ''
  });
  // Sets initial state for navbar
  const [ navBar, setNavBar ] = useState(0)
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
  }, [])
  // Renders habit card
  const RenderProgress = () => {
    return (
      <div className='habit--cont__list'>
        { habits.map(habit =>
          <HabitCard
            key={ habit.id }
            habit={ habit }
            fetchHabits={ fetchHabits }
          />
        ) }
      </div>
    )
  }
  // Renders journal list
  const RenderJournal = () => {
    return (
      <JournalList
        fetchHabits={ fetchHabits }
        habitList={ habitList } />
    )
  }
  // Switch statement for which card to render
  const RenderScreen = () => {
    switch (navBar) {
      case 0:
        return <RenderProgress />
        break;
      case 1:
        return <RenderJournal />

    }
  }

  // Returns habit cards for all user habits
  return (
    <>
      <section className='dashboard--container'>
        <div className='habit--container'>
          <div className='laptop--screen'>

            <NavBar
              setNavBar={ setNavBar }
            />
            {/* <h3>My Habits</h3> */ }
            {/* <RenderScreen /> */ }
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
        </div>

      </section>
    </>
  )
}