import React from 'react';
import graphic from './images/habitloop-graphic.png'

export const HabitGraphic = () => {
  return (
    <div className='habit-graphic'>
      <img src={ graphic } alt='graphic explaining the habit loop' />
    </div>
  )
}