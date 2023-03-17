import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './redux/appStore';

import App from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={setupStore()}>
        <Router>
            <App />
        </Router>
    </Provider>,
);
