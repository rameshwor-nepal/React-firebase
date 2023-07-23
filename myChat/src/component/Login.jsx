import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../firebase_setup/firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const[email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();


   const handleLogin = () =>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCred)=>{
        console.log(userCred.user)
        navigate('/ourroom')
    })
    .catch((err) => alert(err.message))

    }

  return (
    <div>
        <h1>Login Here</h1>

        <section className = "login-section">
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email here' />
            <input type="password" name="password" value={password} onChange={(e) =>setPassword(e.target.value)} placeholder='Enter password here' />

            <button onClick={handleLogin}>  Login </button>

        </section>
    </div>
  )
}

export default Login