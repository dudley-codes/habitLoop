const remoteURL = 'http://localhost:8088'

export const getEntryByUserId = (id) => {
  return fetch(`${ remoteURL }/journal?_expand=user&userId=${ id }`)
    .then(res => res.json())
}

export const addEntry = (newEntry) => {
  return fetch(`${ remoteURL }/journal`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(newEntry)
  }).then(res => res.json())
}

export const getHabitsByUserId = (userId) => {
  return fetch(`${ remoteURL }/habits?Id=${ userId }`,)
    .then(res => res.json())
}