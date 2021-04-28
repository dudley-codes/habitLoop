import React, { useEffect, useState } from 'react'
import { useHistory, Route } from 'react-router-dom'
import { addHabit } from '../../modules/HabitProvider'
import './Habit.css'
import { getCurrentMonth } from '../../modules/helpers'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { GoodHabit } from './GoodHabit'
import { render } from '@testing-library/react'


export const NewHabit = () => {
  const currentMonth = getCurrentMonth()
  const [ habit, setHabit ] = useState({})
  const [ count, setCount ] = useState({
    habitId: '',
    habitMonth: currentMonth,
  })

  const [ radioValue, setRadioValue ] = useState(1);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ boolean, setBoolean ] = useState(true)

  let isGoodHabit = { ...radioValue }

  const history = useHistory();

  const currentUserId = parseInt(sessionStorage.getItem('user_id'))

  const handleControlledInputChange = (e) => {
    const newHabit = { ...habit };
    newHabit.userId = currentUserId
    let selectedVal = e.target.value;
    if (e.target.id.includes('Id') || e.target.id.includes('frequency')) {
      selectedVal = parseInt(selectedVal)
    }

    newHabit[ e.target.id ] = selectedVal

    setHabit(newHabit)
  }

  const handleClickSaveHabit = (e) => {
    e.preventDefault();
    setIsLoading(true);


    setIsLoading(true)
    addHabit(habit)
      .then(() => history.push('/'))
  }


  // todo testing site
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
        return <GoodHabit
          handleControlledInputChange={ handleControlledInputChange }
          handleClickSaveHabit={ handleClickSaveHabit }
          HabitToggle={ HabitToggle }
          habit={ habit }
          isLoading={ isLoading }
        />
        break;
      case 2:
        return <h2>It worked!!!!</h2>


    }

  }

  console.log('render', RenderForm())


  // todo testing site

  return (
    <>
      <div className='habit-form'>
        <h3 className='habit-form__title'>New Habit</h3>
        <HabitToggle />
        <RenderForm />
        {/* <RenderForm /> */ }
        {/* <Route path='/new'>
          <GoodHabit
            handleControlledInputChange={ handleControlledInputChange }
            handleClickSaveHabit={ handleClickSaveHabit }
            HabitToggle={ HabitToggle }
            habit={ habit }
            isLoading={ isLoading }
          />
        </Route> */}
      </div>


    </>
  )
}