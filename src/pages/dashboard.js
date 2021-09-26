import React from "react";
import "../style/dashboard.css";
import { useAuth } from "../AuthProvider";

import { RiCopperCoinLine } from "react-icons/ri";
import { CgCardSpades } from "react-icons/cg";


import Collection from '../components/collection'
import { useCollection } from "../CollectionProvider";

function Dashboard() {
  
  const {userData,logState} = useCollection()
  const { logOut } = useAuth();


  return (
    <div className="dashboard">
      <div className="menu">
        <div className="stat">
          <RiCopperCoinLine className="stats-icon" size="30" />
          {userData.gold ? userData.gold : "-"}
        </div>
        <div className="stat">
          <CgCardSpades className="stats-icon" size="30" />
          {userData.collection ? userData.collection.length + "/100" : "-"}
        </div>
        <button className="menuBtn" onClick={logOut}>
          Open Packs
        </button>
        <button className="menuBtn" onClick={logOut}>
          Sign out
        </button>
        <button className="menuBtn" onClick={logState}>
          New Card
  </button>
      
      </div>

      <Collection data ={userData.collection}/>
    </div>
  );
}

export default Dashboard;