import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';  
import DashBoard from './components/Dashboard';

const App = () => {
    return (
        <Provider store={store}> 
            <div className="App">
                <DashBoard />  
            </div>
        </Provider>
    );
};

export default App;
