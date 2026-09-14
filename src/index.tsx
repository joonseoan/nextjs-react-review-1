import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Posts from './routes/Posts';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import NewPost from './routes/NewPost';
import RootLayout from './routes/RootLayout';


const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, children: [
      {
        path: '/',
        element: <Posts />,
        // [IMPORTANT]
        // If we still want NewPost to be laid over Posts
        // even though the path URL is different
        children: [
          // This should be done with props. We will do this.
          { path: '/create-post', element: <NewPost />},
        ]
      },
  ]}
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
