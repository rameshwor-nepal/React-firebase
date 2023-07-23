import React, { useRef, useState } from 'react'
import OurChat from './OurChat'

const Room = () => {
    const [myroom, setMyroom] = useState(null)

    const roomRef = useRef(null)

  return (
    <div>

        { myroom ? (
          <OurChat myroom = {myroom} />

        ) : (
          
          <>
          <h1>Enter the room</h1>
          <input type="text" ref={roomRef} />
          <button onClick={() => setMyroom(roomRef.current.value)}> Start chatting </button>
          </>
        
        )}
          
    </div>
  )
}

export default Room