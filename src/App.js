import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Login from "./pages/login"
import {AuthProvider} from './AuthProvider.js';
import { ColProvider } from "./CollectionProvider";
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
          <ColProvider><PrivateRoute exact path="/dashboard" component ={Dashboard}></PrivateRoute></ColProvider>
        </Switch>
      
    </Router>
    
    </div>
    </AuthProvider>
  );
}

export default App;
