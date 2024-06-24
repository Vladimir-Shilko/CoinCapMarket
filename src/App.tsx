import React from 'react';
import './App.css';
import Header from './Components/Header';
import {BrowserRouter as Router, Routes, Route, useNavigate, redirect} from 'react-router-dom';
import Button from './Components/Button';
import CoinTable from './Components/CoinTable';
import { CoinData } from './utils/types';
import CoinRow from './Components/CoinRow';
// import Input from './Components/Input';
import Loader from './Components/Loader';
import {QueryClient, QueryClientProvider} from "react-query";
// import Modals from './Components/Modals';
import MainPage from './pages/index';
import Coin from './pages/coin';

const queryClient = new QueryClient();
function App() : JSX.Element{
  return (
      <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header/>
      </div>
          <Router>
              <Routes>
                  <Route path="/" element={<MainPage/>} />
                  <Route path="/:symbol" element={<Coin/>} />

                  {/* <Route path="*" element={<NotFoundPage />} /> */}
              </Routes>
          </Router>
        </QueryClientProvider>
  );
}

export default App;
