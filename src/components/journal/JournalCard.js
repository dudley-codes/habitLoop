import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'


export const JournalCard = ({ entry }) => {
  const [ isLoading, setIsLoading ] = useState(false);
  const history = useHistory();

  return (
    <section className='entry--cont'>
      <div className='entry--habit'>Habit: { entry.habit }</div>
      <div className='entry--body'>{ entry.entry }</div>
    </section>
  )
}