import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { addCounter, decreaseCount } from '../../modules/HabitProvider'
import plusIcon from './images/plus.svg';
import { Link } from 'react-router-dom';
import greenUp from './images/green-up.png'
import redUp from './images/red-up.png'
import greenDwn from './images/green-dwn.png'
import redDwn from './images/red-dwn.png'

export const IncreaseCount = ({ habit, fetchHabits, filterHabits }) => {
  const [ count, setCount ] = useState({});
  const [ isLoading, setIsLoading ] = useState(false);

  // Checks to see if it is a good or bad habit and then chooses a colored arrow to increase the habit.
  const redOrGreenUp = () => {
    if (habit.goodHabit === true) {
      return greenUp
    } else { return redUp }
  }

  // Checks to see if it is a good or bad habit and then chooses a colored arrow to decrease the habit.
  const redOrGreenDwn = () => {
    if (habit.goodHabit === true) {
      return redDwn
    } else { return greenDwn }
  }

  // Executes a fetch delete call to the JSON server.
  // Deletes the most recent habit.count from the array
  const handleDecreaseCount = () => {
    setIsLoading(true)
    decreaseCount(habit.count[ habit.count.length - 1 ].id)
      .then(() => setIsLoading(false))
      .then(() => fetchHabits())
  }

  // Executes a fetch post call to JSON server that creates a new count object that contains the datetime stamp and habit ID. 
  // Operates like a 'like' button...
  const handleIncreaseCount = (e) => {
    setIsLoading(true);
    let newCount = { ...count };
    newCount.date = Date.now()
    newCount.habitId = habit.id
    addCounter(newCount)
      .then(() => setIsLoading(false))
      .then(() => fetchHabits())
  }
  // Renders up and down arrows plus current count of a habit.
  return (
    <>
      <div className='up-down__cont'>
        <Link onClick={ handleIncreaseCount } to='' disabled={ isLoading }>
          <div className='habit--plus'>
            <img src={ redOrGreenUp() } alt='add to habit icon' />
          </div>
        </Link>
        <div className='up-down__count'>{ filterHabits() }</div>
        <Link onClick={ handleDecreaseCount } to='' disabled={ isLoading } >
          <div className='habit--plus'>
            <img src={ redOrGreenDwn() } alt='subtract from habit icon' />
          </div>
        </Link>
      </div>
    </>
  )
}