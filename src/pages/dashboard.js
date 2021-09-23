import React, {useState,useEffect} from "react";
import '../style/dashboard.css'
import {useAuth} from '../AuthProvider'
import {initFire} from '../Firebase.js'
import { doc,getDoc, getFirestore,collection, setDoc } from "firebase/firestore";
import { RiCopperCoinLine } from 'react-icons/ri';
import {CgCardSpades} from 'react-icons/cg'
import Card from '../components/card.js'
import createCard from "../scripts/cardGenerator";



function Dashboard() {
const [userData, setUserData] = useState({gold:0,collection:[]})
const [parseCol, setCol] = useState({collection:[]})
const{logOut, currentUser} = useAuth()
const db = getFirestore(initFire)
const docRef = doc(db, "users", currentUser.uid);


useEffect(() => {
  getDocument()
},[]);



async function saveChanges(){
  const userRef = collection(db, "users");
  await setDoc(doc(userRef, currentUser.uid), {
    gold: userData.gold,
    collection: JSON.stringify(userData.collection) });
}


async function  getDocument(){
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
  if(docSnap.data().collection.length !== 0){
    setUserData(prevState => {
    return {...prevState, collection: JSON.parse(docSnap.data().collection) }
    
})
    }
 
   
   
  
  setUserData(prevState => {
    return {...prevState, gold: docSnap.data().gold }
    
})
} else {
  console.log("No such document!");
}
}

const logState =()=>{
  let copyData = {...userData};
  let card = createCard();
  copyData.gold = copyData.gold - 5;
  copyData.collection.push(card);
  setUserData(copyData)
  saveChanges()
  console.log(userData)
}






    return (
      <div className="dashboard">
          
          <div className="menu">
            <div className="stat"><RiCopperCoinLine className="stats-icon" size="30"/>{userData? userData.gold:"-"}</div>
            <div className="stat"><CgCardSpades className="stats-icon" size="30"/>{userData? userData.collection.length +"/99":"-"}</div>
              <button className="menuBtn" onClick={logOut}>Open Packs</button>
              <button className="menuBtn" onClick={logOut}>Sign out</button>
              <button className="menuBtn" onClick={logState}>New Card</button>
              
          
            </div>
          {userData? userData.collection.map(item=>{
            return <Card classs={item.rarity} img ={item.image} dmg={item.damage} hp={item.hitpoints} lck={item.luck} />
          }):console.log("errou")
            }
          
         
      
      </div>
    );
  }

  export default Dashboard