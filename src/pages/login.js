import React, {useEffect} from "react";
import {useAuth} from '../AuthProvider'
import {useHistory } from 'react-router-dom';
import '../style/login.css'


function Login() {
   const{login, currentUser} = useAuth()

   const history = useHistory()
   
   useEffect(() => {
     if (currentUser){
       history.push("/dashboard")
     }
  
  },[currentUser])


    return (
        <div className="main-login">
          <h1>Best Deck;</h1>
          <h2>Collect them all</h2>
      <button className="login-btn" onClick={login} >Sign in with Google</button>
      </div>
      
    );
  }

  export default Login