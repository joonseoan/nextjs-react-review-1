import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import NewPost from './components/NewPost';


const router = createBrowserRouter([
  { path: '/', element: <App /> },
  // This should be done with props. We will do this.
  // { path: '/create-post', element: <NewPost />},
  { path: '/render-html', element: <p>This is static HTML page</p>},
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
