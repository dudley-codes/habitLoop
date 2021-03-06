import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { addHabit } from '../../modules/HabitProvider'
import Button from 'react-bootstrap/Button'

export const GoodHabit = () => {
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
    newHabit.habitStart = Date.now()
    newHabit.goodHabit = true;
    newHabit.frequency = parseInt(newHabit.frequency)

    setIsLoading(true)
    addHabit(newHabit)
      .then(() => history.push('/'))
  }
  // renders bad habit form
  // TODO: I need to do some rafactoring so that this is combined with BadHabit.js

  return (
    <>

      {/* <h6>(Not sure where to start? Try our about section, <br />
we promise we won't make you read too much)</h6> */}
      <fieldset>
        <div className='habit-form__group'>
          <label htmlFor='habit'>Good Habit:</label>
          <input type='text' id='habit' onChange={ handleControlledInputChange } required autoFocus className='form-control' placeholder='e.g. Work Out' defaultValue={ habit.habit } />
        </div>
      </fieldset>
      <fieldset>
        <div className='habit-form__group'>
          <label htmlFor='cue'>Cue:</label>
          <input type='text' id='cue' onChange={ handleControlledInputChange } required className='form-control' placeholder='e.g. after waking up' defaultValue={ habit.cue } />
        </div>
      </fieldset>
      <fieldset>
        <div className='habit-form__group'>
          <label htmlFor='reward'>Reward:</label>
          <input type='text' id='reward' onChange={ handleControlledInputChange } required className='form-control' placeholder='e.g. endorphins from working out' defaultValue={ habit.reward } />
        </div>
      </fieldset>
      <fieldset>
        <div className='habit-form__group'>
          <label htmlFor='frequency'>Weekly Goal:</label>
          <input type='number' id='frequency' min={ 0 } onChange={ handleControlledInputChange } required className='form-control' placeholder='e.g. 5' defaultValue={ habit.frequency } />
        </div>
      </fieldset>
      <div className='btn-cont'>
        <Button className='btn' type='button' disabled={ isLoading } variant="primary" onClick={ handleClickSaveHabit }>Save Habit</Button>
      </div>
    </>
  )
}