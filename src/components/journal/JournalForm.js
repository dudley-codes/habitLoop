import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

export const JournalForm = ({ fetchEntries, userId }) => {
  const [ isLoading, setIsLoading ] = useState(false)
  const history = useHistory()
  // Set state with empty data
  const [ entry, setEntry ] = useState({
    habit: '',
    entry: '',
    userId: userId,
    date: ''
  })

  // Handle input changes and parse user ID
  const handleControlledInputChange = (e) => {
    const newEntry = { ...entry }
    let selectedVal = e.target.value

    if (e.target.id.includes('Id')) {
      selectedVal = parseInt(selectedVal)
    }

    newEntry[ e.target.id ] = selectedVal

    setEntry(newEntry)
  }

  const handleClickSaveEntry = e => {
    e.preventDefault()
    setIsLoading(true)
    let completeEntry = { ...entry }
    completeEntry.date = Date.now()
  }

  return (
    <div>Test</div>
  )
}