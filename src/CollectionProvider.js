import { initFire } from "./Firebase.js";
import React, { useContext, useState, useEffect } from "react";
import {doc,getDoc,getFirestore,collection,setDoc,} from "firebase/firestore";

  import { useAuth } from "./AuthProvider.js";
  import createCard from "./scripts/cardGenerator";

const ColContext = React.createContext()

export function useCollection() {
  return useContext(ColContext)
}
export function ColProvider({ children }) {
    const { currentUser } = useAuth()
    const [userData, setUserData] = useState({ collection: [] });
    const [loading, setLoading] = useState(true)

    const db = getFirestore(initFire);
  const docRef = (currentUser? doc(db, "users", currentUser.uid):null);

  async function saveChanges() {
    const userRef = collection(db, "users");
    await setDoc(doc(userRef, currentUser.uid), {
      gold: userData.gold,
      collection: JSON.stringify(userData.collection),
    });
  }

  async function getDocument() {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data().collection.length !== 0) {
        setUserData((prevState) => {
          return {
            ...prevState,
            collection: JSON.parse(docSnap.data().collection),
          };
        });
      }

      setUserData((prevState) => {
        return { ...prevState, gold: docSnap.data().gold };
      });
    } 
  }

  const logState = () => {
    let copyData = { ...userData };
    let card = createCard();
    copyData.gold = copyData.gold - 5;
    copyData.collection.push(card);
    setUserData(copyData);
    saveChanges();
  };

  useEffect(() => {
    getDocument()
    setLoading(false)

    
  },[]);
  
    const value = {
      userData,
      logState
    
    }
  
    return (
      <ColContext.Provider value={value}>
        {!loading && children}
      </ColContext.Provider>
    )
  }