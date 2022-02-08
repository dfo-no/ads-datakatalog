import React from 'react';
import ReactDOM from 'react-dom';
import App from './Pages/App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { Provider } from 'react-redux';
import 'the-new-css-reset/css/reset.css';
import './symbols.css';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
