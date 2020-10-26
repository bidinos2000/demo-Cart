import React from 'react';
import SignInCountDown from './components/signInCountDown/signInCountDown';
import HomePage from './pages/HomePage';
import CartPage from './pages/Cart';
import AboutPage from './pages/AboutPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SettingUser from './pages/SettingUser';
import HistoryUser from './components/settingProfile/formManage/manager/HistoryUser';
import Confirm from './components/settingProfile/formManage/manager/Confirm';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    {
        path: '/cart',
        exact: false,
        main: () => <CartPage />
    },
    {
        path: '/about',
        exact: false,
        main: () => <AboutPage />
    },
    {
        path: '/sign-in',
        exact: false,
        main: () => <SignIn />
    },
    {
        path: '/sign-up',
        exact: false,
        main: () => <SignUp />
    },
    {
        path: '/sign-up-success',
        exact: false,
        main: () => <SignInCountDown />
    },
    {
        path: '/setting-user',
        exact: false,
        main: () => <SettingUser />
    },
    {
        path: '/history-user',
        exact: false,
        main: () => <HistoryUser />
    },
    {
        path: '/confirm-user',
        exact: false,
        main: () => <Confirm />
    }
];

export default routes;