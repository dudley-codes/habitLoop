import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { currentUserId } from '../../modules/helpers';
import { addEntry, getEntryByUserId, getHabitsByUserId } from '../../modules/JournalProvider';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button';



export const JournalForm = ({ fetchEntries, userId }) => {
  const [ habitSelect, setHabitSelect ] = useState('Select a Habit')
  const [ entry, setEntry ] = useState({})
  const [ habitList, setHabitList ] = useState([ '' ])
  const [ isLoading, setIsLoading ] = useState(false)
  const history = useHistory()
  // Set state with empty data

  // fetch list of habits so that we can display them as a dropdown list
  useEffect(() => {
    getHabitsByUserId(currentUserId)
      .then(res => {
        setHabitList(res)
      })
  }, [])

  // useEffect(() => {

  // })


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
  const resetForm = () => (
    setEntry({})
  )

  // const handleReset = () => {
  //   Array.from(document.querySelectorAll("input")).forEach(
  //     input => (input.value = "")
  //   );
  //   this.setState({
  //     itemvalues: [ {} ]
  //   });
  // };

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
      .then(() => setEntry({
        habit: '',
        entry: '',
        date: Date.now(),
        userId: currentUserId
      }))
    // .then(() => handleReset())
    // .then(() => history.push('/'))
  }

  useEffect(() => {
    resetForm()
  }, [ habitSelect ])

  return (
    <>
      <fieldset>
        <div className='journal-form__entry'>
          <Dropdown>
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
          {/* <option value='0'>Select a Habit</option> */ }
          {/* { habitList.map(h => (
              <option key={ h.id } defaultValue={ h.id }>
                {h.habit }
              </option>
            )) } */}
          {/* </select> */ }
        </div>
        <div className='journal-form__entry'>
          <label htmlFor='habit'>Entry:</label>
          <textarea type='text' id='entry' onChange={ handleControlledInputChange } required autoFocus className='form-control' placeholder='Record your thoughts here thoughts after updating your habit count... ' value={ entry.entry } />
        </div>
      </fieldset>
      <Button className='btn btn-primary' type='button' disabled={ isLoading } variant="primary" onClick={ handleClickSaveEntry }>Save Habit</Button>
    </>
  )
}