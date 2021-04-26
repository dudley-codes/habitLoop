import React, { useEffect, useState } from 'react';
import { ProfileCard } from '../user/ProfileCard'
import { HabitCard } from './HabitCard'
import './Habit.css'


export const HabitList = () => {

  const [ habit, getHabit ] = useState([])

  return (
    <>
      <section className='dashboard--container'>
        <ProfileCard />
        <div className='habit--container'>
          <h3>My Habits</h3>
          <HabitCard />
          {/* <div class="row">
            <div class="progress margin-bottom">
              <div class="bar w-35">35%</div>
            </div>
            <div class="progress margin-bottom">
              <div class="bar secondary w-40">40%</div>
            </div>
            <div class="progress margin-bottom">
              <div class="bar success w-55">55%</div>
            </div>
            <div class="progress margin-bottom">
              <div class="bar warning w-70">70%</div>
            </div>
            <div className='habit--progress'>
              <div>5%</div>
              <div class="progress margin-bottom">
                <div class="bar danger w-5"></div>
              </div>
            </div>
            <div class="progress margin-bottom">
              <div class="bar muted w-10">10%</div>
            </div>
          </div> */}
        </div>
      </section>
    </>
  )
}