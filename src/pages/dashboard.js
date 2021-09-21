import React, {useState,useEffect} from "react";
import '../style/dashboard.css'
import {useAuth} from '../AuthProvider'
import {initFire} from '../Firebase.js'
import { doc,getDoc, getFirestore,collection, setDoc } from "firebase/firestore";
import { RiCopperCoinLine } from 'react-icons/ri';
import {CgCardSpades} from 'react-icons/cg'
import Card from '../components/card.js'




function Dashboard() {
const [userData, setUserData] = useState()
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
    collection: userData.collection });
}


async function  getDocument(){
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
 setUserData(docSnap.data())
} else {
  console.log("No such document!");
}
}

const logState =()=>{
  let copyData = {...userData}
  copyData.gold = copyData.gold - 5
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
          
            </div>
          <Card class="card common"/>
          <Card class="card rare"/>
          <Card class="card epic"/>
          <Card class="card legendary"/>
      
      </div>
    );
  }

  export default Dashboard