import React, { useEffect, useState } from 'react';
import { getEntryByUserId } from '../../modules/JournalProvider';
import './Journal.css';
import { JournalCard } from './JournalCard';
import { JournalForm } from './JournalForm'

export const JournalList = ({ fetchHabits }) => {
  const currentUserId = sessionStorage.getItem('user_id')
  const [ entries, setEntries ] = useState([])

  // Fetch journal entries from data manager
  const fetchEntries = () => {
    const getEntries = getEntryByUserId(currentUserId)
      .then(res => setEntries(res))
    return getEntries
  }

  useEffect(() => {
    fetchEntries()
  }, []);

  // Return journal entry cards for current user
  return (
    <>
      <section className='journal--cont'>
        <h3>Daily Journal</h3>
        <section className='journal--submit'>
          <JournalForm
            userId={ currentUserId }
            fetchHabits={ fetchHabits }
            fetchEntries={ fetchEntries }
            key={ 7 }
          />
        </section>
        { entries.map(entry =>
          <JournalCard
            key={ entry.id }
            entry={ entry }
            fetchEntries={ fetchEntries }
          />) }
      </section>
    </>
  )
}