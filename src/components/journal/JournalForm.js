import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { addEntry } from '../../modules/JournalProvider';

export const JournalForm = ({ fetchEntries, userId }) => {
  const [ isLoading, setIsLoading ] = useState(false)
  const history = useHistory()
  // Set state with empty data
  const [ entry, setEntry ] = useState({
    habit: '',
    entry: '',
    userId: userId,
    date: ''
  })

  // Handle input changes and parse user ID
  const handleControlledInputChange = (e) => {
    const newEntry = { ...entry }
    let selectedVal = e.target.value

    if (e.target.id.includes('Id')) {
      selectedVal = parseInt(selectedVal)
    }

    newEntry[ e.target.id ] = selectedVal

    setEntry(newEntry)
  }

  const handleClickSaveEntry = e => {
    e.preventDefault()
    setIsLoading(true)
    let newEntry = { ...entry }
    newEntry.date = Date.now()

    setIsLoading(true)
    addEntry(newEntry)
      .then(() => history.push('/'))
  }

  return (
    <>
      <fieldset>
        <div className='journal-form__entry'>
          <label htmlFor='habit'>Habit:</label>
          <input type='text' id='habit' onChange={ handleControlledInputChange } required autoFocus className='form-control' placeholder='e.g. work out' defaultValue={ entry.habit } />
        </div>
      </fieldset>
    </>
  )
}