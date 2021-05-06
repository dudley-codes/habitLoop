import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import editIcon from '../habits/images/edit-icon.svg'
import { Link } from 'react-router-dom'
import { updateEntry, getEntryById, deleteEntry } from '../../modules/JournalProvider'
import trashCan from '../habits/images/trashcan.png'

export const EntryEdit = ({ fetchEntries, entryId }) => {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ show, setShow ] = useState(false)
  const [ entry, setEntry ] = useState({})

  // When called, closes the Modal
  const handleClose = () => {
    fetchEntries()
      .then(res => console.log(res))
      .then(() => setIsLoading(false))
      .then(() => setShow(false))
  };

  // Handles delete
  const HandleDelete = () => {
    const handleDelete = () => {
      deleteEntry(entryId)
        .then(fetchEntries)
    }
    return (
      <>
        <Link onClick={ () => handleDelete() } to=''>
          <img src={ trashCan } alt='delete icon' className='edit--icon' />
        </Link>
      </>
    )
  }



  // Executes the modal
  const handleShow = () => setShow(true);

  // Sets the entry to be edited
  const handleFieldChange = (e) => {
    const entryToChange = { ...entry }
    entryToChange[ e.target.id ] = e.target.value
    setEntry(entryToChange)
  }

  // Writes the updated entry to the JSON server and then fetches the updated entry to update the DOM
  const updateExistingEntry = (e) => {
    e.preventDefault()
    setIsLoading(true)

    const editedEntry = {
      id: entryId,
      date: entry.date,
      userId: entry.userId,
      habit: entry.habit,
      entry: entry.entry
    }

    updateEntry(editedEntry)
      .then(() => handleClose())
  }

  useEffect(() => {
    getEntryById(entryId)
      .then(entry => {
        setEntry(entry)
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <Link onClick={ handleShow } to=''>
        <img src={ editIcon } alt='edit icon' className='edit--icon' />
      </Link>

      <HandleDelete />

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
                  defaultValue={ entry.habit }
                />
              </div>
            </fieldset>
            <fieldset>
              <div className='habit-form__group'>
                <label htmlFor='cue'>Entry:</label>
                <input
                  type='text'
                  required
                  id='entry'
                  onChange={ handleFieldChange }
                  autoFocus
                  className='form-control'
                  defaultValue={ entry.entry }
                />
              </div>
            </fieldset>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <div className='button-container'>
            <div className='button-container__delete'>
              {/* <Button
                variant='danger'
                onClick={ () => handleDelete(habitId) }
                disabled={ isLoading }>
                Delete
                </Button> */}
            </div>

            <div className='button-container__save'>
              <Button
                variant="secondary"
                onClick={ handleClose }>
                Close
          </Button>
              <Button
                variant="primary"
                onClick={ updateExistingEntry }
                disabled={ isLoading }
              >
                Save Changes
          </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

    </>
  )
}