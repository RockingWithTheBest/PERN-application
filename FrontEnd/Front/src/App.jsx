import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Client from './Components/Clients/Routes/ClientRoute'
import Cashier from './Components/Cashiers/Cashiers'
import Currency from './Components/Currency/currency'
import Transaction from './Components/Transactions/transaction'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import OpenPage from './Page/page'

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<OpenPage />} />
          <Route path="/client" element={<Client />} />
          <Route path="/cashier" element={<Cashier />} />
          <Route path="/currency" element={<Currency />} />
          <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
