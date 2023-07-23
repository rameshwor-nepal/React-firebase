import React, {useState, useEffect } from 'react'
import { auth, db } from '../firebase-setup/firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { set, ref, onValue, remove, update, serverTimestamp } from 'firebase/database'
import { uid } from 'uid'

const HomePage = () => {
  const [user, setUser] = useState('')
  const [todo, setTodo] =  useState('')
  const [mytodos, setMytodos] = useState([])
  const [ editable, setEditable] = useState(false)
  const [tempuid, setTempuid] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {

        onValue(ref(db, `/${auth.currentUser.displayName}`), (snapshot) => {
          setMytodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todos) => {
              setMytodos((previoustodo) => [...previoustodo, todos]);
            });
          }
        });
        setUser(auth.currentUser.email)
      } 
      
      else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate('/')
      })
      .catch((error) => alert(error.message));
  };

  const addtododata = () =>{
    const myuid = uid();
    set(ref(db, `/${auth.currentUser.displayName}/${myuid}`),{
      todo : todo,
     createdAt : serverTimestamp(),
      myuid : myuid
    });
     setTodo('')
  }

  const handleDelete = (uid) =>{
    remove(ref(db, `/${auth.currentUser.displayName}/${uid}`));
  };

  const handleUpdate = (todo) =>{
      setEditable(true)
      setTodo(todo.todo)
      setTempuid(todo.myuid)

  }

  const confirmUpdate = () =>{
    update(ref(db, `/${auth.currentUser.displayName}/${tempuid}`),{
      todo: todo,
      tempuid: tempuid
    });
    setTodo('')
    setEditable(false)
  }

  return (
    <div>
      <h1 className='todo-title'>My Todo for</h1>
      <p className='todo-id'>{user}</p>
      <div className='todo-add'>
        <input type="text" className='todo-input' placeholder='Add your todo' value={todo} onChange={ (e) => setTodo( e.target.value)} /> 
        {/* <button onClick={addtododata}>Add todo</button><br /><br /> */}
      </div>
      
      { editable ?
      (
         <div> <button onClick={confirmUpdate}>Confirm Update</button><br /><br /></div>

      ) : (

      <div> <button onClick={addtododata}>Add todo</button><br /><br /> </div>
        
      )}
     

    {mytodos.map((mytodo) =>(
      <div key={mytodo.myuid} className='mytodos-div'>
        <h4 className='mytodos'>{mytodo.todo}</h4>
        <button onClick={() => handleUpdate(mytodo)} style={{marginRight:'10px'}} > Update </button>
        <button onClick={ () => handleDelete(mytodo.myuid)} className='delete-btn'> Delete </button>
      
      </div>
      
    ))}

      <button onClick={handleSignout} className='signout-btn'>Sign Out </button>
    </div>
  )
}

export default HomePage