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
            <h3>{ currentUser }</h3>
            <h4>Smartest man in the universe.</h4>
          </div>
          <div className='btn--cont'>
            <h2>Even More Test</h2>
          </div>
        </div>
      </section>
    </>

  )
}