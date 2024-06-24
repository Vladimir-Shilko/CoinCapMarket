import React from 'react';
import './App.css';
import Header from './Components/Header';
import Button from './Components/Button';
import CoinTable from './Components/CoinTable';
import { CoinData } from './utils/types';
import CoinRow from './Components/CoinRow';
// import Input from './Components/Input';
import Loader from './Components/Loader';
import {QueryClient, QueryClientProvider} from "react-query";
// import Modals from './Components/Modals';

const queryClient = new QueryClient();
function App() : JSX.Element{
  return (
      <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header/>
      </div>
        </QueryClientProvider>
  );
}

export default App;
