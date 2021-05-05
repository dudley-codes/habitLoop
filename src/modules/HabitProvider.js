const remoteURL = 'http://localhost:8088'

export const getAllHabits = () => {
  return fetch(`${ remoteURL }/habits?_expand=user`)
    .then(res => res.json())
}

export const getHabitsByMonth = (month) => {
  return fetch(`${ remoteURL }/count?_expand=habit&habitMonth=${ month }`)
    .then(res => res.json())
}

// todo refactor
export const getHabitsByUser = (userId) => {
  return fetch(`${ remoteURL }/habits?_embed=count&userId=${ userId }`,)
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

export const addCount = (count) => {
  return fetch(`${ remoteURL }/count`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(count)
  }).then(res => res.json())
}

export const checkCounter = (count) => {
  return fetch(`${ remoteURL }/habits?_embed=count`)
    .then(res => res.json())
}

export const addCounter = (counter) => {
  return fetch(`${ remoteURL }/count`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(counter)
  }).then(res => res.json())
}

export const getHabitById = (id) => {
  return fetch(`${ remoteURL }/habits/${ id }?_embed=count`)
    .then(res => res.json())
}

export const updateHabit = (editedHabit) => {
  return fetch(`${ remoteURL }/habits/${ editedHabit.id }`, {
    method: "PUT",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(editedHabit)
  }).then(data => data.json())
}

export const deleteHabit = (id) => {
  return fetch(`${ remoteURL }/habits/${ id }`, {
    method: "DELETE",
  }).then(res => res.json())
}

export const decreaseCount = (id) => {
  return fetch(`${ remoteURL }/count/${ id }`, {
    method: "DELETE",
  }).then(res => res.json())
}