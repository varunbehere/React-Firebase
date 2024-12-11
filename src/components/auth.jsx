import { auth } from "../config/firebase"
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
import { useEffect, useState } from "react"
import { googleProvider } from "../config/firebase"

export const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [userLoggedIn, setIsUserLoggedIn] = useState(auth.currentUser)
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setIsUserLoggedIn(user)
      })
      return () => unsubscribe()
    }, [])

    const signIn = async () => {
       try {
        await createUserWithEmailAndPassword(auth, email, password)
       } catch (error) {
        console.log(error)
       }
    }
    const signInWithGoogle = async () => {
      try {
        await signInWithPopup(auth, googleProvider)
      } catch (error) {
        console.log(error)
      }
    }
    const singOut = async () => { 
      try {
        await signOut(auth)
      } catch (error) {
        console.log(error)
      }
    }
     
  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>
        Sign In
      </button>
      <button onClick= {signInWithGoogle}>Sign In with Google</button>
      <button style = {{backgroundColor: 'red'}} onClick={singOut} disabled = {!userLoggedIn}> Logout</button>
    </div>
  );
}