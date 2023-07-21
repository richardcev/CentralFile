import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import Login from './Components/General/Login/Login';
import Register from './Components/General/Register/Register';
import Inicio from './Components/General/Inicio';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <App />}></Route>
        <Route path='/inicio' element={ <Inicio />}></Route>
        <Route path='/login' element= {<Login />}></Route>
        <Route path='/register' element= {<Register />}></Route>
      </Routes>
    </BrowserRouter>
    </PersistGate>
  </Provider>

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
