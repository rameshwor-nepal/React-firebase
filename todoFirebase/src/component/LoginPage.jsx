import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase-setup/firebase'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [registering, setRegistering] = useState(false)
  const [registerdata, setRegisterdata] = useState({
    email: '',
    confirmEmail:'',
    displayName:'',
    password: '',
    confirmPassword: ''
  })

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/home')
      }
    })

  }, [])

  const handleClick = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log('user logged in:', cred.user)
        navigate('/home')
      })
      .catch((error) => alert(error.message));
  };

  const handleRegister = () => {
    if (registerdata.email != registerdata.confirmEmail || registerdata.password != registerdata.confirmPassword) {
      alert("Confirm that email and password are matched")
    }
    else {
      createUserWithEmailAndPassword(auth, registerdata.email, registerdata.password)
        .then(() => {
          updateProfile(auth.currentUser,{
            displayName: registerdata.displayName
          })
          navigate('/home')
        })
        .catch((error) => alert(error.message))

    }

  }

  return (
    <div className='login-section'>
      {registering ? (
        <h3 className='login-title'>Register Page</h3>
      ): (
        <h3 className='login-title'>Login Page</h3>
      )}
      

      {registering ? (
        
        <div className='todo-register-div'>
          <input type='email' className='register-input' placeholder='Enter email' value={registerdata.email} onChange={(e) => setRegisterdata({ ...registerdata, email: e.target.value })} />
          <input type='email' className='register-input' placeholder='Confirm email' value={registerdata.confirmEmail} onChange={(e) => setRegisterdata({ ...registerdata, confirmEmail: e.target.value })} />
          <input type='text' className='register-input' placeholder='Enter username' value={registerdata.displayName} onChange={(e) => setRegisterdata({ ...registerdata, displayName: e.target.value })} />

          <input type="password" className='register-input' placeholder='Enter Password' value={registerdata.password} onChange={(e) => setRegisterdata({ ...registerdata, password: e.target.value })} />
          <input type="password" className='register-input' placeholder='Confirm Password' value={registerdata.confirmPassword} onChange={(e) => setRegisterdata({ ...registerdata, confirmPassword: e.target.value })} />
          <button onClick={handleRegister}>Add Account</button>
          <button onClick={() => setRegistering(false)} className='login-register'>Back</button>

        </div>

      ) : (

        <div className='todo-login-div'>
          <input type="email" className='todo-login-input' placeholder='Enter email address' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className='todo-login-input' placeholder='Enter password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleClick}>Login</button>
          <button onClick={() => setRegistering(true)} className='login-register'>Register Account</button>
        </div>
      )}

    </div>
  )
}

export default LoginPage