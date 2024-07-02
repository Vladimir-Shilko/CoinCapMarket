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
import { Col, Row } from 'antd';
import {  Layout } from 'antd';

const { Content } = Layout;
const queryClient = new QueryClient();
function App() : JSX.Element{
  return (
      <QueryClientProvider client={queryClient}>
      <div className="App">
          <Layout>
          <Header/>
          <Content>
          <Router>
              <Routes>
                  <Route path="/" element={<MainPage/>} />
                  <Route path="/:symbol" element={<Coin/>} />

                  {/* <Route path="*" element={<NotFoundPage />} /> */}
              </Routes>
          </Router>
          </Content>
          </Layout>
        </div>
        </QueryClientProvider>

  );
}

export default App;
