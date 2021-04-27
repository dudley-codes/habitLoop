import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { addHabit } from '../../modules/HabitProvider'
import './Habit.css'

export const NewHabit = () => {
  const [ habit, setHabit ] = useState({})

  const [ isLoading, setIsLoading ] = useState(false);

  const history = useHistory();

  const currentUserId = sessionStorage.getItem('user_id')

  const handleControlledInputChange = (e) => {
    const newHabit = { ...habit };
    let selectedVal = e.target.value;
    if (e.target.id.includes('Id')) {
      selectedVal = parseInt(selectedVal)
    }

    newHabit[ e.target.id ] = selectedVal

    setHabit(newHabit)
  }

  const handleClickSaveHabit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // const habit = habit.habit;
    // const userId = currentUserId;
    // const habitStart = Date.now();
    // const goodHabit = true;
    // const cue = habit.cue;
    // const reward = habit.reward;
    // const frequency = habit.frequency

    setIsLoading(true);
    addHabit(habit)
      .then(() => history.push('/'))
  }

  return (
    <form className='habit-form'>
      <h3 className='habit-form__title'>New Habit</h3>
      <h6>(Not sure where to start? Try our about section, <br />
      we promise we won't make you read too much)</h6>
      <fieldset>
        <div className='habit-form__group'>
          <label htmlFor='habit'>Habit:</label>
          <input type='text' id='habit' onChange={ handleControlledInputChange } required autoFocus className='form-control' placeholder='e.g. Work Out' value={ habit.habit } />
        </div>
      </fieldset>
      <fieldset>
        <div className='habit-form__group'>
          <label htmlFor='cue'>Cue:</label>
          <input type='text' id='cue' onChange={ handleControlledInputChange } required autoFocus className='form-control' placeholder='e.g. after waking up' value={ habit.cue } />
        </div>
      </fieldset>
      <fieldset>
        <div className='habit-form__group'>
          <label htmlFor='reward'>Reward:</label>
          <input type='text' id='reward' onChange={ handleControlledInputChange } required autoFocus className='form-control' placeholder='e.g. endorphins from working out' value={ habit.reward } />
        </div>
      </fieldset>
      <fieldset>
        <div className='habit-form__group'>
          <label htmlFor='frequency'>frequency:</label>
          <input type='text' id='frequency' onChange={ handleControlledInputChange } required autoFocus className='form-control' placeholder='e.g. 5' value={ habit.frequency } /> <label htmlFor='frequency'>x per week</label>
        </div>
      </fieldset>
      <button className='btn btn-primary' type='button' disabled={ isLoading } onClick={ handleClickSaveHabit }>Save Habit</button>
    </form>
  )
}