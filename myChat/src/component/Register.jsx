import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase_setup/firebase'
import { useNavigate, Link } from 'react-router-dom'
const Register = () => {

    const [register, setRegister] = useState({
        email:'',
        password:'',
        confirmPassword:''
    })

    const navigate = useNavigate();

    const handleRegister = () =>{
        if(register.password !== register.confirmPassword){
            alert('Confirm your password are matched')
        }
        else{
            createUserWithEmailAndPassword(auth, register.email, register.password)
            .then(() =>{
                    navigate('/login')
            })
            .catch((err) => err.message)
        }
        
    }

  return (
    <div>
        <h1>Register Your account</h1>
        <section className='register-section'>
            <input type="email" placeholder='Enter your email here' name='email' value={register.email} onChange={(e) => setRegister({...register, email:e.target.value})}  />
            <input type="password" placeholder='Enter your password here' name='password' value={register.password} onChange={(e) => setRegister({...register, password:e.target.value})}  />
            <input type="password" placeholder='Confirm your password here' name='confirm-password' value={register.confirmPassword} onChange={(e) => setRegister({...register, confirmPassword:e.target.value})} />
            <button onClick={handleRegister}>Register</button>  
            <Link to={'/login'} > 
                <button className= "login-btn">Click to Login</button>
            </Link> 
        </section>

    </div>
  )
}

export default Register