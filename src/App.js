import logo from './logo.svg';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from "axios";
import './App.css';
import HomePage from './Routes/Home';
import Aboutpage from './Routes/About';
import BasicPage from './Routes/Basicpage';
import ProductsPage from './Routes/Products';
import Newproducts from './Routes/newproducts';
import Oldproducts from './Routes/Oldproducts';
import Generalcontext from './COntext/general_context';
import general from './COntext/general_context';
import { useEffect } from 'react';
import Loginpage from './Routes/Login';
import Logout from './Routes/Logout';
import RegisterPage from './Routes/Register';
import SocietyPage from './Routes/Society';

function App() {
  const [generalstate, Setgeneralstate] = useState({
    IsloggedIn: false,
    access: localStorage.getItem('access_token'),
    refresh: localStorage.getItem('refresh_token'),
    email: localStorage.getItem('email'),
  })

  useEffect(() => {
    axios.post('https://ryvm-django.vercel.app/api/token/refresh/',
      { refresh: localStorage.getItem('refresh_token') },
      {
        headers: {
          "Content-Type": "application/json",
          accept: 'application/json',
        }
      }
    ).then((res) => {
      console.log(res.data.access);
      Setgeneralstate({
        ...generalstate,
        access: res.data.access,
        IsloggedIn: true
      });
      localStorage.setItem('access_token', res.data.access)
    })
      .catch((error) => {
        console.log('navigate to login');
        Setgeneralstate({
          ...generalstate,
          IsloggedIn: false
        })
      })
  }, [])
  return (
    <>
      <general.Provider value={{ "sett": Setgeneralstate, "sta": generalstate }}>
        <BasicPage>
          <Routes>
            <Route path='/' element={<general.Provider value={{ "sett": Setgeneralstate, "sta": generalstate }}><HomePage /></general.Provider>}></Route>
            <Route path='/About' element={<Aboutpage />}></Route>
            <Route path='/Society/:pk' element={<SocietyPage />}></Route>
            <Route path='/Register' element={<RegisterPage />}></Route>
            <Route path='/Login' element={<general.Provider value={{ "sett": Setgeneralstate, "sta": generalstate }}><Loginpage /></general.Provider>}></Route>
            <Route path='/Logout' element={< Logout />}></Route>
            <Route path='/Product' element={< ProductsPage />}>
              <Route path='new_prroducts' element={< Newproducts />}></Route>
              <Route path='old_products' element={< Oldproducts />}></Route>
            </Route>
          </Routes>
        </BasicPage>
      </general.Provider>
    </>

  );
}

export default App;
