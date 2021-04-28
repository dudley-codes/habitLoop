import React, { useEffect, useState } from 'react';
import editIcon from './images/edit-icon.svg';
import plusIcon from './images/plus.svg';
import minusIcon from './images/minus.svg';
import './Habit.css'
import { getCurrentMonth, daysInMonth } from '../../modules/helpers';
import ProgressBar from 'react-bootstrap/ProgressBar'
const currentMonth = getCurrentMonth()



export const HabitCard = ({ habit }) => {
  console.log(habit)
  const habitGoal = Math.floor(habit.monthCount / (habit.habit.frequency * 4) * 100)

  return (
    <>
      <div className='habit--card'>
        <div className='habit--card__details'>
          <div className='habit--card__habit'>
            <div>{ habit.habit.habit }</div>
            <img src={ editIcon } alt='edit icon' className='edit--icon' />
          </div>
          <div className='habit--card__percent'>{ habitGoal }%</div>
        </div>
        <div className='habit--progress__cont'>
          <div className='habit--progress'>
            <div>
              <ProgressBar now={ habitGoal } variant='success' />
            </div>
          </div>
          <div className='habit--plus'>
            <img src={ plusIcon } alt='add to habit icon' />
          </div>
          <div className='habit--minus'>
            <img src={ minusIcon } alt='subtract from habit icon' />
          </div>
        </div>
      </div>
    </>
  )
}