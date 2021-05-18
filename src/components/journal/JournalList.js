import React, { useEffect, useState } from 'react';
import { getHabitsByUser } from '../../modules/HabitProvider';
import { getEntryByUserId } from '../../modules/JournalProvider';
import { NavBar } from '../nav/NavBar';
import './Journal.css';
import { JournalCard } from './JournalCard';
import { JournalForm } from './JournalForm'

export const JournalList = ({ }) => {
  const currentUserId = sessionStorage.getItem('user_id')
  const [ entries, setEntries ] = useState([])
  const [ habits, setHabits ] = useState()

  // Fetch journal entries from data manager
  const fetchEntries = () => {
    const getEntries = getEntryByUserId(currentUserId)
      .then(res => setEntries(res))
    return getEntries
  }

  useEffect(() => {
    fetchEntries()
  }, []);

  // Fetch habits so that we can render to list of habits
  const fetchHabits = () => {
    const filterHabits = getHabitsByUser(currentUserId)
      .then(res => setHabits(res))
    return filterHabits
  }

  useEffect(() => {
    fetchHabits()
  }, [])

  // Return journal entry cards for current user
  return (
    <>
      <section className='dashboard-container2'>
        <div className='journal-cont'>
          <div className='laptop-screen2'>
            {/* <NavBar /> */ }
            <div className='laptop-screen__bttm'>
              <div className='journal-form'>
                <JournalForm
                  userId={ currentUserId }
                  fetchHabits={ fetchHabits }
                  fetchEntries={ fetchEntries }
                  key={ 7 }
                />
              </div>
              <div className='journal-list'>
                { entries.map(entry =>
                  <JournalCard
                    key={ entry.id }
                    entry={ entry }
                    fetchEntries={ fetchEntries }
                  />) }
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}