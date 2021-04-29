import React, { useEffect, useState } from 'react';
import editIcon from './images/edit-icon.svg';
import plusIcon from './images/plus.svg';
import minusIcon from './images/minus.svg';
import './Habit.css'
import { getCurrentMonth, getCurrentYear, daysInMonth } from '../../modules/helpers';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { HabitEditModal } from './HabitEditModal';

export const HabitCard = ({ habit, fetchHabits }) => {
  const goodHabit = habit.goodHabit
  const habitGoal = Math.floor((habit.count.length) / (habit.frequency * 4) * 100)

  const badHabitFreq = () => {
    const habitDays = habit.frequency * daysInMonth
    const habitTotal = Math.floor(((habitDays - habit.count.length) / habitDays) * 100)

    return habitTotal
  }

  return (
    goodHabit ?
      <>
        <div className='habit--card'>
          <div className='habit--card__details'>
            <div className='habit--card__habit'>
              <div>{ habit.habit }</div>
              <HabitEditModal
                habitId={ habit.id }
                fetchHabits={ fetchHabits }
              />
            </div>
            <div className='habit--card__percent'>{ habitGoal }%</div>
          </div>
          <div className='habit--progress__cont'>
            {/* <div className='habit--minus'>
              <img src={ minusIcon } alt='subtract from habit icon' />
            </div> */}
            <div className='habit--progress'>
              <div>
                <ProgressBar now={ habitGoal } variant='success' />
              </div>
            </div>
            <div className='habit--plus'>
              <img src={ plusIcon } alt='add to habit icon' />
            </div>
            {/* <div className='habit--minus'>
              <img src={ minusIcon } alt='subtract from habit icon' />
            </div> */}
          </div>
        </div>
      </>
      :
      <>
        <div className='habit--card'>
          <div className='habit--card__details'>
            <div className='habit--card__habit'>
              <div>{ habit.habit }</div>
              <HabitEditModal
                habitId={ habit.id }
                fetchHabits={ fetchHabits }
              />
            </div>
            <div className='habit--card__percent'>{ badHabitFreq() }%</div>
          </div>
          <div className='habit--progress__cont'>
            {/* <div className='habit--plus'>
              <img src={ plusIcon } alt='add to habit icon' />
            </div> */}
            <div className='habit--progress'>
              <div>
                <ProgressBar now={ badHabitFreq() } variant='danger' />
              </div>
            </div>

            <div className='habit--minus'>
              <img src={ minusIcon } alt='subtract from habit icon' />
            </div>
          </div>
        </div>
      </>
  )
}