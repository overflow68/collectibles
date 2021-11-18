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
      </div>
      
    );
  }

  export default Login