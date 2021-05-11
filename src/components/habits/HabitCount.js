import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { addCounter, decreaseCount } from '../../modules/HabitProvider'
import plusIcon from './images/plus.svg';
import { Link } from 'react-router-dom';
import greenUp from './images/green-up.png'
import redUp from './images/red-up.png'
import greenDwn from './images/green-dwn.png'
import redDwn from './images/red-dwn.png'
import blackUp from './images/black-up.png'

export const IncreaseCount = ({ habit, fetchHabits, filterHabits, handleIncreaseCount, handleDecreaseCount }) => {
  const [ count, setCount ] = useState({});
  const history = useHistory()
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
  // const handleDecreaseCount = (e) => {
  //   e.preventDefault()
  //   setIsLoading(true)
  //   if (filterHabits() === 0) {
  //     window.alert("You're already at zero. You can't get to more zero.")
  //   } else {
  //     decreaseCount(habit.count[ habit.count.length - 1 ].id)
  //       .then(() => setIsLoading(false))
  //       .then(() => fetchHabits())
  //       .then(() => history.push('/details'))
  //   }
  // }

  // Executes a fetch post call to JSON server that creates a new count object that contains the datetime stamp and habit ID. 
  // Operates like a 'like' button...
  // const handleIncreaseCount = (e) => {
  //   e.preventDefault()
  //   setIsLoading(true);
  //   let newCount = { ...count };
  //   newCount.date = Date.now()
  //   newCount.habitId = habit.id
  //   addCounter(newCount)
  //     .then(() => setIsLoading(false))
  //     .then(() => fetchHabits())
  //     .then(() => history.push('/details'))
  // }
  // Renders up and down arrows plus current count of a habit.
  return (
    <>
      <div className='up-down__cont'>
        <Link onClick={ handleIncreaseCount } to='' disabled={ isLoading }>
          <div className='habit--plus'>
            <img src={ blackUp } alt='black up arrow' />
            <img src={ redOrGreenUp() } className='img-hvr' alt='add to habit icon' />
          </div>
        </Link>
        <div className='up-down__count'>{ filterHabits() }</div>
        {/* <Link onClick={ handleDecreaseCount } to='' disabled={ isLoading } >
          <div className='habit--plus'>
            <img src={ redOrGreenDwn() } alt='subtract from habit icon' />
          </div>
        </Link> */}
      </div>
    </>
  )
}