import { useEffect, useState } from 'react'
import { Auth } from './components/auth.jsx'
import {auth, db} from './config/firebase.js'
import {getDocs, collection, addDoc, doc, deleteDoc, updateDoc} from 'firebase/firestore'
import './App.css'

function App() {
  const [movieList, setMovieList] = useState([])
  const moviesCollectionRef = collection(db, 'movies')

  // New Movie State
  const [newMovieTitle, setNewMovieTitle] = useState('')
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [newOscar, setNewOscar] = useState(false)

  //Update Title State
  const [updateMovieTitle, setUpdateMovieTitle] = useState('')

  const getMoviesList = async() => {
    try {
      const data = await getDocs(moviesCollectionRef)
      const filteredData = data.docs.map(doc => ({
        ...doc.data(), 
        id: doc.id}
      ))
      setMovieList(filteredData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMoviesList()
  }, [])

  const onSubmit = async() => {
    try {
        await addDoc(moviesCollectionRef, 
          { title: newMovieTitle, 
            releaseDate: newReleaseDate, 
            recievedAnOscar: newOscar, 
            userId : auth.currentUser.uid
          })
        getMoviesList()
    } catch (error) {
      console.error(error)
    }
  }

  const onDeleteMovie = async(id) => {
    try {
      const movieDocRef = doc(db, 'movies', id)
      console.log(movieDocRef)
      await deleteDoc(movieDocRef)
      getMoviesList()
    } catch (error) {
      console.error(error)
    }
  }

  const onUpdateMovie = async(id) => {
    try {
      const movieDocRef = doc(db, 'movies', id)
      await updateDoc(movieDocRef, {title: updateMovieTitle})
      getMoviesList()
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <>
      <div className='App'>
        <Auth />

        <div>
          <input type="text" placeholder='Movie Title' onChange={e => setNewMovieTitle(e.target.value)}/>
          <input type="number" placeholder='Release Date' onChange={e => setNewReleaseDate(e.target.value)}/>
          <input type="checkbox" checked={newOscar} name="oscar" onChange={e => setNewOscar(e.target.checked)} /> 
          <label htmlFor="oscar">Recieved an Oscar</label>
          <button onClick={()=>{onSubmit()}}>Submit Movie</button>

        </div>

        <div>
          {movieList.map((movie) => (
            <>
              <h1 style={{color : movie.recievedAnOscar ? 'green' : 'red'}}>{movie.title}</h1>
              <p>{movie.releaseDate}</p>
              <button onClick={()=>{onDeleteMovie(movie.id)}}>Delete</button>

              <input type="text" placeholder='New movie' onChange={e => setUpdateMovieTitle(e.target.value)}/>
              <button onClick={()=> onUpdateMovie(movie.id)}>Update Title</button>
            </>
          )) }
        </div>
      </div>
    </>
  )
}

export default App
