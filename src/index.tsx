import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './store/context/AuthContext';
import { ChatContextProvider } from './store/context/ChatContext';
import { UIContextProvider } from './store/context/UIContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <UIContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UIContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
