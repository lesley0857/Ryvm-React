import logo from './logo.svg';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from "axios";
import './App.css';
import Profile_page from './Routes/Profile';
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
import Checker from './Routes/Utility_folders/Authorization_check';
import baseUrl from './Routes/Utility_folders/AxiosInstance';
import HomePage from './Routes/Home';
import Prayerpage from './Routes/Prayer';
import Map from './Routes/map';
import Email_Verification from './Routes/Utility_folders/Email_verify';
import Reset_Password_form_Page from './Routes/Reset_Password_form';
import Password_Reset_Page from './Routes/Password_Reset';
import Alertbox_provider from '../src/COntext/alert_context';
import Paymentpage, { PaymentUserContextProvider } from './Routes/payments';


function App() {
  const [generalstate, Setgeneralstate] = useState({
    IsloggedIn: false,
    access: atob(localStorage?.getItem('access_token')),
    refresh: atob(localStorage?.getItem('refresh_token')),
    email: localStorage.getItem('email'),
  })

  useEffect(() => {
    axios.post(`${baseUrl}/api/token/refresh/`,
      { refresh: atob(localStorage?.getItem('refresh_token')) },
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
      localStorage.setItem('access_token', btoa(res.data.access))
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
        <Alertbox_provider>
          <PaymentUserContextProvider>
            <BasicPage>
              <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/Profile' element={<Profile_page />}></Route>
                <Route path='/About' element={<Aboutpage />}></Route>
                <Route path='/map' element={<Map />}></Route>
                <Route path='/payment' element={<Paymentpage />}></Route>
                <Route path='/contact' element={<Map />}></Route>
                <Route path='/Prayer' element={<Prayerpage />}></Route>
                <Route path='verify/:pk' element={<Email_Verification />}></Route>
                <Route path='society/:pk' element={<SocietyPage />}></Route>
                <Route path='/Register' element={<RegisterPage />}></Route>
                <Route path='/Login' element={<general.Provider value={{ "sett": Setgeneralstate, "sta": generalstate }}><Loginpage /></general.Provider>}></Route>
                <Route path='/Logout' element={< Logout />}></Route>
                <Route path='/Reset_Password_form' element={<Reset_Password_form_Page />}></Route>
                <Route path='/Password_Reset/:pk' element={<Password_Reset_Page />}></Route>
                <Route path='/Product' element={< ProductsPage />}>
                  <Route path='new_prroducts' element={< Newproducts />}></Route>
                  <Route path='old_products' element={< Oldproducts />}></Route>
                </Route>
              </Routes>
            </BasicPage>
          </PaymentUserContextProvider>
        </Alertbox_provider>
      </general.Provider>
    </>

  );
}

export default App;
