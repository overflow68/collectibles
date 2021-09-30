import React from 'react';
import { RiCopperCoinLine } from "react-icons/ri";
import { CgCardSpades } from "react-icons/cg";
import { useCollection } from "../CollectionProvider";
import { useAuth } from "../AuthProvider";
import {BsLightning} from 'react-icons/bs'
export default function Menu(){
    const {userData,logState} = useCollection()
    const { logOut } = useAuth();
    return(
        <div className="menu">
        <div className="stat">
          <RiCopperCoinLine className="stats-icon" size="30" />
          {userData.gold  ? userData.gold : 0}
        </div>
        <div className="stat">
          <CgCardSpades className="stats-icon" size="30" />
          {userData.collection ? userData.collection.length + "/100" : "-"}
        </div>
        <div className="stat">
          <BsLightning className="stats-icon" size="30" />
          {userData.collection ? userData.power: "-"}
        </div>
        
        <button className="menuBtn" onClick={logOut}>
          Sign out
        </button>
        <button className="menuBtn" onClick={logState}>
          Buy new card (5<RiCopperCoinLine/>)
  </button>
      
      </div>
    )
}