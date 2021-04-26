import React, { useEffect } from 'react';
import editIcon from './images/edit-icon.svg';
import plusIcon from './images/plus.svg';
import minusIcon from './images/minus.svg';
import './Habit.css'

export const HabitCard = () => {

  return (
    <>
      <div className='habit--card'>
        <div className='habit--card__details'>
          <div className='habit--card__habit'>
            <div>Work Out</div>
            <img src={ editIcon } alt='edit icon' className='edit--icon' />
          </div>
          <div className='habit--card__percent'>5%</div>
        </div>
        <div className='habit--progress__cont'>
          <div className='habit--progress'>
            <div className="progress margin-bottom">
              <div className="bar danger w-5"></div>
            </div>
          </div>
          <div className='habit--plus'>
            <img src={ plusIcon } alt='add to habit icon' />
          </div>
          <div className='habit--minus'>
            <img src={ minusIcon } alt='subtract from habit icon' />
          </div>
        </div>
      </div>
    </>
  )
}