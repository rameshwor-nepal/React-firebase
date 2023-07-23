
import './App.css'
import Login from './component/Login'
import Room from './component/Room'
import Register from './component/Register'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">

      <Routes>
        <Route path='/' element = {<Register />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/ourroom' element = {<Room />} />
      </Routes>
       
    </div>
  )
}

export default App
