import React from 'react';
import { EntryEdit } from './JournalEdit';


export const JournalCard = ({ entry, fetchEntries }) => {
  const dateObj = new Date(entry.date)
  const humanDate = dateObj.toLocaleString()
  console.log('humandate', humanDate)
  // Returns journal entry card
  return (
    <section className='entry-cont'>
      <div className='entry-habit__title'>
        <div className='entry-habit'><b>{ entry.habit }</b></div>
        <EntryEdit
          fetchEntries={ fetchEntries }
          entryId={ entry.id }
        />
      </div>
      <div className='entry-date'>{ humanDate }</div>
      <div className='entry-body'>{ entry.entry }</div>
    </section>
  )
}