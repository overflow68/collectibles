import React from 'react';
import { RiCopperCoinLine } from "react-icons/ri";
import { CgCardSpades } from "react-icons/cg";
import { useCollection } from "../CollectionProvider";
import { useAuth } from "../AuthProvider";
import CoinMine from './mining';
import {Link} from "react-router-dom"
import {BsLightning} from 'react-icons/bs'

export default function Menu(){

    const {userData,logState} = useCollection()
    const { logOut } = useAuth();


    
    return(
        <div className="menu">
        <div className="stat">
          <RiCopperCoinLine className="stats-icon" size="30" />
          {userData.gold  ? Math.round(userData.gold * 10) / 10 : 0}
        </div>
        <div className="stat">
          <CgCardSpades className="stats-icon" size="30" />
          {userData.collection ? userData.collection.length + "/100" : "-"}
        </div>
        <div className="stat">
          <BsLightning className="stats-icon" size="30" />
          {userData.collection ? userData.power: "-"}
        </div>
        
        <button className="menuBtn" onClick={logState}>
          Buy new card (5<RiCopperCoinLine/>)
  </button>
  <Link to="/dashboard"><button className="menuBtn">
          Dashboard
  </button></Link>
  <Link to="/gambling"><button className="menuBtn">
          Gambling
  </button></Link>
        <button className="menuBtn" onClick={logOut}>
          Sign out
        </button>
        <button className="menuBtn" >
          Sign out
        </button>
        <CoinMine/>

      </div>
    )
}