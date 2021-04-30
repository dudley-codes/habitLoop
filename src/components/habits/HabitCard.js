import React from 'react';
import './Habit.css'
import { getCurrentMonth, getCurrentYear, daysInMonth } from '../../modules/helpers';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { HabitEditModal } from './HabitEditModal';
import { IncreaseCount } from './HabitCount';

export const HabitCard = ({ habit, fetchHabits }) => {

  const goodHabit = habit.goodHabit

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
          <div className='habit--card__outer'>
            <div className='habit--card__details'>
              <div className='habit--card__habit'>
                <div>{ habit.habit }</div>
                <HabitEditModal
                  habitId={ habit.id }
                  fetchHabits={ fetchHabits }
                />
              </div>
            </div>
            <div className='habit--progress__cont'>
              <div className='habit--progress'>
                <div>
                  <ProgressBar now={ monthlyCount } variant='success' />
                </div>
              </div>
            </div>
          </div>
          <IncreaseCount
            habit={ habit }
            fetchHabits={ fetchHabits }
            filterHabits={ filterHabits } />
        </div>
      </>
      :
      <>
        <div className='habit--card'>
          <div className='habit--card__outer'>

            <div className='habit--card__details'>
              <div className='habit--card__habit'>
                <div>{ habit.habit }</div>
                <HabitEditModal
                  habitId={ habit.id }
                  fetchHabits={ fetchHabits }
                />
              </div>
            </div>
            <div className='habit--progress__cont'>
              <div className='habit--progress'>
                <div>
                  <ProgressBar now={ badHabitFreq() } variant='danger' />
                </div>
              </div>
            </div>
          </div>
          <IncreaseCount
            habit={ habit }
            fetchHabits={ fetchHabits }
            filterHabits={ filterHabits } />
        </div>
      </>
  )
}