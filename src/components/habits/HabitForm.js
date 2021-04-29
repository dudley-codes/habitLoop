import React, { useEffect, useState } from 'react'
import './Habit.css'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { GoodHabit } from './GoodHabit'
import { BadHabit } from './BadHabit'

export const NewHabit = () => {

  const [ radioValue, setRadioValue ] = useState(1);

  const HabitToggle = () => {

    const radios = [
      { name: 'Good 😇', value: '1' },
      { name: 'Bad 😈', value: '2' }
    ];

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
      <div className='habit-form'>
        <h3 className='habit-form__title'>New Habit</h3>
        <HabitToggle />
        <form className='habit-form'>
          <RenderForm />
        </form>
      </div>
    </>
  )
}