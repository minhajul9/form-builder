import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import FormList from './Components/FormList.jsx';
import CreateNewForm from './Components/CreateNewForm.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import FormPreview from './Components/FormPreview.jsx';
import Submission from './Components/Submission.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <FormList></FormList>
      },
      {
        path: '/createForm',
        element: <CreateNewForm></CreateNewForm>
      },
      {
        path: '/formPreview',
        element: <FormPreview></FormPreview>
      },
      {
        path: '/submissions/:formName',
        loader: ({params}) => fetch(`http://localhost:5000/formSubmissions/${params.formName}`),
        element: <Submission></Submission>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
