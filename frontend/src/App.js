
import './App.css';
// import Sidebar from './components/sidebar/Sidebar';
import Profile from './pages/profile/Profile';
import Home from "./pages/home/Home"
import {Route,Routes} from "react-router-dom"
// import Topbar from './components/topbar/Topbar';
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
 import { useContext } from 'react';
 import { AppContext } from './components/context/contextProvider';
function App() {
    const {state}=useContext(AppContext);
  
  return (
    
       <Routes>
          <Route index element={state.user?<Home/>:<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile/:username" element={<Profile/>} />
          {/* <Route path="*" element={<NoPage />} /> */}
       </Routes>
  );
}

export default App;
