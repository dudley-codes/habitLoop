const remoteURL = 'http://localhost:8088'

export const getAllHabits = () => {
  return fetch(`${ remoteURL }/habits?_expand=user`)
    .then(res => res.json())
}

export const getHabitCounter = () => {
  return fetch(`${ remoteURL }/count`)
    .then(res => res.json())
}