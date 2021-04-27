// import React, { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'
// import './Habit.css'

// export const NewHabit = () => {
//   const [ habit, setHabit ] = useState({})

//   const [ isLoading, setIsLoading ] = useState(false);

//   const history = useHistory();

//   const handleControlledInputChange = (e) => {
//     const newHabit = { ...habit };
//     let selectedVal = e.target.value;
//     if (e.target.id.includes('Id')) {
//       selectedVal = parseInt(selectedVal)
//     }

//     newHabit[ e.target.id ] = selectedVal

//     setHabit(newHabit)
//   }

//   const handleClickSaveHabit = (e => {
//     e.preventDefault();
//     setIsLoading(true);

//     const habit = habit.habit;
//     const userId = 
//  })
// }