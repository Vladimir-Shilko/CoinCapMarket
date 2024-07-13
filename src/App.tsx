import React from 'react';
import './App.scss';
import Header from './Components/Header/Header';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from "react-query";
import MainPage from './pages/index';
import Coin from './pages/coin';
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
