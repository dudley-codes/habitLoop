import React, { useEffect, useState } from 'react';
import { getEntryByUserId } from '../../modules/JournalProvider';
import './Journal.css';

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
      </section>
    </>
  )
}