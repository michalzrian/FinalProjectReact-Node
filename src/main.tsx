import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import HomePage from './components/users/homePage.tsx';
import ManagerDictionary from './components/manager/managerDictionary.tsx';
import ManagerDashboard from './components/manager/managerDashboard.tsx';
import ManagerServices from './components/manager/managerServices.tsx';
import { DictionaryContext, DictionaryProvider } from './context/managerDictionary.context.tsx';
import Signup from './components/singinAndSingup/signup.tsx';
import Users from './components/manager/managerClients.tsx';
import { UsersContext, UsersProvider } from './context/managerClients.context.tsx';
import SignIn from './components/singinAndSingup/singin.component.tsx';
import ManagerHomePage from './components/manager/managerHomepage.tsx';
import { CurrentUserProvider } from './context/currentUserContext.tsx';
import sendEmail from './components/users/sendingEmail.tsx';

const router = createBrowserRouter([
  {
    path: '/HomePage',
    Component: HomePage
  },
  {
    path: '/Signup',
    Component: Signup
  },
  {
    path: '/',
    Component: SignIn
  },
  {
    path: '/SendEmail',
    Component : sendEmail

  },
  {
    path: '/ManagerDictionary',
    Component: ManagerDictionary
  },
  {
    path: '/ManagerDashboar',
    Component: ManagerDashboard
  },
  {
    path: '/ManagerClients',
    Component: Users
  },

  {
    path: '/ManagerServices',
    Component: ManagerServices
  },
  {
    path: '/ManagerHomePage',
    Component: ManagerHomePage
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UsersProvider>
      <CurrentUserProvider>
        <DictionaryProvider>
          <RouterProvider router={router} />
        </DictionaryProvider>
      </CurrentUserProvider>
    </UsersProvider>
  </React.StrictMode>
);