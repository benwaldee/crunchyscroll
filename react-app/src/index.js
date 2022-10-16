import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { DropProvider } from './context/Dropdown';
import { ModalProvider } from './context/Modal';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DropProvider>
        <ModalProvider >
          <App />
        </ModalProvider>
      </DropProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
