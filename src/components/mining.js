import React, {useState, useEffect} from "react";
import {useCollection} from '../CollectionProvider'
import { RiCopperCoinLine } from "react-icons/ri";
import '../style/dashboard.css'


 export default function CoinMine(){
     const {userData, saveChanges, setUserData} = useCollection()
     const [mined, setMined] = useState(userData.goldMine)
     
     
     const mine = ()=>{
         setMined(mined+0.1)
     }
     useEffect(() => {
       setUserData((prevState) => {
            return { ...prevState, goldMine: mined };
          });
          saveChanges()
      },[mined]);

      const claim = ()=>{
        setUserData((prevState) => {
            return { ...prevState, gold: mined + userData.gold };
          });
          setMined(0)
          saveChanges()
      }


          
    useEffect(() => {
        const timer = setTimeout(() => {
            mine()
          }, 1800);
          
          return () => clearTimeout(timer);

      });
    return(
        <div className="mine-wrap">
            <div>Mined:{Math.round(mined * 10) / 10}<RiCopperCoinLine className="coinn"></RiCopperCoinLine></div>
            <button onClick={claim} className="menuBtn">Claim Coins</button>
        </div>
    )
}