import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import editIcon from '../habits/images/edit-icon.svg'
import { Link } from 'react-router-dom'
import { updateEntry, getEntryById } from '../../modules/JournalProvider'

export const EntryEdit = ({ fetchEntries }) => {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ show, setShow ] = useState(false)
  const [ entry, setEntry ] = useState({})

  // When called, closes the Modal
  const handleClose = () => {
    fetchEntries()
      .then(() => setIsLoading(false))
      .then(() => setShow(false))
  };

  // Executes the modal
  const handleShow = () => setShow(true);

  return (
    <>
      <Link onClick={ handleShow } to=''>
        <img src={ editIcon } alt='edit icon' className='edit--icon' />
      </Link>
    </>
  )
}