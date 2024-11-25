import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import store from './store/index';
import DashBoard from './components/Dashboard';
import CompanyPage from './components/Company'; 
import Products from './components/Products';
const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<DashBoard />} />
                    <Route path="/company/:ticker" element={<CompanyPage />} />
                    <Route path="/products" element={<Products/>} />
                </Routes>
            </div>
        </Provider>
    );
};

export default App;
