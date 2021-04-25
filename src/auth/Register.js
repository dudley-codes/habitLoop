import React, { useState } from "react"
import { useHistory, Link } from "react-router-dom";
import "./Login.css"

export const Register = () => {
  const [ registerUser, setRegisterUser ] = useState({ firstName: "", lastName: "", email: "" })
  const [ conflictDialog, setConflictDialog ] = useState(false)
  const history = useHistory()
  const handleInputChange = (event) => {
    const newUser = { ...registerUser }
    newUser[ event.target.id ] = event.target.value
    setRegisterUser(newUser)
  }
  const existingUserCheck = () => {
    // If your json-server URL is different, please change it below!
    return fetch(`http://localhost:8088/users?email=${ registerUser.email }`)
      .then(res => res.json())
      .then(user => !!user.length)
  }
  const handleRegister = (e) => {
    e.preventDefault()
    existingUserCheck()
      .then((userExists) => {
        if (!userExists) {
          // If your json-server URL is different, please change it below!
          fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: registerUser.email,
              name: `${ registerUser.firstName } ${ registerUser.lastName }`
            })
          })
            .then(res => res.json())
            .then(createdUser => {
              if (createdUser.hasOwnProperty("id")) {
                // The user id is saved under the key habitLoop_user in session Storage. Change below if needed!
                sessionStorage.setItem("habitLoop_user", createdUser.id)
                history.push("/")
              }
            })
        }
        else {
          setConflictDialog(true)
        }
      })
  }
  return (
    <main style={ { textAlign: "center" } }>
      <dialog className="dialog dialog--password" open={ conflictDialog }>
        <div>Account with that email address already exists</div>
        <button className="button--close" onClick={ e => setConflictDialog(false) }>Close</button>
      </dialog>
      <section className='register__container'>


        <form className="form--login" onSubmit={ handleRegister }>
          <div className='login--signup'>
            <h2 className='login'><Link to="/login">Login</Link></h2>
            <h2 className='logout'>
              Register
            </h2>
          </div>
          <fieldset>
            <input type="text" name="firstName" id="firstName" className="form-control" placeholder="First name" required autoFocus value={ registerUser.firstName } onChange={ handleInputChange } />
          </fieldset>
          <fieldset>
            <input type="text" name="lastName" id="lastName" className="form-control" placeholder="Last name" required value={ registerUser.lastName } onChange={ handleInputChange } />
          </fieldset>
          <fieldset>
            <input type="email" name="email" id="email" className="form-control" placeholder="Email address" required value={ registerUser.email } onChange={ handleInputChange } />
          </fieldset>
          <fieldset>
            <button type="submit" className='login-btn btn btn-primary'>Submit</button>
          </fieldset>
        </form>
      </section>
    </main>
  )
}












