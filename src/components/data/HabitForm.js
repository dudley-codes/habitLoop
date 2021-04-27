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

    const habit = habit.habit;
    const userId = currentUserId;
    const habitStart = Date.now();
    const goodHabit = true;
    const cue = habit.cue;
    const reward = habit.reward;
    const frequency = habit.frequency

    setIsLoading(true);
    addHabit(habit)
      .then(() => history.push('/'))
  }

  return (
    <>
      <h2>This is a test</h2>
    </>
  )
}