import './Style.css';
import './App.css';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import List from './Component/List';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddEmployee from './Component/AddEmployee';
import EmployeeEdit from './Component/EmployeeEdit';
import EmployeeDetails from './Component/EmployeeDetails';

function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/employee' element={<List/>}></Route>
        <Route path='/employee/employee/create' element={<AddEmployee/>}></Route>
        <Route path='/employee/detail/:empid' element={<EmployeeDetails/>}></Route>
        <Route path='/employee/edit/:empid' element={<EmployeeEdit/>}></Route>
      </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
