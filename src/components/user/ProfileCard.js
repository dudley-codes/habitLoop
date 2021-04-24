import React from 'react'
import './ProfileCard.css'
import profilePic from './images/rick-sanchez.jpeg'

const currentUser = sessionStorage.getItem('user_name')


export const ProfileCard = () => {
  return (
    <>
      <section className='profile--cont__outer'>
        <div className='profile--cont__inner'>
          <div className='pic--cont'>
            <img src={ profilePic } alt='profile pic' />
          </div>
          <div className='bio--cont'>
            <h4>{ currentUser }</h4>
            <h6>Smartest man in the universe.</h6>
          </div>
          <hr></hr>
          <div className='btn--cont'>
            <button className='btn-primary btn btn--subscribe'>Message</button>
          </div>
        </div>
      </section>
    </>

  )
}