import React, { useEffect, useState } from 'react';
import editIcon from './images/edit-icon.svg';
import plusIcon from './images/plus.svg';
import minusIcon from './images/minus.svg';
import './Habit.css'
import { getCurrentMonth, getCurrentYear, daysInMonth } from '../../modules/helpers';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { HabitEditModal } from './HabitEditModal';
import { IncreaseCount } from './HabitCount';

export const HabitCard = ({ habit, fetchHabits }) => {
  const habitCount = habit.count.length
  const goodHabit = habit.goodHabit

  // console.log('habit.count', habit.count)

  const filterHabits = () => {
    const filter = habit.count.filter(count => {
      let date = new Date(count.date)
      if (date.getMonth() === getCurrentMonth() &
        date.getFullYear() === getCurrentYear() || count.length === 0) {

        return count
      }
    })
    return filter.length
  }

  const monthlyCount = Math.floor((filterHabits()) / (habit.frequency * 4) * 100)


  const badHabitFreq = () => {
    const habitDays = habit.frequency / 7 * daysInMonth
    const habitTotal = Math.floor(((habitDays - filterHabits()) / habitDays) * 100)

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
            {/* <div className='habit--card__percent'>Goal: { habit.frequency }x/week</div> */ }
          </div>
          <div className='habit--progress__cont'>
            {/* <div className='habit--minus'>
              <img src={ minusIcon } alt='subtract from habit icon' />
            </div> */}
            <div className='habit--progress'>
              <div>
                <ProgressBar now={ monthlyCount } variant='success' />
              </div>
            </div>
            <IncreaseCount
              habit={ habit }
              fetchHabits={ fetchHabits }
              monthlyCount={ monthlyCount } />
            {/* <div className='habit--plus'>
              <img src={ plusIcon } alt='add to habit icon' />
            </div> */}
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
                habit={ habit }
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

            <IncreaseCount
              habit={ habit }
              fetchHabits={ fetchHabits } />
          </div>
        </div>
      </>
  )
}