import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { addCounter } from '../../modules/HabitProvider'
import plusIcon from './images/plus.svg';
import { Link } from 'react-router-dom';
import greenUp from './images/green-up.png'
import redUp from './images/red-up.png'

export const IncreaseCount = ({ habit, fetchHabits }) => {
  const [ count, setCount ] = useState({});
  const [ isLoading, setIsLoading ] = useState(false);

  const redOrGreenUp = () => {
    if (habit.goodHabit === true) {
      return greenUp
    } else { return redUp }
  }

  const currentUserId = parseInt(sessionStorage.getItem('user_id'))

  const handleIncreaseCount = (e) => {
    setIsLoading(true);
    let newCount = { ...count };
    newCount.date = Date.now()
    newCount.habitId = habit.id
    addCounter(newCount)
      .then(() => setIsLoading(false))
      .then(() => fetchHabits())
  }

  return (
    <>
      <Link onClick={ handleIncreaseCount } to=''>
        <div className='habit--plus'>
          <img src={ redOrGreenUp() } alt='add to habit icon' />
        </div>
      </Link>
    </>
  )
}