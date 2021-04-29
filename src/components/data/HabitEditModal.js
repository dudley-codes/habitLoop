import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import editIcon from './images/edit-icon.svg';
import { Link } from 'react-router-dom';
import { updateHabit, getHabitById } from '../../modules/HabitProvider';

export const HabitEditModal = ({ habitId, fetchHabits }) => {
  const [ show, setShow ] = useState(false);
  const [ habit, setHabit ] = useState({ habit: '' });
  const [ isLoading, setIsLoading ] = useState(false);

  const handleClose = () => {
    fetchHabits()
      .then(() => setShow(false))
  };

  const handleShow = () => setShow(true);

  const handleFieldChange = (e) => {
    const habitToChange = { ...habit };
    habitToChange[ e.target.id ] = e.target.value
    setHabit(habitToChange)
  }

  const updateExistingHabit = (e) => {
    e.preventDefault();
    setIsLoading(true)

    const editedHabit = {
      id: habitId,
      userId: habit.userId,
      habit: habit.habit,
      frequency: habit.frequency,
      habitStart: habit.habitStart,
      goodHabit: habit.goodHabit,
      cue: habit.cue,
      reward: habit.reward
    };

    updateHabit(editedHabit)

      .then(() => handleClose())
  }

  useEffect(() => {
    getHabitById(habitId)
      .then(habit => {
        setHabit(habit)
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <Link onClick={ handleShow } to=''>
        <img src={ editIcon } alt='edit icon' className='edit--icon' />
      </Link>

      <Modal show={ show } onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>Edit Habit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <fieldset>
              <div className='habit-form__group'>
                <label htmlFor='habit'>Habit:</label>
                <input
                  type='text'
                  required
                  id='habit'
                  onChange={ handleFieldChange }
                  autoFocus
                  className='form-control'
                  defaultValue={ habit.habit }
                />
              </div>
            </fieldset>
            <fieldset>
              <div className='habit-form__group'>
                <label htmlFor='cue'>Cue:</label>
                <input
                  type='text'
                  required
                  id='cue'
                  onChange={ handleFieldChange }
                  autoFocus
                  className='form-control'
                  defaultValue={ habit.cue }
                />
              </div>
            </fieldset>
            <fieldset>
              <div className='habit-form__group'>
                <label htmlFor='reward'>Reward:</label>
                <input
                  type='text'
                  required
                  id='reward'
                  onChange={ handleFieldChange }
                  autoFocus
                  className='form-control'
                  defaultValue={ habit.reward }
                />
              </div>
            </fieldset>
            <fieldset>
              <div className='habit-form__group'>
                <label htmlFor='frequency'>Weekly Goal:</label>
                <input
                  type='text'
                  required
                  id='frequency'
                  onChange={ handleFieldChange }
                  autoFocus
                  className='form-control'
                  defaultValue={ habit.frequency }
                />
              </div>
            </fieldset>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleClose }>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={ updateExistingHabit }
            disabled={ isLoading }
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
