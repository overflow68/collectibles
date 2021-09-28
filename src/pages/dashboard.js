import React from "react";
import "../style/dashboard.css";
import Menu from "../components/menu";
import Collection from '../components/collection'


function Dashboard() {
  
 


  return (
    <div className="dashboard">
      <Menu/>
      <Collection />
    </div>
  );
}

export default Dashboard;