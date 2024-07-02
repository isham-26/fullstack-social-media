
import './App.css';
// import Sidebar from './components/sidebar/Sidebar';
import Profile from './pages/profile/Profile';
import Home from "./pages/home/Home"
import {BrowserRouter,Route,Routes} from "react-router-dom"
// import Topbar from './components/topbar/Topbar';
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import { useContext } from 'react';
import { AppContext } from './components/context/contextProvider';
// import { useNavigate } from "react-router-dom";
function App() {
  const {state}=useContext(AppContext)
  // const navigate = useNavigate();
  // if(state.user===null){
     
  // }
  return (
    <BrowserRouter>
       <Routes>
          <Route index element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile/:username" element={<Profile/>} />
          {/* <Route path="*" element={<NoPage />} /> */}
       </Routes>
       
    </BrowserRouter>
  );
}

export default App;
