import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Login from "./pages/login"
import {AuthProvider} from './AuthProvider.js';
import PrivateRoute from './pages/privateRoute';
import Dashboard from './pages/dashboard';
import './style/app.css'
function App() {
  return ( 
  <AuthProvider>
    <div className="App">
     
      <Router>
      <Switch>
          <Route  exact path="/" component={Login}></Route>
          <PrivateRoute exact path="/dashboard" component ={Dashboard}></PrivateRoute>
        </Switch>
      
    </Router>
    
    </div>
    </AuthProvider>
  );
}

export default App;
