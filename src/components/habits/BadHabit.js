import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { addHabit } from '../../modules/HabitProvider'

export const BadHabit = () => {
  const [ habit, setHabit ] = useState({})
  const [ isLoading, setIsLoading ] = useState(false);
  const history = useHistory();

  const currentUserId = parseInt(sessionStorage.getItem('user_id'))

  // Parses ID and frequency
  const handleControlledInputChange = (e) => {
    const newHabit = { ...habit };
    newHabit.userId = currentUserId
    let selectedVal = e.target.value;
    if (e.target.id.includes('Id') || e.target.value.includes('frequency')) {
      selectedVal = parseInt(selectedVal)
    }

    newHabit[ e.target.id ] = selectedVal

    setHabit(newHabit)
  }

  // Saves new habit to JSON server then renders dashboard
  const handleClickSaveHabit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let newHabit = { ...habit }
    newHabit.goodHabit = false;
    newHabit.habitStart = Date.now()
    newHabit.frequency = parseInt(newHabit.frequency)

    setIsLoading(true)
    addHabit(newHabit)
      .then(() => history.push('/'))
  }

  // renders bad habit form
  // TODO: I need to do some rafactoring so that this is combined with GoodHabit.js
  return (
    <>

      {/* <h6>(Not sure where to start? Try our about section, <br />
we promise we won't make you read too much)</h6> */}
      <fieldset>
        <div className='habit-form__group'>
          <label htmlFor='habit'>Bad Habit:</label>
          <input type='text' id='habit' onChange={ handleControlledInputChange } required autoFocus className='form-control' placeholder='e.g. Quit Smoking' defaultValue={ habit.habit } />
        </div>
      </fieldset>
      <fieldset>
        <div className='habit-form__group'>
          <label htmlFor='cue'>Cue:</label>
          <input type='text' id='cue' onChange={ handleControlledInputChange } required autoFocus className='form-control' placeholder='e.g. feeling stressed out' defaultValue={ habit.cue } />
        </div>
      </fieldset>
      <fieldset>
        <div className='habit-form__group'>
          <label htmlFor='reward'>Reward:</label>
          <input type='text' id='reward' onChange={ handleControlledInputChange } required autoFocus className='form-control' placeholder='e.g. feeling less stressed out' defaultValue={ habit.reward } />
        </div>
      </fieldset>
      <fieldset>
        <div className='habit-form__group'>
          <label htmlFor='frequency'>Estimated Weekly Total:</label>
          <input type='number' id='frequency' onChange={ handleControlledInputChange } required autoFocus className='form-control' placeholder='e.g. 10' defaultValue={ habit.frequency } />
        </div>
      </fieldset>
      <div className='btn-cont'>
        <button className='btn btn-primary' type='button' disabled={ isLoading } onClick={ handleClickSaveHabit }>Save Habit</button>
      </div>

    </>
  )
}