const remoteURL = 'http://localhost:8088'

export const getAllHabits = () => {
  return fetch(`${ remoteURL }/habits?_expand=user`)
    .then(res => res.json())
}

export const getHabitsByMonth = (month) => {
  return fetch(`${ remoteURL }/count?_expand=habit&habitMonth=${ month }`)
    .then(res => res.json())
}

export const addHabit = (newHabit) => {
  return fetch(`${ remoteURL }/habits`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newHabit)
  }).then(res => res.json())
}