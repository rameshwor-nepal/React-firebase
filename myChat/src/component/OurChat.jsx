import React, { useEffect, useState } from 'react'
import { serverTimestamp, addDoc, collection, query, where, onSnapshot, orderBy } from 'firebase/firestore'
import { auth, db } from '../firebase_setup/firebase';

const OurChat = ({myroom}) => {

  const [message, setMessage] = useState('')
  const [ allmessages, setAllmessages ] = useState([])
  const messageReference = collection(db, 'messages');

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      await addDoc(messageReference, {
        text : message,
        createdAt: serverTimestamp(),
        user: auth.currentUser.email,
        room : myroom
      })  
      setMessage('')
    }

    useEffect(() =>{
            const messageQuery = query( messageReference, where("room", "==" , myroom), orderBy("createdAt"))
            const messageHistory = onSnapshot(messageQuery, (snapshot) =>{
              let allmessages = []
              snapshot.forEach((doc) =>{
                allmessages.push({...doc.data(),id: doc.id })
              });
              setAllmessages(allmessages)
            });
            return () => messageHistory();
    }, [])

  return (
    <div>
        <h1 className='chatroom-heading'>
            Continue Chatting on room : {myroom}
        </h1>

        <div>
          {allmessages.map((allmessage) =>{
            return <div key={allmessage.id} className='allmessage'>
                    <p className='allmessage-user'>{allmessage.user}</p> 
                    <p className='allmessage-text'>{allmessage.text}</p>
                    <p className='allmessages-time'>{allmessage.createdAt.toDate().toUTCString() }</p>
                    </div>
          })}
        </div>

        <form onSubmit={handleSubmit} className="our-chat-form">
          <input className='our-chat-form-input' type="text" name="message" required value={message} onChange={(e) =>  ( setMessage(e.target.value))} />
          <button>Send</button>
        </form>
    </div>
  )
}

export default OurChat