const remoteURL = 'http://localhost:8088'

export const getEntryByUserId = (id) => {
  return fetch(`${ remoteURL }/journal?_expand=user&userId=${ id }`)
    .then(res => res.json())
}