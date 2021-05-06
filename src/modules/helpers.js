export const getCurrentMonth = () => {
  const today = new Date();
  const currentMonth = today.getMonth()

  return currentMonth
}

export const getCurrentYear = () => {
  const today = new Date();
  const currentYear = today.getFullYear()

  return currentYear
}


console.log('monthYear', getCurrentYear())
// instantiate a date object
const dt = new Date();

// dt.getMonth() will return a month between 0 - 11
// we add one to get to the last day of the month 
// so that when getDate() is called it will return the last day of the month
const month = dt.getMonth() + 1;
const year = dt.getFullYear();

// this line does the magic (in collab with the lines above)
export const daysInMonth = new Date(year, month, 0).getDate();


export const currentUserId = sessionStorage.getItem('user_id')