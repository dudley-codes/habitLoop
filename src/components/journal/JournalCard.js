import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { EntryEdit } from './JournalEdit';


export const JournalCard = ({ entry, fetchEntries }) => {
  const [ isLoading, setIsLoading ] = useState(false);
  const history = useHistory();

  return (
    <section className='entry--cont'>
      <div className='entry--habit__title'>
        <div className='entry--habit'><b>{ entry.habit }</b></div>
        <EntryEdit
          fetchEntries={ fetchEntries }
          entryId={ entry.id }
        />
      </div>
      <div className='entry--body'>{ entry.entry }</div>
    </section>
  )
}