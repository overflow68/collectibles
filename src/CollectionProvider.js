import { initFire } from "./Firebase.js";
import React, { useContext, useState, useEffect, useRef } from "react";
import {doc,getDoc,getFirestore,collection,setDoc,} from "firebase/firestore";

  import { useAuth } from "./AuthProvider.js";
  import createCard from "./scripts/cardGenerator";

const ColContext = React.createContext()

export function useCollection() {
  return useContext(ColContext)
}
export function ColProvider({ children }) {
    const { currentUser } = useAuth()
    const [userData, setUserData] = useState({ gold:0,collection:[], power: 0, name:"" });
    const isFirstRender = useRef(true)
    const [isLoading, setLoading] = useState(true)

    const db = getFirestore(initFire);
  const docRef = (currentUser? doc(db, "users", currentUser.uid):null);
  
  async function saveChanges() {
    const userRef = collection(db, "users");
    await setDoc(doc(userRef, currentUser.uid), {
      gold: userData.gold,
      collection: JSON.stringify(userData.collection),
      power: userData.power,
      name : userData.name
    });
  }

  async function getDocument() {
    if (docRef !=null){
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

      setUserData((prevState) => {
        return { ...prevState, power: docSnap.data().power };
      });
      setUserData((prevState) => {
        return { ...prevState, name: docSnap.data().name };
      });
    } }
    setLoading(false)
  }

  const calcPower = (collection)=>{
    let power = 0;
    collection.forEach(item=>{
      power += item.damage + item.hitpoints
    })
    return Math.round(power * 10.101);
  }
   function logState(){
    if (userData.collection.length <100 && userData.gold >4){
    let copyData = { ...userData };
    let card = createCard();
    
    copyData.gold = copyData.gold - 5;
    copyData.collection.push(card);
    copyData.power = calcPower(copyData.collection);
   setUserData(copyData)
  
    
  }
  };
  

  const deleteCard = (e)=>{
    let copyData = {...userData};
    copyData.collection.forEach((item, index)=>{
      if (item.id === e.target.id){
        copyData.collection.splice(index,1)
        copyData.power = calcPower(copyData.collection);
       setUserData(copyData)
       
      }
    })
    
    
  }

useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false // toggle flag after first render/mounting
      return;
    }
    saveChanges() // do something after state has updated
  }, [userData]);


  useEffect(() => {
      getDocument()
      
    },[isLoading]);
  
    const value = {
      userData,
      logState,
      deleteCard,
      saveChanges,
      setUserData
    
    }
  
    return (
      <ColContext.Provider value={value}>
        {!isLoading && children}
      </ColContext.Provider>
    )
  }