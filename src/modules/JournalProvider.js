const remoteURL = 'http://localhost:8088'

export const getEntryByUserId = (id) => {
  return fetch(`${ remoteURL }/journal?_expand=user&userId=${ id }`)
    .then(res => res.json())
}

export const addEntry = (newEntry) => {
  return fetch(`${ remoteURL }/journal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newEntry)
  }).then(res => res.json())
}

export const getHabitsByUserId = (userId) => {
  return fetch(`${ remoteURL }/habits?Id=${ userId }`,)
    .then(res => res.json())
}

export const updateEntry = (editedEntry) => {
  return fetch(`${ remoteURL }/journal/${ editedEntry.id }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editedEntry)
  }).then(res => res.json())
}

export const getEntryById = (id) => {
  return fetch(`${ remoteURL }/journal/${ id }`)
    .then(res => res.json())
}

export const deleteEntry = (id) => {
  return fetch(`${ remoteURL }/journal/${ id }`, {
    method: "DELETE"
  }).then(res => res.json())
}