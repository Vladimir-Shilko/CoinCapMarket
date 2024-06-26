import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Button from './Components/Button/Button';
import CoinTable from './Components/CoinTable/CoinTable';
import { CoinData } from './utils/types';
import CoinRow from './Components/CoinRow/CoinRow';
// import Input from './Components/Input';
import Loader from './Components/Loader/Loader';
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

          <Router>
              <Routes>
                  <Route path="/" element={<MainPage/>} />
                  <Route path="/:symbol" element={<Coin/>} />

                  {/* <Route path="*" element={<NotFoundPage />} /> */}
              </Routes>
          </Router>
        </div>
        </QueryClientProvider>

  );
}

export default App;
