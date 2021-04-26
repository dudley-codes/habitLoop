export const getCurrentMonth = () => {
  const today = new Date();
  const currentMonth = today.getMonth()

  return currentMonth
}