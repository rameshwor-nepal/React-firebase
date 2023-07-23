import { Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './component/LoginPage'
import HomePage from './component/HomePage'
function App() {

  return (
      <Routes>
        <Route path = '/' element = {<LoginPage />} />
        <Route path='/home' element = {<HomePage />} />
      </Routes>
    
  )
}

export default App
