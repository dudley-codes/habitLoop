import React from 'react'
import { NavBar } from '../nav/NavBar'
import Carousel from 'react-bootstrap/Carousel'
import sleepy from './images/sleepy.svg'
import coffee from './images/coffee.svg'
import alert from './images/alert.svg'
import './About.css'


export const About = () => {
  return (
    <>
      <section className='dashboard-container'>
        <div className='about-cont'>
          <div className='laptop-screen'>
            <NavBar />
            <div className='about-cont__inner'>
              {/*! Start carousel */ }
              <div className='carousel-cont'>
                <div className='what-is'>
                  <p>HabitLoop(🧠) is an app that helps you track progress of both and bad habits in your life.</p>
                  <p>A Habit Loop is a neurological loop that controls all habits. Habit loops consist of three different elements: a cue, a routine, and a reward.</p>
                </div>

                <Carousel
                  interval={ null }
                >
                  <Carousel.Item>
                    <div className='about-slide'>
                      <h4>Cue: Tired student</h4>

                      <img src={ sleepy } alt='sleepy student' />
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className='about-slide'>
                      <h4>Routine: Coffee</h4>
                      <img src={ coffee } alt='coffee cup' />
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className='about-slide'>
                      <h4>Reward: Alert student</h4>
                      <img src={ alert } alt='alert student' />
                    </div>
                  </Carousel.Item>
                </Carousel>
                {/* End carousel */ }
                <div className='what-is'>
                  <p>The cue for a habit can be nearly anything related to your environment, from a certain scent, to the time of day, to a specific location.
                  </p>
                  <p>
                    The routine is the habit itself. Pretty self-explanatory.
                  </p>
                  <p>
                    Finally, we have the reward. What does your brain get out of it. This can be anything from the chemicals released in your brain from smoking a cigarette to the feeling of satisfaction you get from having a clean house.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}