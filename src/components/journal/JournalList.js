import React, { useEffect, useState } from 'react';
import { getEntryByUserId } from '../../modules/JournalProvider';
import './Journal.css';
import { JournalCard } from './JournalCard';
import { JournalForm } from './JournalForm'

export const JournalList = () => {
  const currentUserId = sessionStorage.getItem('user_id')
  const [ entries, setEntries ] = useState([])

  // Fetch journal entries from data manager
  const fetchEntries = () => {
    getEntryByUserId(currentUserId)
      .then(res => setEntries(res))
  }

  useEffect(() => {
    fetchEntries()
  }, []);

  // Return journal entry cards for current user
  return (
    <>
      <section className='journal--cont'>
        <h3>Journal Entries</h3>
        <section className='journal--submit'>
          <JournalForm
            userId={ currentUserId }
            fetchEntries={ fetchEntries }
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