import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { currentUserId } from '../../modules/helpers';
import { addEntry, getEntryByUserId, getHabitsByUserId } from '../../modules/JournalProvider';



export const JournalForm = ({ fetchEntries, userId }) => {
  const [ habitList, setHabitList ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const history = useHistory()
  // Set state with empty data
  const [ entry, setEntry ] = useState({
    habit: '',
    entry: '',
    userId: userId,
    date: ''
  })

  // fetch list of habits so that we can display them as a dropdown list
  useEffect(() => {
    getHabitsByUserId(currentUserId)
      .then(res => {
        setHabitList(res)
      })
  }, [])


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
          <select defaultValue={ entry.habit } name='habit' id='habit' onChange={ handleControlledInputChange } className='form-control'>
            <option value='0'>Select a Habit</option>
            { habitList.map(h => (
              <option key={ h.id } defaultValue={ h.id }>
                {h.habit }
              </option>
            )) }


          </select>
          {/* <input type='text' id='habit' onChange={ handleControlledInputChange } required autoFocus className='form-control' placeholder='e.g. work out' defaultValue={ entry.habit } /> */ }
        </div>
        <div className='journal-form__entry'>
          <label htmlFor='habit'>Entry:</label>
          <textarea type='text' id='entry' onChange={ handleControlledInputChange } required autoFocus className='form-control' placeholder='Record your thoughts here thoughts after updating your habit count... ' defaultValue={ entry.entry } />
        </div>
      </fieldset>
    </>
  )
}