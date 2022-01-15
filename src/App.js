import { ThemeProvider } from '@mui/material';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    
  } from "react-router-dom";
import history from './history.js'
import { React,lazy } from 'react';
import theme from './theme/ferbyTheme'
// import './index.css'
import FerbySuspense from './components/FerbySuspense/FerbySuspense';
// import { AuthProvider } from './contexts/FirebaseAuthContext';
// import AuthGuard from './auth/AuthGuard'
// import './App.css';

const RegisterIndex = lazy(() => import('./views/sessions/register/RegisterIndex'))
const Login = lazy(() => import('./views/sessions/login/Login'))
const AdminIndex = lazy (() => import('./views/admin/AdminIndex.jsx'))
const AdminServiceIndex = lazy (() => import('./views/admin/admin_views/AdminServiceIndex.jsx'))
const AdminService = lazy (() => import('./views/admin/admin_views/servicio_nuevo/AdminService.jsx'))
const AdminFile = lazy (() => import('./views/admin/admin_views/servicio_nuevo/AdminFile.jsx'))
const Download = lazy(() => import('./views/admin/admin_views/servicio_nuevo/Download'))
const AdminClient = lazy (() => import('./views/admin/admin_views/AdminClient.jsx'))
const AdminDashboard = lazy (() => import('./views/admin/admin_views/AdminDashboard.jsx'))
const AdminRegisterOperators = lazy(() =>  import('./views/admin/admin_views/adminRegister/AdminRegisterOperators'))
const AdminRegisterTransports = lazy(() =>  import('./views/admin/admin_views/adminRegister/AdminRegisterTransports'))
const AdminCsds = lazy(() => import('./views/admin/admin_views/adminRegister/AdminCsds.jsx'))
const Alv = lazy(() => import('./views/admin/admin_views/adminRegister/alv.jsx'))
const ServiceReq = lazy(() => import('./views/cartaporte/ServiceReq.jsx'));
const CartaPorteForm = lazy(() => import('./views/cartaporte/CartaPorteForm.jsx'));
const Home = lazy(() => import('./views/Home.jsx'))

function App() {
  return (
      <ThemeProvider theme={theme}>
          <Router history={history}>
              <FerbySuspense> 
                  <Routes>
                      <Route path="/" element={<Home/>}></Route>
                      <Route path="/carta" element={<CartaPorteForm/>}></Route>
                      <Route path="/service" element={<ServiceReq/>}></Route>
                      <Route path="/login" element={<Login/>}></Route>
                      <Route path="/register" element={<RegisterIndex/>}></Route>

                      <Route path="/admin" element={<AdminIndex/>}></Route>
                      <Route path="/admin/serviceIndex" element={<AdminServiceIndex/>}></Route>
                      <Route path="/admin/service" element={<AdminService/>}></Route>
                      <Route path="/admin/file" element={<AdminFile/>}></Route>
                      <Route path="/admin/download" element={<Download/>} />
                      <Route path="/admin/client" element={<AdminClient/>}></Route>
                      <Route path="/admin/dashboard" element={<AdminDashboard/>}></Route>
                      <Route path="/admin/operators" element={<AdminRegisterOperators/>}></Route>
                      <Route path="/admin/transports" element={<AdminRegisterTransports/>}></Route>
                      <Route path="/admin/certs" element={<AdminCsds/>}></Route>
                      <Route path="/admin/alv" element={<Alv/>}></Route>
                  </Routes>
              </FerbySuspense>
          </Router>
      </ThemeProvider>
  );
}

export default App;
