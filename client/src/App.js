
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import logo from './logo/download.jpg'
import Navbar from './pages/Navbar';
import EmployeeList from './pages/EmployeeList';
import CreateEmployee from './pages/CreateEmployee';
import EditEmployee from './pages/EditEmployee';

function App() {
  return (
    <div >
     <BrowserRouter>

     <img src={logo} className="logo"/> 

     <Routes>

      <Route path="" element={<Login/>}></Route>


      <Route path="/admin/:username" element={<Navbar/>}>
      <Route path="" element={<Dashboard/>}/>
      <Route path="EmployeList" element={<EmployeeList/>}/>
      
      <Route path="EmployeList/CreateEmployee" element={<CreateEmployee/>} />
      <Route path="EmployeList/editemployee/:id" element={<EditEmployee/>} />
</Route>
      
     </Routes>
     
     </BrowserRouter>


    </div>
  );
}

export default App;
