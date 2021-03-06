import React, { useEffect, useState } from 'react'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { GoodHabit } from './GoodHabit'
import { BadHabit } from './BadHabit'
import { HabitGraphic } from './HabitGraphic'
import './Habit.css'
import { NavBar } from '../nav/NavBar'
import goodIcon from './images/good.png'
import devilIcon from './images/devil.png'


export const NewHabit = () => {
  const [ radioValue, setRadioValue ] = useState(1);

  const Good = () => {
    return (
      <div className='good-icon'>
        <div className='good-icon-name'>Good</div>
        <img src={ goodIcon } alt='smiling icon' className='good-icon' />
      </div>
    )
  }

  const Bad = () => {
    return (
      <div className='bad-icon'>
        <div className='good-icon-name'>Bad</div>
        <img src={ devilIcon } alt='smiling icon' className='bad-icon' />
      </div>
    )
  }

  let currentRadioValue = { ...radioValue }
  // Names toggle buttons
  const HabitToggle = () => {
    const radios = [
      { name: <Good />, value: '1' },
      { name: <Bad />, value: '2' }
    ];
    // Toggles selected button on radio based on value
    return (
      <>
        <ButtonGroup toggle>
          { radios.map((radio, idx) => (
            <ToggleButton
              key={ idx }
              type="radio"
              variant="primary"
              name="radio"
              value={ radio.value }
              checked={ radioValue === parseInt(radio.value) }
              onChange={ (e) => {
                setRadioValue(parseInt(e.currentTarget.value))
              }
              }
            >
              { radio.name }
            </ToggleButton>
          )) }
        </ButtonGroup>
      </>
    );
  }

  useEffect(() => {
    HabitToggle()
  }, [])

  const FormInstructions = () => {
    return (
      <>
        <div className='instructions'>
          <h4>Instructions:</h4>
          <p><b>Habit.</b>This part is pretty easy. What is the habit you are trying to form or break?</p>
          <p><b>Cue.</b>What cues or triggers the habit? If this is a habit you are trying to break, ask yourself, "After I do (cue), I do (habit)." This can be more than one thing, but try to narrow it down as best as possible.</p>
          <p><b>Reward.</b>This is the thing that tricks your brain into continuing the habit. If you're a smoker, it could be the feeling of relaxation after a cigarette. If you're a runner, it could be the runner's high you get.</p>
        </div>
      </>
    )
  }


  // switch statement that checks to see if the radioValue is 1 or 2 and then renders the GoodHabit form or BadHabitForm
  // TODO refactor code so that the goodhabit form and bad habit form are the same form and lines of code change 
  // TODO based on which selector has been selected on the radio
  const RenderForm = () => {
    // eslint-disable-next-line default-case
    switch (radioValue) {
      case 1:
        return <GoodHabit />
        break;
      case 2:
        return <BadHabit />
    }

  }

  return (
    <>
      <section className='dashboard-container'>
        <section className='habit-container'>
          <div className='laptop-screen'>
            <NavBar />
            <div className='screen-cont'>
              <div className='new-cont'>
                <HabitToggle />
                <form className=''>
                  <RenderForm />
                </form>
              </div>
              <FormInstructions />
            </div>
          </div>
          {/* <HabitGraphic /> */ }
        </section>
      </section>
    </>
  )
}