import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterClient from './Components/Register/register';
import ClientLogin from './Components/Login/login'
import IdentifyClient from './Components/Identify/identify'
import Client from './Components/Clients/Routes/ClientRoute'
// import Currency from './Components/Currency/currency'
import Transaction from './Components/transactions/transactions'
import RegisterCashier from './Components/registerCashier/registercashier'
import CashierJob from './Components/cashierJob/job'
import LoginCashier from './Components/loginCashier/logincashier'

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/clientLogin" element={<ClientLogin />}/>
              <Route path="/register" element={<RegisterClient />}/>
              <Route path="/identify/:token" element={<IdentifyClient />}/>
              <Route path="/client" element={<Client />} />
              {/* <Route path="/currency" element={<Currency />} /> */}
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/register-cashier" element={<RegisterCashier />} />
              <Route path="/identify-cashier/:token" element={<CashierJob />} />
              <Route path="/login-cashier" element={<LoginCashier />} />
          </Routes>
      </BrowserRouter>  
  )
}

export default App
