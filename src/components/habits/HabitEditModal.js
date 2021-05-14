import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import editIcon from './images/edit.svg';
import { Link } from 'react-router-dom';
import { updateHabit, getHabitById, deleteHabit } from '../../modules/HabitProvider';

export const HabitEditModal = ({ habitId, fetchHabits }) => {
  const [ show, setShow ] = useState(false);
  const [ habit, setHabit ] = useState({ habit: '' });
  const [ habits, setHabits ] = useState({})
  const [ isLoading, setIsLoading ] = useState(false);

  // When called, closes the Modal
  const handleClose = () => {
    fetchHabits()
      .then(() => setIsLoading(false))
      .then(() => setShow(false))
  };

  // Deletes a habit, fetches updated habit list, and then closes the modal.
  const handleDelete = (id) => {
    deleteHabit(id)
      .then(fetchHabits())
      .then(handleClose)
  }

  // Executes the modal
  const handleShow = () => setShow(true);

  // Sets the habit to be edited
  const handleFieldChange = (e) => {
    const habitToChange = { ...habit };
    habitToChange[ e.target.id ] = e.target.value
    setHabit(habitToChange)
  }

  // Writes the updated habit to the JSON server
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

  // Returns edit modal with form filled out with info to be edited.
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
          <div className='button-container'>
            <div className='button-container__delete'>
              <Button
                variant='danger'
                onClick={ () => handleDelete(habitId) }
                disabled={ isLoading }>
                Delete
                </Button>
            </div>

            <div className='button-container__save'>
              <Button
                variant="secondary"
                onClick={ handleClose }>
                Close
          </Button>
              <Button
                variant="primary"
                onClick={ updateExistingHabit }
                disabled={ isLoading }
              >
                Save Changes
          </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
