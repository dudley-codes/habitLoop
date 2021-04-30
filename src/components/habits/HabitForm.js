import React, { useEffect, useState } from 'react'
import './Habit.css'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { GoodHabit } from './GoodHabit'
import { BadHabit } from './BadHabit'
import { HabitGraphic } from './HabitGraphic'


export const NewHabit = () => {
  const [ radioValue, setRadioValue ] = useState(1);

  let currentRadioValue = { ...radioValue }
  // Names toggle buttons
  const HabitToggle = () => {
    const radios = [
      { name: 'Good 😇', value: '1' },
      { name: 'Bad 😈', value: '2' }
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
      <section className='new-habit__container'>
        <div className='habit-form'>
          <h3 className='habit-form__title'>New Habit</h3>
          <HabitToggle />
          <form className='habit-form'>
            <GoodHabit />
          </form>
        </div>

        <HabitGraphic />
      </section>
    </>
  )
}