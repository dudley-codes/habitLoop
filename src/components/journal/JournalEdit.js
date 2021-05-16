import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import editIcon from '../habits/images/edit.svg'
import { Link } from 'react-router-dom'
import { updateEntry, getEntryById, deleteEntry } from '../../modules/JournalProvider'
import trashCan from '../habits/images/trashcan.png'

export const EntryEdit = ({ fetchEntries, entryId }) => {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ show, setShow ] = useState(false)
  const [ entry, setEntry ] = useState({})
  const [ showConfirm, setShowConfirm ] = useState(false)

  // When called, closes the Modal
  const handleClose = () => {
    fetchEntries()
      .then(() => setIsLoading(false))
      .then(() => setShow(false))
  };

  // Opens dialog asking user to confirm they want to delete an entry
  const confirmDelete = () => {
    setShowConfirm(true)
  }

  const handleCancel = () => setShowConfirm(false)
  // Confirms delete
  const DeleteButton = () => {
    // deleteEntry(entryId)
    //   .then(fetchEntries)
    return (
      <>
        <Link onClick={ () => confirmDelete() } to=''>
          <img src={ trashCan } alt='delete icon' className='edit-icon' />
        </Link>
      </>
    )
  }

  // Delete has been confirmed, delete item
  const handleDelete = () => {
    deleteEntry(entryId)
      .then(fetchEntries)
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
        <img src={ editIcon } alt='edit icon' className='edit-icon' />
      </Link>

      <DeleteButton />

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
                <textarea
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

      {/* <Button variant="primary" onClick={ handleShow }>
        Launch demo modal
      </Button> */}

      <Modal show={ showConfirm } onHide={ handleCancel }>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleCancel }>
            Cancel
          </Button>
          <Button variant="danger" onClick={ handleDelete }>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <Modal show={ setShow } onHide={ handleClose }>
        <Modal.Dialog >Are you sure you want to delete this entry?
        <Button className='delete-button' onClick={ () => deleteConfirmed() }>Yes</Button>
          <Button className='delete-button' onClick={ () => setShowConfirm(false) }>Cancel</Button>
        </Modal.Dialog>
      </Modal> */}

    </>
  )
}