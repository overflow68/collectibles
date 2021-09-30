import React, { useContext, useState, useEffect} from "react"
import { initFire} from "./Firebase"
import { GoogleAuthProvider,getAuth, signInWithPopup, signOut} from "firebase/auth";
import { getFirestore, doc,getDoc, setDoc,collection,updateDoc, arrayUnion } from "firebase/firestore";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
 


  const auth = getAuth(initFire);
  const provider = new GoogleAuthProvider()
  const db = getFirestore(initFire)

 async function  login(){
 await signInWithPopup(auth, provider)
  .then(async(result) => {

    const docRef = doc(db, "users", result.user.uid);
    const colRef = collection(db, "users");
    const docSnap = await getDoc(docRef);
   
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    
      
    } else {
     await setDoc(doc(colRef, result.user.uid), {
        gold: 25,
        collection: [],
        power: 0,
        name: result.user.displayName
      });
      const docSnap1 = await getDoc(docRef);
      if (docSnap1.exists()){
        
      await updateDoc(doc(db, "HoF", "smnunique"), {
        players: arrayUnion(docSnap1.id)
      });}
      
    }
    
      
    
});
  } 
  


  function logOut(){
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
  }

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
      
    })

    return unsubscribe
  },[])
  

  const value = {
    currentUser,
    login,
    logOut
   
  
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}