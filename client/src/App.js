import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import LandPage from './pages/LandPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile/Profile'
import NotFound from './pages/NotFound'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './redux/actions/authActions';
import PrivateRouter from './router/PrivateRouter';
import Error from './components/Error';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './components/Home';
import AddProduct from './pages/Dashboard/AddProduct';
import MyProducts from './pages/Dashboard/MyProducts';
import Productdetails from './pages/Dashboard/Productdetails';
import EditProduct from './pages/Dashboard/EditProduct';
import Basket from './components/Basket';
import Orders from './components/Orders';

function App() {
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])
  
  return (
    <div className="App">
      <NavBar />
      <Error />
      <Routes>
        <Route path='/' element={<LandPage />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='profile' element={
          <PrivateRouter> 
            <Profile /> 
          </PrivateRouter>} 
        />
        <Route path='dashboard' element={<Dashboard></Dashboard>} ></Route>
        <Route path='addProduct' element={<AddProduct></AddProduct>}></Route>
        <Route path='myProducts' element={<MyProducts></MyProducts>}></Route>
        <Route path='/product/:id' element={<Productdetails></Productdetails>}></Route>
        <Route path='/edidtProduct/:id' element={<EditProduct></EditProduct>}></Route>
        <Route path='/basket' element={<Basket></Basket>}></Route>
        <Route path='/Orders' element={<Orders></Orders>}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
