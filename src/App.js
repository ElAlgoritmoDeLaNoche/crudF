import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './routes/PrivateRoute'
import './css/App.css';
import Login from './pages/users/Login'
import Signup from './pages/users/Signup'
import ForgotPassword from './pages/users/ForgotPassword'
import Home from './pages/users/Home'
import Dashboard from './pages/users/Dashboard'
import UpdateProfile from './pages/users/UpdateProfile'

//ADMIN
import RegisterAdmin from './pages/admin/registerAdmin'
import LoginAdmin from './pages/admin/LoginAdmin'
import DashboardAdmin from './pages/admin/DashboardAdmin'
import AddAdmin from './pages/admin/AddAdmin'
import AddCommerce from './pages/admin/AddCommerce';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path='/' component={Home} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
            <PrivateRoute path='/update-profile' component={UpdateProfile} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path='/forgot-password' component={ForgotPassword} />

            {/* ADMIN */}
            
            <PrivateRoute path='/dashboard-admin' component={DashboardAdmin} />
            <PrivateRoute path='/add-admin' component={AddAdmin} />
            <PrivateRoute path='/add-commerce' component={AddCommerce} />
            <Route path='/register-admin' component={RegisterAdmin} />
            <Route path='/login-admin' component={LoginAdmin} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
