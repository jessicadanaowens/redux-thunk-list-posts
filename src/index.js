import React from 'react';
import { Provider } from 'react-redux';
import * as ReactDOMClient from 'react-dom/client'
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import App from './components/App';
import reducers from './reducers';

const container = document.getElementById('root')
const store = createStore(reducers, applyMiddleware(thunk))

// Create a root
const root = ReactDOMClient.createRoot(container);

root.render(<Provider store={store}><App /></Provider>)
