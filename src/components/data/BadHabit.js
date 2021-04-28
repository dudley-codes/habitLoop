import React from "react";

export const BadHabit = ({ handleControlledInputChange, handleClickSaveHabit, HabitToggle, habit, isLoading }) => {
  return (
    <form className='habit-form'>

      {/* <h6>(Not sure where to start? Try our about section, <br />
we promise we won't make you read too much)</h6> */}
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
          <label htmlFor='frequency'>Weekly Goal:</label>
          <input type='text' id='frequency' onChange={ handleControlledInputChange } required autoFocus className='form-control' placeholder='e.g. 5' value={ habit.frequency } />
        </div>
      </fieldset>
      <button className='btn btn-primary' type='button' disabled={ isLoading } onClick={ handleClickSaveHabit }>Save Habit</button>
    </form>
  )
}