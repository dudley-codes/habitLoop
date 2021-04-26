const remoteURL = 'http://localhost:8088'

export const getAllHabits = () => {
  return fetch(`${ remoteURL }/habits?_expand=user`)
    .then(res => res.json())
}

export const getHabitsByMonth = (month) => {
  return fetch(`${ remoteURL }/count?_expand=habit&habitMonth=${ month }`)
    .then(res => res.json())
}