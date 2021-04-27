import React, { useState, useEffect } from 'react'
import './ProfileCard.css'
import profilePic from './images/rick-sanchez.jpeg'
import { getAllUsers } from '../../modules/UserDataManager';

const currentUserId = sessionStorage.getItem('user_id')
export const ProfileCard = () => {
  const [ user, setUser ] = useState('');


  const getCurrentUser = () => {
    getAllUsers().then(res => res.filter(user => {
      if (user.id == currentUserId) {
        setUser(user)
      }
    }))
  }

  useEffect(() => {
    getCurrentUser()

  }, [])


  return (
    <>
      <section className='profile--cont__outer'>
        <div className='profile--cont__inner'>
          <div className='pic--cont'>
            <img src={ profilePic } alt='profile pic' />
          </div>
          <div className='bio--cont'>
            <h4>{ user.name }</h4>
            <h6>{ user?.tagline }</h6>
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
