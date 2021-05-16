import React, { useEffect, useState } from 'react'
import { addEntry } from '../../modules/JournalProvider';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button';
import { getHabitsByUser } from '../../modules/HabitProvider';

export const JournalForm = ({ fetchEntries }) => {
  const currentUserId = sessionStorage.getItem('user_id')
  const [ habitSelect, setHabitSelect ] = useState('Select a Habit')
  const [ entry, setEntry ] = useState({})
  const [ habitList, setHabitList ] = useState([ '' ])
  const [ isLoading, setIsLoading ] = useState(false)

  // fetch list of habits so that we can display them as a dropdown list
  useEffect(() => {
    getHabitsByUser(currentUserId)
      .then(res => {
        setHabitList(res)
      })
  }, [])


  // Handle input changes and parse user ID
  const handleControlledInputChange = (e) => {
    let newEntry = { ...entry }
    let selectedVal = e.target.value

    if (e.target.id.includes('Id')) {
      selectedVal = parseInt(selectedVal)
    }

    newEntry[ e.target.id ] = selectedVal

    setEntry(newEntry)
  }

  // reset form after submittting
  const resetForm = () => {
    setEntry({
      habit: '',
      entry: '',
      date: ''
    })
    setHabitSelect('Select a Habit')
  }

  const handleClickSaveEntry = e => {
    e.preventDefault()
    setIsLoading(true)
    let newEntry = { ...entry }
    addEntry({
      habit: habitSelect,
      entry: newEntry.entry,
      date: Date.now(),
      userId: currentUserId
    })
      .then(() => {
        setHabitSelect('Select a Habit')
        fetchEntries()
      })

      .then(() => setIsLoading(false))
      .then(() => resetForm())
  }

  return (
    <>
      <fieldset>
        <div className='journal-form__entry'>
          <Dropdown className='journal-dropdown'>
            <Dropdown.Toggle
              defaultValue={ entry.habit }
              name='habit'
              id='habit'
              onChange={ handleControlledInputChange }
              className='form-control'
              title='Select A Habit' >{ habitSelect }</Dropdown.Toggle>
            <Dropdown.Menu>
              { habitList.map(h => (
                <Dropdown.Item
                  eventKey={ h.id }
                  key={ h.id * Math.random() }
                  onClick={ () => setHabitSelect(`${ h.habit }`) }>
                  { h.habit }
                </Dropdown.Item >
              )) }
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className='journal-form__entry'>
          {/* <label htmlFor='habit'>Entry:</label> */ }
          <textarea type='text' id='entry' onChange={ handleControlledInputChange } required autoFocus className='form-control' placeholder='Record your thoughts here thoughts after updating your habit count... ' value={ entry.entry } />
        </div>
      </fieldset>
      <div className='save-button__cont'>
        <Button
          className='btn btn-secondary save-button'
          type='button'
          disabled={ isLoading }
          variant="primary"
          onClick={ () => resetForm() }>Cancel
        </Button>
        <Button
          className='btn btn-primary save-button'
          type='button'
          disabled={ isLoading }
          variant="primary"
          onClick={ handleClickSaveEntry }>Save
        </Button>
      </div>
    </>
  )
}