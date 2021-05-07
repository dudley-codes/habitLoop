import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
import { getCurrentMonth, getCurrentYear, daysInMonth } from '../../modules/helpers';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { HabitEditModal } from './HabitEditModal';
import { IncreaseCount } from './HabitCount';
import { addCounter, decreaseCount } from '../../modules/HabitProvider'
import collapse from '../habits/images/collapse.png'
import expand from '../habits/images/expand.png'
import './Habit.css'

export const HabitCard = ({ habit, fetchHabits }) => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ showDetails, setShowDetails ] = useState(0)
  const history = useHistory();
  const goodHabit = habit.goodHabit
  const [ count, setCount ] = useState({});
  const [ goal, setGoal ] = useState('')

  // Fetches habits and then creats a new array with only habit counts from the current month.
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

  // Takes habit.frequency (weekly habit goal) and divides by 7. This gives us a daily average number that we multiply times the 
  // number of days in the month. We then divide our current monthly count by this number and multiply times 100 to give us the 
  // current progress towards a particular goal.
  const monthlyPercentage = Math.floor((filterHabits()) / (habit.frequency / 7 * daysInMonth) * 100)

  // Calculates the bad habit frequency in the same manner as above. In a bad habit, habit.frequency represents 
  // a users average habit count per week. Again, we divide this number by 7 and multiply times the number of days in the month
  // in order to get our monthly total. Because NOT doing the habit means success, we subtract current habit.count.length from
  // this number. Meaning we start at 100% and every time the habit is performed, the user approaches zero. 
  const badHabitFreq = () => {
    const habitDays = habit.frequency / 7 * daysInMonth
    const habitTotal = Math.floor(((habitDays - filterHabits()) / habitDays) * 100)

    return habitTotal
  }

  const progStyle = {
    height: '30px',
    color: 'red'
  }

  // If progress in bad habit is over 50%, set to good color, if between 
  // 25% and 50%, set to yellow. Below 50%, set to red.
  const goodOrBadProg = () => {
    if (badHabitFreq() >= 75) {
      return 'good'
    } else if (badHabitFreq() >= 25 & badHabitFreq() < 75) {
      return 'warning'
    } else {
      return 'danger'
    }
  }

  // Executes a fetch delete call to the JSON server.
  // Deletes the most recent habit.count from the array
  const handleDecreaseCount = (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (filterHabits() === 0) {
      window.alert("You're already at zero. You can't get to more zero.")
    } else {
      decreaseCount(habit.count[ habit.count.length - 1 ].id)
        .then(() => setIsLoading(false))
        .then(() => fetchHabits())
        .then(() => history.push('/'))
    }
  }

  // Executes a fetch post call to JSON server that creates a new count object that contains the datetime stamp and habit ID. 
  // Operates like a 'like' button...
  const handleIncreaseCount = (e) => {
    e.preventDefault()
    setIsLoading(true);
    let newCount = { ...count };
    newCount.date = Date.now()
    newCount.habitId = habit.id
    addCounter(newCount)
      .then(() => setIsLoading(false))
      .then(() => fetchHabits())
      .then(() => history.push('/'))
  }

  // Toggles between showing and hiding details
  const ToggleDetails = () => {

    return (
      showDetails === 0 ?
        <>
          <Link onClick={ () => setShowDetails(habit.id) } to=''>
            <img src={ expand } alt='info icon' className='info--icon' />
          </Link>
        </>
        :
        <>
          <Link onClick={ () => setShowDetails(0) } to=''>
            <img src={ collapse } alt='info icon' className='info--icon' />
          </Link>
        </>
    )
  }

  // Checks if goodHabit is true or false and displays data accordingly
  const GoodOrBadDetails = () => {
    switch (habit.goodHabit) {
      case true: setGoal('Goal')
        break;
      case false: setGoal('Est. Total')
        break;
      default:
        break;
    }

    return (
      <>
        <div className='details--info'>
          <div><b>Cue:</b> { habit?.cue }</div>
          <div><b>Reward:</b> { habit?.reward }</div>
          <div><b>{ goal }:</b> { habit?.frequency }x per week</div>
        </div>
      </>
    )
  }

  //  Shows and hides details for the habit
  const ShowDetails = () => {
    switch (showDetails) {
      case 0: return null
        break;
      case habit.id: return (
        <GoodOrBadDetails />
      )
        break;
      default:
        break;
    }
  }

  // returns the habit card that contains the habit name, current progress and allows the user to increase or decrease a habit count.
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
                <ToggleDetails />
              </div>
            </div>
            <ShowDetails />
            <div className='habit--progress__cont'>
              <div className='habit--progress'>

                <div>
                  <ProgressBar now={ monthlyPercentage } variant='good' style={ progStyle } />
                </div>
              </div>
            </div>
          </div>
          <IncreaseCount
            habit={ habit }
            fetchHabits={ fetchHabits }
            filterHabits={ filterHabits }
            handleDecreaseCount={ handleDecreaseCount }
            handleIncreaseCount={ handleIncreaseCount } />
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
                <ToggleDetails />
              </div>
            </div>
            <ShowDetails />
            <div className='habit--progress__cont'>
              <div className='habit--progress'>
                <div>
                  <ProgressBar now={ badHabitFreq() } style={ progStyle } variant={ goodOrBadProg() } />
                </div>
              </div>
            </div>
          </div>
          <IncreaseCount
            habit={ habit }
            fetchHabits={ fetchHabits }
            filterHabits={ filterHabits }
            handleDecreaseCount={ handleDecreaseCount }
            handleIncreaseCount={ handleIncreaseCount } />
        </div>
      </>
  )
}