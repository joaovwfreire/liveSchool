import React, { useState } from 'react'
import { useKeyring } from '@w3ui/react-keyring'
import styles from '../styles/Home.module.css';

export default function Authenticator ({ children }) {
  const [{ space }, { createSpace, registerSpace, cancelRegisterSpace }] = useKeyring()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (space?.registered()) {
    return children
  }

  if (submitted) {
    return (
      
      <main className={styles.main}>
      <div className='box'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className='box2'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
    <div className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100">
      <div className="card-body">
        <div className='card-title'>W3 storage account creation</div>

        
        <h1 className='near-white'>Verify your email address!</h1>
        <p>Click the link in the email we sent to {email} to sign in.</p>
        <form onSubmit={e => { e.preventDefault(); cancelRegisterSpace() }}>
          <button type='submit' className='ph3 pv2 btn'>Cancel</button>
        </form>
      </div>
    </div>
    </main>
    )
  }

  const handleRegisterSubmit = async e => {
    e.preventDefault()
    setSubmitted(true)
    console.log(2)
    try {
      await createSpace()
      console.log(1)
      await registerSpace(email)
    } catch (err) {
        console.log(err)
      throw new Error('failed to register', { cause: err })
    } finally {
      setSubmitted(false)
    }
  }

  return (
    <main className={styles.main}>
      <div className='box'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className='box2'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
    <div className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100">
      <div className="card-body">
        <div className='card-title'>W3 storage account creation</div>

        <div className="form-control">
        <label className="label">
            <span className="label-text text-lg">Email address</span>
          </label>
          <input type="text" placeholder="jovi@liveschool.io" value={email} onChange={e => setEmail(e.target.value)} required   className="input input-bordered input-accent" />
        </div>
        <div className="form-control mt-6">
          <label htmlFor="my-modal-3" className="btn" onClick={handleRegisterSubmit}>Proceed to course Creation  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
</svg></label>
        </div>
      </div>
    </div>
    </main>
  )
}

/**
 * Wrapping a component with this HoC ensures an identity exists.
 */
export function withIdentity (Component) {
  return props => (
    <Authenticator>
      <Component {...props} />
    </Authenticator>
  )
}